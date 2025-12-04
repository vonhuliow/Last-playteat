// Currency Display - Shows earnings on kills at top middle
if (typeof window.currencyDisplay === 'undefined') {
    window.currencyDisplay = {
        earnings: [],
        
        showEarning(amount, x, y) {
            this.earnings.push({
                amount: amount,
                x: x,
                y: y,
                cycle: 0,
                duration: 120
            });
        },
        
        draw() {
            for (let i = this.earnings.length - 1; i >= 0; i--) {
                const e = this.earnings[i];
                const progress = e.cycle / e.duration;
                const alpha = Math.max(0, 1 - progress);
                const floatY = e.y - 30 * progress;
                
                ctx.save();
                ctx.globalAlpha = alpha;
                ctx.fillStyle = '#FFD700';
                ctx.font = 'bold 24px Arial';
                ctx.textAlign = 'center';
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 8;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                ctx.fillText('+' + e.amount, e.x, floatY);
                ctx.restore();
                
                e.cycle++;
                if (e.cycle >= e.duration) {
                    this.earnings.splice(i, 1);
                }
            }
        },
        
        drawCurrencyHUD() {
            if (simulation.isChoosing || !m.alive) return;
            
            const hudX = canvas.width / 2;
            const hudY = 30;
            const width = 200;
            const height = 40;
            
            ctx.save();
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(hudX - width / 2, hudY - height / 2, width, height, 8);
            ctx.fill();
            ctx.stroke();
            
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('$ ' + window.progression.currency, hudX, hudY);
            
            ctx.restore();
        }
    };
    
    console.log('%cCurrency Display Loaded!', 'color: gold; font-weight: bold;');
}
