//Tell it how many sides the die has and it'll roll it
//and return a random value between 1 and 'sides'.
function rollSingle(numberOfSides) {
    return Math.floor((Math.random() * numberOfSides) + 1);
}
console.log('roll a single 6-sided dice ->', rollSingle(6));

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
console.log('roll 5, 6-sided dice ->', rollMultiple(6, 5));
 
//This function rolls a set of dice until they all match the supplied 
//number. After each roll, it checks to see how many matches there were
//and sets those dice aside.  This is repeated until all the dice match.
//The result is the number of rolls it took to get them all to match.
function rollUntilAllMatch(numberOfSides, numberOfDice, numberToMatch) {

    var allMatch = false;
    var diceLeftToRoll = numberOfDice;
    var totalRolls = 0;
    var rollResult = [];
    var matches = 0;
    
    while (!allMatch) {
        totalRolls++;
        rollResult = rollMultiple(numberOfSides, diceLeftToRoll);
        matches = rollResult[numberToMatch - 1];
        diceLeftToRoll = diceLeftToRoll - matches;
        allMatch = diceLeftToRoll === 0;
    }

    return totalRolls;
}
console.log('roll 5, 6-sided dice until they all match 1 ->', rollUntilAllMatch(6, 5, 1));

//This function just runs the above function as many times as you'd like and keeps
//a running count of the number of rolls it took.  That total is then used to 
//determine the average number of rolls required
function getAverageRollsToMatch(numberOfSides, numberOfDice, numberToMatch, loops) {
    var i;
    var runningTotal = 0;
    for (i = 0; i < loops; i++) {
        runningTotal += rollUntilAllMatch(numberOfSides, numberOfDice, numberToMatch);
    }
    return runningTotal / loops;
}

//This rolls 5 six-sided dice 10000 times.  It looks to match the number 1. 
console.log('roll 5, 6-sided dice until they all match 1, do it 10000 times ->', getAverageRollsToMatch(6, 5, 1, 10000));
