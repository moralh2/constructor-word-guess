var inquirer = require('inquirer')
var Word = require("./Word")
var turnsRemaining = 10
var allGuessed = false
// var selection = ["Disenchantment", "Stranger Things", "Black Mirror", "House Of Cards", "Daredevil", "Ozark", "Big Mouth", "Grace and Frankie"]

var guessTheWord = function() {
    if (turnsRemaining > 0 && !allGuessed) {
        inquirer.prompt({
            name: "guess",
            message: "What letter do you want to try?",
            validate: function(input) {
                var alphaArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
                if (alphaArray.indexOf(input.toUpperCase()) != -1) {
                    return true
                }
                else {
                    return false
                }
            }
        }).then(function(answers){
            turnsRemaining--
            palabra.check(answers.guess)
            allGuessed = palabra.guess()
            guessTheWord()
        })
    }
}


var palabra = new Word('Car')
palabra.createLetters()
guessTheWord()