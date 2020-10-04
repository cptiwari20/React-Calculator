
// For BODMAS
function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current === '' && ch === '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current !== '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    console.log({calc})
    if (calc.length < 2) return 'Please add a valid value!';
    // --- Perform a calculation expressed as an array of operators and numbers
    let ops = ['*', '/', '+', '-'];
    const val = calc.reduce((accumulator, currentValue, index, array) => {
        if(ops.some(option => option === currentValue)){
            const valiue = eval(accumulator + [currentValue] + array[index + 1])
            return valiue
        }else{
            return accumulator
        }
    });
    return val
}


function calculateWithBODMAS(calc) {
    console.log({calc})
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a   / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}


export {
    calculate,
    calculateWithBODMAS,
    parseCalculationString
}