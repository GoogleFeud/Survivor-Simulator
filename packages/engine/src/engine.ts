
import seedrandom from "seedrandom";
import { Event, IEventData } from "./clock/event";
import { Alliance } from "./player/alliance";
import { IPlayerData, Player } from "./player/player";
import { Strategy } from "./player/strategy";
import { ITraitData, Trait } from "./player/trait";
import { ITribeData, Tribe } from "./player/tribe";
import { shuffleArray } from "./utils";
import { Collection } from "./utils/Collection";
import { EventEmitter } from "./utils/EventEmitter";
import { WeightedArray } from "./utils/WeightedArray";

export interface IEngineSettings {
    mods?: Array<unknown>,
    days?: number,
    seed?: string
}

export class Engine extends EventEmitter<string|number> {
    traits: WeightedArray<Trait>;
    events: WeightedArray<Event>;
    players: Collection<Player, number>;
    alliances: Array<Alliance>;
    strategies: WeightedArray<typeof Strategy>;
    tribes: Collection<Tribe>;
    constructor(options: IEngineSettings) {
        super();
        seedrandom(options.seed, { global: true });
        this.traits = new WeightedArray();
        this.events = new WeightedArray();
        this.players = new Collection();
        this.alliances = [];
        this.strategies = new WeightedArray();
        this.tribes = new Collection();
    }

    /**
     * Requires at least one strategy to be in the strategies array.
     */
    setup(players: Array<IPlayerData>, tribes: Array<ITribeData>) : void {
        const playerLen = players.length;
        const tribeLen = tribes.length;
        const playersPerTribe = Math.floor(playerLen / tribeLen);
        shuffleArray(players);
        shuffleArray(tribes);
        let tribeInd = 0;
        for (let i=playersPerTribe; i <= playerLen; i += playersPerTribe) {
            const tribe = new Tribe(this, tribes[tribeInd]);
            for (let j=(i - playersPerTribe); j < i; j++) {
                const player = new Player(this, tribe, players[j]);
                this.players.set(player.id, player);
            }
            this.tribes.set(tribe.name, tribe);
            tribeInd++;
        }
    }

    addTraits(...traits: Array<ITraitData>) : void {
        this.traits.push(...traits.map(t => new Trait(t)));
    }

    addEvents(...events: Array<IEventData>) : void {
        this.events.push(...events.map(e => new Event(e)));
    }

    addStrategies(...strats: Array<typeof Strategy>) : void {
        this.strategies.push(...strats);
    }

}