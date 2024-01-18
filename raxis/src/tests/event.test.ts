import { afterEach, beforeEach, expect, it, test, vi } from 'vitest';
import { RaxisBuilder } from '..';

beforeEach(() => {
	vi.useFakeTimers();

	let count = 0;
	vi.stubGlobal('window', {
		requestAnimationFrame: vi.fn().mockImplementation((cb) => setTimeout(() => cb(100 * ++count), 100)),
	});
});

afterEach(() => {
	(window.requestAnimationFrame as any).mockRestore();
	vi.clearAllTimers();
	vi.unstubAllGlobals();
});

class FooEvent {
	bar: string = 'baz';

	constructor(options: Partial<FooEvent> = {}) {
		Object.assign(this, options);
	}
}

const Test = new RaxisBuilder().useEvent('my-event').useEvent(FooEvent);

it('Should only allow registered events to be pushed', async () => {
	const test1 = Test.useStartup((r) => {
		r.push('my-event');
		r.push(new FooEvent());
	}).build();

	const test2 = Test.useStartup((r) => {
		r.push('some-random-thing');
	}).build();

	expect(
		await test1
			.start()
			.then(() => true)
			.catch(() => false)
	).toBeTruthy();

	expect(
		await test2
			.start()
			.then(() => true)
			.catch(() => false)
	).toBeFalsy();
});

test('Events shouldnt be read more than once by a system', async () => {
	let value;
	let secVal;

	const test = Test.useStartup((r) => {
		r.push('my-event');
	})
		.useStartup((r) => {
			for (const val of r.read('my-event')) {
				value = val;
			}

			for (const val of r.read('my-event')) {
				secVal = val;
			}
		})
		.build();

	await test.start();
	expect(value).toBe('my-event');
	expect(secVal).toBeUndefined();
});
