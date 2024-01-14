/** Any possible value that is guaranteed not to be null or undefined */
export type NonNull = NonNullable<unknown>;

export interface Option<T extends NonNull> {
	/** @returns True if the contained value exists, false if it doesn't. */
	isSome(): this is Some<T>;
	/** @returns True if the contained value does not exist, false if it does. */
	isNone(): this is None;

	/** @returns The value contained in the option, or throws an error if the contained value does not exist. */
	unwrap(): T;
	/** @return The value contained in the option, or throws an error with the specified error message if the option is a None value. */
	expect(msg: string): T;
	/** @returns The value contained in the option, or returns the input `other` value if the contained value does not exist. */
	unwrapOr(other: T): T;
	/** @returns The value contained in the option, or returns the output if the function `fn` if the contained value does not exist. */
	unwrapOrElse(fn: () => T): T;

	/** Calls the function `fn` with the contained value if it exists, does nothing if the contained value does not exist.
	 * @returns A reference to `this`.
	 */
	some(fn: (value: T) => void): this;
	/** Calls the function `fn` if the contained value does not exist, does nothing if the contained value does exist.
	 * @returns A reference to `this`.
	 */
	none(fn: () => void): this;
	/** Creates a new Option containing the output of `fn` if the contained value of this Option exists, if it doesn't, nothing happens.
	 * @returns The newly created Option, or a reference to `this` if nothing happened.
	 */
	map<R extends NonNull>(fn: (value: T) => R | undefined | null): Option<R>;
	/** Creates and returns a new Option containing the output of the function `fn` if the contained value exists. If not, then a new Option containing the value `other` is returned.
	 * @returns The newly created Option.
	 */
	mapOr<R extends NonNull>(fn: (value: T) => R | undefined | null, other: R): Option<R>;
	/** Creates and returns a new Option containing the output of the function `fn` if the contained value exists. If not, then a new Option containing the value outputted by the function `other` is returned.
	 * @returns The newly created Option.
	 */
	mapOrElse<R extends NonNull>(fn: (value: T) => R | undefined | null, other: () => R | undefined | null): Option<R>;
	/** Removes one layer of nested Options, does nothing if there's no extra layers of Options
	 * @returns A new Option with one less layer of Options
	 */
	flatten(): Option<Unwrapped<T>>;

	[Symbol.iterator](): Iterator<T>;
}

export class None implements Option<never> {
	static readonly value = new this();
	private constructor() {}

	isSome(): false {
		return false;
	}

	isNone(): this is None {
		return true;
	}

	expect(msg: string): never {
		throw new Error(`Expected: ${msg}`);
	}

	unwrap(): never {
		throw new ReferenceError('Called unwrap on a None value');
	}

	unwrapOr<T extends NonNull>(other: T): T {
		return other;
	}

	unwrapOrElse<T extends NonNull>(fn: () => T): T {
		return fn();
	}

	*[Symbol.iterator]() {
		return;
	}

	some(_: (value: never) => void): this {
		return this;
	}

	none(fn: () => void): this {
		fn();
		return this;
	}

	map(_: (value: never) => NonNull | undefined | null): Option<never> {
		return this;
	}

	mapOr<R extends NonNull>(_: (value: never) => R | undefined | null, other: R): Option<R> {
		return wrap(other);
	}

	mapOrElse<R extends NonNull>(
		_: (value: never) => R | undefined | null,
		other: () => R | undefined | null
	): Option<R> {
		return wrap(other());
	}

	flatten(): Option<Unwrapped<never>> {
		return this;
	}
}

export class Some<T extends NonNull = NonNull> implements Option<T> {
	private readonly value: T;

	constructor(value: T) {
		this.value = value;
	}

	isSome(): this is Some<T> {
		return true;
	}

	isNone(): false {
		return false;
	}

	expect(_: string): T {
		return this.value;
	}

	unwrap(): T {
		return this.value;
	}

	unwrapOr(_: T): T {
		return this.value;
	}

	unwrapOrElse(_: () => T): T {
		return this.value;
	}

	*[Symbol.iterator]() {
		yield this.value;
	}

	some(fn: (value: T) => void) {
		fn(this.value);
		return this;
	}

	none(_: () => void) {
		return this;
	}

	map<R extends NonNull>(fn: (value: T) => R | undefined | null): Option<R> {
		return wrap(fn(this.value));
	}

	mapOr<R extends {}>(fn: (value: T) => R | null | undefined, _: R): Option<R> {
		return wrap(fn(this.value));
	}

	mapOrElse<R extends {}>(fn: (value: T) => R | null | undefined, _: () => R | undefined | null): Option<R> {
		return wrap(fn(this.value));
	}

	flatten(): Option<Unwrapped<T>> {
		if (this.value instanceof Some) {
			return new Some(this.value.value as Unwrapped<T>);
		} else if (this.value instanceof None) {
			return this.value;
		} else {
			return new Some(this.value as Unwrapped<T>);
		}
	}
}

type MappedInnerValue<A extends Option<NonNull>[]> = {
	[K in keyof A]: A[K] extends Option<infer I> ? I : never;
};

export type Unwrapped<T> = T extends Option<infer I> ? I : T;

export function all<T extends [...Option<NonNull>[]]>(options: [...T]): Option<MappedInnerValue<T>> {
	if (options.some((o) => o.isNone())) return none;
	return some(options.map((o) => o.unwrap()) as MappedInnerValue<T>);
}

export function wrap<T extends NonNull>(value: T | undefined | null): Option<T> {
	if (value === undefined || value === null) {
		return None.value;
	} else {
		return new Some(value);
	}
}

export const none: Option<never> = None.value;

export const some = <T extends NonNull>(value: T) => new Some(value) as Option<T>;

export default { Some, None, some, none, wrap, all };
