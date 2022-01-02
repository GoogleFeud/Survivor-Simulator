import { Player } from ".";
import { EventEmitter } from "..";


export class RelationshipMap extends EventEmitter<number, [number, number]> {
    private _obj: Record<number, number> = {};

    get(player: Player) : number {
        return this._obj[player.id] || 0;
    }

    /**
     * Returns the **new** amount.
     */
    add(player: Player, amount = 1) : number {
        const currentAmount = this._obj[player.id] || 0;
        const newAmount = !this._obj[player.id] ? this._obj[player.id] = amount : this._obj[player.id] += amount;
        this.emit(player.id, currentAmount, newAmount);
        return newAmount;
    }

}