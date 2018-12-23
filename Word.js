var Letter = require("./Letter")
var chalk = require("chalk")

function Word(originalWord) {
    this.guessedCorrectly = 0
    this.originalWord = originalWord
    this.letters = []
    this.createLetters = function() {
        var arrayString = this.originalWord.split('')
        for (var i = 0; i < arrayString.length; i++) {
            this.letters.push( new Letter( arrayString[i] ) )
        }
    }

    this.check = function(guessLetter) {
        // check if any letters have been guessed (update Letter, returns true)
        for (var i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
        // if check letter returns true, increase count for guessedCorrectly
            if ( currentLetter.check(guessLetter) ) {
                this.guessedCorrectly++
            }
        }
    }

    this.print = function() {
        console.log(this.letters.join(' '))
    }

    this.guess = function() {
        var allGuessed = true
        // assume all have been guessed, to turn false if at least one is not
        for (var i = 0; i < this.letters.length; i++) {
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