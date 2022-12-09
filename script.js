/*1 -  we added data-attributes to the different parts of our calculator in the html file so that we can select them in our js file, this file.*/
/*3 - create a calculator class, add a constructor which will take our previous and current text elements and display them. */
class calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
/*4 - next we think about all of the different functions our calculator can perform, and define them.*/
    clear() {
        this.currentOperand = ''   /*' ' to convert to an empty string when the user hits the clear button.*/
        this.previousOperand = ''
        this.operation = undefined   /*undefined since they wont have any operations selected if the user cleared everything.*/
    }

    delete() {

    }
    /*appendNumber essentially is what happens everytime a user clicks on a number and it adds it to the screen.*/
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return     /*9 - so that if the user types a 'period' more than once, by mistake, it wont do more than one in a row.*/
        this.currentOperand = this.currentOperand.toString() + number.toString()   /*8 - because we want our numbers to be appended and not added.*/
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return /*14 - ensures that the compute function will not execute if there is an empty calculator/input. */
        if (this.previousOperand !== '') {  /*15 - ensures that is the previous operand !==(is not equal to) an empty string '', it will compute. this will update all the variable as we need.*/
            this.compute()                          /*lets us do multiple operations in a row.*/
        }
        this.operation = operation  /*11 - that way our calculator knows what operation it needs to use when it computes the value.*/
        this.previousOperand = this.currentOperand /*12 - moves users previous number into the previous number area, above the new input.*/
        this.currentOperand = ''
    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand /*7 */
        this.previousOperandTextElement.innerText = this.previousOperand /*13 - makes step 12, the previous operand move to the top previous section of the display. */
    }
}

/*2 - we will start by making some constant variables that will be all of our buttons. data attributes must be inside of brackets.*/
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

/*5 - creating a calculator. here we are hooking up all of our different variables and making them operate on our calculator object.*/
    /*here we are going to make a new calculator, which is how you define classes. then we pass everything from our constructor into it.*/
const calculator = new calculator(previousOperandTextElement, currentOperandTextElement)

/*6 - add all of our number buttons and an eventListener; this states that everytime the user 'clicks' a button we want it to do something.*/
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()  /*so that everytime we click on a number button, our display is updated on the webpage.*/
    })
})
/*10 - do the same thing as step 6 - numberButtons, but for our operation buttons.*/
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)    /*instead of append a number, we want to choose an operation.*/
        calculator.updateDisplay()
    })
})
