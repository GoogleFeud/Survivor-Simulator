
import { EventEmitter } from "../utils/EventEmitter";
import { WeightedArray } from "..";
import { Player } from "./player";

export class Strategy extends EventEmitter<string|number> {
    player: Player;
    static weight: number;
    static id: string;
    static condition?: (player: Player) => boolean;
    constructor(player: Player) {
        super();
        this.player = player;
    }
    
}

export class StartegyStore extends WeightedArray<typeof Strategy> {

    add(...strategies: Array<typeof Strategy>) : void {
        this.push(...strategies);
    }

    smartRandom(player: Player) : Strategy {
        const strat = new (this.randomFilter(1, (strat) => strat.condition?.(player)))[0](player);
        return strat;
    }

}