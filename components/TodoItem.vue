<template>
	<button @click="toggleTodo(id)">
		{{ completed ? 'Complete' : 'in process' }}
	</button>
	<span>{{ title }}</span>
	<button @click="deleteTodo(id)">delete</button>
</template>

<script setup lang='ts'>
import type { Todo } from '~/types/todo';
const { deleteTodo, toggleTodo } = useTodoStore()

const props = defineProps<{
	todo: Todo
}>()

const { title, completed, id } = toRefs(props.todo)

</script>
