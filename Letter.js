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

module.exports = Letter