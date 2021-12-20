/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * A weighted array is an array which stores elements which have a **weight** property. 
 * 
 * Time complexity:
 * - Getting a single random element - `O(1)`
 * - Weighted cache initialization - `O(n)`. Initialization is ran every time you call any of the random functions **after** you have modified the array in some way (push, pop, splice, shift). So as
 * long as you don't mutate the array very often getting a random value will be in constant time.
 * 
 */

export class WeightedArray<T extends { weight: number}> extends Array<T> {
    private aliases?: Array<[odds: number, alias: number]>;

    private init() : void {
        const len = this.length;
        const avg = this.reduce((acc, val) => acc + val.weight, 0) / len;
        const aliases = new Array<[odds: number, alias: number]>(len).fill([1, Infinity]);
        let small = 0;

        while (small < len && this[small].weight >= avg) small++;

        if (small < len) {
            let smallAlias = [small, this[small].weight / avg];
            let big = 0;
            while (big < len && this[big].weight < avg) big++;
            let bigAlias = [big, this[big].weight / avg];
            
            while (bigAlias && smallAlias) {
                aliases[smallAlias[0]] = [smallAlias[1], bigAlias[0]];
                bigAlias = [bigAlias[0], bigAlias[1] - (1 - smallAlias[1])];
                if (bigAlias[1] < 1) {
                    smallAlias = bigAlias;
                    big++;
                    while (big < len && this[big].weight < avg) big++;
                    if (big >= len) break;
                    bigAlias = [big, this[big].weight / avg];
                } else {
                    small++;
                    while (small < len && this[small].weight >= avg) small++;
                    if (small >= len) break;
                    smallAlias = [small, this[small].weight / avg];
                }
            }
        }

        this.aliases = aliases;
    }

    random() : T {
        if (!this.aliases) this.init();
        const rng = Math.random() * this.length;
        const rounded = Math.floor(rng);
        const [odds, alias] = this.aliases![rounded];
        return (rng - rounded) > odds ? this[alias] : this[rounded];
    }

    randomMany(amount: number) : Array<T> {
        if (!this.aliases) this.init();
        const res = [];
        while (amount--) {
            const rng = Math.random() * this.length;
            const rounded = Math.floor(rng);
            const [odds, alias] = this.aliases![rounded];
            res.push((rng - rounded) > odds ? this[alias] : this[rounded]);
        }
        return res;
    }

    override push(...items: Array<T>) : number {
        delete this.aliases;
        return super.push(...items);
    }

    override splice(start: number, deleteCount: number | undefined) : Array<T> {
        delete this.aliases;
        return super.splice(start, deleteCount);
    }
    
    override pop() : T | undefined {
        delete this.aliases;
        return super.pop();
    }

    override shift() : T | undefined {
        delete this.aliases;
        return super.shift();
    }

    clone() : WeightedArray<T> {
        const arr = new WeightedArray(...this);
        arr.aliases = this.aliases;
        return arr;
    }

}