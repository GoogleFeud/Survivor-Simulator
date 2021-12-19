

export interface IWeightedItem {
    weight: number
}

export class WeightedArray<T extends IWeightedItem> extends Array<T> {
    private aliases: Array<number> = [];

    private init() : void {
        const len = this.length;
        const avg = this.reduce((acc, val) => acc + val.weight, 0);
        
        const aliases = new Array<[odds: number, alias: number]>(len);
        let small = 0;

        while (small < len && this[small].weight >= avg) small++;

        if (small < len) {
            const smallAlias = [small, this[]]
        }
    }
}