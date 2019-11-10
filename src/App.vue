<template>
	<div id="app">
		<transition name="fade" mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>

export default {
	name: "app",
};
</script>

<style lang="scss">
@import "assets/css/bootstrap.css";
@import "assets/css/style.scss";

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

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
	opacity: 0;
}
</style>
