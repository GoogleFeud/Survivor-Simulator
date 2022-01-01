
import seedrandom from "seedrandom";
import { Event } from "./clock/event";
import { Trait } from "./player/trait";
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
    constructor(options: IEngineSettings) {
        super();
        seedrandom(options.seed, { global: true });
        this.traits = new WeightedArray();
        this.events = new WeightedArray();
    }
}