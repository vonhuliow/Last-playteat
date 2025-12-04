if (typeof window.characterCustomization === 'undefined') {
    window.characterCustomization = {
        selectedColor: null,
        selectedHat: 'none',
        selectedCompanion: 'none',
        animatedColorCycle: 0,
        
        presetColors: [
            { name: 'White', hue: 0, sat: 0, light: 100 },
            { name: 'Red', hue: 0, sat: 100, light: 50 },
            { name: 'Orange', hue: 30, sat: 100, light: 50 },
            { name: 'Yellow', hue: 60, sat: 100, light: 50 },
            { name: 'Lime', hue: 90, sat: 100, light: 50 },
            { name: 'Green', hue: 120, sat: 100, light: 50 },
            { name: 'Cyan', hue: 180, sat: 100, light: 50 },
            { name: 'Sky Blue', hue: 200, sat: 100, light: 50 },
            { name: 'Blue', hue: 240, sat: 100, light: 50 },
            { name: 'Purple', hue: 270, sat: 100, light: 50 },
            { name: 'Magenta', hue: 300, sat: 100, light: 50 },
            { name: 'Pink', hue: 330, sat: 100, light: 70 },
            { name: 'Black', hue: 0, sat: 0, light: 0 },
            { name: 'Gray', hue: 0, sat: 0, light: 50 },
            { name: 'Light Gray', hue: 0, sat: 0, light: 75 },
            { name: 'Dark Red', hue: 0, sat: 80, light: 30 },
            { name: 'Dark Green', hue: 120, sat: 80, light: 30 },
            { name: 'Dark Blue', hue: 240, sat: 80, light: 30 },
            { name: 'Gold', hue: 45, sat: 100, light: 50 },
            { name: 'Silver', hue: 0, sat: 0, light: 80 },
            { name: 'Bronze', hue: 30, sat: 60, light: 40 },
            { name: 'Teal', hue: 180, sat: 70, light: 45 },
            { name: 'Lavender', hue: 270, sat: 60, light: 70 },
            { name: 'Peach', hue: 20, sat: 100, light: 80 },
        ],
        
        animatedColors: [
            { name: 'Rainbow', type: 'rainbow', speed: 2 },
            { name: 'Pastel Rainbow', type: 'pastel-rainbow', speed: 1.5 },
            { name: 'Fire', type: 'fire', speed: 3 },
            { name: 'Ocean', type: 'ocean', speed: 1 },
            { name: 'Forest', type: 'forest', speed: 1.2 },
            { name: 'Sunset', type: 'sunset', speed: 2 },
            { name: 'Galaxy', type: 'galaxy', speed: 1.8 },
            { name: 'Neon', type: 'neon', speed: 4 },
            { name: 'Ice', type: 'ice', speed: 1.5 },
            { name: 'Electric', type: 'electric', speed: 5 },
            { name: 'Toxic', type: 'toxic', speed: 2.5 },
            { name: 'Cherry Blossom', type: 'cherry', speed: 1 },
        ],
        
        hats: [
            { name: 'none', display: 'None' },
            { name: 'crown', display: '👑 Crown' },
            { name: 'top-hat', display: '🎩 Top Hat' },
            { name: 'wizard', display: '🧙 Wizard Hat' },
            { name: 'halo', display: '😇 Halo' },
            { name: 'horns', display: '😈 Horns' },
            { name: 'cowboy', display: '🤠 Cowboy Hat' },
            { name: 'santa', display: '🎅 Santa Hat' },
            { name: 'party', display: '🎉 Party Hat' },
            { name: 'chef', display: '👨‍🍳 Chef Hat' },
            { name: 'propeller', display: '🚁 Propeller Hat' },
            { name: 'pirate', display: '🏴‍☠️ Pirate Hat' },
            { name: 'flower', display: '🌸 Flower Crown' },
        ],
        
        companions: [
            { name: 'none', display: 'None' },
            { name: 'orb', display: '🔮 Glowing Orb' },
            { name: 'star', display: '⭐ Star' },
            { name: 'butterfly', display: '🦋 Butterfly' },
            { name: 'fairy', display: '🧚 Fairy' },
            { name: 'ghost', display: '👻 Ghost' },
            { name: 'flame', display: '🔥 Flame' },
            { name: 'snowflake', display: '❄️ Snowflake' },
            { name: 'heart', display: '💖 Heart' },
            { name: 'spark', display: '✨ Sparkle' },
            { name: 'moon', display: '🌙 Moon' },
            { name: 'lightning', display: '⚡ Lightning' },
            { name: 'dragon', display: '🐉 Mini Dragon' },
        ],
        
        getAnimatedColor(type, cycle) {
            const t = cycle / 100;
            
            switch(type) {
                case 'rainbow':
                    return { hue: (t * 360) % 360, sat: 100, light: 50 };
                case 'pastel-rainbow':
                    return { hue: (t * 360) % 360, sat: 60, light: 75 };
                case 'fire':
                    const fireHue = 10 + Math.sin(t * 0.5) * 20;
                    return { hue: fireHue, sat: 100, light: 50 + Math.sin(t) * 10 };
                case 'ocean':
                    const oceanHue = 180 + Math.sin(t * 0.3) * 30;
                    return { hue: oceanHue, sat: 70, light: 45 };
                case 'forest':
                    const forestHue = 120 + Math.sin(t * 0.4) * 20;
                    return { hue: forestHue, sat: 60, light: 40 };
                case 'sunset':
                    const sunsetHue = 20 + Math.sin(t * 0.6) * 40;
                    return { hue: sunsetHue, sat: 90, light: 55 };
                case 'galaxy':
                    const galaxyHue = 260 + Math.sin(t * 0.5) * 40;
                    return { hue: galaxyHue, sat: 80, light: 45 };
                case 'neon':
                    const neonHue = (t * 720) % 360;
                    return { hue: neonHue, sat: 100, light: 60 };
                case 'ice':
                    const iceHue = 180 + Math.sin(t * 0.3) * 15;
                    return { hue: iceHue, sat: 80, light: 70 };
                case 'electric':
                    const elecHue = 200 + Math.sin(t * 2) * 60;
                    return { hue: elecHue, sat: 100, light: 50 };
                case 'toxic':
                    const toxicHue = 90 + Math.sin(t * 0.7) * 30;
                    return { hue: toxicHue, sat: 100, light: 45 };
                case 'cherry':
                    const cherryHue = 320 + Math.sin(t * 0.2) * 20;
                    return { hue: cherryHue, sat: 70, light: 70 };
                default:
                    return { hue: 0, sat: 0, light: 100 };
            }
        },
        
        loadFromStorage() {
            const saved = localStorage.getItem('n-gon-customization');
            if (saved) {
                try {
                    const data = JSON.parse(saved);
                    this.selectedColor = data.color || null;
                    this.selectedHat = data.hat || 'none';
                    this.selectedCompanion = data.companion || 'none';
                } catch(e) {
                    console.log('Failed to load customization');
                }
            }
        },
        
        saveToStorage() {
            const data = {
                color: this.selectedColor,
                hat: this.selectedHat,
                companion: this.selectedCompanion
            };
            localStorage.setItem('n-gon-customization', JSON.stringify(data));
        },
        
        applyCustomization() {
            if (typeof m !== 'undefined' && m.setFillColors) {
                if (this.selectedColor) {
                    if (this.selectedColor.animated) {
                        const animConfig = this.animatedColors.find(c => c.type === this.selectedColor.type);
                        if (animConfig) {
                            this.animatedColorCycle += animConfig.speed;
                        }
                        const color = this.getAnimatedColor(this.selectedColor.type, this.animatedColorCycle);
                        m.color = color;
                    } else {
                        m.color = {
                            hue: this.selectedColor.hue,
                            sat: this.selectedColor.sat,
                            light: this.selectedColor.light
                        };
                    }
                    m.setFillColors();
                }
            }
        },
        
        equip() {
            this.saveToStorage();
            this.applyCustomization();
        },
        
        drawHat(ctx, x, y, angle) {
            if (this.selectedHat === 'none') return;
            
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);
            
            switch(this.selectedHat) {
                case 'crown':
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    for(let i = 0; i < 5; i++) {
                        const ang = -Math.PI/2 + (i * Math.PI * 2 / 5);
                        const r = i % 2 === 0 ? 20 : 12;
                        if(i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r - 40);
                        else ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r - 40);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.strokeStyle = '#DAA520';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    break;
                    
                case 'top-hat':
                    ctx.fillStyle = '#000';
                    ctx.fillRect(-15, -55, 30, 15);
                    ctx.fillRect(-20, -40, 40, 5);
                    ctx.strokeStyle = '#333';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-15, -55, 30, 15);
                    break;
                    
                case 'wizard':
                    ctx.fillStyle = '#4B0082';
                    ctx.beginPath();
                    ctx.moveTo(-15, -35);
                    ctx.lineTo(0, -65);
                    ctx.lineTo(15, -35);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#FFD700';
                    ctx.font = '12px Arial';
                    ctx.fillText('★', -4, -45);
                    break;
                    
                case 'halo':
                    ctx.strokeStyle = '#FFD700';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(0, -50, 18, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.globalAlpha = 0.5;
                    ctx.fillStyle = '#FFFF00';
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    break;
                    
                case 'horns':
                    ctx.fillStyle = '#8B0000';
                    ctx.beginPath();
                    ctx.moveTo(-20, -35);
                    ctx.quadraticCurveTo(-25, -50, -18, -55);
                    ctx.lineTo(-15, -40);
                    ctx.closePath();
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(20, -35);
                    ctx.quadraticCurveTo(25, -50, 18, -55);
                    ctx.lineTo(15, -40);
                    ctx.closePath();
                    ctx.fill();
                    break;
                    
                case 'cowboy':
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(-22, -45, 44, 10);
                    ctx.beginPath();
                    ctx.ellipse(0, -45, 15, 8, 0, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'santa':
                    ctx.fillStyle = '#DC143C';
                    ctx.beginPath();
                    ctx.moveTo(-15, -35);
                    ctx.lineTo(0, -55);
                    ctx.lineTo(15, -35);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#FFF';
                    ctx.beginPath();
                    ctx.arc(0, -55, 5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillRect(-15, -35, 30, 4);
                    break;
                    
                case 'party':
                    ctx.fillStyle = '#FF69B4';
                    ctx.beginPath();
                    ctx.moveTo(-10, -35);
                    ctx.lineTo(0, -60);
                    ctx.lineTo(10, -35);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    ctx.arc(0, -60, 4, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'chef':
                    ctx.fillStyle = '#FFF';
                    ctx.fillRect(-15, -50, 30, 15);
                    ctx.fillRect(-12, -40, 24, 5);
                    ctx.strokeStyle = '#DDD';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-15, -50, 30, 15);
                    break;
                    
                case 'propeller':
                    ctx.save();
                    const propAngle = Date.now() / 50;
                    ctx.translate(0, -45);
                    ctx.rotate(propAngle);
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(-25, -2, 50, 4);
                    ctx.restore();
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.arc(0, -45, 8, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'pirate':
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.moveTo(-20, -35);
                    ctx.lineTo(20, -35);
                    ctx.lineTo(15, -45);
                    ctx.lineTo(-15, -45);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#FFF';
                    ctx.font = '16px Arial';
                    ctx.fillText('☠', -6, -36);
                    break;
                    
                case 'flower':
                    for(let i = 0; i < 6; i++) {
                        const ang = (i * Math.PI * 2 / 6);
                        ctx.fillStyle = '#FF69B4';
                        ctx.beginPath();
                        ctx.arc(Math.cos(ang) * 12, Math.sin(ang) * 12 - 45, 6, 0, Math.PI * 2);
                        ctx.fill();
                    }
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    ctx.arc(0, -45, 6, 0, Math.PI * 2);
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        },
        
        drawCompanion(ctx, x, y, cycle) {
            if (this.selectedCompanion === 'none') return;
            
            const offset = Math.sin(cycle / 30) * 5;
            const companionX = x + 50;
            const companionY = y - 20 + offset;
            
            ctx.save();
            ctx.translate(companionX, companionY);
            
            // Use advanced models from advanced_gui if available
            if(typeof window.advancedGUI !== 'undefined' && window.advancedGUI.companionModels[this.selectedCompanion]) {
                window.advancedGUI.companionModels[this.selectedCompanion]();
                ctx.restore();
                return;
            }
            
            // Fallback to original simple models
            switch(this.selectedCompanion) {
                case 'orb':
                    const orbGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, 15);
                    orbGlow.addColorStop(0, 'rgba(138, 43, 226, 1)');
                    orbGlow.addColorStop(1, 'rgba(138, 43, 226, 0)');
                    ctx.fillStyle = orbGlow;
                    ctx.beginPath();
                    ctx.arc(0, 0, 15, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#8A2BE2';
                    ctx.beginPath();
                    ctx.arc(0, 0, 8, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'star':
                    ctx.fillStyle = '#FFD700';
                    ctx.beginPath();
                    for(let i = 0; i < 5; i++) {
                        const ang = -Math.PI/2 + (i * Math.PI * 2 / 5);
                        const r = i % 2 === 0 ? 12 : 6;
                        if(i === 0) ctx.moveTo(Math.cos(ang) * r, Math.sin(ang) * r);
                        else ctx.lineTo(Math.cos(ang) * r, Math.sin(ang) * r);
                    }
                    ctx.closePath();
                    ctx.fill();
                    ctx.rotate(cycle / 50);
                    break;
                    
                case 'butterfly':
                    ctx.fillStyle = '#FF69B4';
                    ctx.beginPath();
                    ctx.ellipse(-6, -4, 8, 6, Math.PI/4, 0, Math.PI * 2);
                    ctx.ellipse(-6, 4, 8, 6, -Math.PI/4, 0, Math.PI * 2);
                    ctx.ellipse(6, -4, 8, 6, -Math.PI/4, 0, Math.PI * 2);
                    ctx.ellipse(6, 4, 8, 6, Math.PI/4, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.fillRect(-1, -6, 2, 12);
                    break;
                    
                case 'fairy':
                    ctx.fillStyle = '#FFB6C1';
                    ctx.beginPath();
                    ctx.arc(0, 0, 6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.strokeStyle = '#87CEEB';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-8, 0);
                    ctx.quadraticCurveTo(-12, -8, -8, -12);
                    ctx.moveTo(8, 0);
                    ctx.quadraticCurveTo(12, -8, 8, -12);
                    ctx.stroke();
                    break;
                    
                case 'ghost':
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.beginPath();
                    ctx.arc(0, -4, 8, Math.PI, 0);
                    ctx.lineTo(8, 8);
                    ctx.lineTo(4, 4);
                    ctx.lineTo(0, 8);
                    ctx.lineTo(-4, 4);
                    ctx.lineTo(-8, 8);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = '#000';
                    ctx.beginPath();
                    ctx.arc(-3, -4, 2, 0, Math.PI * 2);
                    ctx.arc(3, -4, 2, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'flame':
                    const flameGrad = ctx.createLinearGradient(0, 10, 0, -10);
                    flameGrad.addColorStop(0, '#FF4500');
                    flameGrad.addColorStop(0.5, '#FFA500');
                    flameGrad.addColorStop(1, '#FFD700');
                    ctx.fillStyle = flameGrad;
                    ctx.beginPath();
                    ctx.moveTo(0, 10);
                    ctx.quadraticCurveTo(-8, 5, -6, -5);
                    ctx.quadraticCurveTo(-4, -12, 0, -15);
                    ctx.quadraticCurveTo(4, -12, 6, -5);
                    ctx.quadraticCurveTo(8, 5, 0, 10);
                    ctx.fill();
                    break;
                    
                case 'snowflake':
                    ctx.strokeStyle = '#87CEEB';
                    ctx.lineWidth = 2;
                    for(let i = 0; i < 6; i++) {
                        ctx.save();
                        ctx.rotate(i * Math.PI / 3);
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(0, -10);
                        ctx.moveTo(0, -6);
                        ctx.lineTo(-3, -9);
                        ctx.moveTo(0, -6);
                        ctx.lineTo(3, -9);
                        ctx.stroke();
                        ctx.restore();
                    }
                    break;
                    
                case 'heart':
                    ctx.fillStyle = '#FF1493';
                    ctx.beginPath();
                    ctx.moveTo(0, 4);
                    ctx.bezierCurveTo(-8, -4, -12, -8, -6, -12);
                    ctx.bezierCurveTo(0, -8, 0, -8, 0, -4);
                    ctx.bezierCurveTo(0, -8, 0, -8, 6, -12);
                    ctx.bezierCurveTo(12, -8, 8, -4, 0, 4);
                    ctx.fill();
                    ctx.globalAlpha = 0.5 + Math.sin(cycle / 20) * 0.3;
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    break;
                    
                case 'spark':
                    ctx.fillStyle = '#FFD700';
                    for(let i = 0; i < 4; i++) {
                        ctx.save();
                        ctx.rotate((i * Math.PI / 2) + cycle / 40);
                        ctx.fillRect(-2, -8, 4, 16);
                        ctx.restore();
                    }
                    break;
                    
                case 'moon':
                    ctx.fillStyle = '#F0E68C';
                    ctx.beginPath();
                    ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = '#DAA520';
                    ctx.beginPath();
                    ctx.arc(3, 0, 8, 0, Math.PI * 2);
                    ctx.fill();
                    break;
                    
                case 'lightning':
                    ctx.strokeStyle = '#FFFF00';
                    ctx.lineWidth = 3;
                    ctx.lineJoin = 'miter';
                    ctx.beginPath();
                    ctx.moveTo(0, -12);
                    ctx.lineTo(-4, -2);
                    ctx.lineTo(2, -2);
                    ctx.lineTo(-2, 8);
                    ctx.lineTo(4, 0);
                    ctx.lineTo(0, 0);
                    ctx.closePath();
                    ctx.fillStyle = '#FFFF00';
                    ctx.fill();
                    ctx.stroke();
                    break;
                    
                case 'dragon':
                    ctx.fillStyle = '#DC143C';
                    ctx.beginPath();
                    ctx.arc(0, 0, 6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.moveTo(6, -2);
                    ctx.lineTo(10, -4);
                    ctx.lineTo(8, 0);
                    ctx.fill();
                    ctx.moveTo(6, 2);
                    ctx.lineTo(10, 4);
                    ctx.lineTo(8, 0);
                    ctx.fill();
                    ctx.fillStyle = '#FF4500';
                    ctx.beginPath();
                    ctx.moveTo(10, 0);
                    ctx.lineTo(16, -2);
                    ctx.lineTo(16, 2);
                    ctx.fill();
                    break;
            }
            
            ctx.restore();
        }
    };
    
    function showCustomizeGUI() {
        const overlay = document.createElement('div');
        overlay.id = 'customize-overlay';
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9); z-index: 3000; display: flex;
            justify-content: center; align-items: center; overflow-y: auto;
        `;
        
        const panel = document.createElement('div');
        panel.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white; padding: 30px; border-radius: 20px;
            max-width: 800px; max-height: 90vh; overflow-y: auto;
            border: 3px solid #fff; box-shadow: 0 0 50px rgba(102, 126, 234, 0.8);
        `;
        
        panel.innerHTML = `
            <h1 style="text-align: center; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
                ✨ Character Customization ✨
            </h1>
            
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="margin-top: 0;">🎨 Preset Colors</h2>
                <div id="color-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); gap: 10px; margin-bottom: 15px;">
                </div>
                
                <h2>🌈 Animated Colors</h2>
                <div id="animated-color-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                </div>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="margin-top: 0;">🎩 Hats</h2>
                <div id="hat-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                </div>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <h2 style="margin-top: 0;">✨ Companions</h2>
                <div id="companion-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                </div>
            </div>
            
            <div style="text-align: center;">
                <button id="apply-customize-btn" style="
                    background: linear-gradient(45deg, #4CAF50, #45a049);
                    color: white; border: none; padding: 15px 40px; font-size: 18px;
                    border-radius: 10px; cursor: pointer; margin: 10px;
                    box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
                    font-weight: bold;
                ">Apply & Close</button>
                <button id="close-customize-btn" style="
                    background: linear-gradient(45deg, #f44336, #da190b);
                    color: white; border: none; padding: 15px 40px; font-size: 18px;
                    border-radius: 10px; cursor: pointer; margin: 10px;
                    box-shadow: 0 4px 15px rgba(244, 67, 54, 0.4);
                    font-weight: bold;
                ">Close</button>
            </div>
        `;
        
        overlay.appendChild(panel);
        document.body.appendChild(overlay);
        
        const colorGrid = document.getElementById('color-grid');
        characterCustomization.presetColors.forEach(color => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                background: hsl(${color.hue}, ${color.sat}%, ${color.light}%);
                border: 3px solid ${characterCustomization.selectedColor && 
                    !characterCustomization.selectedColor.animated &&
                    characterCustomization.selectedColor.hue === color.hue ? '#FFD700' : '#fff'};
                padding: 20px 10px; border-radius: 8px; cursor: pointer;
                font-weight: bold; color: ${color.light > 50 ? '#000' : '#fff'};
                transition: transform 0.2s;
            `;
            btn.textContent = color.name;
            btn.onmouseover = () => btn.style.transform = 'scale(1.1)';
            btn.onmouseout = () => btn.style.transform = 'scale(1)';
            btn.onclick = () => {
                characterCustomization.selectedColor = { ...color, animated: false };
                showCustomizeGUI();
            };
            colorGrid.appendChild(btn);
        });
        
        const animatedGrid = document.getElementById('animated-color-grid');
        characterCustomization.animatedColors.forEach(anim => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                background: linear-gradient(90deg, 
                    hsl(0, 100%, 50%), hsl(60, 100%, 50%), 
                    hsl(120, 100%, 50%), hsl(180, 100%, 50%),
                    hsl(240, 100%, 50%), hsl(300, 100%, 50%));
                border: 3px solid ${characterCustomization.selectedColor && 
                    characterCustomization.selectedColor.animated &&
                    characterCustomization.selectedColor.type === anim.type ? '#FFD700' : '#fff'};
                padding: 15px 10px; border-radius: 8px; cursor: pointer;
                font-weight: bold; color: #fff; text-shadow: 1px 1px 2px #000;
                transition: transform 0.2s;
            `;
            btn.textContent = anim.name;
            btn.onmouseover = () => btn.style.transform = 'scale(1.1)';
            btn.onmouseout = () => btn.style.transform = 'scale(1)';
            btn.onclick = () => {
                characterCustomization.selectedColor = { type: anim.type, animated: true };
                showCustomizeGUI();
            };
            animatedGrid.appendChild(btn);
        });
        
        const hatGrid = document.getElementById('hat-grid');
        characterCustomization.hats.forEach(hat => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                background: ${characterCustomization.selectedHat === hat.name ? '#4CAF50' : '#fff'};
                border: 2px solid #333; padding: 10px; border-radius: 8px;
                cursor: pointer; transition: transform 0.2s;
                color: ${characterCustomization.selectedHat === hat.name ? '#fff' : '#000'};
            `;
            btn.textContent = hat.display;
            btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
            btn.onmouseout = () => btn.style.transform = 'scale(1)';
            btn.onclick = () => {
                characterCustomization.selectedHat = hat.name;
                showCustomizeGUI();
            };
            hatGrid.appendChild(btn);
        });
        
        const companionGrid = document.getElementById('companion-grid');
        characterCustomization.companions.forEach(comp => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                background: ${characterCustomization.selectedCompanion === comp.name ? '#4CAF50' : '#fff'};
                border: 2px solid #333; padding: 10px; border-radius: 8px;
                cursor: pointer; transition: transform 0.2s;
                color: ${characterCustomization.selectedCompanion === comp.name ? '#fff' : '#000'};
            `;
            btn.textContent = comp.display;
            btn.onmouseover = () => btn.style.transform = 'scale(1.05)';
            btn.onmouseout = () => btn.style.transform = 'scale(1)';
            btn.onclick = () => {
                characterCustomization.selectedCompanion = comp.name;
                showCustomizeGUI();
            };
            companionGrid.appendChild(btn);
        });
        
        document.getElementById('apply-customize-btn').onclick = () => {
            characterCustomization.equip();
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            console.log('✨ Character customization equipped!', {
                color: characterCustomization.selectedColor,
                hat: characterCustomization.selectedHat,
                companion: characterCustomization.selectedCompanion
            });
        };
        
        document.getElementById('close-customize-btn').onclick = () => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        };
    }
    
    window.showCustomizeGUI = showCustomizeGUI;
    
    characterCustomization.loadFromStorage();
    
    if (typeof document !== 'undefined') {
        const customizeBtn = document.createElement('button');
        customizeBtn.textContent = 'Customize Character';
        customizeBtn.className = 'SVG-button';
        customizeBtn.style.cssText = `
            position: absolute; bottom: 160px; right: 4px; z-index: 12;
            padding: 10px 15px; font-size: 14px; font-weight: bold;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white; border: 2px solid #fff; border-radius: 8px;
            cursor: pointer; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.5);
        `;
        customizeBtn.onclick = showCustomizeGUI;
        
        if (document.body) {
            document.body.appendChild(customizeBtn);
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                document.body.appendChild(customizeBtn);
            });
        }
    }
    
    // Hook into game loop instead of setInterval for better performance
    if (typeof simulation !== 'undefined') {
        const originalNormalLoop = simulation.normalLoop;
        simulation.normalLoop = function() {
            originalNormalLoop.call(this);
            
            // Apply customization each frame
            characterCustomization.applyCustomization();
            
            // Draw hat and companion after player is drawn
            if (typeof m !== 'undefined' && typeof ctx !== 'undefined' && m.alive) {
                characterCustomization.drawHat(ctx, m.pos.x, m.pos.y, m.angle);
                characterCustomization.drawCompanion(ctx, m.pos.x, m.pos.y, m.cycle);
            }
        };
        
        const originalTestingLoop = simulation.testingLoop;
        simulation.testingLoop = function() {
            originalTestingLoop.call(this);
            
            characterCustomization.applyCustomization();
            
            if (typeof m !== 'undefined' && typeof ctx !== 'undefined' && m.alive) {
                characterCustomization.drawHat(ctx, m.pos.x, m.pos.y, m.angle);
                characterCustomization.drawCompanion(ctx, m.pos.x, m.pos.y, m.cycle);
            }
        };
    }
    
    console.log('%cCharacter Customization mod loaded! Click "Customize Character" button to personalize your character!', 'color: #667eea; font-weight: bold;');
}
