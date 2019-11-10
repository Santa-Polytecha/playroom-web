<template>
	<div id="waiting-room-container" class="container">
		<div class="row">
			<h1 class="col-12 text-center">#{{roomId}}</h1>
		</div>
		
		<div class="row d-flex justify-content-center">
			<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
				<div class="container">
					<form class="row d-flex justify-content-center">
						<label for="page-link" class="col-12">Link to this page:</label>
						<input type="text" name="page-link" id="page-link" :value="this.$route.fullPath" readonly class="form-control col-10"/>
						<input type="button" name="btn-copy-link" id="btn-copy-link" value="Copy Link" @click="copyLink" class="btn btn-primary col-2"/>
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
					<li v-for="player in players" :key="player.id"><p class="d-inline">{{player.name}}</p><p v-if="player.isRoomOwner" class="text-owner d-inline">owner</p><a @click="disconnect" v-if="player.isCurrentUser" class="d-inline remove-current-player"><i class="material-icons" title="Disconnect from this room">remove_circle</i></a></li>
				</ul>
			</div>
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
		disconnect() {
			console.log(`Disconnecting ${this.currentPlayer}...`);
			this.$router.push('/');
		},
	},
	computed: {
		roomId() {
			if (this.$route.params.hasOwnProperty("id"))
				return this.$route.params.id;
			else
				return this.$store.getters.roomId;
		},
		availableGames() {
			return this.$store.getters.availableGames;
		},
		players() {
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
			return this.$store.getters.players.find(player => player.isCurrentUser).name;
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
