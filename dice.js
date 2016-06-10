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

//Roll until i have one of each kind on a d6 and return the average number of rolls needed
function rollOneOfEachKind(numberOfSides, numberOfDice) {

  var matchFound = false;
  var counts = [0,0,0,0,0,0];
  var diceLeftToRoll = numberOfDice;
  var totalRolls = 0;
  var i;

  while (diceLeftToRoll!=0) {
        for (i = 0; i < diceLeftToRoll; i++) {
            roll = rollSingle(numberOfSides);
            if (counts[roll-1] == 0) {
//              console.log (" value ",roll, counts[roll-1]);
              counts[roll-1] = 1;
              diceLeftToRoll--;
            }
            totalRolls++;
        }
  }
  return totalRolls;
}
//console.log('Rolls for one of each kind on a d6', rollOneOfEachKind(6,6));

//This function just runs the above function as many times as you'd like and keeps
//a running count of the number of rolls it took.  That total is then used to
//determine the average number of rolls required
function getAverageRollsOneOfEachKind(numberOfSides, numberOfDice, loops) {
    var i;
    var runningTotal = 0;

    for (i = 0; i < loops; i++) {
        runningTotal += rollOneOfEachKind(numberOfSides, numberOfDice);
    }
    return runningTotal / loops;
}
console.log('Average number of rolls for one of ach kind, with 100000 loops', getAverageRollsOneOfEachKind(6,6,100000));

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
        }
        else {
            foundMatch = (diceLeftToRoll === 0);
        }
    }
    return totalRolls;
}
//console.log('roll 6 d6, until they there are at least 5 matches of 1 -> Totalrolls =', rollUntilNumberOfKind(6, 6, 1, 5));


//This function just runs the above function as many times as you'd like and keeps
//a running count of the number of rolls it took.  That total is then used to
//determine the average number of rolls required
function getAverageRollsToMatch(numberOfSides, numberOfDice, numberToMatch, numberOfKind, loops) {
    var i;
    var runningTotal = 0;

    console.log('\nRoll', numberOfDice,'d',numberOfSides, 'until there are at least', numberOfKind, 'of a kind, over', loops, 'rolls');
    for (i = 0; i < loops; i++) {
        runningTotal += rollUntilNumberOfKind(numberOfSides, numberOfDice, numberToMatch, numberOfKind);
    }
    return runningTotal / loops;
}

//This rolls 6 six-sided dice 100000 times.  It looks to match the number 1 a number of times.
//console.log(getAverageRollsToMatch(6, 9, 1, 1, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 2, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 3, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 4, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 5, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 6, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 7, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 8, 100000));
//console.log(getAverageRollsToMatch(6, 9, 1, 9, 100000));

//This function returns the most matches regards of the specific face of the
//dice rolled the once which will in turn be used as the icon to match to determine the
//number of rolls for any icon of a kind which i susspect will be easier then
//trying to roll a specific icon a number of times.
function mostMatchesOnSingleRoll(numberOfSides,numberOfDice) {
  var counts =[];
  var mostDiceSide = 0;  //the 1 side on the dice
  var i;

  counts = rollMultiple(numberOfSides,numberOfDice);
  //start at dice side 2 as 1 is automatically the most to begin
  for (i = 1; i < numberOfSides; i++) {
      if (counts[mostDiceSide] < counts[i]) {
          mostDiceSide = i;
      }
  }
  //console.log('Dice rolled', counts, 'most', mostDiceSide, counts[mostDiceSide]);
  return counts[mostDiceSide];
}
//console.log(mostMatchesOnSingleRoll(6,6));

//This function rolls a set of dice until they all match the supplied
//number. After each roll, it checks to see how many matches there were
//and sets those dice aside.  This is repeated until the specific number of dice match.
//The result is the number of rolls it took to get the number of matches specificied.
function rollUntilNumberOfKindWithSingleRoll(numberOfSides, numberOfDice, numberToMatch, numberOfKind, intialRollMatches) {

    var foundMatch = false;
    var diceLeftToRoll = numberOfDice;
    var totalRolls = 1;
    var rollResult = [];
    var matches = 0;
    var matchesTotal = 0;

    if (intialRollMatches >= numberOfKind) {
        return totalRolls;
    }
    else {
        diceLeftToRoll = diceLeftToRoll - intialRollMatches;
        matchesTotal = intialRollMatches;
    }

    while (!foundMatch) {
        totalRolls++;
        rollResult = rollMultiple(numberOfSides, diceLeftToRoll);
        matches = rollResult[numberToMatch - 1];
        matchesTotal += matches;
        diceLeftToRoll = diceLeftToRoll - matches;
        if (matchesTotal >= numberOfKind) {
            foundMatch = true;
        }
        else {
            foundMatch = (diceLeftToRoll === 0);
        }
    }
    return totalRolls;
}
//console.log('roll 6 d6, until they there are at least 5 matches of 1 -> Totalrolls =', rollUntilNumberOfKind(6, 6, 1, 5));

//This function just runs the above function as many times as you'd like and keeps
//a running count of the number of rolls it took.  That total is then used to
//determine the average number of rolls required after taking the best initial roll
function getAverageRollsToMatchWithSeed(numberOfSides, numberOfDice, numberToMatch, numberOfKind, loops) {
    var i;
    var runningTotal = 0;
    var matchesSingleRoll = 0;

    console.log('\nRoll', numberOfDice,'d',numberOfSides, 'until there are at least', numberOfKind, 'of a kind not specific, over', loops, 'rolls');
    for (i = 1; i < loops; i++) {
        runningTotal += rollUntilNumberOfKindWithSingleRoll(numberOfSides, numberOfDice, numberToMatch, numberOfKind, mostMatchesOnSingleRoll(numberOfSides,numberOfDice));
    }
    return runningTotal / loops;
}

//This rolls 6 six-sided dice 100000 times.  It looks to match the number 1 a number of times.
//console.log(getAverageRollsToMatchWithSeed(6, 3, 1, 1, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 3, 1, 2, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 3, 1, 3, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 4, 1, 4, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 5, 1, 5, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 6, 1, 6, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 7, 1, 7, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 8, 1, 8, 100000));
//console.log(getAverageRollsToMatchWithSeed(6, 9, 1, 9, 100000));
