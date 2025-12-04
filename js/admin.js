
const adminSystem = {
    isAdmin: false,
    adminKey: null,
    adminCommands: new Map(),
    
    // Simple authentication system
    authenticate(key) {
        // In production, this would hash and verify against server
        const validKeys = ['admin123', 'dev456', 'super789'];
        if (validKeys.includes(key)) {
            this.isAdmin = true;
            this.adminKey = key;
            simulation.inGameConsole(`<strong style="color: gold;">Admin access granted</strong>`);
            this.setupAdminCommands();
            return true;
        }
        simulation.inGameConsole(`<strong style="color: red;">Invalid admin key</strong>`);
        return false;
    },
    
    setupAdminCommands() {
        // Register admin commands
        this.adminCommands.set('god', () => {
            m.health = m.maxHealth;
            m.energy = m.maxEnergy;
            m.immuneCycle = Infinity;
            simulation.inGameConsole(`<strong style="color: gold;">God mode enabled</strong>`);
        });
        
        this.adminCommands.set('kill_all', () => {
            for (let i = mob.length - 1; i >= 0; i--) {
                if (mob[i].alive) {
                    mob[i].death();
                }
            }
            simulation.inGameConsole(`<strong style="color: gold;">All mobs eliminated</strong>`);
        });
        
        this.adminCommands.set('level', (levelNum) => {
            const num = parseInt(levelNum);
            if (num && num > 0 && num < 100) {
                level.levelsCleared = num - 1;
                level.nextLevel();
                simulation.inGameConsole(`<strong style="color: gold;">Warped to level ${num}</strong>`);
            }
        });
        
        this.adminCommands.set('spawn_powerup', (type) => {
            const validTypes = ['heal', 'ammo', 'tech', 'gun', 'field', 'research', 'boost'];
            if (validTypes.includes(type)) {
                powerUps.spawn(m.pos.x, m.pos.y, type);
                simulation.inGameConsole(`<strong style="color: gold;">Spawned ${type} power-up</strong>`);
            }
        });
        
        this.adminCommands.set('give_tech', (techName) => {
            for (let i = 0; i < tech.tech.length; i++) {
                if (tech.tech[i].name.toLowerCase().includes(techName.toLowerCase())) {
                    tech.giveTech(i);
                    simulation.inGameConsole(`<strong style="color: gold;">Granted ${tech.tech[i].name}</strong>`);
                    break;
                }
            }
        });
    },
    
    executeCommand(command, ...args) {
        if (!this.isAdmin) {
            simulation.inGameConsole(`<strong style="color: red;">Admin access required</strong>`);
            return false;
        }
        
        if (this.adminCommands.has(command)) {
            this.adminCommands.get(command)(...args);
            return true;
        }
        
        simulation.inGameConsole(`<strong style="color: red;">Unknown admin command: ${command}</strong>`);
        return false;
    },
    
    // Admin panel UI
    showAdminPanel() {
        if (!this.isAdmin) return;
        
        const panel = document.createElement('div');
        panel.id = 'admin-panel';
        panel.style.cssText = `
            position: fixed; top: 10px; right: 10px; width: 300px;
            background: rgba(0,0,0,0.9); color: gold; padding: 20px;
            border: 2px solid gold; border-radius: 10px; z-index: 1000;
            font-family: monospace; font-size: 12px;
        `;
        
        panel.innerHTML = `
            <h3>Admin Panel</h3>
            <button onclick="adminSystem.executeCommand('god')">God Mode</button><br>
            <button onclick="adminSystem.executeCommand('kill_all')">Kill All Mobs</button><br>
            <input type="number" id="level-input" placeholder="Level" min="1" max="99">
            <button onclick="adminSystem.executeCommand('level', document.getElementById('level-input').value)">Warp</button><br>
            <select id="powerup-select">
                <option value="heal">Heal</option>
                <option value="ammo">Ammo</option>
                <option value="tech">Tech</option>
                <option value="gun">Gun</option>
                <option value="field">Field</option>
            </select>
            <button onclick="adminSystem.executeCommand('spawn_powerup', document.getElementById('powerup-select').value)">Spawn</button><br>
            <button onclick="document.body.removeChild(document.getElementById('admin-panel'))">Close</button>
        `;
        
        document.body.appendChild(panel);
    }
};

// Admin authentication prompt
function promptAdminLogin() {
    const key = prompt('Enter admin key:');
    if (key && adminSystem.authenticate(key)) {
        adminSystem.showAdminPanel();
    }
}
