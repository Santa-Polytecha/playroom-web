<template>
	<div id="toolbar-container" class="d-flex align-items-center">
		<h1>Playroom</h1>
		<ul>
			<li><button type="button"><i class="material-icons">brush</i></button></li>
			<li><button type="button"><i class="material-icons">format_color_reset</i></button></li>
			<li><button type="button"><i class="material-icons">palette</i></button></li>
			<li><button type="button"><i class="material-icons">colorize</i></button></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "Toolbar",
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";

#toolbar-container {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
	padding-left: 20px;
	background-color: $mainBackgroundColor;
}

#toolbar-container > h1 {
	float: left;
	display: inline;
}

ul {
	display: inline;
	list-style-type: none;
	margin: 0;
	padding: 0;
	overflow: hidden;
}
li {
	float: left;
}
li > * {
	display: block;
	text-align: center;
	padding: 16px;
	text-decoration: none;
}
</style>
