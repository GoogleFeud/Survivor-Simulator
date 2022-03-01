
import seedrandom from "seedrandom";
import { Clock } from "./clock";
import { Mod } from "./mods";
import { Alliance } from "./player/alliance";
import { IPlayerData, PlayerStore, Player } from "./player/player";
import { StartegyStore } from "./player/strategy";
import { TraitStore } from "./player/trait";
import { ITribeData, Tribe } from "./player/tribe";
import { shuffleArray } from "./utils";
import { Collection } from "./utils/Collection";
import { EventEmitter } from "./utils/EventEmitter";

export interface IEngineSettings {
    mods?: Array<Mod>,
    days?: number,
    seed?: string
}

export class Engine extends EventEmitter<string|number> {
    traits: TraitStore;
    clock: Clock;
    players: PlayerStore;
    alliances: Array<Alliance>;
    strategies: StartegyStore;
    tribes: Collection<Tribe>;
    mods: Map<string, Mod>;
    constructor(options: IEngineSettings) {
        super();
        seedrandom(options.seed, { global: true });
        this.traits = new TraitStore();
        this.clock = new Clock(this);
        this.players = new PlayerStore();
        this.alliances = [];
        this.strategies = new StartegyStore();
        this.tribes = new Collection();
        this.mods = new Map();
        if (options.mods) {
            for (const mod of options.mods) {
                mod.load(this, mod.settings);
                this.mods.set(mod.name, mod);
            }
        }
    }

    loadMod(mod: Mod) : void {
        this.mods.set(mod.name, mod);
        mod.load(this, mod.settings);
    }

    unloadMod(modName: string) : void {
        const mod = this.mods.get(modName);
        if (!mod) return;
        mod.unload?.(this, mod.settings);
        this.mods.delete(modName);
    }

    /**
     * Requires at least one strategy to be in the strategies array.
     */
    setupPlayers(players: Array<IPlayerData>, tribes: Array<ITribeData>) : void {
        const playerLen = players.length;
        const tribeLen = tribes.length;
        const playersPerTribe = Math.floor(playerLen / tribeLen);
        shuffleArray(players);
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

}