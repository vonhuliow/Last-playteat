
javascript:(function() {
	// Add throw keybind
	if(!input.key.throwDaggers) {
		input.key.throwDaggers = "e";
	}
	
	const e = {
		name: "daggers",
		descriptionFunction() { 
			return `dual wield <b>daggers</b> with graceful slashes<br>press <strong>${input.key.throwDaggers}</strong> to throw daggers<br>yin-yang emblem charges with attacks`
		},
		ammo: Infinity,
		ammoPack: Infinity,
		defaultAmmoPack: Infinity,
		have: false,
		yinYangCharge: 0,
		maxYinYangCharge: 100,
		phase: 0, // 0 = normal, 1 = half white/black, 2 = black/purple
		thrownDaggers: [],
		slashCycle: 0,
		haveEphemera: false,
		fire() {},
		do() {
			if(!this.haveEphemera) {
				this.haveEphemera = true;
				simulation.ephemera.push({
					name: "daggers",
					do() {
						// Draw yin-yang emblem
						if(b.guns[b.activeGun] && b.guns[b.activeGun].name === 'daggers') {
							const gun = b.guns[b.activeGun];
							const radius = 30;
							const x = m.pos.x;
							const y = m.pos.y - 60;
							
							// Rotate emblem
							const rotation = simulation.cycle * 0.05;
							
							ctx.save();
							ctx.translate(x, y);
							ctx.rotate(rotation);
							
							// Draw yin-yang based on charge
							const chargeRatio = gun.yinYangCharge / gun.maxYinYangCharge;
							
							// Outer circle
							ctx.beginPath();
							ctx.arc(0, 0, radius, 0, Math.PI * 2);
							ctx.strokeStyle = "black";
							ctx.lineWidth = 2;
							ctx.stroke();
							
							// Yin side (black)
							ctx.beginPath();
							ctx.arc(0, 0, radius, 0, Math.PI, true);
							ctx.arc(0, -radius/2, radius/2, Math.PI, 0, true);
							ctx.arc(0, radius/2, radius/2, Math.PI, 0, false);
							if(gun.phase === 2) {
								const gradient = ctx.createLinearGradient(-radius, 0, radius, 0);
								gradient.addColorStop(0, "black");
								gradient.addColorStop(1, "rgb(75, 0, 130)");
								ctx.fillStyle = gradient;
							} else {
								ctx.fillStyle = "black";
							}
							ctx.fill();
							
							// Yang side (white)
							ctx.beginPath();
							ctx.arc(0, 0, radius, 0, Math.PI, false);
							ctx.arc(0, radius/2, radius/2, Math.PI, 0, true);
							ctx.arc(0, -radius/2, radius/2, Math.PI, 0, false);
							ctx.fillStyle = "white";
							ctx.fill();
							
							// Dots
							ctx.beginPath();
							ctx.arc(0, -radius/2, radius/6, 0, Math.PI * 2);
							ctx.fillStyle = "white";
							ctx.fill();
							
							ctx.beginPath();
							ctx.arc(0, radius/2, radius/6, 0, Math.PI * 2);
							ctx.fillStyle = "black";
							ctx.fill();
							
							// Charge indicator glow
							if(chargeRatio > 0) {
								ctx.beginPath();
								ctx.arc(0, 0, radius + 5, 0, Math.PI * 2);
								const alpha = chargeRatio * 0.5;
								ctx.strokeStyle = gun.phase === 2 ? `rgba(75, 0, 130, ${alpha})` : `rgba(200, 200, 200, ${alpha})`;
								ctx.lineWidth = 5;
								ctx.stroke();
							}
							
							ctx.restore();
						}
					}
				});
			}
			
			// Update phase based on charge
			if(this.yinYangCharge >= this.maxYinYangCharge && this.phase === 0) {
				this.phase = 1;
				simulation.inGameConsole("<span style='color: gray;'>YIN-YANG PHASE 1: Balance Achieved</span>");
			} else if(this.yinYangCharge >= this.maxYinYangCharge * 2 && this.phase === 1) {
				this.phase = 2;
				this.yinYangCharge = 0;
				simulation.inGameConsole("<span style='color: rgb(75, 0, 130);'>YIN-YANG PHASE 2: Dark Harmony</span>");
			}
			
			// Draw player aura based on phase
			if(this.phase === 1) {
				ctx.save();
				ctx.globalAlpha = 0.3;
				ctx.beginPath();
				ctx.arc(m.pos.x - 15, m.pos.y, 40, 0, Math.PI * 2);
				ctx.fillStyle = "white";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(m.pos.x + 15, m.pos.y, 40, 0, Math.PI * 2);
				ctx.fillStyle = "black";
				ctx.fill();
				ctx.restore();
			} else if(this.phase === 2) {
				ctx.save();
				ctx.globalAlpha = 0.3;
				ctx.beginPath();
				ctx.arc(m.pos.x - 15, m.pos.y, 40, 0, Math.PI * 2);
				ctx.fillStyle = "black";
				ctx.fill();
				ctx.beginPath();
				ctx.arc(m.pos.x + 15, m.pos.y, 40, 0, Math.PI * 2);
				ctx.fillStyle = "rgb(75, 0, 130)";
				ctx.fill();
				ctx.restore();
			}
			
			// Handle thrown daggers
			for(let i = this.thrownDaggers.length - 1; i >= 0; i--) {
				const dagger = this.thrownDaggers[i];
				
				dagger.lifetime--;
				if(dagger.lifetime <= 0) {
					if(dagger.body) {
						Matter.Composite.remove(engine.world, dagger.body);
					}
					this.thrownDaggers.splice(i, 1);
					continue;
				}
				
				// Check collisions
				for(let j = 0; j < mob.length; j++) {
					if(mob[j].alive && dagger.body) {
						const result = Matter.Query.collides(dagger.body, [mob[j]]);
						if(result.length > 0) {
							const damage = (m.damageDone || 1) * 0.8 * (this.phase === 2 ? 3 : this.phase === 1 ? 2 : 1);
							mob[j].damage(damage);
							
							simulation.drawList.push({
								x: mob[j].position.x,
								y: mob[j].position.y,
								radius: Math.sqrt(damage) * 40,
								color: this.phase === 2 ? "rgba(75, 0, 130, 0.6)" : "rgba(200, 200, 200, 0.6)",
								time: simulation.drawTime
							});
							
							if(dagger.body) {
								Matter.Composite.remove(engine.world, dagger.body);
							}
							this.thrownDaggers.splice(i, 1);
							break;
						}
					}
				}
			}
			
			// Slash attack
			if (input.fire && m.fireCDcycle < m.cycle && b.guns[b.activeGun].name === 'daggers') {
				this.slash();
				m.fireCDcycle = m.cycle + 8;
			}
		},
		slash() {
			this.slashCycle++;
			const isLeftSlash = this.slashCycle % 2 === 0;
			const angle = m.angle + (isLeftSlash ? -0.3 : 0.3);
			const range = 120;
			const damage = (m.damageDone || 1) * 0.25 * (this.phase === 2 ? 3 : this.phase === 1 ? 2 : 1);
			
			// Visual slash arc
			const startAngle = angle - 0.5;
			const endAngle = angle + 0.5;
			const slashX = m.pos.x + Math.cos(angle) * range;
			const slashY = m.pos.y + Math.sin(angle) * range;
			
			ctx.beginPath();
			ctx.arc(m.pos.x, m.pos.y, range, startAngle, endAngle);
			ctx.strokeStyle = this.phase === 2 ? "rgba(75, 0, 130, 0.5)" : this.phase === 1 ? "rgba(200, 200, 200, 0.5)" : "rgba(150, 150, 150, 0.5)";
			ctx.lineWidth = 20;
			ctx.stroke();
			
			// Check hits
			for(let i = 0; i < mob.length; i++) {
				if(mob[i].alive) {
					const dx = mob[i].position.x - m.pos.x;
					const dy = mob[i].position.y - m.pos.y;
					const dist = Math.sqrt(dx * dx + dy * dy);
					
					if(dist < range + mob[i].radius) {
						const mobAngle = Math.atan2(dy, dx);
						if(Math.abs(mobAngle - angle) < 0.6) {
							mob[i].damage(damage);
							this.yinYangCharge += 2;
							
							simulation.drawList.push({
								x: mob[i].position.x,
								y: mob[i].position.y,
								radius: Math.sqrt(damage) * 40,
								color: this.phase === 2 ? "rgba(75, 0, 130, 0.6)" : "rgba(200, 200, 200, 0.6)",
								time: simulation.drawTime
							});
						}
					}
				}
			}
		},
		throwDagger() {
			if(this.thrownDaggers.length < 2) {
				const angle = m.angle;
				const speed = 40;
				
				const daggerBody = Matter.Bodies.rectangle(
					m.pos.x + Math.cos(angle) * 40,
					m.pos.y + Math.sin(angle) * 40,
					30, 10,
					{
						angle: angle,
						frictionAir: 0.01,
						collisionFilter: {
							category: cat.bullet,
							mask: cat.mob | cat.map
						}
					}
				);
				
				Matter.Body.setVelocity(daggerBody, {
					x: Math.cos(angle) * speed,
					y: Math.sin(angle) * speed
				});
				
				Matter.Composite.add(engine.world, daggerBody);
				
				this.thrownDaggers.push({
					body: daggerBody,
					lifetime: 120,
					angle: angle
				});
			}
		}
	};
	
	// Add throw keybind handler
	window.addEventListener("keydown", (event) => {
		if (event.key === input.key.throwDaggers && b.guns[b.activeGun] && b.guns[b.activeGun].name === 'daggers') {
			b.guns[b.activeGun].throwDagger();
		}
	});
	
	b.guns.push(e);
	const gunArray = b.guns.filter(
		(obj, index, self) => index === self.findIndex((item) => item.name === obj.name)
	);
	b.guns = gunArray;
	
	console.log("%cdaggers weapon successfully installed", "color: gray");
})();
