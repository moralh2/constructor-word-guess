var Word = require("./Word")


var palabra = new Word('Josefina')
palabra.createLetters()
palabra.print()
palabra.check('a')
// palabra.print()



palabra.check('x')
palabra.check('a')
palabra.check('j')