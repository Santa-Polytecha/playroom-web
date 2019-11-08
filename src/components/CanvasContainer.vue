<template>
	<div id="canvas-container" class="container">
		<div class="row">
			<p class="col-12">Canvas</p>
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
	background-color: $grayDark;
	border-radius: $border-radius-big;
}

#canvas-container {
	.row {
		height: 100%;
		align-items: center;
		p {
			font-size: 100pt;
			font-weight: bold;
			text-align: center;
			color: darken($grayDark, 5);
		}
	}
}
</style>
