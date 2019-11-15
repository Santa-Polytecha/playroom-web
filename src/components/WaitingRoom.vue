<template>
	<div id="waiting-room-container" class="container">
		<div class="row">
			<h1 class="col-12 text-center">#{{roomId}}</h1>
		</div>
		
		<div class="row d-flex justify-content-center">
			<div class="col-xl-6 col-lg-6 col-md-8 col-sm-12">
				<div class="container">
					<form class="row d-flex justify-content-center">
						<label for="page-link" class="col-12">Link to this page:</label>
						<input type="text" name="page-link" id="page-link" :value="this.$route.fullPath" readonly class="form-control col-xl-10 col-lg-9 col-md-9 col-sm-9"/>
						<input type="button" name="btn-copy-link" id="btn-copy-link" value="Copy Link" @click="copyLink" class="btn btn-primary col-xl-2 col-lg-3 col-md-3 col-sm-3"/>
					</form>
				</div>
			</div>
		</div>
		
		<div class="row d-flex justify-content-center">
			<div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
				<ul class="list-unstyled">
					<li v-for="game in availableGames" :key="game.id"><button @click="onGameClicked(game.id)" class="btn" :class="{'btn-secondary': currentGame === game.id, 'btn-dark': currentGame !== game.id}">{{game.name}}</button></li>
				</ul>
			</div>
			
			<div class="col-xl-3 col-lg-3 col-md-3 col-sm-6">
				<ul class="list-unstyled">
					<li v-for="player in players" :key="player.id">
						<p class="d-inline" :class="{'font-weight-bold': player.id === currentPlayer.id}">{{player.name}}</p>
						<p v-if="player.isRoomOwner" class="text-owner d-inline">owner</p>
						<a @click="disconnect(player)" v-if="player.isCurrentUser || currentPlayer.isRoomOwner" class="d-inline remove-current-player"><i class="material-icons" :title="getRemoveButtonTooltip(player)">remove_circle</i></a>
					</li>
				</ul>
			</div>
		</div>
		
		<div v-if="currentPlayer && currentPlayer.isRoomOwner" class="row d-flex justify-content-center">
			<button @click="play" class="btn btn-lg btn-primary col-xl-6 col-lg-6 col-md-6 col-sm-12">Play</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "WaitingRoom",
	data() {
		return {
			currentGame: 0,
		};
	},
	sockets: {
		userEnter: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("userEnter", data)')
		},
		userLeave: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("userLeave", data)')
		},
		roomError: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("roomError", data)')
		}
	},
	methods: {
		copyLink() {
			let pageLink = document.getElementById("page-link");
			let range;
			// IE
			if (document.selection) {
				range = document.body.createTextRange();
				range.moveToElementText(pageLink);
				range.select();
			}
			// Other browsers
			else if (window.getSelection) {
				range = document.createRange();
				range.selectNode(pageLink);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
			}
			
			// Copy content to clipboard
			document.execCommand("copy");
			
			// Remove selection
			if (window.getSelection)
				window.getSelection().removeAllRanges();
			
			alert("URL copied to clipboard!");
		},
		onGameClicked(id) {
			this.currentGame = id;
		},
		getRemoveButtonTooltip(player) {
			if (player.id === this.currentPlayer.id)
				return "Disconnect from this room";
			else if (this.currentPlayer.isRoomOwner)
				return "Disconnect player from room";
		},
		play() {
			// noinspection JSCheckFunctionSignatures
			this.$router.push({name: "room", params: { id: this.roomId }})
		},
		disconnect(player) {
			// Disconnecting current player
			if (player.id === this.currentPlayer.id) {
				console.log(`Disconnecting yourself ${this.currentPlayer.name} from room ${this.roomId}...`);
				this.leaveRoom(player);
				this.resetRoom();
				this.$store.dispatch("onPlayersRemoved", player.name);
				this.$router.push('/');
			}
			// Disconnecting other player from the room
			else if (this.currentPlayer.isRoomOwner) {
				console.log(`Disconnecting player ${player.name} from room ${this.roomId}...`);
				this.leaveRoom(player);
				this.$store.dispatch("onPlayersRemoved", player.name);
			}
		},
		resetRoom(){
			this.$store.dispatch("onRoomNameChanged", "");
			this.$store.dispatch("onOwnerChanged", "");
			this.$store.dispatch("onUsernameChanged", "");
		},
		changePlayers(players){
			this.$store.dispatch("onPlayersChanged", players);
			if(this.$store.getters.players.length === 0)
				this.$router.replace("/")
		},
		leaveRoom(player){
			console.log("DISCONNECTING")
			const jsonStringMessage =  JSON.stringify({
				user: player.name,
				type: "userLeave",
				room: this.$store.getters.roomName,
				content: player,
			});
			console.log(jsonStringMessage);
			this.$socket.emit('userLeave', jsonStringMessage);
		}
	},
	computed: {
		roomId() {
			if (this.$route.params.hasOwnProperty("id"))
				return this.$route.params.id;
			else
				return this.$store.getters.roomName;
		},
		availableGames() {
			return this.$store.getters.availableGames;
		},
		players() {
			if (this.$store.getters.players.length === 0)
				return;
			
			// Copy the players list
			let list = [...this.$store.getters.players];
			
			// Search for the owner
			let owner = null;
			let i;
			for (i = 0; i < list.length && owner === null; i++) {
				if (list[i].isRoomOwner) {
					owner = list[i];
					i--;
				}
			}
			
			if (owner !== null) {
				// Move the owner to the head of the list
				list.splice(i, 1);
				list.splice(0, 0, owner);
			}
			
			return list;
		},
		currentPlayer() {
			return this.$store.getters.players.find(player => player.isCurrentUser);
		},
	},
	created () {
		if(this.$store.getters.players.length === 0 || this.$store.getters.owner.length === 0
			|| this.$store.getters.username === 0) { //room is incomplete go back to lobby
			this.resetRoom();
			this.$router.push('/');
		}
		if(this.$store.getters.username.length > 0){
			this.$socket.emit("checkAuth", JSON.stringify({
				user: this.$store.getters.username,
				type: "checkAuth",
				content: this.$socket.id,
			}), (result) => {
				if(!result){
					this.resetRoom();
					this.$router.push('/');
				}
			});
		}
		
		this.$options.sockets.userEnter = (data) => {
			const message = JSON.parse(data);
			if(message.room !== this.$store.getters.roomName)
				return;
			this.$store.dispatch("onPlayersChanged", message.content);
			console.log(this.$store.getters.players)
		};
		
		this.$options.sockets.userLeave = (data) => {
			const message = JSON.parse(data);
			if(message.room !== this.$store.getters.roomName)
				return;
			this.changePlayers(message.content);
			console.log(this.$store.getters.players)
		};
		
		this.$options.sockets.roomError = (data) => {
			const message = JSON.parse(data);
			if(message.room !== this.$store.getters.roomName)
				return;
			//TODO error message
			console.log(message.content)
		};
		
		this.$options.sockets.disconnect = (data) => {
			this.$router.replace('/');
		};
	}
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
		margin: 30px 0;
	}
}

#waiting-room-container > .row {
	display: flex;
	align-items: center;
}

ul.list-unstyled {
	li {
		margin: 5px 0;
	}
}

.text-owner {
	margin-left: 20px;
	color: $red;
}

.remove-current-player {
	color: $red;
	cursor: pointer;
	.material-icons {
		color: $red;
		margin-left: 20px;
		font-size: 1em;
		cursor: pointer;
	}
}
</style>
