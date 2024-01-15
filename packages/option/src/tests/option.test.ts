import { expect, it } from 'vitest';
import { Option, Some, all, none, some, wrap } from '..';

// wrap()
it('wraps a value into a Some option', () => {
	const option = wrap(42);
	expect(option).toBeInstanceOf(Some);
	expect(option.unwrap()).toBe(42);
});

it('creates a None option for null or undefined values', () => {
	const option1 = wrap(null);
	const option2 = wrap(undefined);
	expect(option1).toBe(none);
	expect(option2).toBe(none);
});

// some()
it('creates a Some option directly', () => {
	const option = some('Hello');
	expect(option).toBeInstanceOf(Some);
	expect(option.unwrap()).toBe('Hello');
});

// isSome() and isNone()
it('correctly identifies Some and None options', () => {
	const someOption = some(5);
	const noneOption = none;
	expect(someOption.isSome()).toBeTruthy();
	expect(someOption.isNone()).toBeFalsy();
	expect(noneOption.isSome()).toBeFalsy();
	expect(noneOption.isNone()).toBeTruthy();
});

// unwrap()
it('throws an error when unwrapping a None option', () => {
	expect(() => none.unwrap()).toThrowError();
});

// unwrapOr() and unwrapOrElse()
it('provides default values for None options', () => {
	const defaultValue = 10;
	const result1 = (none as Option<number>).unwrapOr(defaultValue);
	const result2 = (none as Option<number>).unwrapOrElse(() => defaultValue);
	expect(result1).toBe(defaultValue);
	expect(result2).toBe(defaultValue);
});

// map(), mapOr(), mapOrElse()
it('apply functions to values within options', () => {
	const option = some(2);
	const doubled = option.map((value) => value * 2);
	expect(doubled.unwrap()).toBe(4);
});

// flatten()
it('flattens nested options', () => {
	const nestedOption = some(some(3));
	const flattened = nestedOption.flatten();
	expect(flattened.unwrap()).toBe(3);
});

// all()
it('combines multiple options into one', () => {
	const option1 = some(1);
	const option2 = some(2);
	const combined = all([option1, option2]);
	expect(combined.unwrap()).toEqual([1, 2]);
});

it('returns None if any inner option is None', () => {
	const option1 = some(1);
	const option2 = none;
	const combined = all([option1, option2]);
	expect(combined).toBe(none);
});
