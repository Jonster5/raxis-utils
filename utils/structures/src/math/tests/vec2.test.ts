import { describe, expect, it } from 'vitest';
import { Vec2 } from '../vec2';

describe('Vec2', () => {
	// Creating a new Vec2 with default values sets x and y to 0
	it('should create a new Vec2 with default values', () => {
		const vec = new Vec2();
		expect(vec.x).toBe(0);
		expect(vec.y).toBe(0);
	});

	// Creating a new Vec2 with specified values sets x and y to the specified values
	it('should create a new Vec2 with specified values', () => {
		const vec = new Vec2(2, 3);
		expect(vec.x).toBe(2);
		expect(vec.y).toBe(3);
	});

	// Cloning a Vec2 returns a new Vec2 with the same x and y values
	it('should clone a Vec2 and return a new Vec2 with the same values', () => {
		const vec1 = new Vec2(2, 3);
		const vec2 = vec1.clone();
		expect(vec2.x).toBe(vec1.x);
		expect(vec2.y).toBe(vec1.y);
		expect(vec2).not.toBe(vec1);
	});

	// Setting a Vec2 with another Vec2 sets x and y to the x and y values of the other Vec2
	it('should set a Vec2 with another Vec2 and update x and y values', () => {
		const vec1 = new Vec2(2, 3);
		const vec2 = new Vec2(4, 5);
		vec1.set(vec2);
		expect(vec1.x).toBe(vec2.x);
		expect(vec1.y).toBe(vec2.y);
	});

	// Setting a Vec2 with x and y values sets x and y to the specified values
	it('should set a Vec2 with x and y values and update x and y values', () => {
		const vec = new Vec2();
		vec.set(2, 3);
		expect(vec.x).toBe(2);
		expect(vec.y).toBe(3);
	});

	// Adding two Vec2 returns a new Vec2 with the sum of their x and y values
	it('should add two Vec2 and return a new Vec2 with the sum of their values', () => {
		const vec1 = new Vec2(2, 3);
		const vec2 = new Vec2(4, 5);
		const result = vec1.add(vec2);
		expect(result.x).toBe(vec1.x + vec2.x);
		expect(result.y).toBe(vec1.y + vec2.y);
	});

	// Dividing a Vec2 by 0 returns a new Vec2 with both x and y values set to Infinity
	it('should divide a Vec2 by 0 and return a new Vec2 with both x and y values set to Infinity', () => {
		const vec = new Vec2(2, 3);
		const result = vec.div(0);
		expect(result.x).toBe(Infinity);
		expect(result.y).toBe(Infinity);
	});

	// Dividing a Vec2 by -0 returns a new Vec2 with both x and y values set to -Infinity
	it('should divide a Vec2 by -0 and return a new Vec2 with both x and y values set to -Infinity', () => {
		const vec = new Vec2(2, 3);
		const result = vec.div(-0);
		expect(result.x).toBe(-Infinity);
		expect(result.y).toBe(-Infinity);
	});

	// Dividing a Vec2 by NaN returns a new Vec2 with both x and y values set to NaN
	it('should divide a Vec2 by NaN and return a new Vec2 with both x and y values set to NaN', () => {
		const vec = new Vec2(2, 3);
		const result = vec.div(NaN);
		expect(result.x).toBeNaN();
		expect(result.y).toBeNaN();
	});

	// Dividing a Vec2 by Infinity returns a new Vec2 with both x and y values set to 0
	it('should divide a Vec2 by Infinity and return a new Vec2 with both x and y values set to 0', () => {
		const vec = new Vec2(2, 3);
		const result = vec.div(Infinity);
		expect(result.x).toBe(0);
		expect(result.y).toBe(0);
	});

	// Adding a scalar to a Vec2 returns a new Vec2 with the scalar added to both x and y values
	it('should add a scalar to a Vec2 and return a new Vec2 with the scalar added to both x and y values', () => {
		const vec = new Vec2(2, 3);
		const scalar = 5;
		const result = vec.add(scalar);
		expect(result.x).toBe(vec.x + scalar);
		expect(result.y).toBe(vec.y + scalar);
	});

	// Subtracting two Vec2 returns a new Vec2 with the difference of their x and y values
	it('should subtract two Vec2 and return a new Vec2 with the difference of their x and y values', () => {
		const vec1 = new Vec2(5, 10);
		const vec2 = new Vec2(3, 7);
		const result = vec1.sub(vec2);
		expect(result).toBeInstanceOf(Vec2);
		expect(result.x).toBe(2);
		expect(result.y).toBe(3);
	});

	// A Vec2 can be converted to a JSON string
	it('should convert Vec2 to JSON string', () => {
		const vec = new Vec2(2, 3);
		const jsonString = vec.toJSON();
		expect(jsonString).toBe('{"x":2,"y":3}');
	});

	// A Vec2 can be converted to an array of its x and y values
	it('should convert Vec2 to an array of its x and y values', () => {
		const vec = new Vec2(3, 4);
		const arr = vec.toArray();
		expect(arr).toEqual([3, 4]);
	});
});
