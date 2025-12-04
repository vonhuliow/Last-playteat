// Shop System - Purchase items with currency
if (typeof window.shopSystem === 'undefined') {
    window.shopSystem = {
        
        shopItems: {
            colors: [
                { name: 'Neon Cyan', hue: 180, sat: 100, light: 50, cost: 100 },
                { name: 'Cosmic Purple', hue: 270, sat: 100, light: 50, cost: 100 },
                { name: 'Plasma Pink', hue: 300, sat: 100, light: 60, cost: 100 },
                { name: 'Deep Space Navy', hue: 240, sat: 80, light: 30, cost: 125 },
                { name: 'Magma Red', hue: 0, sat: 100, light: 45, cost: 125 },
                { name: 'Forest Green', hue: 120, sat: 80, light: 35, cost: 125 }
            ],
            weapons: [
                { name: 'Plasma Cannon', damage: 2.0, cost: 250 },
                { name: 'Quantum Blade', damage: 2.2, cost: 300 },
                { name: 'Void Hammer', damage: 2.5, cost: 350 },
                { name: 'Photon Lance', damage: 2.3, cost: 320 }
            ],
            techs: [
                { name: 'Speed Boost', effect: 'Speed +20%', cost: 150 },
                { name: 'Energy Shield', effect: 'Defense +15%', cost: 200 },
                { name: 'Critical Strike', effect: 'Crit +25%', cost: 175 }
            ],
            secretWeapons: [
                { name: '⚡ INFINITY BLADE ⚡', damage: 10.0, cost: 1000, desc: 'ULTIMATE WEAPON - 10x damage!' },
                { name: '🌑 BLACK HOLE ORB 🌑', damage: 8.0, cost: 800, desc: 'Cosmic weapon - pulls enemies!' },
                { name: '✨ CELESTIAL STAFF ✨', damage: 7.5, cost: 750, desc: 'Magic unleashed - 7.5x damage!' }
            ]
        },
        
        drawShopGUI() {
            const overlay = document.createElement('div');
            overlay.id = 'shop-overlay';
            overlay.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.95); z-index: 4002; display: flex;
                justify-content: center; align-items: center; font-family: Arial, sans-serif;
                overflow-y: auto;
            `;
            
            const shopContainer = document.createElement('div');
            shopContainer.style.cssText = `
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                color: white; padding: 30px; border-radius: 15px;
                max-width: 1000px; max-height: 90vh; overflow-y: auto;
                border: 3px solid #FFD700; box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
            `;
            
            let html = `
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="margin: 0; color: #FFD700;">⭐ COSMIC SHOP ⭐</h1>
                    <div style="font-size: 18px; color: #00FF00; margin-top: 10px;">
                        💰 Balance: <span id="shop-balance" style="font-weight: bold;">${window.progression.currency}</span>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            `;
            
            // Colors section
            html += `<div style="background: rgba(255,215,0,0.1); padding: 15px; border-radius: 10px;">
                <h2 style="color: #FFD700; margin-top: 0;">🎨 Colors</h2>`;
            this.shopItems.colors.forEach(color => {
                const owned = window.progression.hasPurchased('colors', color.name);
                const btnStyle = owned 
                    ? 'background: #4CAF50; cursor: default;' 
                    : 'background: linear-gradient(45deg, #FF6B6B, #FFD700); cursor: pointer;';
                html += `
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>🎨 ${color.name}</span>
                            <button onclick="window.shopSystem.purchaseItem('colors', '${color.name}', ${color.cost})" 
                                style="padding: 8px 15px; border: none; border-radius: 5px; color: white; font-weight: bold; ${btnStyle}">
                                ${owned ? '✓ OWNED' : '💰 ' + color.cost}
                            </button>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            
            // Weapons section
            html += `<div style="background: rgba(255,100,0,0.1); padding: 15px; border-radius: 10px;">
                <h2 style="color: #FF6400; margin-top: 0;">⚔️ Weapons</h2>`;
            this.shopItems.weapons.forEach(weapon => {
                const owned = window.progression.hasPurchased('weapons', weapon.name);
                const btnStyle = owned 
                    ? 'background: #4CAF50; cursor: default;' 
                    : 'background: linear-gradient(45deg, #FF6B6B, #FFD700); cursor: pointer;';
                html += `
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>⚔️ ${weapon.name} (${weapon.damage}x)</span>
                            <button onclick="window.shopSystem.purchaseItem('weapons', '${weapon.name}', ${weapon.cost})" 
                                style="padding: 8px 15px; border: none; border-radius: 5px; color: white; font-weight: bold; ${btnStyle}">
                                ${owned ? '✓ OWNED' : '💰 ' + weapon.cost}
                            </button>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            
            // Techs section
            html += `<div style="background: rgba(0,255,200,0.1); padding: 15px; border-radius: 10px;">
                <h2 style="color: #00FFCC; margin-top: 0;">⚙️ Techs</h2>`;
            this.shopItems.techs.forEach(tech => {
                const owned = window.progression.hasPurchased('techs', tech.name);
                const btnStyle = owned 
                    ? 'background: #4CAF50; cursor: default;' 
                    : 'background: linear-gradient(45deg, #FF6B6B, #FFD700); cursor: pointer;';
                html += `
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.05); border-radius: 5px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span>⚙️ ${tech.name} - ${tech.effect}</span>
                            <button onclick="window.shopSystem.purchaseItem('techs', '${tech.name}', ${tech.cost})" 
                                style="padding: 8px 15px; border: none; border-radius: 5px; color: white; font-weight: bold; ${btnStyle}">
                                ${owned ? '✓ OWNED' : '💰 ' + tech.cost}
                            </button>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
            
            // Secret OP Weapons section
            html += `<div style="background: linear-gradient(135deg, rgba(255,0,255,0.2), rgba(0,255,255,0.2)); padding: 15px; border-radius: 10px; grid-column: 1 / -1;">
                <h2 style="color: #FF00FF; margin-top: 0;">🌟 SECRET OP WEAPONS 🌟</h2>`;
            this.shopItems.secretWeapons.forEach(weapon => {
                const owned = window.progression.hasPurchased('secretWeapons', weapon.name);
                const btnStyle = owned 
                    ? 'background: #4CAF50; cursor: default;' 
                    : 'background: linear-gradient(45deg, #FF00FF, #00FFFF); cursor: pointer;';
                html += `
                    <div style="margin: 10px 0; padding: 10px; background: rgba(255,255,255,0.1); border-radius: 5px; border: 2px solid #FF00FF;">
                        <div style="font-size: 16px; font-weight: bold; color: #FF00FF;">${weapon.name}</div>
                        <div style="font-size: 12px; color: #CCCCCC; margin: 5px 0;">${weapon.desc}</div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                            <span>💥 ${weapon.damage}x DAMAGE</span>
                            <button onclick="window.shopSystem.purchaseItem('secretWeapons', '${weapon.name}', ${weapon.cost})" 
                                style="padding: 10px 20px; border: none; border-radius: 5px; color: white; font-weight: bold; font-size: 14px; ${btnStyle}">
                                ${owned ? '✓ OWNED' : '💰 ' + weapon.cost}
                            </button>
                        </div>
                    </div>
                `;
            });
            html += `</div></div>
                <div style="text-align: center; margin-top: 20px;">
                    <button id="close-shop-btn" style="
                        background: #333; color: white; padding: 12px 30px; border-radius: 8px; cursor: pointer;
                        font-weight: bold; border: 2px solid #FFD700; font-size: 14px;
                    ">Close Shop</button>
                </div>
            `;
            
            shopContainer.innerHTML = html;
            overlay.appendChild(shopContainer);
            document.body.appendChild(overlay);
            
            document.getElementById('close-shop-btn').onclick = () => {
                document.body.removeChild(overlay);
            };
            
            overlay.onclick = (e) => {
                if (e.target === overlay) document.body.removeChild(overlay);
            };
        },
        
        purchaseItem(category, itemName, cost) {
            if (window.progression.purchase(category, itemName, cost)) {
                alert('✓ ' + itemName + ' purchased!');
                document.getElementById('shop-balance').textContent = window.progression.currency;
                // Refresh shop display
                const overlay = document.getElementById('shop-overlay');
                if (overlay) overlay.remove();
                this.drawShopGUI();
            } else {
                alert('❌ Not enough currency! Need ' + cost + ', have ' + window.progression.currency);
            }
        }
    };
    
    window.showShopGUI = () => window.shopSystem.drawShopGUI();
    
    console.log('%cShop System Loaded!', 'color: gold; font-weight: bold;');
}
