
// New Weapons - 60 total with upgrade techs
const newWeapons = {
    // Particle Weapons (1-10)
    protonCannon: {
        name: "proton cannon",
        ammo: 200,
        damage: 1.3,
        fireRate: 0.8,
        upgrades: ["proton acceleration", "proton clustering", "proton overcharge"]
    },
    neutronLauncher: {
        name: "neutron launcher",
        ammo: 150,
        damage: 1.5,
        fireRate: 0.9,
        upgrades: ["neutron multiplication", "neutron decay boost", "fast neutrons"]
    },
    electronRifle: {
        name: "electron rifle",
        ammo: 300,
        damage: 1.1,
        fireRate: 0.6,
        upgrades: ["electron beam focus", "electron cascade", "positron mix"]
    },
    muonBeamer: {
        name: "muon beamer",
        ammo: 100,
        damage: 1.8,
        fireRate: 1.2,
        upgrades: ["muon lifetime extend", "muon storm", "muon penetration"]
    },
    tauGun: {
        name: "tau gun",
        ammo: 80,
        damage: 2.0,
        fireRate: 1.5,
        upgrades: ["tau decay chains", "tau lepton boost", "tau force"]
    },
    pionProjector: {
        name: "pion projector",
        ammo: 120,
        damage: 1.4,
        fireRate: 0.85,
        upgrades: ["pion decay", "charged pions", "pion shower"]
    },
    kaonBlaster: {
        name: "kaon blaster",
        ammo: 90,
        damage: 1.6,
        fireRate: 1.0,
        upgrades: ["kaon oscillation", "strange kaons", "kaon regeneration"]
    },
    zetaParticleGun: {
        name: "zeta particle gun",
        ammo: 110,
        damage: 1.5,
        fireRate: 0.95,
        upgrades: ["zeta resonance", "zeta width", "zeta spin"]
    },
    omegaBaryon: {
        name: "omega baryon launcher",
        ammo: 70,
        damage: 2.2,
        fireRate: 1.4,
        upgrades: ["omega cascade", "omega stability", "triple strange"]
    },
    lambdaParticle: {
        name: "lambda particle emitter",
        ammo: 130,
        damage: 1.3,
        fireRate: 0.8,
        upgrades: ["lambda decay mode", "lambda polarization", "lambda production"]
    },

    // Energy Weapons (11-20)
    plasmaCaster: {
        name: "plasma caster",
        ammo: 100,
        damage: 1.7,
        fireRate: 1.1,
        upgrades: ["plasma temperature", "plasma confinement", "plasma instability"]
    },
    ionCannon: {
        name: "ion cannon",
        ammo: 140,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["ionization boost", "ion acceleration", "ion cluster"]
    },
    photonTorpedo: {
        name: "photon torpedo",
        ammo: 60,
        damage: 2.5,
        fireRate: 1.8,
        upgrades: ["photon coherence", "photon burst", "light speed"]
    },
    xRayBlaster: {
        name: "x-ray blaster",
        ammo: 180,
        damage: 1.2,
        fireRate: 0.7,
        upgrades: ["x-ray penetration", "hard x-rays", "x-ray fluorescence"]
    },
    gammaLaser: {
        name: "gamma laser",
        ammo: 50,
        damage: 2.8,
        fireRate: 2.0,
        upgrades: ["gamma intensity", "gamma burst", "gamma radiation"]
    },
    ultravioletBeam: {
        name: "ultraviolet beam",
        ammo: 200,
        damage: 1.1,
        fireRate: 0.6,
        upgrades: ["uv sterilization", "uv ionization", "deep uv"]
    },
    infraredLaser: {
        name: "infrared laser",
        ammo: 250,
        damage: 0.9,
        fireRate: 0.5,
        upgrades: ["thermal tracking", "heat vision", "infrared burn"]
    },
    microwaveGun: {
        name: "microwave gun",
        ammo: 160,
        damage: 1.3,
        fireRate: 0.85,
        upgrades: ["microwave resonance", "dielectric heating", "microwave amplification"]
    },
    radiowavePulse: {
        name: "radiowave pulse",
        ammo: 220,
        damage: 1.0,
        fireRate: 0.65,
        upgrades: ["radio interference", "em pulse", "radio jamming"]
    },
    terahertzWeapon: {
        name: "terahertz weapon",
        ammo: 140,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["thz imaging", "thz absorption", "thz resonance"]
    },

    // Exotic Weapons (21-30)
    strangeletBomb: {
        name: "strangelet bomb",
        ammo: 40,
        damage: 3.0,
        fireRate: 2.5,
        upgrades: ["strangelet stability", "strange matter conversion", "strangelet chain"]
    },
    monopoleLauncher: {
        name: "monopole launcher",
        ammo: 30,
        damage: 3.5,
        fireRate: 3.0,
        upgrades: ["magnetic monopole", "dirac string", "monopole pairs"]
    },
    axionEmitter: {
        name: "axion emitter",
        ammo: 170,
        damage: 1.2,
        fireRate: 0.75,
        upgrades: ["axion coupling", "invisible axions", "axion dark matter"]
    },
    wimpGun: {
        name: "wimp gun",
        ammo: 190,
        damage: 1.1,
        fireRate: 0.7,
        upgrades: ["wimp interactions", "wimp detection", "supersymmetric wimps"]
    },
    machoProjector: {
        name: "macho projector",
        ammo: 80,
        damage: 2.0,
        fireRate: 1.5,
        upgrades: ["massive compact halo", "macho density", "macho detection"]
    },
    Q_ballLauncher: {
        name: "Q-ball launcher",
        ammo: 60,
        damage: 2.3,
        fireRate: 1.8,
        upgrades: ["Q-ball stability", "non-topological soliton", "Q-ball charge"]
    },
    skyrmionGun: {
        name: "skyrmion gun",
        ammo: 120,
        damage: 1.5,
        fireRate: 1.0,
        upgrades: ["topological charge", "skyrmion size", "skyrmion lattice"]
    },
    instantonWeapon: {
        name: "instanton weapon",
        ammo: 90,
        damage: 1.8,
        fireRate: 1.3,
        upgrades: ["instanton tunneling", "vacuum decay", "false vacuum"]
    },
    solitonWave: {
        name: "soliton wave",
        ammo: 150,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["soliton stability", "wave propagation", "soliton collision"]
    },
    vortexCannon: {
        name: "vortex cannon",
        ammo: 110,
        damage: 1.6,
        fireRate: 1.1,
        upgrades: ["vortex lines", "flux quantization", "vortex pinning"]
    },

    // Quantum Weapons (31-40)
    coherenceBreaker: {
        name: "coherence breaker",
        ammo: 130,
        damage: 1.4,
        fireRate: 0.85,
        upgrades: ["decoherence rate", "quantum noise", "environmental coupling"]
    },
    entanglementGun: {
        name: "entanglement gun",
        ammo: 100,
        damage: 1.6,
        fireRate: 1.0,
        upgrades: ["bell states", "spooky action", "quantum correlations"]
    },
    superpositionCannon: {
        name: "superposition cannon",
        ammo: 120,
        damage: 1.5,
        fireRate: 0.95,
        upgrades: ["quantum states", "wave collapse", "schrodinger equation"]
    },
    tunnelingRifle: {
        name: "tunneling rifle",
        ammo: 180,
        damage: 1.2,
        fireRate: 0.7,
        upgrades: ["barrier penetration", "tunneling probability", "quantum tunneling"]
    },
    uncertaintyPulse: {
        name: "uncertainty pulse",
        ammo: 140,
        damage: 1.3,
        fireRate: 0.8,
        upgrades: ["heisenberg limit", "uncertainty principle", "momentum spread"]
    },
    wavePacket: {
        name: "wave packet launcher",
        ammo: 160,
        damage: 1.3,
        fireRate: 0.85,
        upgrades: ["gaussian wave", "wave dispersion", "packet width"]
    },
    probabilityGun: {
        name: "probability gun",
        ammo: 150,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["wave function", "probability density", "quantum measurement"]
    },
    eigenWeapon: {
        name: "eigenstate weapon",
        ammo: 110,
        damage: 1.6,
        fireRate: 1.0,
        upgrades: ["eigenvalues", "eigenvectors", "stationary states"]
    },
    operatorGun: {
        name: "operator gun",
        ammo: 130,
        damage: 1.5,
        fireRate: 0.9,
        upgrades: ["hermitian operators", "commutators", "observables"]
    },
    densityMatrix: {
        name: "density matrix blaster",
        ammo: 100,
        damage: 1.7,
        fireRate: 1.1,
        upgrades: ["mixed states", "trace operator", "reduced density"]
    },

    // Gravitational Weapons (41-50)
    gravitonBeam: {
        name: "graviton beam",
        ammo: 90,
        damage: 1.8,
        fireRate: 1.2,
        upgrades: ["gravitational waves", "graviton mass", "spin-2 particles"]
    },
    blackHoleBomb: {
        name: "black hole bomb",
        ammo: 20,
        damage: 4.0,
        fireRate: 4.0,
        upgrades: ["hawking radiation", "black hole evaporation", "information paradox"]
    },
    tidalGun: {
        name: "tidal force gun",
        ammo: 120,
        damage: 1.5,
        fireRate: 0.95,
        upgrades: ["spaghettification", "tidal disruption", "roche limit"]
    },
    spacetimeRipper: {
        name: "spacetime ripper",
        ammo: 70,
        damage: 2.2,
        fireRate: 1.6,
        upgrades: ["metric perturbation", "curvature singularity", "spacetime tear"]
    },
    warpBubble: {
        name: "warp bubble projector",
        ammo: 80,
        damage: 2.0,
        fireRate: 1.4,
        upgrades: ["alcubierre metric", "negative energy", "warp speed"]
    },
    frameShifter: {
        name: "frame shifter",
        ammo: 140,
        damage: 1.3,
        fireRate: 0.85,
        upgrades: ["reference frames", "relativistic effects", "lorentz boost"]
    },
    geodesicGun: {
        name: "geodesic gun",
        ammo: 160,
        damage: 1.2,
        fireRate: 0.8,
        upgrades: ["curved paths", "geodesic deviation", "christoffel symbols"]
    },
    metricWeapon: {
        name: "metric weapon",
        ammo: 110,
        damage: 1.6,
        fireRate: 1.0,
        upgrades: ["metric tensor", "line element", "einstein equations"]
    },
    curvatureBomb: {
        name: "curvature bomb",
        ammo: 50,
        damage: 2.8,
        fireRate: 2.2,
        upgrades: ["ricci tensor", "riemann curvature", "weyl tensor"]
    },
    gravityLens: {
        name: "gravity lens",
        ammo: 130,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["light bending", "einstein ring", "strong lensing"]
    },

    // Dimensional Weapons (51-60)
    hyperspaceGun: {
        name: "hyperspace gun",
        ammo: 100,
        damage: 1.7,
        fireRate: 1.1,
        upgrades: ["higher dimensions", "compactification", "kaluza-klein"]
    },
    braneSlasher: {
        name: "brane slasher",
        ammo: 80,
        damage: 2.0,
        fireRate: 1.4,
        upgrades: ["membrane collision", "brane tension", "bulk field"]
    },
    stringResonator: {
        name: "string resonator",
        ammo: 120,
        damage: 1.5,
        fireRate: 0.95,
        upgrades: ["vibrational modes", "string coupling", "fundamental strings"]
    },
    tesseractLauncher: {
        name: "tesseract launcher",
        ammo: 60,
        damage: 2.4,
        fireRate: 1.8,
        upgrades: ["4D projection", "hypercube rotation", "dimensional folding"]
    },
    kleinGun: {
        name: "klein bottle gun",
        ammo: 90,
        damage: 1.8,
        fireRate: 1.2,
        upgrades: ["non-orientable", "one-sided surface", "topology twist"]
    },
    mobiusBlaster: {
        name: "mobius blaster",
        ammo: 140,
        damage: 1.3,
        fireRate: 0.85,
        upgrades: ["single edge", "twisted strip", "loop paradox"]
    },
    calybiWeapon: {
        name: "calabi-yau weapon",
        ammo: 70,
        damage: 2.1,
        fireRate: 1.5,
        upgrades: ["manifold structure", "ricci flat", "complex geometry"]
    },
    holographicGun: {
        name: "holographic gun",
        ammo: 150,
        damage: 1.4,
        fireRate: 0.9,
        upgrades: ["surface encoding", "holographic principle", "information boundary"]
    },
    bulkProjector: {
        name: "bulk projector",
        ammo: 110,
        damage: 1.6,
        fireRate: 1.0,
        upgrades: ["extra dimensions", "bulk field", "brane world"]
    },
    dualityWeapon: {
        name: "duality weapon",
        ammo: 100,
        damage: 1.7,
        fireRate: 1.1,
        upgrades: ["t-duality", "s-duality", "mirror symmetry"]
    }
};
