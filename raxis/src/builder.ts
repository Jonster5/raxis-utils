import { Raxis } from './raxis';
import { CompType, EventType, RaxisSystem, RaxisSystemAsync, ShutdownSet, StartupSet, UpdateSet } from './types';

export class RaxisBuilder {
	private comps: CompType[] = [];
	private events: EventType[] = [];
	private globals: Map<CompType, never[]> = new Map();

	private preStartup: (RaxisSystem | RaxisSystemAsync)[] = [];
	private startup: (RaxisSystem | RaxisSystemAsync)[] = [];
	private postStartup: (RaxisSystem | RaxisSystemAsync)[] = [];
	private first: RaxisSystem[] = [];
	private preUpdate: RaxisSystem[] = [];
	private update: RaxisSystem[] = [];
	private postUpdate: RaxisSystem[] = [];
	private last: RaxisSystem[] = [];
	private shutdown: RaxisSystem[] = [];

	private dedupedArray<O>(list: O[]): O[] {
		return list.filter((e, i) => list.indexOf(e) === i);
	}

	private copy(): RaxisBuilder {
		const next = new RaxisBuilder();
		next.comps = this.dedupedArray(this.comps);
		next.events = this.dedupedArray(this.events);
		next.globals = new Map(this.globals);

		next.preStartup = this.dedupedArray(this.preStartup);
		next.startup = this.dedupedArray(this.startup);
		next.postStartup = this.dedupedArray(this.postStartup);
		next.first = this.dedupedArray(this.first);
		next.preUpdate = this.dedupedArray(this.preUpdate);
		next.update = this.dedupedArray(this.update);
		next.postUpdate = this.dedupedArray(this.postUpdate);
		next.last = this.dedupedArray(this.last);
		next.shutdown = this.dedupedArray(this.shutdown);

		return next;
	}

	useComponent<C extends CompType>(type: C): RaxisBuilder {
		const copy = this.copy();
		copy.comps = this.dedupedArray([...this.comps, type]);
		return copy;
	}

	useEvent<E extends EventType>(type: E): RaxisBuilder {
		const copy = this.copy();
		copy.events = this.dedupedArray([...this.events, type]);
		return copy;
	}

	useGlobal<G extends CompType>(type: G, ...args: ConstructorParameters<G>): RaxisBuilder {
		const copy = this.copy();
		copy.globals.set(type, args);
		return copy;
	}

	useStartup(...systems: [RaxisSystemAsync, ...RaxisSystemAsync[]]): RaxisBuilder;
	useStartup(set: StartupSet, ...systems: [RaxisSystemAsync, ...RaxisSystemAsync[]]): RaxisBuilder;
	useStartup(a: StartupSet | RaxisSystemAsync, ...b: RaxisSystemAsync[]): RaxisBuilder {
		const copy = this.copy();

		if (typeof a === 'string') {
			copy[a] = this.dedupedArray([...this[a], ...b]);
		} else {
			copy.startup = this.dedupedArray([...this.startup, a, ...b]);
		}

		return copy;
	}

	useUpdate(...systems: [RaxisSystem, ...RaxisSystem[]]): RaxisBuilder;
	useUpdate(set: UpdateSet, ...systems: [RaxisSystem, ...RaxisSystem[]]): RaxisBuilder;
	useUpdate(a: UpdateSet | RaxisSystem, ...b: RaxisSystem[]): RaxisBuilder {
		const copy = this.copy();

		if (typeof a === 'string') {
			copy[a] = this.dedupedArray([...this[a], ...b]);
		} else {
			copy.update = this.dedupedArray([...this.update, a, ...b]);
		}

		return copy;
	}

	useShutdown(...systems: [RaxisSystem, ...RaxisSystem[]]): RaxisBuilder;
	useShutdown(set: ShutdownSet, ...systems: [RaxisSystem, ...RaxisSystem[]]): RaxisBuilder;
	useShutdown(a: ShutdownSet | RaxisSystem, ...b: RaxisSystem[]): RaxisBuilder {
		const copy = this.copy();

		if (typeof a === 'string') {
			copy[a] = this.dedupedArray([...this[a], ...b]);
		} else {
			copy.shutdown = this.dedupedArray([...this.update, a, ...b]);
		}

		return copy;
	}

	use(plugin: RaxisBuilder): RaxisBuilder {
		const copy = this.copy();

		copy.comps = this.dedupedArray([...this.comps, ...plugin.comps]);
		copy.events = this.dedupedArray([...this.events, ...plugin.events]);
		copy.globals = new Map([...this.globals, ...plugin.globals]);
		copy.preStartup = this.dedupedArray([...this.preStartup, ...plugin.preStartup]);
		copy.startup = this.dedupedArray([...this.startup, ...plugin.startup]);
		copy.postStartup = this.dedupedArray([...this.postStartup, ...plugin.postStartup]);
		copy.first = this.dedupedArray([...this.first, ...plugin.first]);
		copy.preUpdate = this.dedupedArray([...this.preUpdate, ...plugin.preUpdate]);
		copy.update = this.dedupedArray([...this.update, ...plugin.update]);
		copy.postUpdate = this.dedupedArray([...this.postUpdate, ...plugin.postUpdate]);
		copy.last = this.dedupedArray([...this.last, ...plugin.last]);
		copy.shutdown = this.dedupedArray([...this.shutdown, ...plugin.shutdown]);

		return copy;
	}

	build(): Raxis {
		return new Raxis(
			this.comps,
			this.events,
			this.globals,
			this.preStartup,
			this.startup,
			this.postStartup,
			this.first,
			this.preUpdate,
			this.update,
			this.postUpdate,
			this.last,
			this.shutdown
		);
	}
}
