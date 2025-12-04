
// 60 Custom Weapons Mod - Complete Edition with Diverse Charge Systems
javascript:(function() {
    const customWeapons = [];
    
    // ========== CATEGORY 1: ELEMENTAL WEAPONS (10) ==========
    
    // 1. BLAZING DRAGON FANG - Dragon Emblem + Fire Bar
    customWeapons.push({
        name: "blazing_dragon_fang",
        descriptionFunction() {
            return `<b style="color: rgb(255, 69, 0);">🔥 Blazing Dragon Fang</b><br>Ancient katana forged in dragon fire<br>Heat meter builds with each slash<br>Ignition mode: <strong>40x damage</strong>, leaves fire trails`
        },
        ammo: Infinity,
        ammoPack: Infinity,
        defaultAmmoPack: Infinity,
        have: false,
        heatMeter: 0,
        maxHeat: 120,
        ignitionMode: false,
        ignitionDuration: 0,
        maxIgnitionDuration: 250,
        slashCount: 0,
        haveEphemera: false,
        fire() {},
        do() {
            if(!this.haveEphemera) {
                this.haveEphemera = true;
                simulation.ephemera.push({
                    name: "blazing_dragon_fang_display",
                    do() {
                        if(b.guns[b.activeGun] && b.guns[b.activeGun].name === 'blazing_dragon_fang') {
                            const gun = b.guns[b.activeGun];
                            
                            // Draw weapon model - katana with flame aura
                            ctx.save();
                            ctx.translate(m.pos.x, m.pos.y);
                            ctx.rotate(m.angle);
                            
                            // Blade with gradient
                            const gradient = ctx.createLinearGradient(20, 0, 80, 0);
                            gradient.addColorStop(0, gun.ignitionMode ? "rgb(255, 69, 0)" : "rgb(192, 192, 192)");
                            gradient.addColorStop(1, gun.ignitionMode ? "rgb(255, 215, 0)" : "rgb(128, 128, 128)");
                            ctx.fillStyle = gradient;
                            ctx.fillRect(20, -3, 60, 6);
                            
                            // Handle
                            ctx.fillStyle = "rgb(139, 69, 19)";
                            ctx.fillRect(10, -5, 15, 10);
                            
                            // Guard
                            ctx.fillStyle = "rgb(255, 215, 0)";
                            ctx.fillRect(23, -6, 3, 12);
                            
                            // Flame particles
                            if(gun.ignitionMode) {
                                for(let i = 0; i < 5; i++) {
                                    ctx.beginPath();
                                    ctx.arc(30 + i * 10, -5 + Math.random() * 10, 3, 0, Math.PI * 2);
                                    ctx.fillStyle = `rgba(255, ${Math.floor(100 + Math.random() * 100)}, 0, 0.7)`;
                                    ctx.fill();
                                }
                            }
                            ctx.restore();
                            
                            // Dragon Emblem with Heat Bar
                            const emblemX = m.pos.x - 90;
                            const emblemY = m.pos.y - 80;
                            const chargeRatio = gun.ignitionMode ? gun.ignitionDuration / gun.maxIgnitionDuration : gun.heatMeter / gun.maxHeat;
                            
                            // Dragon emblem circle
                            ctx.beginPath();
                            ctx.arc(emblemX, emblemY, 20, 0, Math.PI * 2);
                            const emblemGradient = ctx.createRadialGradient(emblemX, emblemY, 5, emblemX, emblemY, 20);
                            emblemGradient.addColorStop(0, `rgba(255, 69, 0, ${0.3 + chargeRatio * 0.7})`);
                            emblemGradient.addColorStop(1, `rgba(139, 0, 0, ${0.5 + chargeRatio * 0.5})`);
                            ctx.fillStyle = emblemGradient;
                            ctx.fill();
                            
                            // Dragon symbol
                            ctx.save();
                            ctx.translate(emblemX, emblemY);
                            ctx.rotate(simulation.cycle * 0.02 * chargeRatio);
                            ctx.strokeStyle = `rgba(255, 215, 0, ${0.6 + chargeRatio * 0.4})`;
                            ctx.lineWidth = 3;
                            // Dragon wings
                            ctx.beginPath();
                            ctx.moveTo(-12, -5);
                            ctx.lineTo(-6, 0);
                            ctx.lineTo(-12, 5);
                            ctx.moveTo(12, -5);
                            ctx.lineTo(6, 0);
                            ctx.lineTo(12, 5);
                            ctx.stroke();
                            // Dragon head
                            ctx.beginPath();
                            ctx.arc(0, -3, 4, 0, Math.PI * 2);
                            ctx.fillStyle = `rgba(255, 100, 0, ${0.8 + chargeRatio * 0.2})`;
                            ctx.fill();
                            ctx.restore();
                            
                            // Flame particles around emblem
                            if(chargeRatio > 0.3) {
                                for(let i = 0; i < 6; i++) {
                                    const angle = (i / 6) * Math.PI * 2 + simulation.cycle * 0.1;
                                    const radius = 25 + Math.sin(simulation.cycle * 0.15 + i) * 5;
                                    ctx.beginPath();
                                    ctx.arc(emblemX + Math.cos(angle) * radius, emblemY + Math.sin(angle) * radius, 2, 0, Math.PI * 2);
                                    ctx.fillStyle = `rgba(255, ${Math.floor(150 + Math.random() * 100)}, 0, ${chargeRatio})`;
                                    ctx.fill();
                                }
                            }
                            
                            // Heat bar
                            const barWidth = 150;
                            const barHeight = 12;
                            const barX = m.pos.x - 60;
                            const barY = m.pos.y - 80;
                            
                            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                            ctx.fillRect(barX, barY, barWidth, barHeight);
                            
                            const barGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
                            barGradient.addColorStop(0, "rgb(255, 69, 0)");
                            barGradient.addColorStop(0.5, "rgb(255, 140, 0)");
                            barGradient.addColorStop(1, "rgb(255, 215, 0)");
                            ctx.fillStyle = barGradient;
                            ctx.fillRect(barX, barY, barWidth * chargeRatio, barHeight);
                            
                            // Glowing border
                            ctx.strokeStyle = `rgba(255, 100, 0, ${0.5 + chargeRatio * 0.5})`;
                            ctx.lineWidth = 2;
                            ctx.strokeRect(barX, barY, barWidth, barHeight);
                        }
                    }
                });
            }
            
            if(this.ignitionMode) {
                this.ignitionDuration--;
                if(this.ignitionDuration <= 0) {
                    this.ignitionMode = false;
                    this.heatMeter = 0;
                }
                
                for(let i = 0; i < 10; i++) {
                    const angle = (i / 10) * Math.PI * 2 + simulation.cycle * 0.15;
                    const radius = 50 + Math.sin(simulation.cycle * 0.2 + i) * 10;
                    const x = m.pos.x + Math.cos(angle) * radius;
                    const y = m.pos.y + Math.sin(angle) * radius;
                    
                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, ${Math.floor(69 + Math.random() * 50)}, 0, 0.7)`;
                    ctx.fill();
                }
            }
            
            if(this.heatMeter >= this.maxHeat && !this.ignitionMode) {
                this.ignitionMode = true;
                this.ignitionDuration = this.maxIgnitionDuration;
                simulation.inGameConsole("<span style='color: rgb(255, 69, 0);'>🔥 DRAGON IGNITION!</span>");
            }
            
            if (input.fire && m.fireCDcycle < m.cycle && b.guns[b.activeGun].name === 'blazing_dragon_fang') {
                this.slash();
                m.fireCDcycle = m.cycle + (this.ignitionMode ? 6 : 12);
                if(!this.ignitionMode) this.heatMeter += 3;
            }
        },
        slash() {
            this.slashCount++;
            const angle = m.angle + Math.sin(this.slashCount) * 0.4;
            const range = 140;
            const damage = (m.damageDone || 1) * 0.3 * (this.ignitionMode ? 40 : 1);
            
            ctx.beginPath();
            ctx.arc(m.pos.x, m.pos.y, range, angle - 0.6, angle + 0.6);
            ctx.strokeStyle = this.ignitionMode ? "rgba(255, 69, 0, 0.7)" : "rgba(255, 140, 0, 0.5)";
            ctx.lineWidth = 25;
            ctx.stroke();
            
            for(let i = 0; i < mob.length; i++) {
                if(mob[i].alive) {
                    const dx = mob[i].position.x - m.pos.x;
                    const dy = mob[i].position.y - m.pos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if(dist < range + mob[i].radius) {
                        const mobAngle = Math.atan2(dy, dx);
                        if(Math.abs(mobAngle - angle) < 0.7) {
                            mob[i].damage(damage);
                            if(this.ignitionMode && typeof mobs.statusDoT === 'function') {
                                mobs.statusDoT(mob[i], 60, 0.01);
                            }
                        }
                    }
                }
            }
        }
    });
    
    // 2. ETERNAL WINTER'S EDGE - Snowflake Emblem + Crystal Bar
    customWeapons.push({
        name: "eternal_winters_edge",
        descriptionFunction() {
            return `<b style="color: rgb(135, 206, 250);">❄️ Eternal Winter's Edge</b><br>Hammer that channels absolute zero<br>Chill stacks slow and freeze enemies<br>Blizzard mode: area freeze + <strong>35x damage</strong>`
        },
        ammo: Infinity,
        ammoPack: Infinity,
        defaultAmmoPack: Infinity,
        have: false,
        chillStacks: 0,
        maxChillStacks: 100,
        blizzardMode: false,
        blizzardDuration: 0,
        maxBlizzardDuration: 280,
        haveEphemera: false,
        fire() {},
        do() {
            if(!this.haveEphemera) {
                this.haveEphemera = true;
                simulation.ephemera.push({
                    name: "eternal_winters_edge_display",
                    do() {
                        if(b.guns[b.activeGun] && b.guns[b.activeGun].name === 'eternal_winters_edge') {
                            const gun = b.guns[b.activeGun];
                            
                            // Draw weapon model
                            ctx.save();
                            ctx.translate(m.pos.x, m.pos.y);
                            ctx.rotate(m.angle);
                            
                            ctx.fillStyle = "rgb(70, 130, 180)";
                            ctx.fillRect(10, -2, 40, 4);
                            
                            const iceGradient = ctx.createRadialGradient(50, 0, 5, 50, 0, 20);
                            iceGradient.addColorStop(0, gun.blizzardMode ? "rgb(200, 230, 255)" : "rgb(135, 206, 250)");
                            iceGradient.addColorStop(1, gun.blizzardMode ? "rgb(0, 191, 255)" : "rgb(100, 149, 237)");
                            ctx.fillStyle = iceGradient;
                            ctx.fillRect(45, -12, 25, 24);
                            
                            if(gun.blizzardMode) {
                                for(let i = 0; i < 3; i++) {
                                    ctx.beginPath();
                                    ctx.arc(50 + i * 8, -8 + Math.random() * 16, 2, 0, Math.PI * 2);
                                    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                                    ctx.fill();
                                }
                            }
                            ctx.restore();
                            
                            // Snowflake Emblem
                            const emblemX = m.pos.x;
                            const emblemY = m.pos.y - 85;
                            const chargeRatio = gun.blizzardMode ? gun.blizzardDuration / gun.maxBlizzardDuration : gun.chillStacks / gun.maxChillStacks;
                            
                            // Hexagonal crystal
                            ctx.save();
                            ctx.translate(emblemX, emblemY);
                            ctx.rotate(simulation.cycle * 0.015);
                            
                            // Outer glow
                            ctx.beginPath();
                            for(let i = 0; i < 6; i++) {
                                const angle = (i / 6) * Math.PI * 2;
                                const radius = 22 + Math.sin(simulation.cycle * 0.1 + i) * 3 * chargeRatio;
                                ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                            }
                            ctx.closePath();
                            const glowGradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 25);
                            glowGradient.addColorStop(0, `rgba(200, 230, 255, ${0.4 + chargeRatio * 0.6})`);
                            glowGradient.addColorStop(1, `rgba(135, 206, 250, 0)`);
                            ctx.fillStyle = glowGradient;
                            ctx.fill();
                            
                            // Snowflake pattern
                            ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + chargeRatio * 0.4})`;
                            ctx.lineWidth = 2;
                            for(let i = 0; i < 6; i++) {
                                const angle = (i / 6) * Math.PI * 2;
                                ctx.beginPath();
                                ctx.moveTo(0, 0);
                                ctx.lineTo(Math.cos(angle) * 18, Math.sin(angle) * 18);
                                ctx.stroke();
                                
                                // Branch details
                                ctx.beginPath();
                                ctx.moveTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
                                ctx.lineTo(Math.cos(angle + 0.5) * 13, Math.sin(angle + 0.5) * 13);
                                ctx.moveTo(Math.cos(angle) * 10, Math.sin(angle) * 10);
                                ctx.lineTo(Math.cos(angle - 0.5) * 13, Math.sin(angle - 0.5) * 13);
                                ctx.stroke();
                            }
                            ctx.restore();
                            
                            // Ice crystals floating around
                            if(chargeRatio > 0.4) {
                                for(let i = 0; i < 8; i++) {
                                    const angle = (i / 8) * Math.PI * 2 + simulation.cycle * 0.08;
                                    const radius = 35 + Math.cos(simulation.cycle * 0.12 + i) * 8;
                                    ctx.save();
                                    ctx.translate(emblemX + Math.cos(angle) * radius, emblemY + Math.sin(angle) * radius);
                                    ctx.rotate(simulation.cycle * 0.1 + i);
                                    ctx.fillStyle = `rgba(200, 230, 255, ${chargeRatio * 0.8})`;
                                    ctx.fillRect(-2, -2, 4, 4);
                                    ctx.restore();
                                }
                            }
                        }
                    }
                });
            }
            
            if(this.blizzardMode) {
                this.blizzardDuration--;
                if(this.blizzardDuration <= 0) {
                    this.blizzardMode = false;
                    this.chillStacks = 0;
                }
                
                for(let i = 0; i < mob.length; i++) {
                    if(mob[i].alive) {
                        const dx = mob[i].position.x - m.pos.x;
                        const dy = mob[i].position.y - m.pos.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if(dist < 200 && typeof mobs.statusSlow === 'function') {
                            mobs.statusSlow(mob[i], 120);
                        }
                    }
                }
                
                for(let i = 0; i < 15; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const radius = Math.random() * 150;
                    const x = m.pos.x + Math.cos(angle) * radius;
                    const y = m.pos.y + Math.sin(angle) * radius;
                    
                    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
                    ctx.fillRect(x, y, 3, 3);
                }
            }
            
            if(this.chillStacks >= this.maxChillStacks && !this.blizzardMode) {
                this.blizzardMode = true;
                this.blizzardDuration = this.maxBlizzardDuration;
                simulation.inGameConsole("<span style='color: rgb(0, 191, 255);'>❄️ ETERNAL BLIZZARD!</span>");
            }
            
            if (input.fire && m.fireCDcycle < m.cycle && b.guns[b.activeGun].name === 'eternal_winters_edge') {
                this.smash();
                m.fireCDcycle = m.cycle + (this.blizzardMode ? 8 : 18);
                if(!this.blizzardMode) this.chillStacks += 2;
            }
        },
        smash() {
            const range = 180;
            const damage = (m.damageDone || 1) * 0.4 * (this.blizzardMode ? 35 : 1);
            
            simulation.drawList.push({
                x: m.pos.x + Math.cos(m.angle) * 80,
                y: m.pos.y + Math.sin(m.angle) * 80,
                radius: range,
                color: this.blizzardMode ? "rgba(0, 191, 255, 0.6)" : "rgba(135, 206, 250, 0.5)",
                time: 20
            });
            
            for(let i = 0; i < mob.length; i++) {
                if(mob[i].alive) {
                    const dx = mob[i].position.x - m.pos.x;
                    const dy = mob[i].position.y - m.pos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if(dist < range + mob[i].radius) {
                        mob[i].damage(damage);
                        if(typeof mobs.statusSlow === 'function') {
                            mobs.statusSlow(mob[i], this.blizzardMode ? 200 : 100);
                        }
                    }
                }
            }
        }
    });
    
    // Helper function to create varied charge displays
    function createWeaponWithChargeSystem(config) {
        return {
            name: config.name,
            descriptionFunction() {
                return `<b style="color: ${config.color};">${config.display}</b><br>${config.desc}`
            },
            ammo: Infinity,
            ammoPack: Infinity,
            defaultAmmoPack: Infinity,
            have: false,
            charge: 0,
            maxCharge: 110,
            specialMode: false,
            duration: 0,
            maxDuration: 280,
            category: config.category,
            chargeType: config.chargeType || 'bar', // 'bar', 'emblem', 'both', 'circular', 'spiral'
            haveEphemera: false,
            fire() {},
            do() {
                if(!this.haveEphemera) {
                    this.haveEphemera = true;
                    const self = this;
                    simulation.ephemera.push({
                        name: config.name + "_display",
                        do() {
                            if(b.guns[b.activeGun] && b.guns[b.activeGun].name === config.name) {
                                const gun = b.guns[b.activeGun];
                                const chargeRatio = gun.specialMode ? gun.duration / gun.maxDuration : gun.charge / gun.maxCharge;
                                
                                // Draw weapon model
                                ctx.save();
                                ctx.translate(m.pos.x, m.pos.y);
                                ctx.rotate(m.angle);
                                
                                const weaponGradient = ctx.createLinearGradient(20, -5, 70, 5);
                                weaponGradient.addColorStop(0, config.color);
                                weaponGradient.addColorStop(1, gun.specialMode ? "rgb(255, 215, 0)" : config.color.replace('rgb', 'rgba').replace(')', ', 0.6)'));
                                ctx.fillStyle = weaponGradient;
                                
                                if(config.category === 'musical') {
                                    ctx.fillRect(15, -8, 50, 16);
                                    ctx.fillStyle = "rgb(139, 69, 19)";
                                    ctx.fillRect(12, -6, 8, 12);
                                } else if(config.category === 'magic') {
                                    ctx.fillRect(15, -2, 60, 4);
                                    ctx.beginPath();
                                    ctx.arc(75, 0, 8, 0, Math.PI * 2);
                                    ctx.fill();
                                } else if(config.category === 'tech') {
                                    ctx.fillRect(15, -6, 45, 12);
                                    ctx.fillRect(55, -3, 15, 6);
                                } else {
                                    ctx.fillRect(20, -4, 55, 8);
                                    ctx.beginPath();
                                    ctx.moveTo(75, 0);
                                    ctx.lineTo(85, -3);
                                    ctx.lineTo(85, 3);
                                    ctx.fill();
                                }
                                ctx.restore();
                                
                                // Charge visualization based on type
                                if(gun.chargeType === 'emblem' || gun.chargeType === 'both') {
                                    const emblemX = m.pos.x - 70;
                                    const emblemY = m.pos.y - 75;
                                    
                                    // Draw emblem based on category
                                    ctx.save();
                                    ctx.translate(emblemX, emblemY);
                                    
                                    if(config.category === 'elemental') {
                                        // Elemental rune circle
                                        ctx.beginPath();
                                        ctx.arc(0, 0, 18, 0, Math.PI * 2);
                                        const emblemGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 18);
                                        emblemGrad.addColorStop(0, config.color.replace('rgb', 'rgba').replace(')', `, ${0.3 + chargeRatio * 0.7})`));
                                        emblemGrad.addColorStop(1, config.color.replace('rgb', 'rgba').replace(')', `, ${0.1 + chargeRatio * 0.4})`));
                                        ctx.fillStyle = emblemGrad;
                                        ctx.fill();
                                        
                                        // Rotating runes
                                        ctx.rotate(simulation.cycle * 0.02 * (0.5 + chargeRatio));
                                        for(let i = 0; i < 4; i++) {
                                            const angle = (i / 4) * Math.PI * 2;
                                            ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.6 + chargeRatio * 0.4})`);
                                            ctx.fillRect(Math.cos(angle) * 12 - 2, Math.sin(angle) * 12 - 2, 4, 4);
                                        }
                                    } else if(config.category === 'musical') {
                                        // Musical note emblem
                                        ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.7 + chargeRatio * 0.3})`);
                                        ctx.lineWidth = 3;
                                        ctx.beginPath();
                                        ctx.arc(0, 0, 15, 0, Math.PI * 2);
                                        ctx.stroke();
                                        
                                        // Pulsing notes
                                        const noteScale = 0.8 + chargeRatio * 0.4;
                                        ctx.save();
                                        ctx.scale(noteScale, noteScale);
                                        ctx.fillStyle = config.color;
                                        ctx.beginPath();
                                        ctx.arc(-5, 3, 4, 0, Math.PI * 2);
                                        ctx.arc(5, 3, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                        ctx.fillRect(-6, -8, 2, 11);
                                        ctx.fillRect(4, -8, 2, 11);
                                        ctx.restore();
                                    } else if(config.category === 'magic') {
                                        // Pentagram
                                        ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.8 + chargeRatio * 0.2})`);
                                        ctx.lineWidth = 2;
                                        ctx.rotate(simulation.cycle * 0.03);
                                        ctx.beginPath();
                                        for(let i = 0; i <= 5; i++) {
                                            const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
                                            const x = Math.cos(angle) * 14;
                                            const y = Math.sin(angle) * 14;
                                            if(i === 0) ctx.moveTo(x, y);
                                            else ctx.lineTo(x, y);
                                            if(i === 5) ctx.lineTo(Math.cos(-Math.PI/2) * 14, Math.sin(-Math.PI/2) * 14);
                                        }
                                        ctx.stroke();
                                        
                                        // Center glow
                                        if(chargeRatio > 0.5) {
                                            ctx.beginPath();
                                            ctx.arc(0, 0, 4 * chargeRatio, 0, Math.PI * 2);
                                            ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${chargeRatio})`);
                                            ctx.fill();
                                        }
                                    } else if(config.category === 'tech') {
                                        // Circuit pattern
                                        ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.7 + chargeRatio * 0.3})`);
                                        ctx.lineWidth = 2;
                                        const gridSize = 6;
                                        for(let i = -1; i <= 1; i++) {
                                            ctx.beginPath();
                                            ctx.moveTo(i * gridSize, -15);
                                            ctx.lineTo(i * gridSize, 15);
                                            ctx.moveTo(-15, i * gridSize);
                                            ctx.lineTo(15, i * gridSize);
                                            ctx.stroke();
                                        }
                                        
                                        // Power nodes
                                        for(let i = 0; i < 4; i++) {
                                            const angle = (i / 4) * Math.PI * 2 + simulation.cycle * 0.05;
                                            ctx.beginPath();
                                            ctx.arc(Math.cos(angle) * 10, Math.sin(angle) * 10, 2 + chargeRatio * 2, 0, Math.PI * 2);
                                            ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${chargeRatio})`);
                                            ctx.fill();
                                        }
                                    } else if(config.category === 'cosmic') {
                                        // Orbital rings
                                        for(let ring = 1; ring <= 3; ring++) {
                                            ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.3 + chargeRatio * 0.4 / ring})`);
                                            ctx.lineWidth = 1.5;
                                            ctx.beginPath();
                                            const radius = ring * 5;
                                            ctx.arc(0, 0, radius, 0, Math.PI * 2);
                                            ctx.stroke();
                                        }
                                        
                                        // Orbiting particles
                                        for(let i = 0; i < 3; i++) {
                                            const angle = (i / 3) * Math.PI * 2 + simulation.cycle * 0.04 * (i + 1);
                                            const radius = 8 + i * 4;
                                            ctx.beginPath();
                                            ctx.arc(Math.cos(angle) * radius, Math.sin(angle) * radius, 1.5, 0, Math.PI * 2);
                                            ctx.fillStyle = config.color;
                                            ctx.fill();
                                        }
                                        
                                        // Center star
                                        ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.5 + chargeRatio * 0.5})`);
                                        for(let i = 0; i < 5; i++) {
                                            ctx.save();
                                            ctx.rotate((i / 5) * Math.PI * 2);
                                            ctx.beginPath();
                                            ctx.moveTo(0, -3);
                                            ctx.lineTo(2, 1);
                                            ctx.lineTo(-2, 1);
                                            ctx.fill();
                                            ctx.restore();
                                        }
                                    } else {
                                        // Default ancient/mythical emblem
                                        ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.8 + chargeRatio * 0.2})`);
                                        ctx.lineWidth = 2.5;
                                        ctx.beginPath();
                                        ctx.arc(0, 0, 12, 0, Math.PI * 2);
                                        ctx.stroke();
                                        
                                        ctx.rotate(simulation.cycle * 0.02);
                                        for(let i = 0; i < 8; i++) {
                                            const angle = (i / 8) * Math.PI * 2;
                                            ctx.beginPath();
                                            ctx.moveTo(Math.cos(angle) * 8, Math.sin(angle) * 8);
                                            ctx.lineTo(Math.cos(angle) * 14, Math.sin(angle) * 14);
                                            ctx.stroke();
                                        }
                                    }
                                    
                                    ctx.restore();
                                    
                                    // Particle effects around emblem
                                    if(chargeRatio > 0.5) {
                                        for(let i = 0; i < 6; i++) {
                                            const angle = (i / 6) * Math.PI * 2 + simulation.cycle * 0.08;
                                            const radius = 25 + Math.sin(simulation.cycle * 0.1 + i) * 5;
                                            ctx.beginPath();
                                            ctx.arc(emblemX + Math.cos(angle) * radius, emblemY + Math.sin(angle) * radius, 1.5, 0, Math.PI * 2);
                                            ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${chargeRatio * 0.8})`);
                                            ctx.fill();
                                        }
                                    }
                                }
                                
                                if(gun.chargeType === 'bar' || gun.chargeType === 'both') {
                                    const barWidth = gun.chargeType === 'both' ? 120 : 160;
                                    const barHeight = 14;
                                    const barX = gun.chargeType === 'both' ? m.pos.x - 30 : m.pos.x - barWidth / 2;
                                    const barY = m.pos.y - 75;
                                    
                                    // Bar background
                                    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                                    ctx.fillRect(barX, barY, barWidth, barHeight);
                                    
                                    // Gradient fill
                                    const barGradient = ctx.createLinearGradient(barX, barY, barX + barWidth, barY);
                                    barGradient.addColorStop(0, config.color);
                                    barGradient.addColorStop(0.5, config.color.replace('rgb', 'rgba').replace(')', ', 0.8)'));
                                    barGradient.addColorStop(1, gun.specialMode ? "rgb(255, 215, 0)" : config.color.replace('rgb', 'rgba').replace(')', ', 0.6)'));
                                    ctx.fillStyle = barGradient;
                                    ctx.fillRect(barX, barY, barWidth * chargeRatio, barHeight);
                                    
                                    // Segmented bar effect
                                    if(chargeRatio > 0) {
                                        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                                        for(let i = 1; i < 10; i++) {
                                            const segX = barX + (barWidth / 10) * i;
                                            ctx.fillRect(segX - 1, barY, 2, barHeight);
                                        }
                                    }
                                    
                                    // Glowing border
                                    ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.4 + chargeRatio * 0.6})`);
                                    ctx.lineWidth = 2;
                                    ctx.strokeRect(barX, barY, barWidth, barHeight);
                                    
                                    // Progress indicator
                                    if(chargeRatio > 0 && chargeRatio < 1) {
                                        const indicatorX = barX + barWidth * chargeRatio;
                                        ctx.fillStyle = config.color;
                                        ctx.beginPath();
                                        ctx.arc(indicatorX, barY + barHeight / 2, 4, 0, Math.PI * 2);
                                        ctx.fill();
                                    }
                                }
                                
                                if(gun.chargeType === 'circular') {
                                    // Circular charge meter
                                    const centerX = m.pos.x;
                                    const centerY = m.pos.y - 75;
                                    const radius = 20;
                                    
                                    // Background circle
                                    ctx.beginPath();
                                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                                    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
                                    ctx.fill();
                                    
                                    // Charge arc
                                    ctx.beginPath();
                                    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * chargeRatio));
                                    ctx.strokeStyle = config.color;
                                    ctx.lineWidth = 6;
                                    ctx.stroke();
                                    
                                    // Inner glow
                                    const glowGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius - 3);
                                    glowGrad.addColorStop(0, config.color.replace('rgb', 'rgba').replace(')', `, ${chargeRatio * 0.6})`));
                                    glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                                    ctx.fillStyle = glowGrad;
                                    ctx.beginPath();
                                    ctx.arc(centerX, centerY, radius - 3, 0, Math.PI * 2);
                                    ctx.fill();
                                    
                                    // Rotating indicator
                                    ctx.save();
                                    ctx.translate(centerX, centerY);
                                    ctx.rotate(-Math.PI / 2 + (Math.PI * 2 * chargeRatio));
                                    ctx.fillStyle = "rgb(255, 255, 255)";
                                    ctx.fillRect(radius - 4, -2, 6, 4);
                                    ctx.restore();
                                }
                                
                                if(gun.chargeType === 'spiral') {
                                    // Spiral charge meter
                                    const centerX = m.pos.x;
                                    const centerY = m.pos.y - 75;
                                    
                                    ctx.strokeStyle = config.color.replace('rgb', 'rgba').replace(')', `, ${0.6 + chargeRatio * 0.4})`);
                                    ctx.lineWidth = 3;
                                    ctx.beginPath();
                                    
                                    const maxSpirals = 3;
                                    const points = 100;
                                    for(let i = 0; i <= points * chargeRatio; i++) {
                                        const t = i / points;
                                        const angle = t * Math.PI * 2 * maxSpirals;
                                        const radius = t * 25;
                                        const x = centerX + Math.cos(angle) * radius;
                                        const y = centerY + Math.sin(angle) * radius;
                                        
                                        if(i === 0) ctx.moveTo(x, y);
                                        else ctx.lineTo(x, y);
                                    }
                                    ctx.stroke();
                                    
                                    // Endpoint marker
                                    if(chargeRatio > 0) {
                                        const t = chargeRatio;
                                        const angle = t * Math.PI * 2 * maxSpirals;
                                        const radius = t * 25;
                                        ctx.beginPath();
                                        ctx.arc(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius, 3, 0, Math.PI * 2);
                                        ctx.fillStyle = config.color;
                                        ctx.fill();
                                    }
                                }
                            }
                        }
                    });
                }
                
                if(this.specialMode) {
                    this.duration--;
                    if(this.duration <= 0) {
                        this.specialMode = false;
                        this.charge = 0;
                    }
                    
                    const auraRadius = 50 + Math.sin(simulation.cycle * 0.2) * 10;
                    for(let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2 + simulation.cycle * 0.1;
                        const x = m.pos.x + Math.cos(angle) * auraRadius;
                        const y = m.pos.y + Math.sin(angle) * auraRadius;
                        
                        ctx.beginPath();
                        ctx.arc(x, y, 4, 0, Math.PI * 2);
                        ctx.fillStyle = config.color.replace('rgb', 'rgba').replace(')', ', 0.8)');
                        ctx.fill();
                    }
                }
                
                if(this.charge >= this.maxCharge && !this.specialMode) {
                    this.specialMode = true;
                    this.duration = this.maxDuration;
                    simulation.inGameConsole(`<span style='color: ${config.color};'>${config.display.split(' ').slice(1).join(' ').toUpperCase()} MODE!</span>`);
                }
                
                if (input.fire && m.fireCDcycle < m.cycle && b.guns[b.activeGun].name === config.name) {
                    this.attack();
                    m.fireCDcycle = m.cycle + (this.specialMode ? 6 : 14);
                    if(!this.specialMode) this.charge += 2.2;
                }
            },
            attack() {
                const multiplier = parseInt(config.desc.match(/\d+/)[0]);
                const damage = (m.damageDone || 1) * 0.32 * (this.specialMode ? multiplier : 1);
                const range = 170;
                const angle = m.angle;
                
                simulation.drawList.push({
                    x: m.pos.x + Math.cos(angle) * 80,
                    y: m.pos.y + Math.sin(angle) * 80,
                    radius: range,
                    color: config.color.replace('rgb', 'rgba').replace(')', ', 0.5)'),
                    time: 18
                });
                
                for(let i = 0; i < mob.length; i++) {
                    if(mob[i].alive) {
                        const dx = mob[i].position.x - m.pos.x;
                        const dy = mob[i].position.y - m.pos.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        
                        if(dist < range + mob[i].radius) {
                            mob[i].damage(damage);
                            
                            if(this.specialMode && typeof mobs.statusSlow === 'function') {
                                mobs.statusSlow(mob[i], 120);
                            }
                        }
                    }
                }
            }
        };
    }
    
    // Generate remaining 58 weapons with varied charge systems
    const weaponConfigs = [
        // Elemental 3-10
        { name: "heaven_piercing_lance", display: "⚡ Heaven-Piercing Lance", desc: "Spear blessed by storm gods<br>Tempest charge: <strong>45x damage</strong> + chain lightning", color: "rgb(255, 255, 0)", category: "elemental", chargeType: "both" },
        { name: "titans_earthshaker", display: "🪨 Titan's Earthshaker", desc: "Gauntlets of primordial earth<br>Earthquake mode: <strong>38x damage</strong> + ground rupture", color: "rgb(139, 69, 19)", category: "elemental", chargeType: "emblem" },
        { name: "zephyr_spiral_blade", display: "🌪️ Zephyr Spiral Blade", desc: "Chakrams riding eternal winds<br>Cyclone surge: <strong>33x damage</strong> + tornado", color: "rgb(173, 216, 230)", category: "elemental", chargeType: "spiral" },
        { name: "leviathans_trident", display: "🌊 Leviathan's Trident", desc: "Deep sea king's weapon<br>Tsunami wave: <strong>36x damage</strong> + pressure crush", color: "rgb(0, 105, 148)", category: "elemental", chargeType: "circular" },
        { name: "radiant_dawn_saber", display: "☀️ Radiant Dawn Saber", desc: "Blade of pure photons<br>Supernova burst: <strong>42x damage</strong> + blinds foes", color: "rgb(255, 255, 224)", category: "elemental", chargeType: "both" },
        { name: "void_reaper_scythe", display: "🌑 Void Reaper Scythe", desc: "Harvester of lost souls<br>Abyss void: <strong>44x damage</strong> + life drain", color: "rgb(75, 0, 130)", category: "elemental", chargeType: "emblem" },
        { name: "gaia_bloom_longbow", display: "🌿 Gaia's Bloom Longbow", desc: "Nature's vengeance incarnate<br>Overgrowth: <strong>34x damage</strong> + thorn prison", color: "rgb(34, 139, 34)", category: "elemental", chargeType: "bar" },
        { name: "entropy_collapse_orb", display: "⚫ Entropy Collapse Orb", desc: "Sphere of antimatter chaos<br>Singularity: <strong>48x damage</strong> + gravity well", color: "rgb(25, 25, 112)", category: "elemental", chargeType: "circular" },
        
        // Musical 1-10
        { name: "war_gods_drums", display: "🥁 War God's Drums", desc: "Thunderous beats of ancient battles<br>Crescendo: <strong>42x damage</strong> + mass stun", color: "rgb(139, 0, 0)", category: "musical", chargeType: "emblem" },
        { name: "phantom_violin", display: "🎻 Phantom Violin", desc: "Ghostly strings cut reality<br>Symphony of Death: <strong>38x damage</strong> + sonic slice", color: "rgb(218, 112, 214)", category: "musical", chargeType: "both" },
        { name: "enchanted_pan_flute", display: "🎶 Enchanted Pan Flute", desc: "Mystical melodies charm enemies<br>Serenade: <strong>35x damage</strong> + confusion", color: "rgb(64, 224, 208)", category: "musical", chargeType: "spiral" },
        { name: "champions_trumpet", display: "🎺 Champion's Trumpet", desc: "Rally call of heroes<br>Fanfare: <strong>40x damage</strong> + empowerment", color: "rgb(255, 215, 0)", category: "musical", chargeType: "bar" },
        { name: "requiem_grand_piano", display: "🎹 Requiem Grand Piano", desc: "Crushing keys of finality<br>Concerto: <strong>48x damage</strong> + shockwave", color: "rgb(0, 0, 0)", category: "musical", chargeType: "both" },
        { name: "celestial_harp", display: "🪕 Celestial Harp", desc: "Divine healing harmonics<br>Rhapsody: <strong>32x damage</strong> + regeneration", color: "rgb(255, 228, 196)", category: "musical", chargeType: "emblem" },
        { name: "midnight_saxophone", display: "🎷 Midnight Saxophone", desc: "Smooth jazz disrupts reality<br>Improvisation: <strong>36x damage</strong> + disorient", color: "rgb(184, 134, 11)", category: "musical", chargeType: "circular" },
        { name: "subwoofer_cannon", display: "🔊 Subwoofer Cannon", desc: "Bass frequencies shake the earth<br>Drop: <strong>45x damage</strong> + ground tremor", color: "rgb(70, 130, 180)", category: "musical", chargeType: "bar" },
        { name: "lightning_banjo", display: "🪕 Lightning Banjo", desc: "Rapid-fire electric twangs<br>Bluegrass Storm: <strong>39x damage</strong> + multi-hit", color: "rgb(210, 105, 30)", category: "musical", chargeType: "spiral" },
        { name: "crystal_resonator", display: "🔔 Crystal Resonator", desc: "Xylophone notes shatter enemies<br>Chimes: <strong>37x damage</strong> + crystal shards", color: "rgb(230, 230, 250)", category: "musical", chargeType: "both" },
        
        // Ancient/Mythical 1-10
        { name: "ancient_dragons_fury", display: "🐉 Ancient Dragon's Fury", desc: "Lance forged in dragon flames<br>Dragonrage: <strong>44x damage</strong> + fire breath", color: "rgb(220, 20, 60)", category: "ancient", chargeType: "emblem" },
        { name: "moonlight_soul_blade", display: "🌙 Moonlight Soul Blade", desc: "Blessed katana of moon priests<br>Full Moon: <strong>41x damage</strong> + spirit slash", color: "rgb(245, 245, 245)", category: "ancient", chargeType: "circular" },
        { name: "astral_twin_chakram", display: "✨ Astral Twin Chakram", desc: "Divine throwing discs<br>Astral Rain: <strong>37x damage</strong> + homing", color: "rgb(147, 112, 219)", category: "ancient", chargeType: "both" },
        { name: "deaths_harvest_scythe", display: "💀 Death's Harvest Scythe", desc: "The Reaper's own weapon<br>Soul Reap: <strong>50x damage</strong> + instant kill chance", color: "rgb(0, 0, 0)", category: "ancient", chargeType: "spiral" },
        { name: "ocean_kings_spear", display: "🔱 Ocean King's Spear", desc: "Poseidon's legendary trident<br>Tidal Surge: <strong>43x damage</strong> + whirlpool", color: "rgb(0, 119, 190)", category: "ancient", chargeType: "bar" },
        { name: "sun_gods_longbow", display: "🏹 Sun God's Longbow", desc: "Apollo's golden arrows<br>Solar Flare: <strong>39x damage</strong> + piercing", color: "rgb(255, 215, 0)", category: "ancient", chargeType: "emblem" },
        { name: "spectral_phantom_bow", display: "👻 Spectral Phantom Bow", desc: "Ghostly bolts phase through<br>Ethereal: <strong>36x damage</strong> + wall pierce", color: "rgb(138, 43, 226)", category: "ancient", chargeType: "circular" },
        { name: "shadow_assassin_kunai", display: "🗡️ Shadow Assassin Kunai", desc: "Ninja throwing blades<br>Silent Kill: <strong>38x damage</strong> + stealth", color: "rgb(47, 79, 79)", category: "ancient", chargeType: "both" },
        { name: "storm_blessed_shuriken", display: "⭐ Storm-Blessed Shuriken", desc: "Wind-enhanced throwing stars<br>Hurricane: <strong>35x damage</strong> + knockback", color: "rgb(176, 224, 230)", category: "ancient", chargeType: "bar" },
        { name: "thunder_fist_nunchaku", display: "⚡ Thunder Fist Nunchaku", desc: "Electric martial arts weapon<br>Storm Combo: <strong>42x damage</strong> + paralysis", color: "rgb(255, 255, 0)", category: "ancient", chargeType: "spiral" },
        
        // Tech/Futuristic 1-10
        { name: "mk7_plasma_destroyer", display: "🔥 MK-VII Plasma Destroyer", desc: "Military-grade plasma rifle<br>Overcharge: <strong>40x damage</strong> + burn", color: "rgb(0, 255, 255)", category: "tech", chargeType: "both" },
        { name: "hypervelocity_railgun", display: "⚡ Hypervelocity Railgun", desc: "Electromagnetic accelerator<br>Max Velocity: <strong>46x damage</strong> + penetration", color: "rgb(70, 130, 180)", category: "tech", chargeType: "bar" },
        { name: "nano_swarm_hive", display: "🤖 Nano-Swarm Hive", desc: "Self-replicating nanobots<br>Assimilation: <strong>38x damage</strong> + DoT", color: "rgb(192, 192, 192)", category: "tech", chargeType: "emblem" },
        { name: "photon_edge_saber", display: "💡 Photon Edge Saber", desc: "Hardlight cutting blade<br>Photon Burst: <strong>35x damage</strong> + light speed", color: "rgb(0, 191, 255)", category: "tech", chargeType: "circular" },
        { name: "ai_combat_swarm", display: "🛸 AI Combat Swarm", desc: "Autonomous attack drones<br>Swarm Protocol: <strong>42x damage</strong> + multi-target", color: "rgb(255, 69, 0)", category: "tech", chargeType: "both" },
        { name: "quantum_pulse_rifle", display: "⚛️ Quantum Pulse Rifle", desc: "Rapid energy discharge<br>Rapid Fire: <strong>37x damage</strong> + suppression", color: "rgb(124, 252, 0)", category: "tech", chargeType: "bar" },
        { name: "shield_breaker_ram", display: "🛡️ Shield Breaker Ram", desc: "Kinetic barrier weapon<br>Overload: <strong>44x damage</strong> + shield pierce", color: "rgb(30, 144, 255)", category: "tech", chargeType: "emblem" },
        { name: "ionized_plasma_whip", display: "⚡ Ionized Plasma Whip", desc: "Flexible energy lash<br>Ionization: <strong>36x damage</strong> + EMP", color: "rgb(255, 20, 147)", category: "tech", chargeType: "spiral" },
        { name: "tesla_arc_generator", display: "⚡ Tesla Arc Generator", desc: "Lightning chain weapon<br>Chain Reaction: <strong>43x damage</strong> + arc jump", color: "rgb(135, 206, 250)", category: "tech", chargeType: "circular" },
        { name: "singularity_projector", display: "⚫ Singularity Projector", desc: "Localized gravity control<br>Black Hole: <strong>48x damage</strong> + pull", color: "rgb(75, 0, 130)", category: "tech", chargeType: "both" },
        
        // Magic/Mystic 1-10
        { name: "archmage_crystal_wand", display: "✨ Archmage Crystal Wand", desc: "Channel pure arcane energy<br>Spellburst: <strong>36x damage</strong> + mana burst", color: "rgb(138, 43, 226)", category: "magic", chargeType: "emblem" },
        { name: "ancient_wisdom_staff", display: "🪄 Ancient Wisdom Staff", desc: "Elder wizard's focus<br>Metamagic: <strong>42x damage</strong> + spell amplify", color: "rgb(148, 0, 211)", category: "magic", chargeType: "both" },
        { name: "wild_chaos_sphere", display: "🌀 Wild Chaos Sphere", desc: "Unpredictable wild magic<br>Entropy: <strong>45x damage</strong> + random effects", color: "rgb(255, 0, 255)", category: "magic", chargeType: "spiral" },
        { name: "forbidden_dark_tome", display: "📖 Forbidden Dark Tome", desc: "Cursed spell grimoire<br>Dark Arts: <strong>47x damage</strong> + curse", color: "rgb(50, 0, 50)", category: "magic", chargeType: "circular" },
        { name: "pure_mana_prism", display: "💎 Pure Mana Prism", desc: "Crystallized magical essence<br>Resonance: <strong>38x damage</strong> + magic wave", color: "rgb(0, 255, 255)", category: "magic", chargeType: "bar" },
        { name: "elemental_fusion_rune", display: "🔮 Elemental Fusion Rune", desc: "Multi-element casting stone<br>Confluence: <strong>40x damage</strong> + all elements", color: "rgb(255, 165, 0)", category: "magic", chargeType: "both" },
        { name: "divine_holy_talisman", display: "⚜️ Divine Holy Talisman", desc: "Sacred protection charm<br>Divine Wrath: <strong>39x damage</strong> + smite", color: "rgb(255, 215, 0)", category: "magic", chargeType: "emblem" },
        { name: "vampiric_blood_chalice", display: "🩸 Vampiric Blood Chalice", desc: "Life drain and healing cup<br>Vampiric: <strong>37x damage</strong> + life steal", color: "rgb(220, 20, 60)", category: "magic", chargeType: "circular" },
        { name: "starborn_scepter", display: "⭐ Starborn Scepter", desc: "Star-forged royal staff<br>Cosmic Power: <strong>44x damage</strong> + meteor", color: "rgb(230, 230, 250)", category: "magic", chargeType: "spiral" },
        { name: "necromancer_amulet", display: "💀 Necromancer Amulet", desc: "Spirit manipulation pendant<br>Soul Drain: <strong>41x damage</strong> + summon", color: "rgb(75, 0, 130)", category: "magic", chargeType: "both" },
        
        // Cosmic/Space 1-10
        { name: "orbital_meteor_hammer", display: "☄️ Orbital Meteor Hammer", desc: "Asteroid bombardment weapon<br>Impact: <strong>43x damage</strong> + crater", color: "rgb(255, 69, 0)", category: "cosmic", chargeType: "emblem" },
        { name: "frozen_comet_lance", display: "🧊 Frozen Comet Lance", desc: "Icy cosmic projectile<br>Perihelion: <strong>39x damage</strong> + freeze", color: "rgb(135, 206, 250)", category: "cosmic", chargeType: "circular" },
        { name: "stardust_nebula_gun", display: "🌌 Stardust Nebula Gun", desc: "Star dust explosions<br>Stellar Birth: <strong>41x damage</strong> + nova", color: "rgb(186, 85, 211)", category: "cosmic", chargeType: "both" },
        { name: "dying_star_core", display: "💥 Dying Star Core", desc: "Collapsing star energy<br>Detonation: <strong>50x damage</strong> + massive AOE", color: "rgb(255, 215, 0)", category: "cosmic", chargeType: "spiral" },
        { name: "event_horizon_gun", display: "⚫ Event Horizon Gun", desc: "Black hole projector<br>Singularity: <strong>52x damage</strong> + inescapable", color: "rgb(0, 0, 0)", category: "cosmic", chargeType: "bar" },
        { name: "asteroid_storm_belt", display: "🪨 Asteroid Storm Belt", desc: "Rock bombardment system<br>Meteor Shower: <strong>38x damage</strong> + barrage", color: "rgb(139, 69, 19)", category: "cosmic", chargeType: "emblem" },
        { name: "solar_corona_lance", display: "☀️ Solar Corona Lance", desc: "Sun's fury unleashed<br>Coronal Mass: <strong>44x damage</strong> + radiation", color: "rgb(255, 140, 0)", category: "cosmic", chargeType: "circular" },
        { name: "neutron_pulsar_rifle", display: "⭐ Neutron Pulsar Rifle", desc: "Neutron star radiation<br>Gamma Burst: <strong>46x damage</strong> + radiation", color: "rgb(0, 255, 255)", category: "cosmic", chargeType: "both" },
        { name: "galactic_quasar_beam", display: "🌟 Galactic Quasar Beam", desc: "Galactic core power<br>Accretion: <strong>48x damage</strong> + pierce all", color: "rgb(138, 43, 226)", category: "cosmic", chargeType: "spiral" },
        { name: "void_matter_blade", display: "🌑 Void Matter Blade", desc: "Invisible cosmic force<br>Void Rend: <strong>45x damage</strong> + erase", color: "rgb(25, 25, 112)", category: "cosmic", chargeType: "bar" }
    ];
    
    // Create all weapons from configs
    weaponConfigs.forEach(config => {
        customWeapons.push(createWeaponWithChargeSystem(config));
    });
    
    // Add all weapons to the game
    customWeapons.forEach(weapon => {
        b.guns.push(weapon);
    });
    
    // Remove duplicates
    const gunArray = b.guns.filter(
        (obj, index, self) => index === self.findIndex((item) => item.name === obj.name)
    );
    b.guns = gunArray;
    
    console.log("%c60 Custom Weapons Successfully Installed!", "color: #FFD700; font-size: 16px; font-weight: bold;");
    console.log("%cAll weapons feature unique charge systems: bars, emblems, circular, and spiral meters!", "color: #87CEEB;");
})();
