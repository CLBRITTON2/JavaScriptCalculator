class Calculator {
    constructor(previousOperationTextElement, currentOperationTextElement) 
    {
        this.previousOperationTextElement = previousOperationTextElement;
        this.currentOperationTextElement = currentOperationTextElement;
        this.Clear();
    }
    Clear()
    {
        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }
    Delete()
    {

    }
    DisplayNumber(number)
    {
        if(number === '.' && this.currentOperation.includes('.'))
        {
            return;
        }
        this.currentOperation = this.currentOperation.toString() + number.toString();
    }
    SelectOperation(operation)
    {
        if (this.currentOperation === '')
        {
            return;
        }
        if (this.currentOperation != '')
        {
            this.Calculate();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }
    Calculate()
    {
        let calculation;
        const previous = parseFloat(this.previousOperation);
        const current = parseFloat(this.currentOperation);

        if(isNaN(previous || isNaN(current)))
        {
            return;
        }
        
        switch(this.operation)
        {
        case '+':
            calculation = previous + current;
            break;
        case '-':
            calculation = previous - current;
            break;
        case 'x':
            calculation = previous * current;
            break;
        case '÷':
            calculation = previous / current;
            break;

        default: return;
        }

        this.currentOperation = calculation;
        this.operation = undefined;
        this.previousOperation = '';
    }
    UpdateDisplay()
    {

        this.currentOperationTextElement.innerText = this.currentOperation;
        this.previousOperationTextElement.innerText = this.previousOperation;
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperationTextElement = document.querySelector('[data-previous-operation]')
const currentOperationTextElement = document.querySelector('[data-current-operation]')

const calculator = new Calculator(previousOperationTextElement, currentOperationTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.DisplayNumber(button.innerText);
        calculator.UpdateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.SelectOperation(button.innerText);
        calculator.UpdateDisplay();
    })
})
equalsButton.addEventListener('click', button => {
    calculator.Calculate();
    calculator.UpdateDisplay();
})
clearButton.addEventListener('click', button => {
    calculator.Clear();
    calculator.UpdateDisplay();
})