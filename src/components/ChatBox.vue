<template>
	<div id="chatbox-container" class="container-fluid">
		<div id="chatbox-header" class="row">
			<h3 class="col-12 text-center">Chatbox</h3>
		</div>
		
		<div id="chatbox-messages-container" class="row">
			<div class="container">
				<ChatMessage author="Lea" :date="1573227140" content="Hey!"/>
				<ChatMessage author="Valentin" :date="1573227142" content="Hey back!" :from-me="true"/>
				<ChatMessage author="Antoine" :date="1573227200" content="Hey there!"/>
				<ChatMessage author="Antoine" :date="1573227400" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis rhoncus tortor sed congue. Ut consectetur pretium orci vel pellentesque. Aenean turpis magna, sodales suscipit molestie quis, ullamcorper ut turpis. Donec sodales orci vel dui semper, ut pellentesque diam convallis. Maecenas vitae enim vel libero accumsan sodales. Pellentesque eget enim sodales, eleifend purus quis, sodales libero. Vivamus et tortor metus. Mauris turpis turpis, hendrerit in tellus et, finibus gravida dolor. Phasellus eu semper tortor, vel venenatis ex. Pellentesque blandit elementum odio quis tempor. Sed bibendum enim mauris, et iaculis magna malesuada vel. Phasellus faucibus congue neque, non faucibus metus fermentum ac. Ut leo lacus, faucibus in dictum sed, sollicitudin at urna. Praesent a tristique lacus. Donec condimentum mauris eget velit vestibulum feugiat. Quisque in malesuada mauris. Pellentesque ultrices neque sit amet neque tristique, et suscipit elit ultricies. Morbi venenatis felis nibh, ac scelerisque metus dictum eu. Praesent auctor nunc risus, sed sagittis quam fringilla scelerisque. Maecenas eget dictum dui. Nam pellentesque maximus gravida. Quisque et auctor risus. Integer interdum vel eros at ullamcorper. Quisque in metus a purus cursus venenatis. Mauris aliquam felis et eros maximus hendrerit. Etiam eu purus suscipit, tincidunt massa non, ornare justo. Etiam tincidunt ultrices fermentum. Aenean vel augue ac purus hendrerit rhoncus ut at ligula. Fusce aliquam mi vitae aliquet fermentum. Mauris lobortis et quam sed facilisis. Ut sit amet nibh turpis. Mauris et lorem blandit, sagittis odio nec, dapibus nunc. Cras vel eros ac eros mollis egestas in id erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer enim nisl, malesuada eget erat ut, mollis feugiat ex. Sed tincidunt, nibh vitae condimentum ultricies, augue elit auctor ligula, mattis sollicitudin urna urna imperdiet lorem. Donec rutrum egestas nibh, at ultricies tortor blandit ac. Pellentesque turpis ex, fermentum ac massa sed, convallis posuere urna. Phasellus turpis sem, semper nec fermentum vitae, mollis eget urna. Ut molestie eu est ut suscipit. Phasellus non nisi hendrerit, mollis purus eu, finibus dui. Nam mollis semper nunc a hendrerit. Proin commodo lacus non tempor placerat. Etiam ullamcorper sit amet orci quis dignissim. Vestibulum pharetra turpis vel varius tempus. Nam venenatis pulvinar pretium. Mauris id pulvinar urna, non lacinia ex. Proin molestie odio rutrum metus dictum, vel mattis enim sagittis. Integer venenatis justo vitae arcu convallis, at luctus nisl lacinia. Maecenas pulvinar pellentesque rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vulputate mi dolor, id rutrum ligula scelerisque nec. Duis pharetra ligula ac urna rutrum faucibus id ac lorem."/>
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
import ChatMessage from "./ChatMessage";
export default {
	name: "ChatBox",
	components: { ChatMessage },
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
	max-height: 300px;
	background-color: $mainBackgroundColor;
}

#chatbox-header {
	margin: 20px 0;
	flex-grow: 0;
	flex-shrink: 1;
	flex-basis: auto;
}

#chatbox-messages-container {
	margin-top: 0;
	margin-bottom: 0;
	padding: 10px;
	flex-grow: 1;
	flex-shrink: 1;
	flex-basis: auto;
	background-color: darken($mainBackgroundColor, 4);
	border-radius: $border-radius-big;
	overflow: auto;
	overflow-y: scroll;
}
#chatbox-messages-container > .container {
	display: flex;
	flex-direction: column;
}

#chatbox-compose-container {
	margin: 0;
	padding: 0;
	flex-grow: 0;
	flex-shrink: 1;
	flex-basis: auto;
	.row {
		display: flex;
		flex-direction: row;
		input {
			height: auto;
			align-items: stretch;
		}
		input[type="text"] {
			border-radius: $border-radius-big 0 0 $border-radius-big;
		}
		input[type="text"] + input[type="button"], input[type="text"] + button {
			border-radius: 0 $border-radius-big $border-radius-big 0;
		}
	}
}
</style>
