<template>
	<div id="chatbox-container" class="container-fluid">
		<div id="chatbox-header" class="row">
			<h3 class="col-12 text-center">Chatbox</h3>
		</div>
		
		<div id="chatbox-messages-container" class="row">
			<div class="container" :class="{'align-items-center flex-row  justify-content-center': messages.length === 0}">
				<ChatMessage v-for="message in messages" v-bind="message" :key="message.id"/>
				<p v-if="messages.length === 0" class="no-messages-text">No messages</p>
			</div>
		</div>
		
		<div id="chatbox-compose-container">
			<form class="row" @submit.prevent="addMessage">
				<button type="button" class="col-1 btn-emoji" @click="toggleDialogEmoji"><i class="material-icons">emoji_emotions</i></button>
				<VEmojiPicker v-show="emojiDialogShown" class="emoji-picker-box" :pack="emojisNative" labelSearch="Search" @select="onEmojiSelected"/>
				<!--suppress HtmlFormInputWithoutLabel -->
				<input type="text" class="form-control col-9" placeholder="Message" v-model="writingMessage"/>
				<button type="button" class="col-2 btn btn-primary btn-send" :class="{disabled: this.writingMessage.length === 0}" @click="addMessage"><i class="material-icons">send</i></button>
			</form>
		</div>
	</div>
</template>

<script>
import ChatMessage from "./ChatMessage";
import VEmojiPicker from "v-emoji-picker";
import packEmoji from 'v-emoji-picker/data/emojis.js';

export default {
	name: "ChatBox",
	components: {
		ChatMessage,
		VEmojiPicker,
	},
	data() {
		return {
			writingMessage: '',
			emojiDialogShown: false,
		};
	},
	methods: {
		toggleDialogEmoji() {
			this.emojiDialogShown = !this.emojiDialogShown;
			setTimeout(function() {
				let emojiBox = document.getElementsByClassName("emoji-picker-box")[0];
				let emojiButton = document.getElementsByClassName("btn-emoji")[0];
				if (emojiBox.offsetWidth > 0) {
					let x = emojiButton.getBoundingClientRect().left;
					let y = emojiButton.getBoundingClientRect().top;
					console.log(x, y);
					emojiBox.style.left = x - emojiBox.offsetWidth + "px";
					emojiBox.style.top = y - emojiBox.offsetHeight + "px";
				}
			}, 1);
		},
		onEmojiSelected(emojiData) {
			this.writingMessage += emojiData.emoji;
		},
		addMessage() {
			if (this.writingMessage !== null && this.writingMessage !== undefined && this.writingMessage.length > 0) {
				this.$store.dispatch("onMessagesAdded", {
					author: this.username,
					fromMe: true,
					content: this.writingMessage,
				});
				
				const jsonStringMessage =  JSON.stringify({
					user: this.username,
					type: "newMessage",
					room: this.$store.getters.roomName,
					content: this.writingMessage,
				});
				this.$socket.emit('newMessage', jsonStringMessage);
				
				// Empty text field
				this.writingMessage = '';
				
				// Scroll down
				setTimeout(function() {
					let chatboxMessagesContainer = document.getElementById("chatbox-messages-container");
					chatboxMessagesContainer.scrollTop = chatboxMessagesContainer.scrollHeight;
				}, 1);
			}
		},
	},
	computed: {
		emojisNative() {
			return packEmoji;
		},
		username() {
			return this.$store.getters.username;
		},
		messages() {
			return this.$store.getters.messages;
		},
	},
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
	.no-messages-text {
		align-self: center;
		font-family: "Montserrat", Helvetica, Verdana, Arial, sans-serif, serif;
		color: rgba(white, 0.3);
		font-size: 20pt;
		font-weight: bold;
	}
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
	height: 100%;
	.row {
		display: flex;
		flex-direction: row;
		input {
			height: auto;
			align-items: stretch;
		}
		input[type="button"], button {
			padding: 6px;
		}
		input[type="text"] {
			border-radius: $border-radius-big 0 0 $border-radius-big;
		}
		input[type="text"] + .btn-send {
			border-radius: 0 $border-radius-big $border-radius-big 0;
		}
		.btn-emoji {
			padding: 3px 10px 3px 3px;
			background: none;
			border: none;
			color: rgba(white, 0.5);
		}
	}
}

.emoji-picker-box {
	position: fixed;
	top: 10000px;
	left: 10000px;
}
</style>
