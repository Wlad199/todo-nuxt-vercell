import { todos } from '~/server/utils/db';
export default defineEventHandler(async (event) => {
	const id = Number(getRouterParam(event, 'id'));
	const index = todos.findIndex(t => t.id === id);

	if (index !== -1) {
		todos.splice(index, 1);
		return { success: true };
	}
	throw createError({ statusCode: 404, statusMessage: 'Todo not found' });
});