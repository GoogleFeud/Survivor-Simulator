
/**
 * An [[EventEmitter]] event listener. If the listener returns `false`, then any following listeners will not
 * be executed, and the [[EventEmitter.emit()]] function will return `false`. 
 * 
 * If anything else is returned, the emit function will return true and the next listener will be executed.
 */
export type EventListener = (...args: Array<unknown>) => false|unknown;

/**
 * A class which allows components to **listen** to events and **emit** events whenever they want to.
 */
export class EventEmitter<T extends string|number> {
    private _events: Record<T, Array<EventListener>> = {} as Record<T, Array<EventListener>>;

    on(event: T, cb: EventListener) : () => void {
        if (event in this._events) {
            this._events[event].push(cb);
        } else this._events[event] = [cb];
        return () => this._events[event].splice(this._events[event].indexOf(cb), 1);
    }

    off(event: T, cb: EventListener) : void {
        this._events[event].splice(this._events[event].indexOf(cb), 1);
    }

    emit(event: T, ...args: Array<unknown>) : boolean {
        if (!this._events[event]) return false;
        for (const cb of this._events[event]) {
            const result = cb(...args);
            if (result === false) return false;
        }
        return true;
    }

}