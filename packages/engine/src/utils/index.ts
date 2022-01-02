

export function shuffleArray<T>(array: Array<T>) : void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Random {
    
    export function btw(min = 1, max = 5) : number {
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    
    export function bool() : boolean {
        return Math.random() > 0.5 ? true : false;
    }
    
    export function arr<T>(array: Array<T>) : T {
        return array[Math.floor(Math.random() * array.length)] as T;
    }
    
}

export * from "./EventEmitter";
export * from "./Collection";
export * from "./WeightedArray";