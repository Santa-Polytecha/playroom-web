<template>
	<div id="chatbox-container" class="container-fluid">
		<div id="chatbox-header" class="row">
			<h3 class="col-12 text-center">Chatbox</h3>
		</div>
		
		<div id="chatbox-messages-container" class="row">
			<div class="container">
				<p>test</p>
			</div>
		</div>
		
		<div id="chatbox-compose-container">
			<form class="row">
				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="text" class="form-control col-10" placeholder="Message"/>
				<button type="button" class="col-2 btn btn-primary"><i class="material-icons">send</i></button>
			</form>
		</div>
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

.row {
	margin: 15px 20px;
}

#chatbox-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
	background-color: $mainBackgroundColor;
}

#chatbox-header {
	margin: 20px 0;
}

#chatbox-messages-container {
	margin-top: 0;
	margin-bottom: 0;
	padding: 10px;
	flex-grow: 2;
	background-color: darken($mainBackgroundColor, 5);
	border-radius: $border-radius-big;
	.container {
		margin: 0;
		padding: 0;
	}
}

#chatbox-compose-container {
	margin: 0;
	padding: 0;
	.row {
		display: flex;
		flex-direction: row;
		input {
			height: auto;
			align-items: stretch;
		}
	}
}
</style>
