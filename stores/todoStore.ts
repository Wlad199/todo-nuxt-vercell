import type { Todo } from "~/types/todo"


export const useTodoStore = defineStore('todo', () => {
	const todos = ref<Todo[]>([])
	const loading = ref(false)
	const error = ref<null | string>(null)

	const fetchTodos = async () => {
		loading.value = true
		error.value = null

		try {
			todos.value = await $fetch<Todo[]>('/api/todos')
		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message
			}
		} finally {
			loading.value = false
		}
	}

	const addTodo = async (title: string) => {
		loading.value = true
		error.value = null

		try {
			const newTodo = await $fetch<Todo>('/api/todos', {
				method: 'POST',
				body: {
					title
				}
			})
			todos.value.unshift(newTodo)
		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message
			}
		} finally {
			loading.value = false
		}
	}

	const deleteTodo = async (id: number) => {
		loading.value = true
		error.value = null

		try {
			await $fetch(`/api/todos/${id}`, {
				method: 'DELETE'
			})
			todos.value = todos.value.filter(todo => todo.id !== id)

		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message
			}
		} finally {
			loading.value = false
		}
	}

	const toggleTodo = async (id: string | number) => {
		loading.value = false
		error.value = null

		try {
			const chossenTodo = todos.value.find(todo => todo.id === id)
			await $fetch(`/api/todos/${id}`, {
				method: 'PATCH',
				body: {
					completed: !chossenTodo?.completed
				}
			})
			if (chossenTodo) {
				chossenTodo.completed = !chossenTodo.completed
			}
		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message
			}
		}
	}

	return {
		todos,
		error,
		loading,
		fetchTodos,
		addTodo,
		toggleTodo,
		deleteTodo,
	}

})