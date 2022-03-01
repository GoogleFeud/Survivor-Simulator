import { Engine } from "../engine";
import { Collection, Random, STOPPED_EVENT } from "../utils";
import { Alliance } from "./alliance";
import { RelationshipMap } from "./relationships";
import { Strategy } from "./strategy";
import { Trait } from "./trait";
import { Tribe } from "./tribe";

export interface IPlayerData {
    firstName: string,
    lastName: string,
    age: number,
    job?: number,
    stats?: {
        intelligence: number,
        strength: number,
        stamina: number,
        appearance: number
    }
    traits?: Array<Trait>,
    strategy?: Strategy
}

export const enum PlayerState {
    InGame,
    Eliminated,
    /**
     * If the player is exiled, on extinction island,
     * on redemption island.
     */
    Limbo
}

export class Player {
    engine: Engine;
    id: number;
    state: PlayerState;
    firstName: string;
    lastName: string;
    age: number;
    job?: number;
    stats: {
        intelligence: number,
        strength: number,
        appearance: number,
        stamina: number
    };
    traits: Collection<Trait>;
    tribe: Tribe;
    strategy: Strategy;
    relationships: RelationshipMap;
    constructor(engine: Engine, tribe: Tribe, data: IPlayerData) {
        this.state = PlayerState.InGame;
        this.id = engine.players.size + 1;
        this.engine = engine;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.age = data.age;
        this.job = data.job;
        this.stats = data.stats || {
            intelligence: Random.btw(0, 10),
            strength: Random.btw(0, 10),
            appearance: Random.btw(0, 10),
            stamina: Random.btw(0, 10)
        };
        this.traits = new Collection(engine.traits.randomNonColliding(Random.btw(1, 3)).map(t => [t.id, t]));
        this.tribe = tribe;
        this.strategy = data.strategy || this.engine.strategies.randomInstance(this);
        this.relationships = new RelationshipMap();
    }

    /**
     * Sends an event to the player's traits and strategies. The traits **cannot**
     * stop the event from getting to the strategy. 
     * 
     * Returns all results returned from all event listeners attached to the strategy. You could use
     * [[Player.emitOne()]] to get only the first result.
     */

    emit<T extends [...Array<unknown>]>(event: string|number, ...data: Array<unknown>) : T|undefined {
        for (const [, trait] of this.traits) trait.emit(event, this, ...data);
        const res = this.strategy.emit<T>(event, ...data);
        if (res === STOPPED_EVENT) return undefined;
        return res;
    }

    emitOne<T>(event: string|number, ...data: Array<unknown>) : T | undefined {
        for (const [, trait] of this.traits) trait.emit(event, this, ...data);
        const res = this.strategy.emit<[T]>(event, ...data);
        if (res === STOPPED_EVENT) return undefined;
        return res[0];
    }

    get name() : string {
        return `${this.firstName} ${this.lastName}`;
    }

    get alliances() : Array<Alliance> {
        return this.engine.alliances.filter(a => a.creator === this || a.members.has(this.id));
    }

}

export class PlayerStore extends Collection<Player, number> {

    get eliminated() : Array<Player> {
        return this.filterArray(player => player.state === PlayerState.Eliminated);
    }

    /**
     * Gets the players who are either in game or in limbo.
     */
    get active() : Array<Player> {
        return this.filterArray(player => player.state !== PlayerState.Eliminated);
    }

    get inGame() : Array<Player> {
        return this.filterArray(player => player.state === PlayerState.InGame);
    }

    get inLimbo() : Array<Player> {
        return this.filterArray(player => player.state === PlayerState.Limbo);
    }

}