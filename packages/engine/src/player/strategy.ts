
import { EventEmitter } from "../utils/EventEmitter";
import { WeightedArray } from "..";
import { Player } from "./player";

export class Strategy extends EventEmitter<string|number> {
    player: Player;
    static weight: number;
    static id: string;
    constructor(player: Player) {
        super();
        this.player = player;
    }
    
}

export class StartegyStore extends WeightedArray<typeof Strategy> {


    add(...strategies: Array<typeof Strategy>) : void {
        this.push(...strategies);
    }

    randomInstance(player: Player) : Strategy {
        const strat = new (this.random())(player);
        return strat;
    }
}