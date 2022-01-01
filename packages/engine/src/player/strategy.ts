
import { EventEmitter } from "../utils/EventEmitter";
import { Player } from "./player";

export class Strategy extends EventEmitter<string|number> {
    player: Player;
    static weight: number;
    constructor(player: Player) {
        super();
        this.player = player;
    }
    
}