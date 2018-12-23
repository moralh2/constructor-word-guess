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
        if (playerInput.toUpperCase() === this.character.toUpperCase()) {
            this.guessed = true
            return true
        }
    }
}

module.exports = Letter