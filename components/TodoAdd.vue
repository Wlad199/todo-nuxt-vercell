<template>
	<form>
		<input v-model="input" type="text" placeholder="enter todo">
			<button @click.prevent="() => addNewTodo(input)">Add Todo</button>
	</form>
</template>

<script setup lang='ts'>
const input = ref('')
const { addTodo } = useTodoStore()

const addNewTodo = (text: string) => {
	if (input.value) {
		addTodo(text)
		input.value = ''
	}
}


</script>

<style scoped lang='scss'></style>