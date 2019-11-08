<template>
	<div id="toolbar-container" class="d-flex align-items-center">
		<h1>Playroom</h1>
		<ul>
			<li v-for="tool in this.$store.getters.tools" :key="tool.id">
				<button
					type="button"
					@click="onToolClicked(tool.id)"
					class="btn tool"
					:class="getToolButtonClass(tool)">
					<i class="material-icons">{{tool.materialIconName}}</i>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "Toolbar",
	methods: {
		onToolClicked(id) {
			this.$store.dispatch("onCurrentToolChanged", id);
		},
		getToolButtonClass(tool) {
			let classes = [];
			if (this.currentTool === tool.id)
				if (tool.hasOwnProperty("colorId") && tool.colorId !== null && tool.colorId !== undefined && tool.colorId !== '')
					classes.push("btn-" + tool.colorId);
				else
					classes.push("btn-primary");
			else
				classes.push("btn-dark");
			return classes;
		}
	},
	computed: {
		currentTool() {
			return this.$store.getters.currentTool;
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";
@import "../assets/css/bootstrap.min.css";

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

h1 {
	font-size: 27pt;
	margin: 20px;
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

.tool {
	margin: 0 5px;
	padding: 5px;
}
</style>
