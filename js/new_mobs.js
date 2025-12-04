
// New Harder Mobs and Bosses
const newMobs = {
    // Tier 5 Elite Mobs
    quantumPhantom: function(x, y, radius = 40) {
        mobs.spawn(x, y, 8, radius, "rgba(160, 0, 255, 0.7)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "Quantum Phantom";
        me.showNameTag = true;
        me.stroke = "rgba(200, 100, 255, 0.9)";
        Matter.Body.setDensity(me, 0.003);
        me.damageReduction = 0.2;
        me.accelMag = 0.0015 * simulation.accelScale;
        me.frictionAir = 0.01;
        me.memory = 240;
        me.blinkRate = 45;
        me.blinkLength = 180;
        me.seeAtDistance2 = 1000000;
        
        me.do = function() {
            this.checkStatus();
            this.seePlayerCheck();
            if (this.seePlayer.recall) {
                this.attraction();
                this.blink();
            }
            this.healthBar2();
        };
        
        me.onDeath = function() {
            if (Math.random() < 0.3) powerUps.spawn(this.position.x, this.position.y, "tech");
        };
    },

    plasmaTitan: function(x, y, radius = 55) {
        mobs.spawn(x, y, 6, radius, "rgba(255, 80, 0, 0.8)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "Plasma Titan";
        me.showNameTag = true;
        me.stroke = "rgba(255, 120, 40, 0.9)";
        Matter.Body.setDensity(me, 0.004);
        me.damageReduction = 0.15;
        me.accelMag = 0.0012 * simulation.accelScale;
        me.frictionAir = 0.008;
        me.memory = 300;
        me.fireFreq = 80;
        me.seeAtDistance2 = 1500000;
        
        me.do = function() {
            this.checkStatus();
            this.seePlayerCheck();
            if (this.seePlayer.recall) {
                this.attraction();
                // Fire plasma bursts
                if (!(simulation.cycle % this.fireFreq)) {
                    for (let i = 0; i < 6; i++) {
                        const angle = (Math.PI * 2 * i / 6) + this.angle;
                        spawn.bullet(this.position.x, this.position.y, 5, 12);
                        const speed = 15;
                        Matter.Body.setVelocity(mob[mob.length - 1], {
                            x: speed * Math.cos(angle),
                            y: speed * Math.sin(angle)
                        });
                    }
                }
            }
            this.healthBar3();
        };
        
        me.onDeath = function() {
            b.explosion(this.position, 400);
            if (Math.random() < 0.4) powerUps.spawn(this.position.x, this.position.y, "tech");
        };
    },

    voidReaver: function(x, y, radius = 48) {
        mobs.spawn(x, y, 7, radius, "rgba(20, 20, 40, 0.9)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "Void Reaver";
        me.showNameTag = true;
        me.stroke = "rgba(80, 80, 120, 0.9)";
        Matter.Body.setDensity(me, 0.0035);
        me.damageReduction = 0.25;
        me.accelMag = 0.0018 * simulation.accelScale;
        me.frictionAir = 0.005;
        me.memory = 360;
        me.seeAtDistance2 = 2000000;
        me.pullRange = 600;
        
        me.do = function() {
            this.checkStatus();
            this.seePlayerCheck();
            if (this.seePlayer.recall) {
                this.attraction();
                // Pull player and projectiles
                if (Vector.magnitudeSquared(Vector.sub(this.position, player.position)) < this.pullRange * this.pullRange) {
                    const angle = Math.atan2(player.position.y - this.position.y, player.position.x - this.position.x);
                    player.force.x -= 0.0008 * player.mass * Math.cos(angle);
                    player.force.y -= 0.0008 * player.mass * Math.sin(angle);
                }
            }
            this.healthBar4();
        };
        
        me.onDeath = function() {
            // Create void collapse
            for (let i = 0; i < 10; i++) {
                const angle = Math.PI * 2 * i / 10;
                const dist = 150;
                b.explosion({
                    x: this.position.x + dist * Math.cos(angle),
                    y: this.position.y + dist * Math.sin(angle)
                }, 120);
            }
            if (Math.random() < 0.5) powerUps.spawn(this.position.x, this.position.y, "tech");
        };
    },

    // Tier 5 Bosses
    entropyLord: function(x, y) {
        mobs.spawn(x, y, 8, 120, "rgba(100, 0, 150, 0.7)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "ENTROPY LORD";
        me.showNameTag = true;
        me.isBoss = true;
        me.stroke = "rgba(150, 50, 200, 0.9)";
        Matter.Body.setDensity(me, 0.005);
        me.damageReduction = 0.08;
        me.accelMag = 0.0008 * simulation.accelScale;
        me.frictionAir = 0.01;
        me.memory = Infinity;
        me.fireFreq = 60;
        me.seeAtDistance2 = Infinity;
        me.phase = 0;
        
        me.do = function() {
            this.checkStatus();
            this.alwaysSeePlayer();
            this.attraction();
            
            // Change phases based on health
            if (this.health < 0.66 && this.phase === 0) {
                this.phase = 1;
                this.fireFreq = 40;
            }
            if (this.health < 0.33 && this.phase === 1) {
                this.phase = 2;
                this.fireFreq = 25;
            }
            
            // Fire chaos patterns
            if (!(simulation.cycle % this.fireFreq)) {
                const count = 8 + this.phase * 4;
                for (let i = 0; i < count; i++) {
                    const angle = (Math.PI * 2 * i / count) + this.angle + simulation.cycle * 0.02;
                    spawn.bullet(this.position.x, this.position.y, 5, 15);
                    const speed = 12 + this.phase * 3;
                    Matter.Body.setVelocity(mob[mob.length - 1], {
                        x: speed * Math.cos(angle),
                        y: speed * Math.sin(angle)
                    });
                }
            }
            
            // Spawn minions at low health
            if (this.phase === 2 && !(simulation.cycle % 180)) {
                spawn.quantumPhantom(this.position.x + 200, this.position.y);
            }
            
            this.healthBar1();
        };
        
        me.onDeath = function() {
            b.explosion(this.position, 800);
            for (let i = 0; i < 5; i++) {
                powerUps.spawn(this.position.x + (Math.random() - 0.5) * 200, this.position.y + (Math.random() - 0.5) * 200, "tech");
            }
            powerUps.spawn(this.position.x, this.position.y, "research");
        };
    },

    singularityKing: function(x, y) {
        mobs.spawn(x, y, 10, 140, "rgba(10, 10, 10, 0.95)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "SINGULARITY KING";
        me.showNameTag = true;
        me.isBoss = true;
        me.stroke = "rgba(100, 100, 100, 0.9)";
        Matter.Body.setDensity(me, 0.006);
        me.damageReduction = 0.05;
        me.accelMag = 0.0006 * simulation.accelScale;
        me.frictionAir = 0.015;
        me.memory = Infinity;
        me.seeAtDistance2 = Infinity;
        me.pullStrength = 0.0012;
        me.eventHorizon = 500;
        
        me.do = function() {
            this.checkStatus();
            this.alwaysSeePlayer();
            
            // Gravity pull effect
            const range = this.eventHorizon * (1 + 0.5 * Math.sin(simulation.cycle * 0.01));
            
            // Pull player
            const sub = Vector.sub(this.position, player.position);
            const dist = Vector.magnitude(sub);
            if (dist < range) {
                const force = this.pullStrength * player.mass / dist;
                player.force.x += sub.x * force;
                player.force.y += sub.y * force;
                
                // Damage in close range
                if (dist < 200 && m.immuneCycle < m.cycle) {
                    m.takeDamage(0.002 * this.damageScale());
                }
            }
            
            // Pull mobs
            for (let i = 0; i < mob.length; i++) {
                if (mob[i] !== this && mob[i].alive) {
                    const mobSub = Vector.sub(this.position, mob[i].position);
                    const mobDist = Vector.magnitude(mobSub);
                    if (mobDist < range) {
                        const mobForce = this.pullStrength * mob[i].mass * 0.5 / mobDist;
                        mob[i].force.x += mobSub.x * mobForce;
                        mob[i].force.y += mobSub.y * mobForce;
                    }
                }
            }
            
            // Visual effect
            ctx.beginPath();
            ctx.arc(this.position.x, this.position.y, range, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fill();
            ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
            ctx.lineWidth = 3;
            ctx.stroke();
            
            this.healthBar1();
        };
        
        me.onDeath = function() {
            // Massive explosion
            b.explosion(this.position, 1000);
            setTimeout(() => {
                b.explosion(this.position, 800);
            }, 200);
            setTimeout(() => {
                b.explosion(this.position, 600);
            }, 400);
            
            for (let i = 0; i < 6; i++) {
                powerUps.spawn(this.position.x + (Math.random() - 0.5) * 300, this.position.y + (Math.random() - 0.5) * 300, "tech");
            }
            for (let i = 0; i < 3; i++) {
                powerUps.spawn(this.position.x + (Math.random() - 0.5) * 200, this.position.y + (Math.random() - 0.5) * 200, "research");
            }
        };
    },

    cosmicHorror: function(x, y) {
        mobs.spawn(x, y, 12, 160, "rgba(80, 0, 120, 0.8)");
        let me = mob[mob.length - 1];
        me.tier = 5;
        me.nameTag = "COSMIC HORROR";
        me.showNameTag = true;
        me.isBoss = true;
        me.stroke = "rgba(150, 0, 200, 0.9)";
        Matter.Body.setDensity(me, 0.007);
        me.damageReduction = 0.04;
        me.accelMag = 0.0005 * simulation.accelScale;
        me.frictionAir = 0.02;
        me.memory = Infinity;
        me.seeAtDistance2 = Infinity;
        me.tentacles = [];
        me.fireFreq = 50;
        
        // Create tentacles
        for (let i = 0; i < 6; i++) {
            const angle = Math.PI * 2 * i / 6;
            me.tentacles.push({
                angle: angle,
                length: 200,
                phase: Math.random() * Math.PI * 2
            });
        }
        
        me.do = function() {
            this.checkStatus();
            this.alwaysSeePlayer();
            this.attraction();
            
            // Animate and attack with tentacles
            for (let i = 0; i < this.tentacles.length; i++) {
                const t = this.tentacles[i];
                t.angle += 0.02;
                t.phase += 0.05;
                const waveLength = t.length * (1 + 0.3 * Math.sin(t.phase));
                
                const tipX = this.position.x + waveLength * Math.cos(t.angle);
                const tipY = this.position.y + waveLength * Math.sin(t.angle);
                
                // Draw tentacle
                ctx.strokeStyle = "rgba(100, 0, 150, 0.6)";
                ctx.lineWidth = 15;
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(tipX, tipY);
                ctx.stroke();
                
                // Check for player hit
                const dx = tipX - m.pos.x;
                const dy = tipY - m.pos.y;
                if (Math.sqrt(dx * dx + dy * dy) < 50 && m.immuneCycle < m.cycle) {
                    m.takeDamage(0.003 * this.damageScale());
                }
            }
            
            // Spawn void zones
            if (!(simulation.cycle % this.fireFreq)) {
                const angle = Math.random() * Math.PI * 2;
                const dist = 300 + Math.random() * 200;
                b.explosion({
                    x: this.position.x + dist * Math.cos(angle),
                    y: this.position.y + dist * Math.sin(angle)
                }, 150, "rgba(80, 0, 120, 0.5)");
            }
            
            this.healthBar1();
        };
        
        me.onDeath = function() {
            // Chain explosions
            for (let i = 0; i < 12; i++) {
                const angle = Math.PI * 2 * i / 12;
                const dist = 250;
                setTimeout(() => {
                    b.explosion({
                        x: this.position.x + dist * Math.cos(angle),
                        y: this.position.y + dist * Math.sin(angle)
                    }, 200);
                }, i * 100);
            }
            
            for (let i = 0; i < 8; i++) {
                powerUps.spawn(this.position.x + (Math.random() - 0.5) * 400, this.position.y + (Math.random() - 0.5) * 400, "tech");
            }
            for (let i = 0; i < 4; i++) {
                powerUps.spawn(this.position.x + (Math.random() - 0.5) * 300, this.position.y + (Math.random() - 0.5) * 300, "research");
            }
        };
    }
};

// Name tag drawing function
mobs.drawNameTags = function() {
    ctx.textAlign = "center";
    ctx.font = "bold 16px Arial";
    for (let i = 0; i < mob.length; i++) {
        if (mob[i].showNameTag && mob[i].alive) {
            const y = mob[i].position.y - mob[i].radius - 30;
            
            // Background
            ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            ctx.fillRect(mob[i].position.x - 80, y - 12, 160, 20);
            
            // Tier indicator
            const tierColor = ["#888", "#0f0", "#0af", "#f0a", "#fa0", "#f00"][mob[i].tier] || "#fff";
            ctx.fillStyle = tierColor;
            ctx.fillText(`[T${mob[i].tier}]`, mob[i].position.x - 60, y + 3);
            
            // Name
            ctx.fillStyle = "#fff";
            ctx.fillText(mob[i].nameTag, mob[i].position.x + 20, y + 3);
        }
    }
};

// Add to mob drawing loop
const originalMobDraw = mobs.draw;
mobs.draw = function() {
    originalMobDraw();
    mobs.drawNameTags();
};
