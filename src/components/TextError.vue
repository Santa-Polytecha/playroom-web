<template>
	<transition name="fade">
		<p v-if="show" class="text-error text-danger">{{message}}</p>
	</transition>
</template>

<script>
export default {
	name: "TextError",
	props: {
		message: {
			type: String,
			required: false,
			default: "Error",
		},
		show: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
};
</script>

<style scoped lang="scss">

.text-error {
	font-size: 10pt;
}
</style>
