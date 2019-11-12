<template>
	<transition name="fade">
		<p v-if="show || occupySpace" class="text-error text-danger" :class="{'hide-text': !show && occupySpace}">
			<span v-if="!show && occupySpace && (message === undefined || message === null || message === '')">Test</span>
			<span v-else>{{message}}</span>
		</p>
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
		occupySpace: {
			type: Boolean,
			required: false,
			default: true,
		}
	},
};
</script>

<style scoped lang="scss">

.text-error {
	font-size: 10pt;
	transition: all .2s ease-in;
	opacity: 1;
}

.hide-text {
	opacity: 0;
}
</style>
