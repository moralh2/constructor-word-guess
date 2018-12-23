var Letter = require("./Letter")

function Word(originalWord) {
    this.array = []
    this.create = function(originalWord){
        var characters = originalWord.split('');
        for (i = 0; i < characters.length; i++) {
            var letter = characters[i]
            this.array.push(new Letter(letter))
        }
    this.print = function() {
        console.log(this.word.join(' '))
    }
    // array of letters
    // func returns string representing 
    // fnc takes letter as argument, calls for each letter
}