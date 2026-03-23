import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import type { Todo } from "~/types/todo";

export const useTodoStore = defineStore('todoStore', () => {

	const URL = 'https://jsonplaceholder.typicode.com/todos'

	const todos = ref<Todo[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	const fetchTodos = async (url: string) => {
		loading.value = true
		error.value = null
		try {
			const data = await $fetch<Todo[]>(url)
			todos.value = data
		} catch (err) {
			console.log(err)
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
			const newRemoteTodo = await $fetch<Todo>(URL, {
				method: 'POST',
				body: {
					title,
					completed: false,
					id: nanoid()
				}
			}
			)
			todos.value.unshift(newRemoteTodo)
		} catch (err) {
			if (err instanceof Error) {
				error.value = err.message
			}
		} finally {
			loading.value = false
		}
	}

	const toggleTodo = async (id: number | string) => {
		loading.value = true
		let choosenTodo = todos.value.find(todo => todo.id === id)
		let newCompletedStatus
		newCompletedStatus = !choosenTodo?.completed

		try {
			await $fetch(`${URL}/${id}`, {
				method: 'POST',
				body: {
					completed: newCompletedStatus
				}
			})
			if (choosenTodo) {
				choosenTodo.completed = newCompletedStatus
			}
		} catch (err) {
			console.log(err)
		} finally {
			loading.value = false
		}
	}

	const deleteTodo = async (id: string | number) => {
		loading.value = true
		try {
			await $fetch(`${URL}/${id}`, {
				method: 'DELETE'
			})
			todos.value = todos.value.filter(todo => todo.id !== id)
		} catch (err) {
			console.log(err)
		} finally {
			loading.value = false
		}
	}


	return {
		todos,
		addTodo,
		fetchTodos,
		toggleTodo,
		deleteTodo,
		loading,
		error,
	}
},)