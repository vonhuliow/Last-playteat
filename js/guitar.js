
javascript:(function() {
	const e = {
		name: "guitar",
		descriptionFunction() { 
			return `unleash <b>sonic waves</b> that disrupt mobs<br><em>fury bar</em> fills with kills and usage<br>fury mode: <strong>50x damage</strong>, speed boost, purple aura`
		},
		ammo: Infinity,
		ammoPack: Infinity,
		defaultAmmoPack: Infinity,
		have: false,
		furyCharge: 0,
		maxFuryCharge: 100,
		furyMode: false,
		furyDuration: 0,
		maxFuryDuration: 300,
		killCount: 0,
		haveEphemera: false,
		fire() {},
		do() {
			if(!this.haveEphemera) {
				this.haveEphemera = true;
				simulation.ephemera.push({
					name: "guitar",
					do() {
						// Update fury bar display
						if(b.guns[b.activeGun] && b.guns[b.activeGun].name === 'guitar') {
							const gun = b.guns[b.activeGun];
							// Draw fury bar
							const barWidth = 200;
							const barHeight = 20;
							const x = m.pos.x - barWidth / 2;
							const y = m.pos.y - 80;
							
							ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
							ctx.fillRect(x, y, barWidth, barHeight);
							
							if(gun.furyMode) {
								const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
								gradient.addColorStop(0, "rgb(138, 43, 226)");
								gradient.addColorStop(1, "rgb(75, 0, 130)");
								ctx.fillStyle = gradient;
								ctx.fillRect(x, y, barWidth * (gun.furyDuration / gun.maxFuryDuration), barHeight);
							} else {
								const gradient = ctx.createLinearGradient(x, y, x + barWidth, y);
								gradient.addColorStop(0, "rgb(138, 43, 226)");
								gradient.addColorStop(1, "rgb(186, 85, 211)");
								ctx.fillStyle = gradient;
								ctx.fillRect(x, y, barWidth * (gun.furyCharge / gun.maxFuryCharge), barHeight);
							}
							
							ctx.strokeStyle = "rgb(75, 0, 130)";
							ctx.lineWidth = 2;
							ctx.strokeRect(x, y, barWidth, barHeight);
						}
					}
				});
			}
			
			// Check for kills to charge fury
			const currentMobCount = mob.length;
			if(this.killCount > currentMobCount) {
				this.furyCharge += (this.killCount - currentMobCount) * 5;
			}
			this.killCount = currentMobCount;
			
			// Manage fury mode
			if(this.furyMode) {
				this.furyDuration--;
				if(this.furyDuration <= 0) {
					this.furyMode = false;
					this.furyCharge = 0;
				}
				
				// Draw purple electric aura
				const auraRadius = 60 + Math.sin(simulation.cycle * 0.3) * 10;
				for(let i = 0; i < 8; i++) {
					const angle = (i / 8) * Math.PI * 2 + simulation.cycle * 0.1;
					const x = m.pos.x + Math.cos(angle) * auraRadius;
					const y = m.pos.y + Math.sin(angle) * auraRadius;
					
					ctx.beginPath();
					ctx.arc(x, y, 5, 0, Math.PI * 2);
					ctx.fillStyle = "rgba(138, 43, 226, 0.8)";
					ctx.fill();
					
					// Lightning between aura points
					if(Math.random() < 0.3) {
						const nextAngle = ((i + 1) / 8) * Math.PI * 2 + simulation.cycle * 0.1;
						const nextX = m.pos.x + Math.cos(nextAngle) * auraRadius;
						const nextY = m.pos.y + Math.sin(nextAngle) * auraRadius;
						
						ctx.beginPath();
						ctx.moveTo(x, y);
						ctx.lineTo(nextX, nextY);
						ctx.strokeStyle = "rgba(186, 85, 211, 0.6)";
						ctx.lineWidth = 2;
						ctx.stroke();
					}
				}
			}
			
			// Activate fury mode
			if(this.furyCharge >= this.maxFuryCharge && !this.furyMode) {
				this.furyMode = true;
				this.furyDuration = this.maxFuryDuration;
				simulation.inGameConsole("<span style='color: rgb(138, 43, 226);'>FURY MODE ACTIVATED!</span>");
			}
			
			// Fire guitar wave
			if (input.fire && m.fireCDcycle < m.cycle && b.guns[b.activeGun].name === 'guitar') {
				this.fireWave();
				m.fireCDcycle = m.cycle + (this.furyMode ? 5 : 20);
				
				// Charge fury on use
				if(!this.furyMode) {
					this.furyCharge += 0.5;
					this.furyCharge = Math.min(this.furyCharge, this.maxFuryCharge);
				}
			}
		},
		fireWave() {
			const angle = m.angle;
			const range = 800;
			const waveWidth = this.furyMode ? 150 : 100;
			const damage = (m.damageDone || 1) * 0.15 * (this.furyMode ? 50 : 1);
			
			// Create wave visual
			for(let i = 0; i < 3; i++) {
				const offsetAngle = angle + (i - 1) * 0.3;
				const startX = m.pos.x + Math.cos(offsetAngle) * 50;
				const startY = m.pos.y + Math.sin(offsetAngle) * 50;
				const endX = startX + Math.cos(offsetAngle) * range;
				const endY = startY + Math.sin(offsetAngle) * range;
				
				// Draw wave
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineTo(endX, endY);
				ctx.strokeStyle = this.furyMode ? "rgba(138, 43, 226, 0.6)" : "rgba(100, 200, 255, 0.6)";
				ctx.lineWidth = waveWidth / 3;
				ctx.stroke();
				
				// Check for mob hits
				for(let j = 0; j < mob.length; j++) {
					if(mob[j].alive) {
						const result = Matter.Query.ray([mob[j]], {x: startX, y: startY}, {x: endX, y: endY});
						if(result.length > 0) {
							mob[j].damage(damage);
							
							// Slow effect
							mobs.statusSlow(mob[j], this.furyMode ? 180 : 90);
							
							simulation.drawList.push({
								x: mob[j].position.x,
								y: mob[j].position.y,
								radius: Math.sqrt(damage) * 30,
								color: this.furyMode ? "rgba(138, 43, 226, 0.6)" : "rgba(100, 200, 255, 0.6)",
								time: simulation.drawTime
							});
						}
					}
				}
			}
			
			// Visual ripple effect
			for(let i = 0; i < 5; i++) {
				setTimeout(() => {
					simulation.drawList.push({
						x: m.pos.x + Math.cos(angle) * (i * 150),
						y: m.pos.y + Math.sin(angle) * (i * 150),
						radius: waveWidth - (i * 10),
						color: this.furyMode ? "rgba(138, 43, 226, 0.3)" : "rgba(100, 200, 255, 0.3)",
						time: 10
					});
				}, i * 50);
			}
		}
	};
	
	b.guns.push(e);
	const gunArray = b.guns.filter(
		(obj, index, self) => index === self.findIndex((item) => item.name === obj.name)
	);
	b.guns = gunArray;
	
	console.log("%cguitar weapon successfully installed", "color: rgb(138, 43, 226)");
})();
