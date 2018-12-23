var Letter = require("./Letter")

function Word(array) {
    this.letters = array
    this.check = function(guessLetter) {
        for(i = 0; i < this.letters.length; i++) {
            var currentLetter = this.letters[i]
            currentLetter.check(guessLetter)
        }
    }
    this.print = function() {
        console.log(this.letters.join(' '))
    }
}

var a = new Letter('b')
var b = new Letter('c')
var c = new Letter('d')
var array = [a,b,c]

// console.log(array.join(' '))

// b.check('b')

// console.log(array.join(' '))

// b.check('c')

// console.log(array.join(' '))

var palabra = new Word(array)

palabra.check('a')
palabra.print()
palabra.check('c')
palabra.print()