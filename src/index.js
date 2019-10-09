function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let val = 0;
    let num = 0;
    let container = 0;
    let prior = false;
    let ignore = false;//true when loop in ()
    let pos = -1;
    let op = 1;
    let op2 = 0;
    let scan = 0;
    let scan2 = 0;
    let arr = []//pos of ')'
    let a = 0;
    let str = expr.replace(/\s/g, "");
    for (let i = 0; i < str.length; i++) {
        scan = str.substring(i, i + 1);
        if (scan == ')') {
            if (a > 0) {
                str = str.substring(0, arr[arr.length - 1]) + expressionCalculator(str.substring(arr[arr.length - 1] + 1, i)) + str.substring(i + 1, str.length);
                arr.pop();
                a--;
                i = arr[arr.length - 1]
                if (a == 0) {
                    i = 0
                    ignore = false;
                    return expressionCalculator(str);
                }
                continue;
            } else {
                throw "ExpressionError: Brackets must be paired";
            }
        } else if (scan == '(') {
            if (!(a < 0)) {
                a++;
                arr.push(i);
                ignore = true;
                continue;
            } else {
                throw "ExpressionError: Brackets must be paired";
            }
        }
        if (Math.abs(scan) + 1 > 0 && !ignore) {
            if (pos < 0) {
                pos = i;
            }
            prior = false;
            if (i < str.length - 1) {
                scan2 = str.substring(i + 1, i + 2)
                if (Number(Math.abs(scan2) + 1) > 0 || scan2 === ".") {
                    continue;
                } else if (scan2 === '+' || scan2 === '-') {
                    op2 = 1;
                } else if (scan2 === '*') {
                    prior = true;
                    op2 = 3;
                } else if (scan2 === '/') {
                    prior = true;
                    op2 = 4;
                }
            }
            num = Number(str.substring(pos, i + 1));
            if (i > 0) {
                if (str.substring(pos - 2, pos) == "--") {
                    num = Number(str.substring(pos, i + 1));
                } else if (str.substring(pos - 1, pos) == "-") {
                    num = -Number(str.substring(pos, i + 1));
                }
            }
            if (op == 1) {
                if (prior) {
                    container = val;
                    val = num;
                } else {
                    val += num;
                }
            } else if (op == 3) {
                val *= num;
                if (!prior) {
                    val += container;
                }
            } else if (op == 4) {
                if (num != 0) {
                    val /= num;
                } else {
                    throw "TypeError: Division by zero.";
                }
                if (!prior) {
                    val += container;
                }
            }
            pos = -1;
            op = op2;
        }
    }
    if (a > 0) {
        throw "ExpressionError: Brackets must be paired";
    }
    return val;
}

module.exports = {
    expressionCalculator
}