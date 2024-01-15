import { Vector2 } from './vector2';

export class Vec2 implements Vector2 {
	x: number;
	y: number;

	get width() {
		return this.x;
	}
	set width(w: number) {
		this.x = w;
	}

	get height() {
		return this.y;
	}
	set height(h: number) {
		this.y = h;
	}

	constructor();
	constructor(x: number, y: number);
	constructor(x?: number, y?: number) {
		this.x = x ?? 0;
		this.y = y ?? 0;
	}

	debug(label?: string) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
		console.log(label ? `${label}: (${this.x}, ${this.y})` : `(${this.x}, ${this.y})`);

		return this;
	}

	clone(): Vec2 {
		return new Vec2(this.x, this.y);
	}

	set(v: Vector2): this;
	set(x: number, y: number): this;
	set(a: number | Vector2, b?: number): this {
		if (typeof a !== 'number') {
			this.x = a.x;
			this.y = a.y;
		} else if (typeof b === 'number') {
			this.x = a;
			this.y = b;
		}

		return this;
	}

	into<V extends Vector2>(v: V): V {
		v.x = this.x;
		v.y = this.y;
		return v;
	}

	add(v: Vector2): Vec2;
	add(scalar: number): Vec2;
	add(x: number, y: number): Vec2;
	add(a: Vector2 | number, b?: number): Vec2 {
		if (typeof a === 'object') {
			return new Vec2(this.x + a.x, this.y + a.y);
		} else {
			return new Vec2(this.x + a, this.y + (b ?? a));
		}
	}

	sub(v: Vector2): Vec2;
	sub(scalar: number): Vec2;
	sub(x: number, y: number): Vec2;
	sub(a: Vector2 | number, b?: number): Vec2 {
		if (typeof a === 'object') {
			return new Vec2(this.x - a.x, this.y - a.y);
		} else {
			return new Vec2(this.x - a, this.y - (b ?? a));
		}
	}

	mul(v: Vector2): Vec2;
	mul(scalar: number): Vec2;
	mul(x: number, y: number): Vec2;
	mul(a: Vector2 | number, b?: number): Vec2 {
		if (typeof a === 'object') {
			return new Vec2(this.x * a.x, this.y * a.y);
		} else {
			return new Vec2(this.x * a, this.y * (b ?? a));
		}
	}

	div(v: Vector2): Vec2;
	div(scalar: number): Vec2;
	div(x: number, y: number): Vec2;
	div(a: Vector2 | number, b?: number): Vec2 {
		if (typeof a === 'object') {
			return new Vec2(this.x / a.x, this.y / a.y);
		} else {
			return new Vec2(this.x / a, this.y / (b ?? a));
		}
	}

	unit(): Vec2 {
		const m = this.mag();
		return new Vec2(this.x / m, this.y / m);
	}

	abs() {
		return new Vec2(Math.abs(this.x), Math.abs(this.y));
	}

	negate(): Vec2 {
		return new Vec2(-this.x, -this.y);
	}

	left(): Vec2 {
		return new Vec2(this.y, -this.x);
	}

	right(): Vec2 {
		return new Vec2(-this.y, this.x);
	}

	floor(): Vec2 {
		return new Vec2(Math.floor(this.x), Math.floor(this.y));
	}

	ceil(): Vec2 {
		return new Vec2(Math.ceil(this.x), Math.ceil(this.y));
	}

	round(): Vec2 {
		return new Vec2(Math.round(this.x), Math.round(this.y));
	}

	roundToZero(): Vec2 {
		return new Vec2(Math.trunc(this.x), Math.trunc(this.y));
	}

	rotate(angle: number): Vec2;
	rotate(center: Vector2, angle: number): Vec2;
	rotate(a: number | Vector2, b?: number): Vec2 {
		if (typeof a === 'number') {
			const cos = Math.cos(a),
				sin = Math.sin(a);

			return new Vec2(this.x * cos + this.y * sin, this.y * cos - this.x * sin);
		} else {
			const x = this.x - a.x,
				y = this.y - a.y,
				cos = Math.cos(b ?? 0),
				sin = Math.sin(b ?? 0);

			return new Vec2(x * cos + y * sin + a.x, y * cos - x * sin + a.y);
		}
	}

	equals(v: Vector2, margin?: number): boolean {
		if (margin !== undefined) {
			return Math.abs(this.x - v.x) <= margin && Math.abs(this.y - v.y) <= margin;
		} else {
			return this.x === v.x && this.y === v.y;
		}
	}

	dot(v: Vector2): number {
		return this.x * v.x + this.y * v.y;
	}

	mag(): number {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	magSq(): number {
		return this.x * this.x + this.y * this.y;
	}

	angle(): number {
		return (2 * Math.PI + Math.atan2(this.y, this.x)) % (2 * Math.PI);
	}

	angleTo(v: Vector2): number {
		return (2 * Math.PI + Math.atan2(v.y - this.y, v.x - this.x)) % (2 * Math.PI);
	}

	distanceTo(v: Vector2): number {
		const dx = this.x - v.x,
			dy = this.y - v.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	distanceToSq(v: Vector2): number {
		const dx = this.x - v.x,
			dy = this.y - v.y;
		return dx * dx + dy * dy;
	}

	withMag(mag: number): Vec2 {
		if (this.x === 0 && this.y === 0) return new Vec2();
		const ratio = mag / this.mag();
		return new Vec2(this.x * ratio, this.y * ratio);
	}

	withAngle(angle: number): Vec2 {
		const m = this.mag();
		return new Vec2(m * Math.cos(angle), m * Math.sin(angle));
	}

	max(v: Vector2): Vec2 {
		return new Vec2(Math.max(this.x, v.x), Math.max(this.y, v.y));
	}

	min(v: Vector2): Vec2 {
		return new Vec2(Math.min(this.x, v.x), Math.min(this.y, v.y));
	}

	clamp(min: Vector2 | number, max: Vector2 | number): Vec2 {
		let xmin: number, ymin: number, xmax: number, ymax: number;

		if (typeof min === 'number') {
			xmin = min;
			ymin = min;
		} else {
			xmin = min.x;
			ymin = min.y;
		}

		if (typeof max === 'number') {
			xmax = max;
			ymax = max;
		} else {
			xmax = max.x;
			ymax = max.y;
		}

		return new Vec2(Math.min(Math.max(this.x, xmin), xmax), Math.min(Math.max(this.y, ymin), ymax));
	}

	clampMag(max: number): Vector2;
	clampMag(min: number, max: number): Vector2;
	clampMag(a: number, b?: number): Vec2 {
		const m = this.mag();

		if (b !== undefined) {
			if (m > b) return this.withMag(b);
			else if (m < a) return this.withMag(a);
		} else {
			if (m > a) return this.withMag(a);
		}

		return this.clone();
	}

	lerp(v: Vector2, time: number): Vec2 {
		return new Vec2(this.x + (v.x - this.x) * time, this.y + (v.y - this.y) * time);
	}

	map(fn: (n: number) => number): Vec2 {
		return new Vec2(fn(this.x), fn(this.y));
	}

	toJSON(): string {
		return JSON.stringify({ x: this.x, y: this.y });
	}

	toArray(): [number, number] {
		return [this.x, this.y];
	}

	toObject(): { x: number; y: number; magnitude: number; angle: number } {
		return {
			x: this.x,
			y: this.y,
			magnitude: this.mag(),
			angle: this.angle(),
		};
	}
}
