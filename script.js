/*1 -  we added data-attributes to the different parts of our calculator in the html file so that we can select them in our js file, this file.*/
/*3 - create a calculator class, add a constructor which will take our previous and current text elements and display them. */
class Calculator {
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

    delete() {  /*24 - the slice method will shop off the last input typed, starting with the first entry: 0 and ending with the last entry: -1.*/
        this.currentOperand = this.chooseOperand.toString().slice(0, -1)

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
        let computation     /*17 - create a variable with let. this will be the result of our compute function.*/
        const prev = parseFloat(this.previousOperand)   /*18 create two more variables, that will be the number of our previous and current operees, this converts a string to a number.*/
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return   /*19 - NaN stands for not a number, return represents cancelling. so this means if there is no number, cancel.*/
        switch (this.operation) {   /*20 - make the math happen.*/
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                    break
            case '÷':       /*copy the division symbol straight from the html file.*/
                computation = prev / current
                    break
            default:    /*21 - default acts like an 'else' statement. so if none of the 4 cases are true, whatever is in the default is what gets executed.*/
                return
        }
        this.currentOperand = computation /*22 - outside of the switch statement, now inside of our calculator we are able to perform calculations.*/
        this.operation = undefined
        this.previousOperand = ''
    }

    /*27 - "helper function", makes it so that we get commas in our numbers in the display, where they're supposed to be, i.e. 100,000.*/
    getDisplayNumber(number) {  /*29 - the rest of this helper function is super complicated and to watch the tutorial for an explaination, refer to the credits in the README file.*/
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {       /*28 - added the getDisplayNumber parts to the updateDisplay() function. so that getDisplayNumber will be reflected in the previous and the current values.*/
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand) /*7 - was just this.currentOperand. step 28 adds the getDisplayNumber part later on.*/
        if (this.operation != null) {       /*26 - this is going to make it so that our previous operation/computation is shown in the top/previous display at the end of it.*/
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        
        this.previousOperandTextElement.innerText = this.previousOperand /*13 - makes step 12, the previous operand move to the top previous section of the display. */
    } else {            /*30 - last step, equal to empty so that the previous operand value is gone and it leaves us with just the current operand value.*/
        this.previousOperandTextElement.innerText = ''
        }
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
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

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
/*16 - make the compute function work.*/
equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
/*23 - make the clear function work.*/
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
/*25 - make the delete function work.*/
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
