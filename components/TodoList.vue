<template>
	<div v-if="loading">LOADING...</div>
	<div v-if="error">{{ error }}</div>
	<ul v-else>
		<li v-for="todo in todos" :key="todo.id">
			<TodoItem :todo />
		</li>
	</ul>
</template>

<script setup lang='ts'>

const store = useTodoStore()
const { todos, loading, error } = storeToRefs(store)

onMounted(() => {
	if (todos.value.length === 0) {
		store.fetchTodos()
	}
})



</script>

<style scoped lang='scss'></style>