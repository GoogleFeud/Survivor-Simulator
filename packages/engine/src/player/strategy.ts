
import { EventEmitter } from "../utils/EventEmitter";
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