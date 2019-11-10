<template>
	<div class="container" id="room-container">
		<div class="row">
			<div class="col-8">
				<div class="container">
					<div class="row">
						<Toolbar class="col-12"/>
					</div>
					
					<div class="row expand">
						<CanvasContainer class="col-12"/>
					</div>
				</div>
			</div>
			
			<div class="col-4">
				<div class="container">
					<div class="row expand">
						<ChatBox class="col-12"/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Toolbar from "./Toolbar";
import ChatBox from "./ChatBox";
import CanvasContainer from "./CanvasContainer";
export default {
	name: "Room",
	components: { CanvasContainer, ChatBox, Toolbar },
	computed: {
		roomId() {
			if (this.$route.params.hasOwnProperty("id"))
				return this.$route.params.id;
			else
				return this.$store.getters.roomId;
		},
	},
};
</script>

<style scoped lang="scss">
.expand, .container, #room-container, #room-container > .row {
	width: 100%;
	max-width: 100%;
	min-width: 100%;
	height: 100%;
	max-height: 100%;
	min-height: 100%;
	overflow: hidden;
	margin: 0;
	padding: 0;
}

.container {
	max-width: 100% !important;
	margin: 0;
	padding: 0;
}

.row > * {
	margin: 0;
	padding: 0;
}
</style>
