var main = function () {
    var overwatchPhase = function() {
        // VARIABLE DECLARATION
        var doOverwatch = prompt("Will the unit being charged perform overwatch?");
        var toughness = prompt("What is the enemy's Toughness?");
        var save = prompt("Enemy armour save (0 means no save)");
        var invuln = prompt("Enemy invulnerable save (0 means no save)");
        var cover = prompt("Enemy cover save (0 means no save)");
        var wounds = 0;
        var shotStats = []; //an array containing the stats of all shots fired by the overwatching unit
        var diceRoll = function() {
            return (1 + Math.floor(Math.random() * 6));
        };
        
        var isWound = function(strength, ap, toughness) {
            var rollNeeded = 0;
            var difference = strength - toughness;
            if (difference < -3) {
                return false;
            }
            rollNeeded = 4 - difference;
            rollNeeded = Math.max(rollNeeded, 2);
            rollNeeded = Math.min(rollNeeded, 6);
            if (ap <= save) {
                save = 0;
            }
            var saveUsed = Math.min(save, invuln, cover);
            
            
            if (diceRoll() >= rollNeeded) {
                if (saveUsed > 0) {
                    if (diceRoll() < saveUsed) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        };
        
        //gunStats returns an object representing the stats of a single type of weapons fire
        var gunStats = function() {
            return {
                shotNumber: 0,
                hitNumber: 0,
                strength: 0,
                armourPiercing: 0,
                populate: function() {
                    this.shotNumber = prompt("How many shots are being fired by this weapon?");
                    this.strength = prompt("What is this weapon's strength?");
                    this.armourPiercing = prompt("What is this weapon's AP? (0 indicates no AP)");
                    return this;
                }
            };
        };
        
        
        //gather the stats for the weapons being fired
        var shotType = 0;
        do {
            var again = false;
            shotStats[shotType] = gunStats().populate();
            var moreTypes = prompt("Are any further weapon types being fired? (Y/N)");
            if (moreTypes === "Y") {
                again = true;
                shotType++;
            }
        } while (again === true);
        
        //calculate number of hits for each shot type
        for (i = 0; i < shotStats.length; i++) { // for each type of shot being fired
            for (j = 0; j < shotStats[i].shotNumber; j++) { // for each shot fired of that type
                if (diceRoll() >= 2) {
                    shotStats[i].hitNumber++;
                };
            };
        };
        
        
        // calculate number of wounds suffered by charging unit
        for (i = 0; i < shotStats.length; i ++) {
            for (j = 0; j < shotStats[i].hitNumber; j++) {
                if (isWound(shotStats[i].strength, shotStats[i].armourPiercing, toughness)) {
                  wounds++;  
                };
            };
        };
    };
    
    overwatchPhase();
    
};

$(document).ready(main);