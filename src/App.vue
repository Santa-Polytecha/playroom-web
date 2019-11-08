<template>
	<div id="app">
		<transition name="component-fade" mode="out-in">
			<component v-bind:is="view"></component>
		</transition>
	</div>
</template>

<script>
import ConnectRoom from "./components/ConnectRoom";
import Room from "./components/Room";

export default {
	name: "app",
	components: {
		ConnectRoom,
	},
	computed: {
		view() {
			if (this.username === '' || this.roomName === '')
				return ConnectRoom;
			else
				return Room;
		},
		username() {
			return this.$store.getters.username;
		},
		roomName() {
			return this.$store.getters.roomName;
		},
	},
};
</script>

<style lang="scss">
@import "assets/css/bootstrap";
@import "assets/css/style";
@import "https://fonts.googleapis.com/icon?family=Material+Icons";

#app {
	width: 100%;
	max-width: 100%;
	min-width: 100%;
	height: 100%;
	max-height: 100%;
	min-height: 100%;
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: $normalTextColor;
}
</style>
