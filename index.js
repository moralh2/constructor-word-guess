var inquirer = require('inquirer')
var Word = require("./Word")
var loop = 10

var guessTheWord = function(loop) {
    if (loop > 0) {
        inquirer.prompt({
            name: "guess",
            message: "What letter do you want to try?"
        }).then(function(answers){
            loop--
            palabra.check(answers.guess)
            guessTheWord(loop)
        })
    }
}


var palabra = new Word('Josefina')
palabra.createLetters()
guessTheWord(loop)