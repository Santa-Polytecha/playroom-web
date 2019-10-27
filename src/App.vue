<template>
	<div id="app">
		<transition name="component-fade" mode="out-in">
			<component v-bind:is="view"></component>
		</transition>
	</div>
</template>

<script>
import ConnectRoom from "./components/ConnectRoom";

export default {
	name: "app",
	components: {
		ConnectRoom,
	},
	computed: {
		view() {
			return ConnectRoom;
		}
	}
};
</script>

<style lang="scss">
@import "assets/css/bootstrap";
@import "assets/css/style";

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $normalTextColor;
}
</style>
