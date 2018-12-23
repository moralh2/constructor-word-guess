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
        var playerGuess = chalk.bold(guessLetter.toUpperCase())
        var message = ''
        for(var i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
            guessedCorrectly = currentLetter.check(guessLetter)
        }
        if(guessedCorrectly) {
            message = chalk.green("You entered: " + playerGuess + " ---- You guessed correctly!")
        }
        else {
            message = chalk.red("You entered: " + playerGuess + " ---- That was not correct!")
        }
        console.log(message)
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
                allGuessed = false
                // turn false if at least one is still not guessed
            }
        }
        // if all have been guessed, return guess is true, false otherwise
        return allGuessed
    }
}

module.exports = Word