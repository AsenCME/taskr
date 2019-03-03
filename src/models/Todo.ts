class Todo {
	constructor(_id: number, _name: string, _timestamp = new Date().getTime()) {
		this.id = _id;
		this.name = _name;
		this.timestamp = _timestamp;
	}

	id: number;
	name: string;
	completed?: boolean = false;
	timestamp?: number;
}

export default Todo;
