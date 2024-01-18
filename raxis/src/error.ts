import { CompType, EventType, Query } from '.';

export type RaxisErrorType =
	| 'Unknown CompType'
	| 'Invalid Entity'
	| 'Unknown Global Access'
	| 'Unknown EventType'
	| 'No Results Available In Query'
	| 'More Than One Result Available In Query'
	| 'Plugin Or Plugins Required';

export class RaxisError extends Error {
	readonly type: RaxisErrorType;

	constructor(err: 'Invalid Entity');
	constructor(err: 'Unknown CompType', type: CompType);
	constructor(err: 'Unknown Global Access', type: CompType);
	constructor(err: 'Unknown EventType', type: EventType);
	constructor(err: 'No Results Available In Query', query: Query);
	constructor(err: 'More Than One Result Available In Query', query: Query);
	constructor(err: 'Plugin Or Plugins Required', ...plugins: string[]);
	constructor(err: RaxisErrorType, ...subjects: unknown[]) {
		super(`${err}: [${subjects.join('] [')}]`);
		this.type = err;
		this.name = 'RaxisError';
	}
}
