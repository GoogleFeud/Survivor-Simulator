
export * from "./engine";
import { WeightedArray } from "./utils/WeightedArray";

const arr = new WeightedArray(
    { weight: 5 },
    { weight: 3 },
    { weight: 10 },
    { weight: 0.5 },
    { weight: 4 }
);

//console.log(arr.randomMany(100));
console.log(arr.randomFilter(100000, (item) => item.weight !== 5 && item.weight !== 4));