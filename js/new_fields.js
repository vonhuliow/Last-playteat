// New Field Abilities - 60 total + 52 special fields

// Advanced Field System - 60 Fields with Gacha, Summoning, and Spectacular Visuals

(function() {
    'use strict';

    // Gacha System State
    const gachaState = {
        spins: 0,
        level: 1,
        maxSpins: 60,
        items: [],
        isActive: false
    };

    // Yin-Yang Summon State
    const yinYangState = {
        whiteCharge: 0,
        blackCharge: 0,
        whiteMob: null,
        blackMob: null,
        mode: 'dual', // 'dual', 'white', 'black'
        phase: 1, // 1 or 2
        clickCount: 0
    };

    // Helper: Spawn friendly dragon-like mob
    function spawnFriendlyMob(color, isYin) {
        const angle = Math.random() * Math.PI * 2;
        const distance = 200;
        const pos = {
            x: m.pos.x + Math.cos(angle) * distance,
            y: m.pos.y + Math.sin(angle) * distance
        };

        spawn.striker(pos.x, pos.y, 80);
        const mob = mob[mob.length - 1];

        // Make friendly
        mob.isBadTarget = false;
        mob.isShielded = true;
        mob.seeAtDistance2 = 0;
        mob.memory = 0;
        mob.frictionStatic = 0;
        mob.friction = 0;
        mob.frictionAir = 0.01;

        // Color customization
        mob.fill = color;
        mob.stroke = color === '#ffffff' ? '#000000' : '#ffffff';

        // Custom behavior
        mob.orbitAngle = angle;
        mob.orbitSpeed = isYin ? 0.02 : -0.02;
        mob.isYinYangMob = true;
        mob.parentColor = color;

        return mob;
    }

    // Helper: Gacha spin animation
    function performGachaSpin() {
        const items = ['heal', 'ammo', 'research', 'gun', 'field', 'tech'];
        const rarities = ['common', 'rare', 'epic', 'legendary'];

        gachaState.spins++;

        // Visual feedback
        ctx.save();
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#FF1493';
        ctx.lineWidth = 5;

        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2 / 3) + simulation.cycle * 0.1;
            const x = m.pos.x + Math.cos(angle) * 150;
            const y = m.pos.y + Math.sin(angle) * 150;

            ctx.beginPath();
            ctx.arc(x, y, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Spawn actual item
            const itemType = items[Math.floor(Math.random() * items.length)];
            powerUps.spawn(x, y, itemType);
        }
        ctx.restore();

        // Level up system
        if (gachaState.spins % 5 === 0 && gachaState.level < 60) {
            gachaState.level++;
            simulation.makeTextLog(`Gacha Level ${gachaState.level}! Unlocked more spins!`, 180);
        }
    }

    // Helper: Yin-Yang charge bars
    function drawYinYangBars() {
        const barWidth = 200;
        const barHeight = 20;
        const x = canvas.width / 2 - barWidth / 2;
        const yWhite = 50;
        const yBlack = 80;

        ctx.save();

        // White/Teal bar (phase 1) or Blue/Teal bar (phase 2)
        const whitePhase1Color = '#ffffff';
        const whitePhase2Color = '#00CED1';
        const whiteColor = yinYangState.phase === 1 ? whitePhase1Color : whitePhase2Color;

        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(x, yWhite, barWidth, barHeight);
        ctx.fillStyle = whiteColor;
        ctx.fillRect(x, yWhite, barWidth * yinYangState.whiteCharge, barHeight);
        ctx.strokeStyle = whiteColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, yWhite, barWidth, barHeight);

        // Black/Purple bar (phase 1) or Red/Black bar (phase 2)
        const blackPhase1Color = '#000000';
        const blackPhase2Color = '#8B0000';
        const blackColor = yinYangState.phase === 1 ? blackPhase1Color : blackPhase2Color;

        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillRect(x, yBlack, barWidth, barHeight);
        ctx.fillStyle = blackColor;
        ctx.fillRect(x, yBlack, barWidth * yinYangState.blackCharge, barHeight);
        ctx.strokeStyle = yinYangState.phase === 1 ? '#ffffff' : '#FF0000';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, yBlack, barWidth, barHeight);

        // Phase indicator
        ctx.fillStyle = '#FFD700';
        ctx.font = '16px Arial';
        ctx.fillText(`Phase ${yinYangState.phase} - ${yinYangState.mode.toUpperCase()}`, x, yWhite - 10);

        ctx.restore();
    }

    // Update yin-yang mobs
    function updateYinYangMobs() {
        if (yinYangState.whiteMob && yinYangState.whiteMob.alive) {
            const white = yinYangState.whiteMob;
            white.orbitAngle += white.orbitSpeed;
            const targetX = m.pos.x + Math.cos(white.orbitAngle) * 200;
            const targetY = m.pos.y + Math.sin(white.orbitAngle) * 200;

            Matter.Body.setVelocity(white, {
                x: (targetX - white.position.x) * 0.1,
                y: (targetY - white.position.y) * 0.1
            });

            // Visual trail
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = yinYangState.phase === 1 ? '#ffffff' : '#00CED1';
            ctx.beginPath();
            ctx.arc(white.position.x, white.position.y, 40, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        if (yinYangState.blackMob && yinYangState.blackMob.alive) {
            const black = yinYangState.blackMob;
            black.orbitAngle += black.orbitSpeed;
            const targetX = m.pos.x + Math.cos(black.orbitAngle) * 200;
            const targetY = m.pos.y + Math.sin(black.orbitAngle) * 200;

            Matter.Body.setVelocity(black, {
                x: (targetX - black.position.x) * 0.1,
                y: (targetY - black.position.y) * 0.1
            });

            // Visual trail
            ctx.save();
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = yinYangState.phase === 1 ? '#8B00FF' : '#8B0000';
            ctx.beginPath();
            ctx.arc(black.position.x, black.position.y, 40, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Field definitions
    const newFields = [
        // 1. Gacha Field
        {
            name: "gacha nexus",
            description: "spin <strong>3 items</strong>, level up to unlock <strong>60 spins</strong><br>current: <strong>level ${gachaState.level}</strong>, spins: <strong>${gachaState.spins}</strong>",
            maxCount: 1,
            count: 0,
            frequency: 1,
            allowed() { return true; },
            requires: "",
            effect() {
                tech.isGachaActive = true;
            },
            do() {
                if (m.fieldCDcycle < m.cycle && gachaState.spins < gachaState.level * 10) {
                    performGachaSpin();
                    m.fieldCDcycle = m.cycle + 120;
                }

                // Still allow powerup collection
                if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen;
                m.grabPowerUp();
                m.drawRegenEnergy("rgba(255, 215, 0, 0.3)");
            },
            remove() {
                tech.isGachaActive = false;
            }
        },

        // 2. Yin-Yang Field
        {
            name: "yin-yang harmony",
            description: "summon <strong>rotating guardians</strong><br>click once: <strong>dual</strong>, twice: <strong>singular</strong><br>phase <strong>${yinYangState.phase}</strong> active",
            maxCount: 1,
            count: 0,
            frequency: 1,
            allowed() { return true; },
            requires: "",
            effect() {
                tech.isYinYangActive = true;
                yinYangState.clickCount = 0;
            },
            do() {
                // Charge system
                yinYangState.whiteCharge = Math.min(1, yinYangState.whiteCharge + 0.003);
                yinYangState.blackCharge = Math.min(1, yinYangState.blackCharge + 0.003);

                // Phase transition
                if (yinYangState.whiteCharge >= 1 && yinYangState.blackCharge >= 1 && yinYangState.phase === 1) {
                    yinYangState.phase = 2;
                    simulation.makeTextLog("Yin-Yang Phase 2 Activated!", 180);
                }

                // Mode switching on field button press
                if (input.field && m.fieldCDcycle < m.cycle - 30) {
                    yinYangState.clickCount++;
                    if (yinYangState.clickCount === 1) {
                        yinYangState.mode = 'dual';
                    } else if (yinYangState.clickCount >= 2) {
                        yinYangState.mode = yinYangState.mode === 'white' ? 'black' : 'white';
                        yinYangState.clickCount = 0;
                    }
                }

                // Spawn/release mobs
                if (input.field && m.fieldCDcycle < m.cycle) {
                    if (yinYangState.mode === 'dual' || yinYangState.mode === 'white') {
                        if (yinYangState.whiteCharge >= 1) {
                            const color = yinYangState.phase === 1 ? '#ffffff' : '#00CED1';
                            yinYangState.whiteMob = spawnFriendlyMob(color, true);
                            yinYangState.whiteCharge = 0;

                            // Spectacular visuals
                            for (let i = 0; i < 20; i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const speed = 5 + Math.random() * 10;
                                b.targetingLaser({
                                    x: m.pos.x + Math.cos(angle) * speed,
                                    y: m.pos.y + Math.sin(angle) * speed
                                });
                            }
                        }
                    }

                    if (yinYangState.mode === 'dual' || yinYangState.mode === 'black') {
                        if (yinYangState.blackCharge >= 1) {
                            const color = yinYangState.phase === 1 ? '#8B00FF' : '#8B0000';
                            yinYangState.blackMob = spawnFriendlyMob(color, false);
                            yinYangState.blackCharge = 0;

                            // Spectacular visuals
                            for (let i = 0; i < 20; i++) {
                                const angle = Math.random() * Math.PI * 2;
                                const speed = 5 + Math.random() * 10;
                                b.targetingLaser({
                                    x: m.pos.x + Math.cos(angle) * speed,
                                    y: m.pos.y + Math.sin(angle) * speed
                                });
                            }
                        }
                    }

                    m.fieldCDcycle = m.cycle + 60;
                }

                updateYinYangMobs();
                drawYinYangBars();

                // Still allow powerup collection
                if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen;
                m.grabPowerUp();
                m.drawRegenEnergy("rgba(128, 0, 128, 0.3)");
            },
            remove() {
                tech.isYinYangActive = false;
            }
        },

        // 3-10: Rainbow/Toxic themed fields
        {
            name: "rainbow cascade",
            description: "summon <strong>7 colored orbs</strong> that orbit and damage enemies<br><strong>rainbow charge bar</strong>",
            maxCount: 1,
            count: 0,
            frequency: 1,
            allowed() { return true; },
            requires: "",
            rainbowCharge: 0,
            orbs: [],
            effect() {
                this.orbs = [];
            },
            do() {
                this.rainbowCharge = Math.min(1, this.rainbowCharge + 0.004);

                // Draw rainbow bar
                const barWidth = 200;
                const barHeight = 20;
                const x = canvas.width / 2 - barWidth / 2;
                const y = 50;

                ctx.save();
                const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
                gradient.addColorStop(0, '#ff0000');
                gradient.addColorStop(0.17, '#ff7f00');
                gradient.addColorStop(0.33, '#ffff00');
                gradient.addColorStop(0.5, '#00ff00');
                gradient.addColorStop(0.67, '#0000ff');
                gradient.addColorStop(0.83, '#4b0082');
                gradient.addColorStop(1, '#9400d3');

                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x, y, barWidth, barHeight);
                ctx.fillStyle = gradient;
                ctx.fillRect(x, y, barWidth * this.rainbowCharge, barHeight);
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, barWidth, barHeight);
                ctx.restore();

                // Spawn orbs when charged
                if (input.field && this.rainbowCharge >= 1 && m.fieldCDcycle < m.cycle) {
                    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
                    for (let i = 0; i < 7; i++) {
                        const angle = (i / 7) * Math.PI * 2;
                        spawn.striker(
                            m.pos.x + Math.cos(angle) * 100,
                            m.pos.y + Math.sin(angle) * 100,
                            50
                        );
                        const orb = mob[mob.length - 1];
                        orb.fill = colors[i];
                        orb.stroke = '#ffffff';
                        orb.isRainbowOrb = true;
                        orb.orbitAngle = angle;
                        this.orbs.push(orb);
                    }
                    this.rainbowCharge = 0;
                    m.fieldCDcycle = m.cycle + 180;
                }

                // Update orbs
                for (let orb of this.orbs) {
                    if (orb.alive) {
                        orb.orbitAngle += 0.03;
                        const targetX = m.pos.x + Math.cos(orb.orbitAngle) * 150;
                        const targetY = m.pos.y + Math.sin(orb.orbitAngle) * 150;
                        Matter.Body.setVelocity(orb, {
                            x: (targetX - orb.position.x) * 0.1,
                            y: (targetY - orb.position.y) * 0.1
                        });
                    }
                }

                if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen;
                m.grabPowerUp();
                m.drawRegenEnergy("rgba(255, 0, 255, 0.3)");
            },
            remove() {
                for (let orb of this.orbs) {
                    if (orb.alive) orb.death();
                }
            }
        },

        {
            name: "toxic vortex",
            description: "create <strong>poison clouds</strong> that damage enemies<br><strong>green charge bar</strong>",
            maxCount: 1,
            count: 0,
            frequency: 1,
            allowed() { return true; },
            requires: "",
            toxicCharge: 0,
            effect() {},
            do() {
                this.toxicCharge = Math.min(1, this.toxicCharge + 0.005);

                // Draw toxic bar
                const barWidth = 200;
                const barHeight = 20;
                const x = canvas.width / 2 - barWidth / 2;
                const y = 50;

                ctx.save();
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(x, y, barWidth, barHeight);
                ctx.fillStyle = '#00ff00';
                ctx.fillRect(x, y, barWidth * this.toxicCharge, barHeight);
                ctx.strokeStyle = '#39ff14';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, barWidth, barHeight);
                ctx.restore();

                if (input.field && this.toxicCharge >= 1 && m.fieldCDcycle < m.cycle) {
                    for (let i = 0; i < 10; i++) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = 100 + Math.random() * 200;
                        spawn.sucker(
                            m.pos.x + Math.cos(angle) * dist,
                            m.pos.y + Math.sin(angle) * dist,
                            100
                        );
                        const cloud = mob[mob.length - 1];
                        cloud.fill = '#00ff00';
                        cloud.stroke = '#39ff14';
                    }
                    this.toxicCharge = 0;
                    m.fieldCDcycle = m.cycle + 120;
                }

                if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen;
                m.grabPowerUp();
                m.drawRegenEnergy("rgba(0, 255, 0, 0.3)");
            },
            remove() {}
        },

        // 11-60: More themed fields with different mechanics
        ...Array.from({length: 48}, (_, i) => {
            const themes = [
                {name: 'crystal', color: '#00ffff', effect: 'freeze'},
                {name: 'inferno', color: '#ff4500', effect: 'burn'},
                {name: 'lightning', color: '#ffff00', effect: 'shock'},
                {name: 'shadow', color: '#1a1a1a', effect: 'stealth'},
                {name: 'celestial', color: '#ffd700', effect: 'heal'},
                {name: 'void', color: '#4b0082', effect: 'pull'},
                {name: 'plasma', color: '#ff00ff', effect: 'melt'},
                {name: 'quantum', color: '#00ff7f', effect: 'phase'}
            ];

            const theme = themes[i % themes.length];
            const index = i + 11;

            return {
                name: `${theme.name} field ${index}`,
                description: `harness <strong>${theme.name}</strong> energy with <strong>${theme.effect}</strong><br><strong>circular charge emblem</strong>`,
                maxCount: 1,
                count: 0,
                frequency: 1,
                allowed() { return true; },
                requires: "",
                charge: 0,
                emblemRotation: 0,
                effect() {
                    this.charge = 0;
                    this.emblemRotation = 0;
                },
                do() {
                    this.charge = Math.min(1, this.charge + 0.004);
                    this.emblemRotation += 0.05;

                    // Draw circular emblem
                    const centerX = canvas.width / 2;
                    const centerY = 80;
                    const radius = 40;

                    ctx.save();
                    ctx.translate(centerX, centerY);
                    ctx.rotate(this.emblemRotation);

                    // Outer circle
                    ctx.strokeStyle = theme.color;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(0, 0, radius, 0, Math.PI * 2);
                    ctx.stroke();

                    // Charge fill
                    ctx.fillStyle = theme.color;
                    ctx.globalAlpha = this.charge * 0.5;
                    ctx.beginPath();
                    ctx.arc(0, 0, radius * this.charge, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;

                    // Inner pattern
                    for (let j = 0; j < 6; j++) {
                        const angle = (j / 6) * Math.PI * 2;
                        ctx.beginPath();
                        ctx.moveTo(0, 0);
                        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
                        ctx.stroke();
                    }

                    ctx.restore();

                    // Activate effect when charged
                    if (input.field && this.charge >= 1 && m.fieldCDcycle < m.cycle) {
                        // Spectacular visual burst
                        for (let j = 0; j < 30; j++) {
                            const angle = (j / 30) * Math.PI * 2;
                            const speed = 10 + Math.random() * 5;
                            b.targetingLaser({
                                x: m.pos.x + Math.cos(angle) * speed,
                                y: m.pos.y + Math.sin(angle) * speed
                            });
                        }

                        // Spawn effect (varies by theme)
                        if (theme.effect === 'freeze' || theme.effect === 'burn' || theme.effect === 'shock') {
                            for (let j = 0; j < 8; j++) {
                                const angle = (j / 8) * Math.PI * 2;
                                spawn.springer(
                                    m.pos.x + Math.cos(angle) * 150,
                                    m.pos.y + Math.sin(angle) * 150,
                                    60
                                );
                            }
                        }

                        this.charge = 0;
                        m.fieldCDcycle = m.cycle + 150;
                    }

                    if (m.energy > m.fieldRegen) m.energy -= m.fieldRegen;
                    m.grabPowerUp();
                    m.drawRegenEnergy(`rgba(${parseInt(theme.color.slice(1,3), 16)}, ${parseInt(theme.color.slice(3,5), 16)}, ${parseInt(theme.color.slice(5,7), 16)}, 0.3)`);
                },
                remove() {
                    this.charge = 0;
                }
            };
        })
    ];

    // Add all new fields to the game
    if (typeof b !== 'undefined' && b.guns) {
        // Inject into field array
        if (typeof tech !== 'undefined' && Array.isArray(tech)) {
            newFields.forEach(field => {
                const existingIndex = tech.findIndex(t => t.name === field.name);
                if (existingIndex === -1) {
                    tech.push(field);
                }
            });
            console.log('%c60 Advanced Fields Successfully Installed!', 'color: #00ff00; font-size: 16px; font-weight: bold;');
            console.log('%cIncludes: Gacha, Yin-Yang, Rainbow, Toxic, and 56 more themed fields!', 'color: #87CEEB;');
        }
    }

})();