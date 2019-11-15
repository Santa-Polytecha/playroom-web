<template>
	<div class="container" id="connect-room">
		<div class="row">
			<div class="col-xl-6 col-lg-6  col-md-6 col-sm-12 first-row">
				<div class="container">
					<div class="row" id="title-row">
						<h1 class="col-12">Playroom</h1>
						<br/>
						<p class="lead col-12">Play with your friends in a private & friendly space</p>
					</div>
					
					<div class="row flex-column align-items-center">
						<img src="../assets/img/playroom/playroom1024.png" alt="Playroom Icon" class="col-8"/>
					</div>
				</div>
			</div>
			
			<div class="col-xl-6 col-lg-6  col-md-6 col-sm-12 second-row">
				<div class="container">
					
					<div class="row">
						<div class="col-12 container">
							<form class="col-12 row">
								<label for="username-text" class="col-12">Username</label>
								<input type="text" class="form-control col-12" id="username-text" name="username-text" :placeholder="this.usernamePlaceholder" v-model="username"/>
								<TextError :message="usernameErrorMessage" :show="usernameErrorVisibility"/>
							</form>
						</div>
					</div>
					
					<div class="row">
						<h2 class="col-12">Connect to an existing room</h2>
						<div class="col-12 container">
							<form class="col-12 row">
								<label for="search-room-text" class="col-12">Search for a room</label>
								<input type="text" class="form-control col-9" id="search-room-text" name="search-room-text" :placeholder="this.searchRoomPlaceholder" v-model="searchRoom"/>
								<input type="button" class="btn btn-primary col-3" id="search-room-button" name="search-room-button" value="Connect" @click="onConnectRoomClicked"/>
								<TextError :message="searchRoomErrorMessage" :show="searchRoomErrorVisibility"/>
							</form>
						</div>
					</div>
					
					<div class="row">
						<h2 class="col-12">Create a new room</h2>
						<div class="col-12 container">
							<form class="col-12 row">
								<input type="button" class="btn btn-primary col-12" id="create-room-button" name="create-room-button" value="Create" @click="onCreateRoomClicked"/>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import TextError from "./TextError";
export default {
	name: "ConnectRoom",
	components: { TextError },
	data() {
		return {
			adjectives: ["little", "sweet", "fluffy", "squared", "cubic", "smiling", "jumping", "cute", "supportive",
					"pink", "blue", "purple", "creamy", "delicious"],
			nouns: ["brioche", "pancakes", "strawberry", "blueberry", "lollipop", "muffin", "marshmallow", "candy",
					"gum", "jelly", "cake", "chocolate", "doughnut", "croissant", "macaroon", "cupcake", "waffles",
					"cookie"],
			username: '',
			searchRoom: '',
			usernamePlaceholder: '',
			searchRoomPlaceholder: '',
			usernameErrorMessage: '',
			usernameErrorVisibility: false,
			searchRoomErrorMessage: '',
			searchRoomErrorVisibility: false,
		};
	},
	sockets: {
		roomCreated: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("roomCreated", data)')
		},
		roomJoined: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("roomJoined", data)')
		},
		roomError: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("roomError", data)')
		},
		redirect: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("redirect", data)')
		}
	},
	mounted() {
		this.usernamePlaceholder = this.generateName(4);
		this.searchRoomPlaceholder = this.generateName(2, undefined, '-');
	},
	methods: {
		generateName(number = 1, ellipsis = true, sep = ' ') {
			let content = '';
			for (let i = 0; i < number; i++) {
				let adjective = this.adjectives[Math.floor(Math.random() * this.adjectives.length)];
				let noun = this.nouns[Math.floor(Math.random() * this.nouns.length)];
				content += adjective + sep + noun;
				if (i+1 !== number)
					content += ", ";
			}
			
			if (ellipsis)
				content += ", ...";
			
			return content;
		},
		checkFields(checkSearchRoom = true) {
			let error = false;
			
			if (this.username === undefined || this.username === null || this.username === '') {
				this.usernameErrorMessage = "A username is required.";
				this.usernameErrorVisibility = true;
				error = true;
			}
			else
				this.usernameErrorVisibility = false;
			
			if (checkSearchRoom) {
				if (this.searchRoom === undefined || this.searchRoom === null || this.searchRoom === '') {
					this.searchRoomErrorMessage = "A room name is required.";
					this.searchRoomErrorVisibility = true;
					error = true;
				}
				else
					this.searchRoomErrorVisibility = false;
			}
			
			return !error;
		},
		onConnectRoomClicked() {
			if (this.checkFields()) {
				console.log(`Connecting ${this.username} in the room ${this.searchRoom}...`);
				this.$store.dispatch("onUsernameChanged", this.username);
				this.$store.dispatch("onRoomNameChanged", this.searchRoom);
				this.$socket.emit('joinRoom',  JSON.stringify({
					user: this.$store.getters.username,
					type: "create",
					content: this.searchRoom,
				}));
			}
		},
		onCreateRoomClicked() {
			if (this.checkFields(false)) {
				console.log(`Creating a room for ${this.username}...`);
				this.$store.dispatch("onUsernameChanged", this.username);
				this.$socket.emit('createRoom',  JSON.stringify({
					user: this.$store.getters.username,
					type: "create",
					content: "",
				}));
			}
		},
		nextPage(id) {
			this.$router.push({ name: "waiting-room", params: { id: id }})
		},
		reset(){
			this.$store.dispatch("onRoomNameChanged", "");
			this.$store.dispatch("onOwnerChanged", "");
			this.$store.dispatch("onPlayersChanged", []);
		},
		changePlayers(players){
			this.$store.dispatch("onPlayersChanged", players);
			if(this.$store.getters.players.length === 0)
				this.$router.replace("/")
		}
	},
	created () {
		//if user come back to this page he leaves game room
		if(this.$store.getters.username.length > 0){
			this.$socket.emit("userLeave", JSON.stringify({
				user: this.$store.getters.username,
				type: "userLeave",
				content: this.$socket.id,
			}));
			this.reset();
		}
		
		this.$options.sockets.roomCreated = (data) => {
			const message = JSON.parse(data);
			this.$store.dispatch("onRoomNameChanged", message.room);
			this.$store.dispatch("onOwnerChanged", message.user);
			this.$store.dispatch("onPlayersChanged", message.content);
			this.nextPage(message.room);
		};
		
		this.$options.sockets.roomJoined = (data) => {
			const message = JSON.parse(data);
			const content = JSON.parse(message.content);
			console.log(message);
			this.$store.dispatch("onRoomNameChanged", content.name);
			this.$store.dispatch("onOwnerChanged", content.owner);
			this.changePlayers(content.users);
			this.nextPage(content.name);
		};
		
		this.$options.sockets.roomError = (data) => {
			const message = JSON.parse(data);
			const content = JSON.parse(message.content);
			if(content.error === "user"){
				this.usernameErrorMessage = content.message;
				this.usernameErrorVisibility = true;
			}else if(content.error === "room"){
				this.searchRoomErrorMessage = content.message;
				this.searchRoomErrorVisibility = true;
			}
		};
	}
};
</script>

<style scoped lang="scss">
@import "../assets/css/style.scss";

#connect-room {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	margin: 0;
	padding: 0;
	.row {
		height: 100%;
		margin: 0;
	}
	.row > div {
		padding: 20px 0;
	}
	.first-row {
		background-color: $primaryColorBackground;
	}
	.first-row, .second-row {
		display: flex;
		align-items: center;
	}
}

h1, h2, h3, h4, h5, h6, p {
	text-align: center;
}

h1 {
	font-size: 40pt;
	font-family: "Comfortaa", "Raleway", "Montserrat", Helvetica, Verdana, Arial, sans-serif, serif;
	font-weight: bold;
	color: white;
}

h2 {
	margin-bottom: 10px;
	font-size: 16pt;
}

label {
	text-align: start;
}

hr {
	margin: 50px 0;
}

.lead {
	font-size: 12pt;
}

.btn {
	text-transform: uppercase;
}

#search-room-text {
	border-right-width: 0;
	border-radius: $border-radius 0 0 $border-radius;
}

#search-room-button {
	border-radius: 0 $border-radius $border-radius 0;
}
</style>
