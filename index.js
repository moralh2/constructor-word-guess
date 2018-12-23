var inquirer = require('inquirer')
var Word = require("./Word")
var chalk = require("chalk")

var askPlayer = function () {                           // use inquirer to prompt user for possible letter to guess in game
    inquirer.prompt({
        name: "guess",
        message: "What letter do you want to try?",
        validate: function (input) {                    // allow only single letters as input
            var alphaArray = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("")
            if (alphaArray.indexOf(input.toUpperCase()) != -1) {
                return true
            }
            else {
                return false
            }
        }
    }).then(function (answers) {
        game.userTyped = answers.guess                  // save answer to game obj
        game.checkInput(answers.guess)                  // verify if the guess was good or bad
    })
}

var game = {
    active: 0,                                          // save state (game is running or not)
    wins: 0,                                            // how many times the user has won
    plays: 0,                                           // how many times the user has played
    losses: 0,                                      
    wrongCount: 0,                                      // how many letters the user has gotten wrong
    guessLetters: [],                                   // letters guessed by user
    wrongLetters: [],
    palabra: {},                                        // the word obj (array of letter objs)
    userTyped: '',

    runGame: function () {                              // this controls whether to keep playing or start a new game
        if (this.active == 0) {                         // if a game is not running, start a new one
            this.preSteps()
        }
        else {                                          // if game is running, play a turn in the game
            this.gameSteps()
        }
    },

    preSteps: function () {                             // set game to active, reset wrongs, pick show
        this.active = 1                             
        this.wrongCount = 0
        this.chooseWord(this.plays)
    },

    chooseWord: function (index) {                      // pick show, create Word obj
        var selection = ["Disenchantment", "Stranger Things", "Black Mirror", "House Of Cards", "Daredevil", "Ozark", "Big Mouth", "Grace and Frankie"]
        this.palabra = new Word(selection[index])
        this.palabra.createLetters()
        console.log( chalk.yellow.italic.underline("\nTry to guess this Netflix show: \n") )
        this.palabra.print()
        this.gameSteps()
    },

    gameSteps: function () {                            // calls inquirer to prompt user for guesses
        askPlayer()
    },

    checkInput: function () {                           // check if input is new -- if so, check if correct -- and continue
        userTyped = this.userTyped
        if (this.guessLetters.indexOf(userTyped) == -1) {    
            this.guessLetters.push(userTyped)                 
            this.checkIfCorrect()
            this.checkIfGameOver()
        }
        else {
            console.log("You played that already!")
            this.checkIfGameOver()
        }
    },

    checkIfCorrect: function () {                  
        var oldCount = this.palabra.guessedCorrectly    // how many letters have been guessed thus far
        this.palabra.check(this.userTyped)              // this will update the individual letter to guessed, and the count of total guessed letters
        var newCount = this.palabra.guessedCorrectly - oldCount
        var playerGuess = chalk.bold(this.userTyped.toUpperCase())
        var message = ''


        if (newCount == 0) {                            // if total guessed letters did not increment (did not guess correctly)
            this.wrongCount += 1
            this.wrongLetters.push(this.userTyped) 
            message = chalk.red("You entered: " + playerGuess + " ---- That was not correct!")
        }
        else {
            message = chalk.green("You entered: " + playerGuess + " ---- You guessed correctly!")
        }

        console.log(message)
        this.palabra.print()

    },

    checkIfGameOver: function () {

        if (this.palabra.guess()) {                     // if all letters have been guessed, add to wins and plays, and run game-over
            this.wins++                              
            this.active = 0
            this.plays++
            console.log( chalk.green("\n-----------------------") )
            console.log( chalk.green("You guessed it!") )
            console.log( chalk.green("-----------------------") )
            this.gameOverSeq()
        }
        else if (this.wrongCount >= 10) {               // if 10 bad guesses, add to losses and plays, and run game-over
            this.active = 0
            this.plays++
            this.losses++
            console.log( chalk.red("\n-----------------------") )
            console.log( chalk.red("You didn't guess it!") )
            console.log( chalk.red("-----------------------") )

            this.gameOverSeq()
        }
        else {
            this.runGame()                              // continue game otherwise
        }
    },

    gameOverSeq: function () {                          // print stats, reset stats at game end
        this.printSomeStats()
        this.guessLetters = []
        this.wrongLetters = []
        if (this.plays >= 8) {                          // if all shows were played, print game-end message and exit
            console.log( chalk.green("\n\n-------------------------------------") )
            console.log( chalk.green.bold("You played all the shows! Congrats!") )
            console.log( chalk.green("-------------------------------------") )
            return
        }
        this.preSteps()
    },

    printSomeStats: function() {
        console.log( chalk.green("The show was: " + this.palabra.originalWord))
        console.log( chalk.red("Bad guesses: " + this.wrongLetters.join(', ')) )
        console.log( chalk.green("WINS: " + this.wins) )
        console.log( chalk.red("LOSSES: " + this.losses) )
    }
}

game.runGame()