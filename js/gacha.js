
const gacha = {
    depth: 0, // Current cave depth
    cardRarities: ['N', 'R', 'SR', 'SSR', 'SSR+', 'UR', 'LR'],
    
    // Rarity chances based on depth
    getRarityChances(depth) {
        const baseChances = {
            'N': 60,
            'R': 25,
            'SR': 10,
            'SSR': 4,
            'SSR+': 0.8,
            'UR': 0.15,
            'LR': 0.05
        };
        
        // Deeper = better rates
        const depthBonus = Math.min(depth * 0.5, 50); // Max 50% bonus
        
        return {
            'N': Math.max(5, baseChances['N'] - depthBonus),
            'R': baseChances['R'] - depthBonus * 0.3,
            'SR': baseChances['SR'] + depthBonus * 0.2,
            'SSR': baseChances['SSR'] + depthBonus * 0.3,
            'SSR+': baseChances['SSR+'] + depthBonus * 0.25,
            'UR': baseChances['UR'] + depthBonus * 0.15,
            'LR': baseChances['LR'] + depthBonus * 0.1
        };
    },
    
    // Pull a card
    pullCard() {
        const chances = this.getRarityChances(this.depth);
        const total = Object.values(chances).reduce((a, b) => a + b, 0);
        let roll = Math.random() * total;
        
        for (const [rarity, chance] of Object.entries(chances)) {
            roll -= chance;
            if (roll <= 0) {
                return this.createCard(rarity);
            }
        }
        return this.createCard('N');
    },
    
    // Create card based on rarity
    createCard(rarity) {
        const cardTypes = ['field', 'weapon', 'tech'];
        const type = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        
        return {
            rarity: rarity,
            type: type,
            name: this.getCardName(rarity, type),
            power: this.getCardPower(rarity)
        };
    },
    
    getCardPower(rarity) {
        const powerMap = {
            'N': 1,
            'R': 2,
            'SR': 5,
            'SSR': 10,
            'SSR+': 20,
            'UR': 50,
            'LR': 100
        };
        return powerMap[rarity] || 1;
    },
    
    getCardName(rarity, type) {
        const names = {
            field: ['Void Rift', 'Quantum Collapse', 'Singularity', 'Event Horizon', 'Dark Matter Vortex'],
            weapon: ['Antimatter Cannon', 'Quark Blaster', 'Neutrino Beam', 'Tachyon Lance', 'Graviton Pulse'],
            tech: ['Superposition', 'Entanglement', 'Decoherence Shield', 'Quantum Tunneling', 'Wave Function']
        };
        return names[type][Math.floor(Math.random() * names[type].length)] + ` ${rarity}`;
    },
    
    // Spectacular pull animation
    animatePull(card, callback) {
        const overlay = document.createElement('div');
        overlay.id = 'gacha-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(0,0,0,0.8), rgba(0,0,0,0.95));
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.5s ease;
        `;
        
        const cardElement = document.createElement('div');
        cardElement.style.cssText = `
            width: 300px;
            height: 450px;
            background: linear-gradient(135deg, ${this.getRarityColor(card.rarity)}, ${this.getRarityColor(card.rarity, true)});
            border-radius: 20px;
            box-shadow: 0 0 50px ${this.getRarityGlow(card.rarity)};
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: rotateY(180deg) scale(0);
            animation: cardFlip 1.5s ease forwards, cardGlow 2s ease infinite;
            position: relative;
            overflow: hidden;
        `;
        
        // Add sparkles for high rarity
        if (['SSR+', 'UR', 'LR'].includes(card.rarity)) {
            for (let i = 0; i < 30; i++) {
                const sparkle = document.createElement('div');
                sparkle.style.cssText = `
                    position: absolute;
                    width: 3px;
                    height: 3px;
                    background: white;
                    border-radius: 50%;
                    top: ${Math.random() * 100}%;
                    left: ${Math.random() * 100}%;
                    animation: sparkle ${1 + Math.random()}s ease infinite;
                    opacity: ${Math.random()};
                `;
                cardElement.appendChild(sparkle);
            }
        }
        
        const content = document.createElement('div');
        content.innerHTML = `
            <div style="font-size: 48px; font-weight: bold; color: white; text-shadow: 0 0 20px rgba(255,255,255,0.8); margin-bottom: 20px;">${card.rarity}</div>
            <div style="font-size: 24px; color: white; text-align: center; padding: 20px;">${card.name}</div>
            <div style="font-size: 18px; color: rgba(255,255,255,0.8);">Type: ${card.type}</div>
            <div style="font-size: 18px; color: rgba(255,255,255,0.8);">Power: ${card.power}</div>
        `;
        
        cardElement.appendChild(content);
        overlay.appendChild(cardElement);
        document.body.appendChild(overlay);
        
        // Add CSS animations
        if (!document.getElementById('gacha-styles')) {
            const style = document.createElement('style');
            style.id = 'gacha-styles';
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes cardFlip {
                    0% { transform: rotateY(180deg) scale(0); }
                    50% { transform: rotateY(90deg) scale(1.2); }
                    100% { transform: rotateY(0deg) scale(1); }
                }
                @keyframes cardGlow {
                    0%, 100% { box-shadow: 0 0 50px ${this.getRarityGlow(card.rarity)}; }
                    50% { box-shadow: 0 0 100px ${this.getRarityGlow(card.rarity)}; }
                }
                @keyframes sparkle {
                    0%, 100% { opacity: 0; transform: scale(0); }
                    50% { opacity: 1; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Play sound effect based on rarity
        this.playPullSound(card.rarity);
        
        // Remove overlay after animation
        setTimeout(() => {
            overlay.style.animation = 'fadeIn 0.5s ease reverse';
            setTimeout(() => {
                document.body.removeChild(overlay);
                if (callback) callback(card);
            }, 500);
        }, 3000);
    },
    
    getRarityColor(rarity, secondary = false) {
        const colors = {
            'N': secondary ? '#888' : '#666',
            'R': secondary ? '#4a9eff' : '#2196F3',
            'SR': secondary ? '#d946ef' : '#9333ea',
            'SSR': secondary ? '#fbbf24' : '#f59e0b',
            'SSR+': secondary ? '#ff4444' : '#dc2626',
            'UR': secondary ? '#ff00ff' : '#c026d3',
            'LR': secondary ? '#ffd700' : '#eab308'
        };
        return colors[rarity] || colors['N'];
    },
    
    getRarityGlow(rarity) {
        const glows = {
            'N': 'rgba(102,102,102,0.3)',
            'R': 'rgba(33,150,243,0.6)',
            'SR': 'rgba(147,51,234,0.7)',
            'SSR': 'rgba(245,158,11,0.8)',
            'SSR+': 'rgba(220,38,38,0.9)',
            'UR': 'rgba(192,38,211,1)',
            'LR': 'rgba(234,179,8,1)'
        };
        return glows[rarity] || glows['N'];
    },
    
    playPullSound(rarity) {
        const frequencies = {
            'N': [200, 250],
            'R': [300, 400, 500],
            'SR': [400, 500, 600, 700],
            'SSR': [500, 650, 800, 950],
            'SSR+': [600, 750, 900, 1050, 1200],
            'UR': [700, 850, 1000, 1150, 1300, 1450],
            'LR': [800, 1000, 1200, 1400, 1600, 1800, 2000]
        };
        
        const freqs = frequencies[rarity] || frequencies['N'];
        freqs.forEach((freq, i) => {
            setTimeout(() => {
                if (typeof sound !== 'undefined' && sound.tone) {
                    sound.tone(freq);
                }
            }, i * 100);
        });
    },
    
    // Apply card rewards
    applyCard(card) {
        switch(card.type) {
            case 'field':
                this.applyFieldCard(card);
                break;
            case 'weapon':
                this.applyWeaponCard(card);
                break;
            case 'tech':
                this.applyTechCard(card);
                break;
        }
    },
    
    applyFieldCard(card) {
        // Add energy based on rarity
        if (typeof m !== 'undefined') {
            m.energy += card.power * 10;
            simulation.inGameConsole(`Gained ${card.name}! +${card.power * 10} energy`);
        }
    },
    
    applyWeaponCard(card) {
        // Give ammo based on rarity
        if (typeof powerUps !== 'undefined') {
            for (let i = 0; i < card.power; i++) {
                powerUps.spawn(m.pos.x + (Math.random() - 0.5) * 100, m.pos.y - 50, "ammo", false);
            }
            simulation.inGameConsole(`Gained ${card.name}! +${card.power} ammo packs`);
        }
    },
    
    applyTechCard(card) {
        // Give research based on rarity
        if (typeof powerUps !== 'undefined') {
            for (let i = 0; i < card.power; i++) {
                powerUps.spawn(m.pos.x + (Math.random() - 0.5) * 100, m.pos.y - 50, "research", false);
            }
            simulation.inGameConsole(`Gained ${card.name}! +${card.power} research`);
        }
    },
    
    // Create gacha portal
    spawnGachaPortal(x, y, depth) {
        this.depth = depth;
        
        // Create visual portal effect
        if (typeof simulation !== 'undefined') {
            simulation.ephemera.push({
                name: "gachaPortal",
                x: x,
                y: y,
                radius: 100,
                count: 0,
                do() {
                    this.count++;
                    
                    // Pulsing portal effect
                    const pulse = Math.sin(this.count * 0.1) * 20;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius + pulse, 0, 2 * Math.PI);
                    ctx.fillStyle = `rgba(147, 51, 234, ${0.3 + Math.sin(this.count * 0.1) * 0.2})`;
                    ctx.fill();
                    
                    // Outer ring
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.radius + pulse + 20, 0, 2 * Math.PI);
                    ctx.strokeStyle = `rgba(192, 38, 211, ${0.5 + Math.sin(this.count * 0.1) * 0.3})`;
                    ctx.lineWidth = 5;
                    ctx.stroke();
                    
                    // Sparkles
                    for (let i = 0; i < 5; i++) {
                        const angle = (this.count * 0.05 + i * Math.PI * 2 / 5);
                        const sparkleX = this.x + Math.cos(angle) * (this.radius + pulse);
                        const sparkleY = this.y + Math.sin(angle) * (this.radius + pulse);
                        ctx.beginPath();
                        ctx.arc(sparkleX, sparkleY, 5, 0, 2 * Math.PI);
                        ctx.fillStyle = 'rgba(255, 215, 0, 0.8)';
                        ctx.fill();
                    }
                    
                    // Check if player is near
                    if (typeof m !== 'undefined') {
                        const dx = m.pos.x - this.x;
                        const dy = m.pos.y - this.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if (dist < this.radius + 50) {
                            // Show prompt
                            ctx.font = "24px Arial";
                            ctx.fillStyle = "white";
                            ctx.textAlign = "center";
                            ctx.fillText("Press E to pull a card!", this.x, this.y - this.radius - 40);
                            
                            // Check for input (you'll need to add this to input handling)
                            if (input.interaction) {
                                gacha.animatePull(gacha.pullCard(), (card) => {
                                    gacha.applyCard(card);
                                });
                                simulation.removeEphemera(this);
                            }
                        }
                    }
                }
            });
        }
    }
};

// Add E key for interaction
if (typeof input !== 'undefined') {
    window.addEventListener("keydown", (event) => {
        if (event.key === "e" || event.key === "E") {
            input.interaction = true;
        }
    });
    window.addEventListener("keyup", (event) => {
        if (event.key === "e" || event.key === "E") {
            input.interaction = false;
        }
    });
}
