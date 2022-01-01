import { Collection } from "../utils/Collection";
import { Player } from "./player";
import { Tribe } from "./tribe";


export class Alliance {
    creator: Player;
    members: Collection<Player, number>;
    tribe?: Tribe;
    constructor(creator: Player, members: Array<Player>, tribe?: Tribe) {
        this.creator = creator;
        this.members = new Collection(members.map(m => [m.id, m]));
        this.tribe = tribe;
    }

    get allPlayers() : Array<Player> {
        const vals = this.members.valArray();
        vals.push(this.creator);
        return vals;
    }

    
}