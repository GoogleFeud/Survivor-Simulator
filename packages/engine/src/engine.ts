
import seedrandom from "seedrandom";
import { EventEmitter } from "./utils/EventEmitter";

export interface IEngineSettings {
    mods?: Array<unknown>,
    days?: number,
    seed?: string
}

export class Engine extends EventEmitter<string|number> {
    constructor(options: IEngineSettings) {
        super();
        seedrandom(options.seed, { global: true });
    }
}