var Letter = require("./Letter")
var chalk = require("chalk")

function Word(originalWord) {
    this.originalWord = originalWord
    this.letters = []
    this.createLetters = function() {
        var arrayString = this.originalWord.split('')
        for(var i = 0; i < arrayString.length; i++) {
            this.letters.push( new Letter(arrayString[i]) )
        }
    }
    this.check = function(guessLetter) {
        var guessedCorrectly = false

        // check if any letters have been guessed (update Letter, returns true)
        for(var i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
            guessedCorrectly = currentLetter.check(guessLetter)
        }

        // variables for priting the outcome of this guess
        var playerGuess = chalk.bold(guessLetter.toUpperCase())
        var message = ''
        // print the outcome based on if guessedCorrectly was true 
        if(guessedCorrectly) {
            message = chalk.green("You entered: " + playerGuess + " ---- You guessed correctly!")
        }
        else {
            message = chalk.red("You entered: " + playerGuess + " ---- That was not correct!")
        }
        console.log(message)

        // print masked word
        this.print()
    }
    this.print = function() {
        console.log(this.letters.join(' '))
    }
    this.guess = function() {
        var allGuessed = true
        // assume all have been guessed, to turn false if at least one is not
        for(var i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
            if (!currentLetter.guessed) {
                // turn false if at least one is still not guessed
                allGuessed = false
            }
        }
        // if all have been guessed, return guess is true, false otherwise
        return allGuessed
    }
}

module.exports = Word