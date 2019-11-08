<template>
	<div id="chatbox-container" class="container">
		<p>Chatbox</p>
		<hr/>
	</div>
</template>

<script>
export default {
	name: "ChatBox",
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";
@import "../assets/css/metrics.scss";

#chatbox-container {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
	background-color: $mainBackgroundColor;
}
</style>
