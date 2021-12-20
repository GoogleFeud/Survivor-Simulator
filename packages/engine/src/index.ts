
export * from "./engine";
import { WeightedArray } from "./utils/WeightedArray";

const arr = new WeightedArray(
    { weight: 5 },
    { weight: 3 },
    { weight: 10 },
    { weight: 0.5 },
    { weight: 4 }
);

const otherArr = arr.filter((el) => el.weight > 4);

console.log(otherArr.randomMany(100));
console.log(arr.randomMany(100));