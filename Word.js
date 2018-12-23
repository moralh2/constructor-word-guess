var Letter = require("./Letter")

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
        for(var i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
            currentLetter.check(guessLetter)
        }
        this.print()
    }
    this.print = function() {
        console.log(this.letters.join(' '))
    }
}


var palabra = new Word('Josefina')
palabra.createLetters()
palabra.print()
palabra.check('a')
// palabra.print()



palabra.check('x')
palabra.check('a')
palabra.check('j')