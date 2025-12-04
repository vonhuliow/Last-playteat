// Enhanced Mobs & Boss Companions - New tier of mobs with cool properties
if (typeof window.enhancedMobs === 'undefined') {
    window.enhancedMobs = {
        
        // Enhanced companion models that look like epic mob versions
        companionModels: {
            orbMiniBoss() {
                // Crystal orb with inner glow and spike aura
                const gradient = ctx.createRadialGradient(0, 0, 5, 0, 0, 18);
                gradient.addColorStop(0, 'rgba(200, 100, 255, 1)');
                gradient.addColorStop(0.5, 'rgba(138, 43, 226, 0.8)');
                gradient.addColorStop(1, 'rgba(75, 0, 130, 0.3)');
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, 18, 0, Math.PI * 2);
                ctx.fill();
                
                // Outer spike ring
                for(let i = 0; i < 8; i++) {
                    const ang = (i * Math.PI * 2 / 8);
                    ctx.strokeStyle = '#FF00FF';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(Math.cos(ang) * 18, Math.sin(ang) * 18);
                    ctx.lineTo(Math.cos(ang) * 26, Math.sin(ang) * 26);
                    ctx.stroke();
                }
                
                // Inner core
                ctx.fillStyle = '#FFFF00';
                ctx.beginPath();
                ctx.arc(0, 0, 6, 0, Math.PI * 2);
                ctx.fill();
            },
            
            starMegaBoss() {
                // Giant rotating star with trail effect
                ctx.fillStyle = '#FF6B00';
                ctx.shadowColor = '#FFD700';
                ctx.shadowBlur = 10;
                
                for(let i = 0; i < 5; i++) {
                    const ang = -Math.PI/2 + (i * Math.PI * 2 / 5);
                    const r = i % 2 === 0 ? 15 : 8;
                    const x = Math.cos(ang) * r;
                    const y = Math.sin(ang) * r;
                    
                    if(i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
                
                // Glowing outline
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.shadowColor = 'transparent';
            },
            
            dragonCompanion() {
                // Full dragon with wings and tail
                ctx.fillStyle = '#DC143C';
                // Head
                ctx.beginPath();
                ctx.arc(0, 0, 8, 0, Math.PI * 2);
                ctx.fill();
                
                // Horn
                ctx.beginPath();
                ctx.moveTo(-3, -8);
                ctx.lineTo(-5, -14);
                ctx.moveTo(3, -8);
                ctx.lineTo(5, -14);
                ctx.strokeStyle = '#8B0000';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Wings (left and right)
                ctx.fillStyle = '#8B0000';
                ctx.beginPath();
                ctx.moveTo(-8, 0);
                ctx.lineTo(-16, -6);
                ctx.lineTo(-14, 6);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(16, -6);
                ctx.lineTo(14, 6);
                ctx.fill();
                
                // Tail flame
                ctx.fillStyle = '#FF4500';
                ctx.beginPath();
                ctx.moveTo(0, 8);
                ctx.quadraticCurveTo(8, 15, 6, 22);
                ctx.quadraticCurveTo(0, 18, -6, 22);
                ctx.quadraticCurveTo(-8, 15, 0, 8);
                ctx.fill();
            },
            
            phoenixSpirit() {
                // Phoenix with fire effect
                const fireGrad = ctx.createLinearGradient(0, -15, 0, 10);
                fireGrad.addColorStop(0, '#FF0000');
                fireGrad.addColorStop(0.5, '#FFA500');
                fireGrad.addColorStop(1, '#FFD700');
                
                ctx.fillStyle = fireGrad;
                // Bird body
                ctx.beginPath();
                ctx.ellipse(0, 0, 8, 10, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Wings on fire
                ctx.beginPath();
                ctx.moveTo(-8, 0);
                ctx.lineTo(-16, -8);
                ctx.lineTo(-10, 8);
                ctx.fill();
                
                ctx.beginPath();
                ctx.moveTo(8, 0);
                ctx.lineTo(16, -8);
                ctx.lineTo(10, 8);
                ctx.fill();
                
                // Head
                ctx.fillStyle = '#FF6347';
                ctx.beginPath();
                ctx.arc(0, -8, 5, 0, Math.PI * 2);
                ctx.fill();
            },
            
            titanShard() {
                // Crystal shard with sharp edges
                ctx.fillStyle = '#4169E1';
                ctx.beginPath();
                ctx.moveTo(0, -16);
                ctx.lineTo(10, -6);
                ctx.lineTo(10, 10);
                ctx.lineTo(0, 16);
                ctx.lineTo(-10, 10);
                ctx.lineTo(-10, -6);
                ctx.closePath();
                ctx.fill();
                
                // Inner glow
                ctx.strokeStyle = '#00BFFF';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Inner core
                ctx.fillStyle = '#87CEEB';
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2);
                ctx.fill();
            },
            
            shadowReaper() {
                // Dark reaper scythe
                ctx.strokeStyle = '#2F4F4F';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(0, 0, 12, Math.PI * 0.3, Math.PI * 1.7);
                ctx.stroke();
                
                // Handle
                ctx.beginPath();
                ctx.moveTo(0, 12);
                ctx.lineTo(0, 18);
                ctx.stroke();
                
                // Grim aura
                ctx.strokeStyle = 'rgba(255, 0, 255, 0.5)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(0, 0, 16, 0, Math.PI * 2);
                ctx.stroke();
                
                // Blade
                ctx.fillStyle = '#000';
                ctx.beginPath();
                ctx.arc(0, -12, 3, 0, Math.PI * 2);
                ctx.fill();
            },
            
            vortexEntity() {
                // Swirling vortex form
                ctx.strokeStyle = '#00FF00';
                ctx.lineWidth = 2;
                
                for(let i = 0; i < 3; i++) {
                    ctx.beginPath();
                    ctx.arc(0, 0, 6 + i * 5, 0, Math.PI * 2);
                    ctx.stroke();
                }
                
                // Center glow
                ctx.fillStyle = '#00FF00';
                ctx.beginPath();
                ctx.arc(0, 0, 4, 0, Math.PI * 2);
                ctx.fill();
            },
            
            titanicShell() {
                // Massive armored shell
                ctx.fillStyle = '#A9A9A9';
                ctx.beginPath();
                ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Armor plates
                for(let i = -1; i <= 1; i++) {
                    ctx.strokeStyle = '#696969';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(i * 10, 0, 4, 0, Math.PI * 2);
                    ctx.stroke();
                }
                
                // Spikes
                ctx.fillStyle = '#696969';
                for(let i = 0; i < 4; i++) {
                    ctx.beginPath();
                    ctx.arc(0, -12 + i * 8, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        },
        
        registerNewMobs() {
            // Mega Triangle - faster, more aggressive
            spawn.megaTriangle = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 3, 40, "rgb(255, 100, 100)");
                let me = mob[mob.length - 1];
                me.tier = 2;
                me.accelMag = 0.003 * simulation.accelScale;
                me.delay = 40;
                me.seeAtDistance2 = 2000000;
                me.memory = 240;
                console.log('🔺 Mega Triangle spawned with 40px radius');
            };
            
            // Crystal Titan - huge, armored, hard to kill
            spawn.crystallTitan = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 8, 80, "rgb(65, 105, 225)");
                let me = mob[mob.length - 1];
                me.tier = 3;
                me.damageReduction = 0.5;
                me.health = 1.5;
                Matter.Body.setDensity(me, 0.005);
                me.delay = 120;
                me.frictionAir = 0.01;
                me.seeAtDistance2 = 3000000;
                me.memory = 300;
                me.reflectDamage = 0.1;
                console.log('💎 Crystal Titan spawned - heavily armored!');
            };
            
            // Void Phaser - phase shifts, teleports erratically
            spawn.voidPhaser = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 7, 35, "rgb(75, 0, 130)");
                let me = mob[mob.length - 1];
                me.tier = 2;
                me.accelMag = 0.004 * simulation.accelScale;
                me.memory = 180;
                me.delay = 50;
                me.isPhasing = true;
                me.phaseCounter = 0;
                me.original_do = me.do;
                me.do = function() {
                    this.original_do();
                    this.phaseCounter++;
                    if(this.phaseCounter % 200 === 0) {
                        Matter.Body.setPosition(this, {
                            x: this.position.x + (Math.random() - 0.5) * 400,
                            y: this.position.y + (Math.random() - 0.5) * 300
                        });
                    }
                };
                console.log('🌌 Void Phaser spawned - can teleport!');
            };
            
            // Inferno Swarm Leader - generates smaller fire variants
            spawn.infernoLeader = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 6, 50, "rgb(255, 69, 0)");
                let me = mob[mob.length - 1];
                me.tier = 3;
                me.accelMag = 0.002 * simulation.accelScale;
                me.memory = 250;
                me.delay = 80;
                me.spawnsSmallmobs = true;
                me.spawnCounter = 0;
                me.original_do = me.do;
                me.do = function() {
                    this.original_do();
                    this.spawnCounter++;
                    if(this.spawnCounter % 150 === 0 && mob.length < 200) {
                        spawn.megaTriangle(
                            this.position.x + (Math.random() - 0.5) * 200,
                            this.position.y + (Math.random() - 0.5) * 200
                        );
                    }
                };
                console.log('🔥 Inferno Leader spawned - spawns minions!');
            };
            
            // Umbra Shadow - dark entity with drain ability
            spawn.umbraShadow = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 5, 45, "rgb(30, 30, 30)");
                let me = mob[mob.length - 1];
                me.tier = 3;
                me.accelMag = 0.0035 * simulation.accelScale;
                me.memory = 280;
                me.delay = 90;
                me.strokeStyle = '#666';
                me.isDrawingDrain = false;
                me.original_do = me.do;
                me.do = function() {
                    this.original_do();
                    if(this.distanceToPlayer() < 500 && Math.random() < 0.02) {
                        if(m.alive && m.immuneCycle < m.cycle) {
                            m.energy = Math.max(0, m.energy - 0.05);
                            this.isDrawingDrain = true;
                        }
                    }
                };
                console.log('👻 Umbra Shadow spawned - drains energy!');
            };
            
            // Platinum Guardian - reflects damage
            spawn.platinumGuardian = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 9, 60, "rgb(229, 228, 226)");
                let me = mob[mob.length - 1];
                me.tier = 3;
                me.damageReduction = 0.7;
                me.health = 1.3;
                Matter.Body.setDensity(me, 0.003);
                me.delay = 110;
                me.reflectChance = 0.3;
                me.isShielded = true;
                me.memory = 220;
                me.original_damage = me.damage;
                me.damage = function(dmg) {
                    if(Math.random() < me.reflectChance && m.alive && m.immuneCycle < m.cycle) {
                        m.takeDamage(dmg * 0.2);
                        simulation.drawList.push({
                            x: this.position.x,
                            y: this.position.y,
                            radius: 50,
                            color: 'rgba(255, 255, 255, 0.6)',
                            time: 15
                        });
                    }
                    this.original_damage(dmg);
                };
                console.log('⚔️ Platinum Guardian spawned - reflects damage!');
            };
            
            // Quantum Drifter - phases in and out, split personality
            spawn.quantumDrifter = function(xPos, yPos) {
                mobs.spawn(xPos, yPos, 4, 38, "rgb(147, 112, 219)");
                let me = mob[mob.length - 1];
                me.tier = 2;
                me.accelMag = 0.0045 * simulation.accelScale;
                me.memory = 200;
                me.delay = 70;
                me.isQuantum = true;
                me.seeAtDistance2 = 2500000;
                me.fill = "rgba(147, 112, 219, 0.7)";
                console.log('⚛️ Quantum Drifter spawned - phasing entity!');
            };
        }
    };
    
    // Register all new mobs when game loads
    window.enhancedMobs.registerNewMobs();
    
    // Hook companion models into customize system
    if(typeof window.characterCustomization !== 'undefined') {
        const enhanced = window.enhancedMobs.companionModels;
        
        window.characterCustomization.companions.push(
            { name: 'orbMiniBoss', display: '🔮✨ Mega Orb' },
            { name: 'starMegaBoss', display: '⭐🔥 Star Lord' },
            { name: 'dragonCompanion', display: '🐉👑 Dragon Lord' },
            { name: 'phoenixSpirit', display: '🔥✨ Phoenix' },
            { name: 'titanShard', display: '💎⚔️ Titan Shard' },
            { name: 'shadowReaper', display: '💀🌑 Reaper' },
            { name: 'vortexEntity', display: '🌀✨ Vortex' },
            { name: 'titanicShell', display: '🛡️💪 Colossus' }
        );
        
        // Override companion drawing to use enhanced models
        const originalDrawCompanion = window.characterCustomization.drawCompanion;
        window.characterCustomization.drawCompanion = function(ctx, x, y, cycle) {
            if (this.selectedCompanion === 'none') return;
            
            const offset = Math.sin(cycle / 30) * 5;
            const companionX = x + 50;
            const companionY = y - 20 + offset;
            
            ctx.save();
            ctx.translate(companionX, companionY);
            
            // Try enhanced models first
            if(enhanced[this.selectedCompanion]) {
                enhanced[this.selectedCompanion]();
                ctx.restore();
                return;
            }
            
            // Try advanced GUI models
            if(typeof window.advancedGUI !== 'undefined' && window.advancedGUI.companionModels[this.selectedCompanion]) {
                window.advancedGUI.companionModels[this.selectedCompanion]();
                ctx.restore();
                return;
            }
            
            // Fall back to original
            originalDrawCompanion.call(this, ctx, x, y, cycle);
        };
    }
    
    console.log('%c🎮 Enhanced Mobs Loaded! 7 new boss mobs + 8 epic companions unlocked!', 'color: #FF6347; font-size: 14px; font-weight: bold;');
}
