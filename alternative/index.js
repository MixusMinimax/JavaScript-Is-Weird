function convertNumber(number) {
    if (number === 0) return '+[]'
    else return Array(number).fill('+!![]').join('+ ')
}

const chars = {}

function convertString(str) {
    return str.split('').map(c => chars[c] || (() => {throw new Error(c)})()).join('+ ')
}

chars.a = `(![]+[])[${convertNumber(1)}]`
chars.b = `(({})+[])[${convertNumber(2)}]`
chars.c = `(({})+[])[${convertNumber(5)}]`
chars.d = `((/!/)[-!![]]+[])[${convertNumber(2)}]`
chars.e = `(!![]+[])[${convertNumber(3)}]`
chars.f = `(![]+[])[${convertNumber(0)}]`
chars.i = `((/!/)[-!![]]+[])[${convertNumber(5)}]`
chars.n = `((/!/)[-!![]]+[])[${convertNumber(1)}]`
chars.o = `(({})+[])[${convertNumber(1)}]`
chars.r = `(!![]+[])[${convertNumber(1)}]`
chars.s = `(![]+[])[${convertNumber(3)}]`
chars.t = `(!![]+[])[${convertNumber(0)}]`
chars.u = `(!![]+[])[${convertNumber(2)}]`
chars[' '] = `(({})+[])[${convertNumber(7)}]`
chars['\\'] = `(/\\\\/+[])[${convertNumber(1)}]`
var objectConstructor = `({})[${convertString('constructor')}]`
var numberConstructor = `(+[])[${convertString('constructor')}]`
chars.m = `(${numberConstructor}+[])[${convertNumber(11)}]`
var regexConstructor = `(/!/)[${convertString('constructor')}]`
chars.p = `(${regexConstructor}+[])[${convertNumber(14)}]`
var functionConstructor = `(()=>{})[${convertString('constructor')}]`
chars.C = `${functionConstructor}(${convertString('return escape')})()(${chars['\\']})[${convertNumber(2)}]`
var stringConstructor = `([]+[])[${convertString('constructor')}]`
chars.S = `(${stringConstructor}+[])[${convertNumber(9)}]`
chars.g = `(${stringConstructor}+[])[${convertNumber(14)}]`
chars.h = `(${convertNumber(17)})[${convertString('toString')}](${convertNumber(18)})`

var fromCharCode = `${stringConstructor}[${convertString('fromCharCode')}]`
var fromCharCodeAccessor = `${objectConstructor}[+[]]`
var setCharCode = `${fromCharCodeAccessor}=${fromCharCode}`

function parseCharCode(char) {
    return `${fromCharCodeAccessor}(${convertNumber(char.charCodeAt(0))})`
}

function convertFullString(string) {
    return string.split('').map(c => parseCharCode(c)).join('+ ')
}

function compile(code) {
    return `(()=>(${functionConstructor}((${convertFullString('delete Object.constructor[0];')})+(${convertFullString(code)}))()))(${setCharCode})`
}

console.log(compile('console.log("Hello world!");'))
