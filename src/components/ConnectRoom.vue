<template>
	<div class="container" id="connect-room">
		<div class="row">
			<div class="col-xl-6 col-lg-6  col-md-6 col-sm-12 first-row">
				<div class="container d-flex flex-column justify-content-around">
					<div class="row" id="title-row">
						<h1 class="col-12">Playroom</h1>
						<br/>
						<p class="lead col-12">Play with your friends in a private & friendly space</p>
					</div>
					
					<div id="banner-placeholder" class="row" ref="banner-placeholder">
						<img src="../assets/img/banner/room1.png" ref="room1" id="room1"/>
						<img src="../assets/img/banner/room2.png" ref="room2" id="room2"/>
						<img src="../assets/img/banner/room4.png" ref="room4" id="room4"/>
						<img src="../assets/img/banner/room3.png" ref="room3" id="room3"/>
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
			initialBannerY: 0,
		};
	},
	mounted() {
		this.usernamePlaceholder = this.generateName(4);
		this.searchRoomPlaceholder = this.generateName(2, undefined, '-');
		
		// Place banner images
		window.addEventListener("resize", this.placeBanner);
		window.addEventListener("load", this.placeBanner);
		window.addEventListener("fullscreenchange", this.placeBanner);
		window.addEventListener("fullscreenerror", this.placeBanner);
		this.$refs["banner-placeholder"].addEventListener("resize", this.placeBanner);
	},
	methods: {
		placeBanner() {
			const resizeImg = (img, width = null, height = null, originalWidth = null, originalHeight = null) => {
				let oldWidth = originalWidth !== null && originalWidth !== undefined ? originalWidth : img.getBoundingClientRect().width;
				let oldHeight = originalHeight !== null && originalHeight !== undefined ? originalHeight : img.getBoundingClientRect().height;
				if (width != null && height == null)
					height = width * oldHeight/oldWidth;
				else if (width == null && height != null)
					width = height * oldWidth/oldHeight;
				else if (width == null && height == null)
					return;
				img.style.width = width + "px";
				img.style.height = height + "px";
			};
			
			let bannerPlaceholder = this.$refs["banner-placeholder"];
			
			let bannerX = bannerPlaceholder.getBoundingClientRect().x;
			let bannerY = bannerPlaceholder.getBoundingClientRect().y;
			let bannerWidth = bannerPlaceholder.getBoundingClientRect().width;
			
			if (this.initialBannerY <= 0)
				this.initialBannerY = bannerY;
			else {
				bannerPlaceholder.style = this.initialBannerY + "px";
				bannerY = this.initialBannerY;
			}
			
			// Resize banner height according to width
			bannerPlaceholder.style.height = bannerWidth + "px";
			
			// Recompute
			let bannerHeight = bannerPlaceholder.getBoundingClientRect().height;
			
			console.log("banner position = ", [bannerX, bannerY]);
			console.log("banner width x height = ", [bannerWidth, bannerHeight]);
			
			const posImg = (img, x, y) => {
				img.style.position = "absolute";
				img.style.left = (bannerX + x) * (bannerWidth / 718) + "px";
				img.style.top = (2 * bannerY + y) * (bannerWidth / 718) + "px";
			};
			
			let room1 = this.$refs["room1"];
			let room2 = this.$refs["room2"];
			let room3 = this.$refs["room3"];
			let room4 = this.$refs["room4"];
			let rooms = [room1, room2, room3, room4];
			
			rooms.forEach((room, index) => room.style.zIndex = index);
			
			resizeImg(room1, bannerWidth / 2.5, null, 1024, 1024);
			resizeImg(room2, bannerWidth / 2.2, null, 1024, 1097);
			resizeImg(room3, bannerWidth / 2.25, null, 1024, 812);
			resizeImg(room4, bannerWidth / 1.2, null, 1024, 602);
			
			posImg(room1, 0, 50);
			posImg(room2, 400, 0);
			posImg(room3, 300, 230);
			posImg(room4, -150, 320);
		},
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
			// TODO: Check server-side if username is unique
			else if (this === null) {
				this.usernameErrorMessage = "This username is already taken.";
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
				this.nextPage(this.searchRoom);
			}
		},
		onCreateRoomClicked() {
			if (this.checkFields(false)) {
				this.searchRoom = this.generateName(1, false, '-');
				console.log(`Creating the room ${this.searchRoom} for ${this.username}...`);
				this.$store.dispatch("onUsernameChanged", this.username);
				this.$store.dispatch("onRoomNameChanged", this.searchRoom);
				this.nextPage(this.searchRoom);
			}
		},
		nextPage(id) {
			this.$router.push({ name: "waiting-room", params: { id: id }})
		},
	},
};
</script>

<style scoped lang="scss">
@import "../assets/css/style.scss";

// SM
@media (min-width:576px) {
	#connect-room {
		overflow: visible;
	}
}
// MD
@media (min-width:768px) {
	#connect-room {
		overflow: hidden;
	}
}
// LG
@media (min-width:992px) {
	#connect-room {
		overflow: hidden;
	}
}
// XL
@media (min-width:1200px) {
	#connect-room {
		overflow: hidden;
	}
}

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
		.container {
			min-height: 100%;
			max-height: 100%;
		}
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

#banner-placeholder {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	img {
		max-width: 100%;
	}
}
</style>
