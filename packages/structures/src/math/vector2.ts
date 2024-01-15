export interface Vector2 {
	x: number;
	y: number;
	width: number;
	height: number;

	debug(label?: string): this;
	clone(): Vector2;
	set(v: Vector2): this;
	set(x: number, y: number): this;
	into<V extends Vector2>(v: V): V;

	add(v: Vector2): Vector2;
	add(scalar: number): Vector2;
	add(x: number, y: number): Vector2;
	sub(v: Vector2): Vector2;
	sub(scalar: number): Vector2;
	sub(x: number, y: number): Vector2;
	mul(v: Vector2): Vector2;
	mul(scalar: number): Vector2;
	mul(x: number, y: number): Vector2;
	div(v: Vector2): Vector2;
	div(scalar: number): Vector2;
	div(x: number, y: number): Vector2;

	unit(): Vector2;
	abs(): Vector2;
	negate(): Vector2;
	left(): Vector2;
	right(): Vector2;
	floor(): Vector2;
	ceil(): Vector2;
	round(): Vector2;
	roundToZero(): Vector2;
	rotate(angle: number): Vector2;
	rotate(center: Vector2, angle: number): Vector2;

	equals(v: Vector2, margin?: number): boolean;

	mag(): number;
	magSq(): number;
	angle(): number;
	angleTo(v: Vector2): number;
	dot(v: Vector2): number;
	distanceTo(v: Vector2): number;
	distanceToSq(v: Vector2): number;

	withMag(mag: number): Vector2;
	withAngle(angle: number): Vector2;

	max(v: Vector2): Vector2;
	min(v: Vector2): Vector2;
	clamp(min: Vector2 | number, max: Vector2 | number): Vector2;
	clampMag(max: number): Vector2;
	clampMag(min: number, max: number): Vector2;
	lerp(v: Vector2, time: number): Vector2;

	map(fn: (n: number) => number): Vector2;

	toJSON(): string;
	toArray(): [number, number];
	toObject(): { x: number; y: number; magnitude: number; angle: number };
}
