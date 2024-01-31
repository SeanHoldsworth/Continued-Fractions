# An example of a generator function which uses a linearly converging,
# generalized continued fraction to calculate the digits of pi to arbitrary
# precision.

def pi():
    k, a, b, a1, b1 = 2, 4, 1, 12, 4

    while True:
        p, q, k = k * k, 2 * k + 1, k + 1
        a, b, a1, b1 = a1, b1, p * a + q * a1, p * b + q * b1
        d, d1 = a // b, a1 // b1

        while d == d1:
            yield d
            a, a1 = 10 * (a % b), 10 * (a1 % b1)
            d, d1 = a // b, a1 // b1

if __name__ == '__main__':
    import sys

    if len(sys.argv) < 2 or not sys.argv[1].isdigit():
        digits = 1000
    else:
        digits = int(sys.argv[1])

    for i, d in enumerate(pi()):
        print(d, end='')
        if i == digits:
            break

    print()
