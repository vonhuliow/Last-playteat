
const enhancedOptions = {
    graphics: {
        particleEffects: true,
        screenShake: true,
        lighting: true,
        shadows: false
    },
    audio: {
        masterVolume: 0.8,
        sfxVolume: 0.8,
        musicVolume: 0.6
    },
    controls: {
        mouseSensitivity: 1.0,
        invertMouse: false,
        autoFire: false
    },
    gameplay: {
        showDamageNumbers: true,
        showHealthBars: true,
        screenBounds: false,
        bulletTime: false
    },
    multiplayer: {
        showPlayerNames: true,
        allowSpectators: true,
        maxPlayers: 4
    }
};

function showEnhancedOptions() {
    const overlay = document.createElement('div');
    overlay.id = 'options-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.8); z-index: 2000; display: flex;
        justify-content: center; align-items: center;
    `;
    
    const optionsPanel = document.createElement('div');
    optionsPanel.style.cssText = `
        background: #222; color: white; padding: 30px; border-radius: 10px;
        max-width: 600px; max-height: 80vh; overflow-y: auto;
        border: 2px solid #555;
    `;
    
    optionsPanel.innerHTML = `
        <h2>Enhanced Game Options</h2>
        
        <h3>Graphics</h3>
        <label><input type="checkbox" id="particle-effects" ${enhancedOptions.graphics.particleEffects ? 'checked' : ''}> Particle Effects</label><br>
        <label><input type="checkbox" id="screen-shake" ${enhancedOptions.graphics.screenShake ? 'checked' : ''}> Screen Shake</label><br>
        <label><input type="checkbox" id="lighting" ${enhancedOptions.graphics.lighting ? 'checked' : ''}> Dynamic Lighting</label><br>
        <label><input type="checkbox" id="shadows" ${enhancedOptions.graphics.shadows ? 'checked' : ''}> Shadows</label><br>
        
        <h3>Audio</h3>
        <label>Master Volume: <input type="range" id="master-volume" min="0" max="1" step="0.1" value="${enhancedOptions.audio.masterVolume}"></label><br>
        <label>SFX Volume: <input type="range" id="sfx-volume" min="0" max="1" step="0.1" value="${enhancedOptions.audio.sfxVolume}"></label><br>
        <label>Music Volume: <input type="range" id="music-volume" min="0" max="1" step="0.1" value="${enhancedOptions.audio.musicVolume}"></label><br>
        
        <h3>Controls</h3>
        <label>Mouse Sensitivity: <input type="range" id="mouse-sensitivity" min="0.1" max="3" step="0.1" value="${enhancedOptions.controls.mouseSensitivity}"></label><br>
        <label><input type="checkbox" id="invert-mouse" ${enhancedOptions.controls.invertMouse ? 'checked' : ''}> Invert Mouse</label><br>
        <label><input type="checkbox" id="auto-fire" ${enhancedOptions.controls.autoFire ? 'checked' : ''}> Auto Fire</label><br>
        
        <h3>Gameplay</h3>
        <label><input type="checkbox" id="damage-numbers" ${enhancedOptions.gameplay.showDamageNumbers ? 'checked' : ''}> Show Damage Numbers</label><br>
        <label><input type="checkbox" id="health-bars" ${enhancedOptions.gameplay.showHealthBars ? 'checked' : ''}> Show Health Bars</label><br>
        <label><input type="checkbox" id="screen-bounds" ${enhancedOptions.gameplay.screenBounds ? 'checked' : ''}> Screen Bounds</label><br>
        <label><input type="checkbox" id="bullet-time" ${enhancedOptions.gameplay.bulletTime ? 'checked' : ''}> Bullet Time Mode</label><br>
        
        <h3>Multiplayer</h3>
        <label><input type="checkbox" id="player-names" ${enhancedOptions.multiplayer.showPlayerNames ? 'checked' : ''}> Show Player Names</label><br>
        <label><input type="checkbox" id="allow-spectators" ${enhancedOptions.multiplayer.allowSpectators ? 'checked' : ''}> Allow Spectators</label><br>
        <label>Max Players: <input type="number" id="max-players" min="2" max="8" value="${enhancedOptions.multiplayer.maxPlayers}"></label><br>
        
        <h3>Super Powers</h3>
        <button onclick="tech.giveTech('Green Lantern Ring')" style="background: green; color: white; margin: 5px; padding: 5px;">Green Lantern (G key)</button>
        <button onclick="tech.giveTech('Spider Powers')" style="background: red; color: white; margin: 5px; padding: 5px;">Spider-Man (J key)</button>
        <button onclick="tech.giveTech('Iron Man Suit')" style="background: gold; color: black; margin: 5px; padding: 5px;">Iron Man (H key)</button>
        <button onclick="tech.giveTech('Hulk Strength')" style="background: green; color: white; margin: 5px; padding: 5px;">Hulk (K key)</button><br>
        
        <h3>Super Weapons</h3>
        <button onclick="b.giveGuns('minigun')" style="background: darkred; color: white; margin: 5px; padding: 5px;">Minigun</button>
        <button onclick="b.giveGuns('plasma cannon')" style="background: purple; color: white; margin: 5px; padding: 5px;">Plasma Cannon</button>
        <button onclick="b.giveGuns('web shooter')" style="background: blue; color: white; margin: 5px; padding: 5px;">Web Shooter</button>
        <button onclick="b.giveGuns('repulsor')" style="background: cyan; color: black; margin: 5px; padding: 5px;">Repulsor</button><br>
        
        <h3>Multiplayer</h3>
        <button onclick="multiplayer.createRoom()" style="background: blue; color: white; margin: 5px; padding: 5px;">Create Room</button>
        <input type="text" id="room-code" placeholder="Room Code" style="margin: 5px;">
        <button onclick="multiplayer.joinRoom(document.getElementById('room-code').value)" style="background: purple; color: white; margin: 5px; padding: 5px;">Join Room</button><br>
        
        <h3>Admin</h3>
        <button onclick="promptAdminLogin()" style="background: gold; color: black; margin: 5px; padding: 5px;">Admin Login</button><br>
        
        <br>
        <button onclick="applyOptions(); document.body.removeChild(document.getElementById('options-overlay'));" style="background: green; color: white; padding: 10px 20px; margin: 10px;">Apply & Close</button>
        <button onclick="document.body.removeChild(document.getElementById('options-overlay'));" style="background: red; color: white; padding: 10px 20px; margin: 10px;">Cancel</button>
    `;
    
    overlay.appendChild(optionsPanel);
    document.body.appendChild(overlay);
}

function applyOptions() {
    // Apply all option changes
    enhancedOptions.graphics.particleEffects = document.getElementById('particle-effects').checked;
    enhancedOptions.graphics.screenShake = document.getElementById('screen-shake').checked;
    enhancedOptions.graphics.lighting = document.getElementById('lighting').checked;
    enhancedOptions.graphics.shadows = document.getElementById('shadows').checked;
    
    enhancedOptions.audio.masterVolume = parseFloat(document.getElementById('master-volume').value);
    enhancedOptions.audio.sfxVolume = parseFloat(document.getElementById('sfx-volume').value);
    enhancedOptions.audio.musicVolume = parseFloat(document.getElementById('music-volume').value);
    
    enhancedOptions.controls.mouseSensitivity = parseFloat(document.getElementById('mouse-sensitivity').value);
    enhancedOptions.controls.invertMouse = document.getElementById('invert-mouse').checked;
    enhancedOptions.controls.autoFire = document.getElementById('auto-fire').checked;
    
    enhancedOptions.gameplay.showDamageNumbers = document.getElementById('damage-numbers').checked;
    enhancedOptions.gameplay.showHealthBars = document.getElementById('health-bars').checked;
    enhancedOptions.gameplay.screenBounds = document.getElementById('screen-bounds').checked;
    enhancedOptions.gameplay.bulletTime = document.getElementById('bullet-time').checked;
    
    enhancedOptions.multiplayer.showPlayerNames = document.getElementById('player-names').checked;
    enhancedOptions.multiplayer.allowSpectators = document.getElementById('allow-spectators').checked;
    enhancedOptions.multiplayer.maxPlayers = parseInt(document.getElementById('max-players').value);
    
    // Save to localStorage
    localStorage.setItem('enhancedOptions', JSON.stringify(enhancedOptions));
    
    simulation.inGameConsole('Options applied and saved!');
}

// Load options on startup
window.addEventListener('load', () => {
    const saved = localStorage.getItem('enhancedOptions');
    if (saved) {
        Object.assign(enhancedOptions, JSON.parse(saved));
    }
});
