<template>
	<div class="container" id="connect-room">
		<div class="row" id="title-row">
			<h1 class="col-12">Playroom</h1>
			<br/>
			<p class="lead col-12">Play with your friends in a private & friendly space</p>
		</div>
		
		<div class="row">
			<div class="col-12 container">
				<form class="col-12 row">
					<label for="username-text" class="col-12">Username</label>
					<input type="text" class="form-control col-12" id="username-text" name="username-text" :placeholder="this.generateName(4)" @input="onUsernameChanged"/>
				</form>
			</div>
		</div>
		
		<div class="row jumbotron-neon jumbotron-neon-pink">
			<h2 class="col-12">Connect to an existing room</h2>
			<div class="col-12 container">
				<form class="col-12 row">
					<label for="search-room-text" class="col-12">Search for a room</label>
					<input type="text" class="form-control col-9" id="search-room-text" name="search-room-text" :placeholder="this.generateName(2, undefined, '-')" @input="onSearchRoomChanged"/>
					<input type="button" class="btn btn-outline-primary col-3" id="search-room-button" name="search-room-button" value="Connect" @click="onConnectRoomClicked"/>
				</form>
			</div>
		</div>
		
		<div class="row jumbotron-neon jumbotron-neon-green">
			<h2 class="col-12">Create a new room</h2>
			<div class="col-12 container">
				<form class="col-12 row">
					<label for="create-room-text" class="col-12">Room name</label>
					<input type="text" class="form-control col-9" id="create-room-text" name="create-room-text" :placeholder="this.generateName(2, undefined, '-')" @input="onCreateRoomChanged"/>
					<input type="button" class="btn btn-outline-primary col-3" id="create-room-button" name="create-room-button" value="Create" @click="onCreateRoomClicked"/>
				</form>
			</div>
		</div>
		
	</div>
</template>

<script>
export default {
	name: "ConnectRoom",
	data() {
		return {
			adjectives: ["little", "sweet", "fluffy", "squared", "cubic", "smiling", "jumping", "cute", "supportive",
					"pink", "blue", "purple", "creamy", "delicious"],
			nouns: ["brioche", "pancakes", "strawberry", "blueberry", "lollipop", "muffin", "marshmallow", "candy",
					"gum", "jelly", "cake", "chocolate", "doughnut", "croissant", "macaroon", "cupcake", "waffles",
					"cookie"],
			username: '',
			searchRoom: '',
			createRoom: '',
		};
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
		onUsernameChanged(event) {
			this.username = event.target.value;
		},
		onSearchRoomChanged(event) {
			this.searchRoom = event.target.value;
		},
		onCreateRoomChanged(event) {
			this.createRoom = event.target.value;
		},
		onConnectRoomClicked() {
			if (this.username !== '' && this.searchRoom !== '') {
				console.log(`Connecting ${this.username} in the room ${this.searchRoom}...`);
				this.$store.dispatch("onUsernameChanged", this.username);
				this.$store.dispatch("onRoomNameChanged", this.searchRoom);
			}
			else if (this.username === '')
				console.log("Username cannot be empty");
			else if (this.searchRoom === '')
				console.log("SearchRoom cannot be empty");
		},
		onCreateRoomClicked() {
			if (this.username !== '' && this.createRoom !== '') {
				console.log(`Creating the room ${this.createRoom} for ${this.username}...`);
				this.$store.dispatch("onUsernameChanged", this.username);
				this.$store.dispatch("onRoomNameChanged", this.searchRoom);
			}
			else if (this.username === '')
				console.log("Username cannot be empty");
			else if (this.createRoom === '')
				console.log("CreateRoom cannot be empty");
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/style";

#connect-room {
	width: 50%;
	height: 100%;
	max-height: 100%;
	overflow: hidden;
	margin: 50px auto auto;
}

h1, h2, h3, h4, h5, h6, p {
	text-align: center;
}

h1 {
	font-size: 20pt;
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

.row {
	margin: 20px 0;
}

#search-room-text, #create-room-text {
	border-radius: 500px 0 0 500px;
}

#search-room-button, #create-room-button {
	border-radius: 0 500px 500px 0;
}
</style>
