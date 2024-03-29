// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   console.log()
  return input.question("Enter a word to score: ");
};

//assuming what we pass in is a word
function simpleScore(word){
  return word.length;
}

function vowelBonusScore(word){
  word = word.toLowerCase();
	let vowels = ['a','e','i','o','u'];
	let score = 0;
	let i = 0;
	while(i < word.length){
		if(vowels.includes(word[i])){
			score += 3;
		}
		else{
			score += 1;
		}
		i = i + 1;
	}
	return score;
}





function scorerPrompt() {
	console.log("Which scoring algorithm would you like to use?");
	console.log();
	console.log("0 - Simple: One point per character");
	console.log("1 - Vowel Bonus: Vowels are worth 3 points");
	console.log("2 - Scrabble: Uses scrabble point system");
	return input.question("Enter 0, 1, or 2: ");
}





function transform(pointStructure) {
	let newPointStructure = {};
	for (const pointValue in pointStructure) {
		for(let i = 0; i < pointStructure[pointValue].length; i++){
			let letter = pointStructure[pointValue][i];
			newPointStructure[letter.toLowerCase()] = Number(pointValue);
      
  	}
    
	}
  console.log(newPointStructure)
	return newPointStructure;
  
}

let newPointStructure = transform(oldPointStructure);



function scrabbleScore(word){
  let score = 0;
	let i = 0;
	while(i < word.length){
		let letter = word[i];
		score = score + newPointStructure[letter.toLowerCase()];
		i = i + 1;
    
	}
  
	return score;
}

const scoringAlgorithms = [ {name           : "Simple Score",
                             description    : "Each letter is worth 1 point.",
														 scoringFunction : simpleScore},

														{name           : "Bonus Vowels",
                             description    : "Vowels are 3 pts, consonants are 1 pt.",
														 scoringFunction : vowelBonusScore},

														{name           : "Scrabble",
                             description    : "The traditional scoring algorithm",
														 scoringFunction : scrabbleScore} ];

function runProgram() {
  console.clear();
  let word = initialPrompt();
	let scorer_choice = scorerPrompt();
  console.log("Score for \'"+ word +"\':" + scoringAlgorithms[scorer_choice].scoringFunction(word));

}
// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

