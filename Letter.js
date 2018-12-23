function Letter(character, guessed = false) {
    this.character = character
    this.guessed = guessed
    this.toString = function() {
        if (this.guessed) {
            return this.character.toUpperCase();
        }
        return '_'
    }
    this.check = function(playerInput) {
        if (playerInput === this.character) {
            this.guessed = true
        }
    }
}

var a = new Letter('b')
var b = new Letter('c')
var c = new Letter('d')
var array = [a,b,c]

console.log(array.join(' '))

b.check('b')

console.log(array.join(' '))

b.check('c')

console.log(array.join(' '))
