<template>
	<div class="container chat-message-container" :class="{'from-me': this.fromMe}">
		<div class="row message-header">
			<p class="author">{{this.author}}</p>
			<p v-if="this.date > 0" class="date">{{formatDate(this.date)}}</p>
		</div>
		<div class="row message-body">
			<p class="content"><span v-html="this.content"></span></p>
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
			default: new Date().getTime() / 1000,
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
			
			let leadingZero1 = '';
			let leadingZero2 = '';
			if (date.getHours() < 10)
				leadingZero1 = '0';
			if (date.getMinutes() < 10)
				leadingZero2 = '0';
			
			let content = `${leadingZero1}${date.getHours()}:${leadingZero2}${date.getMinutes()}`;
			
			leadingZero1 = date.getDate() < 10 ? '0' : '';
			leadingZero2 = date.getMonth() < 10 ? '0' : '';
			
			if (diff.getDate() > 1)
				content += ` ${leadingZero1}${date.getDate()}/${leadingZero2}${date.getMonth()}`;
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
		padding: 0;
	}
	p {
		margin: 0;
		font-family: "Montserrat", Helvetica, Verdana, Arial, sans-serif, serif;
		line-height: 1.2rem;
	}
	.message-header {
		margin: 5px 0 0 2px;
	}
	.message-body {
		margin: 0 0 5px 0;
	}
	.author {
		font-weight: bold;
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
