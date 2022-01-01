

export type CollectionCb<V, K = string> = (value: V, key: K) => boolean|undefined;

/**
 * A `Map` but with more methods.
 */
export class Collection<V, K = string> extends Map<K, V> {

    find(cb: CollectionCb<V, K>) : V|undefined {
        for (const [key, val] of this) {
            if (cb(val, key)) return val;
        }
        return undefined;
    }
    
    filter(cb: CollectionCb<V, K>) : Collection<V, K> {
        const res = new Collection<V, K>();
        for (const [key, val] of this) {
            if (cb(val, key)) res.set(key, val);
        }
        return res;
    }

    filterArray(cb: CollectionCb<V, K>) : Array<V> {
        const res = [];
        for (const [key, val] of this) {
            if (cb(val, key)) res.push(val);
        }
        return res;
    }

    map<T>(cb: (value: V, key: K) => T) : Array<T> {
        const res = [];
        for (const [key, val] of this) {
            res.push(cb(val, key));
        }
        return res;
    }

    some(cb: CollectionCb<V, K>) : boolean {
        for (const [key, val] of this) {
            if (cb(val, key)) return true;
        }
        return false;
    }

    every(cb: CollectionCb<V, K>) : boolean {
        for (const [key, val] of this) {
            if (!cb(val, key)) return false;
        }
        return true;
    }

    partition(cb: CollectionCb<V, K>) : [Collection<V, K>, Collection<V, K>] {
        const approved = new Collection<V, K>();
        const denied = new Collection<V, K>();
        for (const [key, val] of this) {
            if (cb(val, key)) approved.set(key, val);
            else denied.set(key, val);
        }
        return [approved, denied];
    }

    randomVal(): V;
    randomVal(amount = 1, filter?: CollectionCb<V, K>) : V|Array<V> {
        const arr = filter ? this.filterArray(filter):this.valArray();
        if (amount <= 1) return arr[Math.floor(Math.random() * arr.length)];
        return Array.from({length: amount}, () => arr.splice(Math.floor(Math.random() * arr.length), 1)[0]);
    }

    valArray() : Array<V> {
        return [...this.values()];
    }
} 