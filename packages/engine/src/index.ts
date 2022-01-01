
import { Engine } from "./engine";
import { Strategy } from "./player/strategy";

const game = new Engine({ seed: "123" });

game.addTraits({
    id: "trait_a",
    name: "Trait A",
    weight: 0.3
}, {
    id: "trait_b",
    name: "Trait B",
    weight: 1,
    collidesWith: ["trait_a"]
}, {
    id: "trait_c",
    name: "Trait C",
    weight: 1
});

game.addStrategies(class BaseStrat extends Strategy {});

game.setup([
    {
        firstName: "Volen",
        lastName: "Slavchev",
        age: 19
    },
    {
        firstName: "Kaloqn",
        lastName: "Slavchev",
        age: 100
    },
    {
        firstName: "Mariq",
        lastName: "Slavchev",
        age: 100
    },
    {
        firstName: "Bonka",
        lastName: "Slavchev",
        age: 100
    },
    {
        firstName: "Plamen",
        lastName: "Slavchev",
        age: 100
    }
    ,{
        firstName: "Silvia",
        lastName: "Slavchev",
        age: 100
    }
], [{
    name: "Besties"
}, {
    name: "Vesties"
}, {
    name: "Kesties"
}]);

console.log(game.players);