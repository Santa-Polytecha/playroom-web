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
	sockets: {
		chatMessage: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("newMessage", data)')
		},
		userEnter: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("userEnter", data)')
		},
		userLeave: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("userLeave", data)')
		},
	},
	computed: {
		roomId() {
			if (this.$route.params.hasOwnProperty("id"))
				return this.$route.params.id;
			else
				return this.$store.getters.roomName;
		},
	},
	methods: {
		changePlayers(players){
			this.$store.dispatch("onPlayersChanged", players);
			if(this.$store.getters.players.length === 0){
				this.$store.dispatch("onGameRestart");
				this.$router.replace("/")
			}
		},
	},
	created () {
		if(this.$store.getters.players.length === 0 || this.$store.getters.owner.length === 0
			|| this.$store.getters.username === 0) { //room is incomplete go back to lobby
			this.resetRoom();
			this.$router.push('/');
		}
		
		this.$options.sockets.chatMessage = (data) => {
			const message = JSON.parse(data);
			if(message.user !== this.$store.getters.username){
				const content = JSON.parse(message.content);
				this.$store.dispatch("onMessagesAdded", content);
			}
		};
		
		this.$options.sockets.userEnter = (data) => {
			const message = JSON.parse(data);
			this.changePlayers(message.content);
		};
		
		this.$options.sockets.userLeave = (data) => {
			const message = JSON.parse(data);
			this.changePlayers(message.content);
		};
	}
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
