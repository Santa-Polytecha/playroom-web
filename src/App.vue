<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: "app",
	computed: {
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
@import "assets/css/bootstrap.css";
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
}
</style>
