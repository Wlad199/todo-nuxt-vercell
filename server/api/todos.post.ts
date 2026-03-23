import { todos } from '~/server/utils/db';
export default defineEventHandler(async (event) => {
	const body = await readBody(event);
	const newTodo = {
		id: Date.now(),
		title: body.title,
		completed: false
	};
	todos.unshift(newTodo);
	return newTodo;
});