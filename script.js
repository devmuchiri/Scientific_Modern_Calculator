document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;

            if (!isNaN(value) || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } else {
                switch (value) {
                    case 'AC':
                        currentInput = '';
                        previousInput = '';
                        operation = null;
                        display.value = '';
                        break;
                    case 'DEL':
                        currentInput = currentInput.slice(0, -1);
                        display.value = currentInput;
                        break;
                    case '=':
                        if (previousInput && currentInput && operation) {
                            currentInput = calculate(previousInput, currentInput, operation);
                            display.value = currentInput;
                            previousInput = '';
                            operation = null;
                        }
                        break;
                    default:
                        if (currentInput) {
                            if (previousInput && operation) {
                                previousInput = calculate(previousInput, currentInput, operation);
                            } else {
                                previousInput = currentInput;
                            }
                            operation = value;
                            currentInput = '';
                            display.value = previousInput;
                        }
                }
            }
        });
    });

    function calculate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return b !== 0 ? (a / b).toString() : 'Error';
            case '%':
                return (a % b).toString();
            default:
                return b.toString();
        }
    }
});