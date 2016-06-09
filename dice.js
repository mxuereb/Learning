//Tell it how many sides the die has and it'll roll it
//and return a random value between 1 and 'sides'.
function rollSingle(numberOfSides) {
    return Math.floor((Math.random() * numberOfSides) + 1);
}
//console.log('roll a single 6-sided dice ->', rollSingle(6));

//Tell it how many dice to roll and how many sides.
//It'll return an array of counts for each side.
//For example, if I roll 10 6-sided dice a possible
//result could be [2,3,1,0,2,2].
function rollMultiple(numberOfSides, numberOfDice) {
    var counts = [];
    var i;
    for (i = 0; i < numberOfSides; i++) {
        counts[i] = 0;

    }
    var roll;
    for (i = 0; i < numberOfDice; i++) {
        roll = rollSingle(numberOfSides);
        counts[roll - 1]++;
    }
    return counts;
}
//console.log('roll 6 d6 and count results->', rollMultiple(6, 6));

//This function rolls a set of dice until they all match the supplied
//number. After each roll, it checks to see how many matches there were
//and sets those dice aside.  This is repeated until the specific number of dice match.
//The result is the number of rolls it took to get the number of matches specificied.
function rollUntilNumberOfKind(numberOfSides, numberOfDice, numberToMatch, numberOfKind) {

    var foundMatch = false;
    var diceLeftToRoll = numberOfDice;
    var totalRolls = 0;
    var rollResult = [];
    var matches = 0;
    var matchesTotal = 0;

    while (!foundMatch) {
        totalRolls++;
        rollResult = rollMultiple(numberOfSides, diceLeftToRoll);
        matches = rollResult[numberToMatch - 1];
        matchesTotal += matches;
        diceLeftToRoll = diceLeftToRoll - matches;
        if (matchesTotal >= numberOfKind) {
            foundMatch = true;

        if (matches => numberOfKind) {
          foundMatch = true;
        }
        else {
            foundMatch = (diceLeftToRoll === 0);
        }
    }
    return totalRolls;
}
//console.log('roll 6 d6, until they there are at least 5 matches of 1 -> Totalrolls =', rollUntilNumberOfKind(6, 6, 1, 5));
=======
    console.log('matches so far', matches, 'number of kind ', numberOfKind);;
    console.log('dice left to roll', diceLeftToRoll);;
    console.log('totalRolls', rollResult);;
    return totalRolls;
    }
console.log('roll 6 d6, until they there are at least 5 matches of 1 -> Totalrolls =', rollUntilAllMatch(6, 6, 1, 5));

//This function just runs the above function as many times as you'd like and keeps
//a running count of the number of rolls it took.  That total is then used to
//determine the average number of rolls required
function getAverageRollsToMatch(numberOfSides, numberOfDice, numberToMatch, numberOfKind, loops) {
    var i;
    var runningTotal = 0;
    for (i = 0; i < loops; i++) {
        runningTotal += rollUntilNumberOfKind(numberOfSides, numberOfDice, numberToMatch, numberOfKind);
    }
    return runningTotal / loops;
}

//This rolls 5 six-sided dice 10000 times.  It looks to match the number 1.
console.log('roll 6 d6 until there are at least 5 matches OF 1, do it 10000 times ->', getAverageRollsToMatch(6, 6, 1, 5, 10000));
