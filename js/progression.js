// Progression System - Save/Load Player Data, Currency, and Purchases
if (typeof window.progression === 'undefined') {
    window.progression = {
        currency: 0,
        totalEarned: 0,
        purchasedItems: {
            colors: [],
            weapons: [],
            techs: [],
            secretWeapons: []
        },
        
        // Tier-based currency payouts
        tierPayouts: {
            0: 5,      // Starter mobs
            1: 15,     // Tier 1
            2: 35,     // Tier 2
            3: 75,     // Tier 3
            4: 150,    // Tier 4
            5: 300     // Boss/Final
        },
        
        save() {
            const data = {
                currency: this.currency,
                totalEarned: this.totalEarned,
                purchasedItems: this.purchasedItems,
                characterCustomization: window.characterCustomization ? {
                    selectedColor: window.characterCustomization.selectedColor,
                    selectedHat: window.characterCustomization.selectedHat,
                    selectedCompanion: window.characterCustomization.selectedCompanion,
                    equippedWeapon: window.characterCustomization.equippedWeapon
                } : {}
            };
            localStorage.setItem('ngonProgression', JSON.stringify(data));
        },
        
        load() {
            const data = JSON.parse(localStorage.getItem('ngonProgression'));
            if (!data) return;
            
            this.currency = data.currency || 0;
            this.totalEarned = data.totalEarned || 0;
            this.purchasedItems = data.purchasedItems || { colors: [], weapons: [], techs: [], secretWeapons: [] };
            
            if (data.characterCustomization && window.characterCustomization) {
                window.characterCustomization.selectedColor = data.characterCustomization.selectedColor;
                window.characterCustomization.selectedHat = data.characterCustomization.selectedHat;
                window.characterCustomization.selectedCompanion = data.characterCustomization.selectedCompanion;
            }
        },
        
        awardCurrency(mobTier, isBoss = false) {
            const payout = this.tierPayouts[mobTier] || 5;
            const multiplier = isBoss ? 2 : 1;
            const earned = payout * multiplier;
            
            this.currency += earned;
            this.totalEarned += earned;
            this.save();
            
            return earned;
        },
        
        purchase(category, itemName, cost) {
            if (this.currency >= cost) {
                this.currency -= cost;
                if (!this.purchasedItems[category]) {
                    this.purchasedItems[category] = [];
                }
                if (!this.purchasedItems[category].includes(itemName)) {
                    this.purchasedItems[category].push(itemName);
                }
                this.save();
                return true;
            }
            return false;
        },
        
        hasPurchased(category, itemName) {
            return this.purchasedItems[category] && this.purchasedItems[category].includes(itemName);
        }
    };
    
    // Load on page load
    window.progression.load();
    console.log('%cProgression System Loaded! Currency:', 'color: gold; font-weight: bold;', window.progression.currency);
}
