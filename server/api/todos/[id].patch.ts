import { todos } from '~/server/utils/db';
export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, 'id'));
	const body = await readBody(event);
	const index = todos.findIndex(t => t.id === id);

	if (index !== -1) {
		todos[index] = { ...todos[index], ...body };
		return todos[index];
	}
	throw createError({ statusCode: 404, statusMessage: 'Todo not found' });
});