var main = function () {
    function overwatchPhase() {
        // VARIABLE DECLARATION
        var toughness = document.getElementById("toughness").value;
		console.log(toughness);
        var save = document.getElementById("save").value;
        var invuln = document.getElementById("invuln").value;
        var cover = document.getElementById("cover").value;
		var gunTypes = document.getElementById("gunTypes").value;
		console.log(gunTypes);
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
		for (i = 0; i < gunTypes; i++) {
			shotStats[i] = gunStats().populate();
		};
		
        //calculate number of hits for each shot type
        for (i = 0; i < shotStats.length; i++) { // for each type of shot being fired
            for (j = 0; j < shotStats[i].shotNumber; j++) { // for each shot fired of that type
                if (diceRoll() >= 6) {
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
		
		alert(wounds + " wounds suffered");
		$("#overwatchContainer").addClass("hidden");
    };
    
    //overwatchPhase();
	
	$("#overwatchCheckbox").click(function() {
		if(document.getElementById("overwatchCheckbox").checked == true) {
			$("#overwatchForm").removeClass("hidden");
		} else {
			$("#overwatchForm").addClass("hidden");
		}
	});
    
	$("#overwatchButton").click(function() {
		overwatchPhase();
	});
	
};

$(document).ready(main);