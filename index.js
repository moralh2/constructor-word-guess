var inquirer = require('inquirer')
var Word = require("./Word")
var turnsRemaining = 10
var allGuessed = false

var guessTheWord = function() {
    if (turnsRemaining > 0 && !allGuessed) {
        inquirer.prompt({
            name: "guess",
            message: "What letter do you want to try?"
        }).then(function(answers){
            turnsRemaining--
            palabra.check(answers.guess)
            allGuessed = palabra.guess()
            guessTheWord()
        })
    }
}


var palabra = new Word('Car')
palabra.createLetters()
guessTheWord()