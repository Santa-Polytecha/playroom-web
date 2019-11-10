<template>
	<div id="waiting-room-container" class="container">
		<div class="row">
			<h1 class="col-12 text-center">#{{roomId}}</h1>
		</div>
		
		<div class="row d-flex justify-content-center">
			<div class="col-xl-8 col-lg-8 col-md-8 col-sm-12">
				<div class="container">
					<form class="row d-flex justify-content-center">
						<label for="page-link" class="col-12">Link to this page:</label>
						<input type="text" name="page-link" id="page-link" :value="this.$route.fullPath" readonly class="form-control col-10"/>
						<input type="button" name="btn-copy-link" id="btn-copy-link" value="Copy Link" class="btn btn-primary col-2"/>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "WaitingRoom",
	computed: {
		roomId() {
			if (this.$route.params.hasOwnProperty("id"))
				return this.$route.params.id;
			else
				return '';
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/style.scss";

#waiting-room-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	margin: 0;
	padding: 0;
	.row {
		margin: 0;
	}
}

#waiting-room-container > .row {
	display: flex;
	align-items: center;
}
</style>
