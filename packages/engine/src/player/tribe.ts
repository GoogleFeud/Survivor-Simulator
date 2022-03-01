import { Engine } from "../engine";
import { Alliance } from "./alliance";
import { Player, PlayerState } from "./player";

export interface ITribeData {
    name: string,
    color?: string
}

export class Tribe {
    engine: Engine;
    name: string;
    color?: string;
    constructor(engine: Engine, data: ITribeData) {
        this.engine = engine;
        this.name = data.name;
        this.color = data.color;
    }

    get players() : Array<Player> {
        return this.engine.players.filterArray(p => p.tribe === this);
    }

    get eliminated() : Array<Player> {
        return this.engine.players.filterArray(player => player.state === PlayerState.Eliminated && player.tribe === this);
    }

    get active() : Array<Player> {
        return this.engine.players.filterArray(player => player.state !== PlayerState.Eliminated && player.tribe === this);
    }

    get inGame() : Array<Player> {
        return this.engine.players.filterArray(player => player.state === PlayerState.InGame && player.tribe === this);
    }

    get inLimbo() : Array<Player> {
        return this.engine.players.filterArray(player => player.state === PlayerState.Limbo && player.tribe === this);
    }

    get alliances() : Array<Alliance> {
        return this.engine.alliances.filter(a => a.tribe === this);
    }

}