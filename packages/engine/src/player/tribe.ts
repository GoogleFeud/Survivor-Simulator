import { Engine } from "../engine";
import { Alliance } from "./alliance";
import { Player } from "./player";

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

    get alliances() : Array<Alliance> {
        return this.engine.alliances.filter(a => a.tribe === this);
    }

}