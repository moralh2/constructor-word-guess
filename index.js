var inquirer = require('inquirer')
var Word = require("./Word")
var chalk = require("chalk")

var askPlayer = function () {
    inquirer.prompt({
        name: "guess",
        message: "What letter do you want to try?",
        validate: function (input) {
            var alphaArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
            if (alphaArray.indexOf(input.toUpperCase()) != -1) {
                return true
            }
            else {
                return false
            }
        }
    }).then(function (answers) {
        game.userTyped = answers.guess
        game.checkInput(answers.guess)
    })
}

var game = {
    active: 0,                                      //save state (game is running or not)
    wins: 0,                                        //how many times the user has won
    plays: 0,                                       // //how many times the user has played
    losses: 0,                                      
    wrongCount: 0,                                  //how many letters the user has gotten wrong
    guessLetters: [],                               //letters guessed by user
    wrongLetters: [],
    palabra: {},                                    // the word obj (array of letter objs)
    userTyped: '',

    runGame: function () {                           //this controls whether to keep playing or start a new game
        if (this.active == 0) {                     //if a game is not running, start a new one
            this.preSteps()
        }
        else {                                      //if game is running...
            this.gameSteps()                           //play a turn in the game
        }
    },

    preSteps: function () {
        this.active = 1
        this.wrongCount = 0
        this.chooseWord(this.plays)
    },

    chooseWord: function (index) {
        var selection = ["Disenchantment", "Stranger Things", "Black Mirror", "House Of Cards", "Daredevil", "Ozark", "Big Mouth", "Grace and Frankie"]
        this.palabra = new Word(selection[index])
        this.palabra.createLetters()
        console.log( chalk.yellow.italic.underline("Try to guess this Netflix show: ") )
        this.palabra.print()
        this.gameSteps()
    },

    gameSteps: function () {
        askPlayer()
    },

    checkInput: function () {
        userTyped = this.userTyped
        if (this.guessLetters.indexOf(userTyped) == -1) {      //if the input is new
            this.guessLetters.push(userTyped)                 //add letter to arr of played letters
            this.checkIfCorrect()
            this.checkIfGameOver()
        }
        else {
            console.log("You played that already!")
            this.checkIfGameOver()
        }
    },

    checkIfCorrect: function () {
        var oldCount = this.palabra.guessedCorrectly
        this.palabra.check(this.userTyped)
        var newCount = this.palabra.guessedCorrectly - oldCount
        var playerGuess = chalk.bold(this.userTyped.toUpperCase())
        var message = ''


        if (newCount == 0) {                                         //if flag was never set to correct
            this.wrongCount += 1
            this.wrongLetters.push(this.userTyped)                     //increase count for wrong -- needed?
            message = chalk.red("You entered: " + playerGuess + " ---- That was not correct!")
        }
        else {
            message = chalk.green("You entered: " + playerGuess + " ---- You guessed correctly!")
        }

        console.log(message)
        this.palabra.print()

    },

    checkIfGameOver: function () {

        if (this.palabra.guess()) {              //if the displayed and correct match
            this.wins++                               //the game has ended - user wins
            this.active = 0
            this.plays++
            console.log( chalk.green("You guessed it!") )
            this.gameOverSeq()
        }
        else if (this.wrongCount >= 10) {                            //user losses and game ends at 30 tries
            this.active = 0
            this.plays++
            this.losses++
            chalk.red("You didn't guess it!")
            this.gameOverSeq()
        }
        else {
            this.runGame()
        }
    },

    gameOverSeq: function () {
        this.guessLetters = []
        this.wrongLetters = []
        if (this.plays >= 8) {
            console.log("You played all the shows! Congrats!")
            return
        }
        this.preSteps()

    }
}

game.runGame()