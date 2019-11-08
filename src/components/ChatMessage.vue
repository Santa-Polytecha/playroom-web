<template>
	<div class="container chat-message-container" :class="{'from-me': this.fromMe}">
		<div class="row">
			<p class="author">{{this.author}}</p>
			<p v-if="this.date > 0" class="date">{{formatDate(this.date)}}</p>
		</div>
		<div class="row">
			<p class="content">{{this.content}}</p>
		</div>
	</div>
</template>

<script>
export default {
	name: "ChatMessage",
	props: {
		author: {
			type: String,
			required: true,
		},
		fromMe: {
			type: Boolean,
			required: false,
			default: false,
		},
		date: {
			type: Number,
			required: false,
			default: 0,
		},
		content: {
			type: String,
			required: false,
			default: '',
		},
	},
	methods: {
		formatDate(timestamp_s) {
			let now = new Date();
			let now_s = now.getTime() / 1000;
			
			let date = new Date(timestamp_s * 1000);
			let diff = new Date(Math.abs(now_s - timestamp_s) * 1000);
			console.log(diff);
			
			let content = `${date.getHours()}:${date.getMinutes()}`;
			
			if (diff.getDate() !== 0)
				content += ` ${date.getDate()}/${date.getMonth()}`;
			if (diff.getFullYear() - 1970 !== 0)
				content += `/${date.getFullYear()}`;
			
			return content;
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";
@import "../assets/css/metrics.scss";

.chat-message-container {
	min-height: 0;
	margin: 10px 0;
	width: 75%;
	background-color: $grayDark;
	border-radius: $border-radius;
	overflow: hidden;
	.row {
		margin: 0;
		padding: 5px;
	}
	p {
		font-family: "Montserrat", Helvetica, Verdana, Arial, sans-serif, serif;
	}
	.author {
		font-size: 10pt;
	}
	.date {
		margin-left: 20px;
		font-size: 10pt;
		color: rgba(white, 0.6);
	}
}

.chat-message-container.from-me {
	background-color: $primaryColor;
	align-self: flex-end !important;
}
</style>
