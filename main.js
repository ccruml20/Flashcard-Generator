var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard.js");
var fs = require('fs');
var inquirer = require('inquirer');
var clozeArray = [];
var basicArray = [];
var i = 0;

function start(){
	inquirer.prompt([{
		type: "list",
		message: "Do you want to Make or Study flashcards!",
		choices: ["Make", "Study"],
		name: "start"


	}]).then(function(info) {
		if (info.start === "Make") {
			flashcardChoice();
		} else {
			play();
		}
	});
}

function flashcardChoice() {
	inquirer.prompt([{
		type: "list",
		message: "What kind of flashcard do you want to make?",
		choices: ["Basic", "Cloze"],
		name: "flashcards"
	}]).then(function(answers) {
		if (answers.flashcards === "Cloze") {
			makeCloze();
		} else {
			makeBasic();
		}
	});
};


function makeCloze() {
	inquirer.prompt([{
		type: 'input',
		name: 'text',
		message: 'Input your text for your flashcard! Dont add your Cloze statement'
	},
	{
		type: 'input',
		name: 'cloze',
		message: 'Input your Cloze statement!'
	}
	]).then(function(clozeAnswers) {
        // console.log(JSON.stringify(clozeAnswers, null, '  '));
        var newCloze = new ClozeCard(clozeAnswers.text, clozeAnswers.cloze);
        console.log(newCloze.partial())
        console.log(newCloze.fullText());
        clozeArray.push(newCloze);
        console.log(clozeArray);
        makeAnotherCloze();
    });
}

function makeAnotherCloze(){
	inquirer.prompt([{
		type: "list",
		message: "Make another Card or Study",
		choices: ["Make", "Study"],
		name: "flashcards"
	}]).then(function(answers) {
		if (answers.flashcards === "Make") {
			makeCloze();
		} else {
			play();
		}
	});
}


function makeBasic() {
	inquirer.prompt([{
		type: 'input',
		name: 'front',
		message: 'Input your question!'
	},
	{
		type: 'input',
		name: 'back',
		message: 'Input your Answer!!'
	}
	]).then(function(basicAnswers) {
        // console.log(JSON.stringify(basicAnswers, null, '  '));
        var newBasic = new BasicCard(basicAnswers.front, basicAnswers.back);
        console.log("\nFlashcard Front:  ", newBasic.front);
        console.log("Flashcard Back:  ", newBasic.back);
        basicArray.push(newBasic);
        makeAnotherBasic();
        console.log(basicArray);
    });
}

function makeAnotherBasic(){
	inquirer.prompt([{
		type: "list",
		message: "Make another Card or Study",
		choices: ["Make", "Study"],
		name: "flashcards"
	}]).then(function(answers) {
		if (answers.flashcards === "Make") {
			makeBasic();
		} else {
			play();
		}
	});
}

function play(){
	inquirer.prompt([{
		type: "list",
		message: "Do you want to study Basic or Cloze flashcards?",
		choices: ["Basic", "Cloze"],
		name: "flashcards"
	}]).then(function(playAnswers) {
		if (playAnswers.flashcards === "Cloze") {
			playCloze();
		} else {
			playBasic();
		}
	});
}


function playCloze(){
	inquirer.prompt([{
		type: 'input',
		name: 'clozeGuess',
		message: clozeArray[i].partial()
	},
	]).then(function(info) {
		var answer = info.clozeGuess;
		if(clozeArray[i].back === answer){
			console.log("Correct");
			if(i < (clozeArray.length -1)){
				i++;
				playCloze();
			}else{
				start();
			}
		}else{
			console.log("Wrong Answer");
			if(i < (clozeArray.length -1)){
				i++;
				playCloze();
			}else{
				start();
			}
		}
		console.log(answer);
	});
}


function playBasic(){
	inquirer.prompt([{
		type: 'input',
		name: 'basicGuess',
		message: basicArray[i].front
	},
	]).then(function(info) {	
		var answer = info.basicGuess;
		if(basicArray[i].back === answer){
			console.log("Correct");
			if(i < (basicArray.length -1)){
				i++;
				playBasic();
			}else{
				start();
			}
		}else{
			console.log("Wrong Answer");
			if(i < (basicArray.length -1)){
				i++;
				playBasic();
			}else{
				start();
			}
		}
		console.log(answer);
	});
}


start();

