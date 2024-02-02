// This is a translation of my Python version of this code, written whilst
// getting up to speed with JavaScript and Node.js. It's an example of a
// generator function which uses a linearly converging, generalized continued
// fraction to calculate the digits of pi to arbitrary precision.

function* pi() {
    let k = 2n, a = 4n, b = 1n, a1 = 12n, b1 = 4n;
    let p, q, d, d1, a_old, b_old;

    while (true) {
        p = k * k; q = 2n * k + 1n; k = k + 1n;
        a_old = a; b_old = b;
        a = a1; b = b1; a1 = p * a_old + q * a1; b1 = p * b_old + q * b1;
        d = a / b; d1 = a1 / b1;

        while (d === d1) {
            yield d;
            a = 10n * (a % b); a1 = 10n * (a1 % b1);
            d = a / b; d1 = a1 / b1;
        }
    }
}

let digits;
if (process.argv.length < 3 || !/^\d+$/.test(process.argv[2]))
    digits = 1000;
else 
    digits = Number(process.argv[2]);

let count = 0;
for (let d of pi()) {
    process.stdout.write(d.toString());
    if (count++ === digits)
        break;
}

process.stdout.write('\n\n');
