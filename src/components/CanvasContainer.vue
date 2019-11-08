<template>
	<div id="canvas-container" class="container">
		<div class="row">
			<p class="col-12" style="text-align: center; color: black">Canvas</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "CanvasContainer",
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";
@import "../assets/css/metrics.scss";

#canvas-container {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
	background-color: $grayLight;
	border-radius: $border-radius-big;
}
</style>
