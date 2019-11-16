export const state = {
	username: "",
	owner: "",
	roomName: "",
	isAuthorized: true,
	availableGames: [
		{
			id: 0,
			name: "Game 1",
		},
		{
			id: 1,
			name: "Game 2",
		},
		{
			id: 2,
			name: "Game 3",
		},
	],
	tools: [
		{
			id: 0,
			name: "Brush",
			materialIconName: "brush",
			colorId: "primary",
		},
		{
			id: 1,
			name: "Eraser",
			materialIconName: "format_color_reset",
			colorId: "warning",
		},
		{
			id: 2,
			name: "Palette",
			materialIconName: "palette",
			colorId: "danger",
		},
		{
			id: 3,
			name: "Color Picker",
			materialIconName: "colorize",
			colorId: "success",
		},
	],
	currentTool: 0,
	players: [],
	messages: [],
};

export const getters = {
	username(state) {
		return state.username;
	},
	owner(state) {
		return state.owner;
	},
	roomName(state) {
		return state.roomName;
	},
	availableGames(state) {
		return state.availableGames;
	},
	tools(state) {
		return state.tools;
	},
	currentTool(state) {
		return state.currentTool;
	},
	players(state) {
		return state.players;
	},
	messages(state) {
		return state.messages;
	},
};

export const actions = {
	onUsernameChanged(toolkit, payload) {
		toolkit.commit("setUsername", payload);
	},
	onOwnerChanged(toolkit, payload) {
		toolkit.commit("setOwner", payload);
	},
	onRoomNameChanged(toolkit, payload) {
		toolkit.commit("setRoomName", payload);
	},
	onAvailableGamesChanged(toolkit, payload) {
		toolkit.commit("setAvailableGames", payload);
	},
	onCurrentToolChanged(toolkit, payload) {
		toolkit.commit("setCurrentTool", payload);
	},
	onPlayersChanged(toolkit, payload) {
		toolkit.commit("setPlayers", payload);
	},
	onPlayersAdded(toolkit, payload) {
		toolkit.commit("addPlayer", payload);
	},
	onPlayersRemoved(toolkit, payload) {
		toolkit.commit("removePlayer", payload);
	},
	onMessagesChanged(toolkit, payload) {
		toolkit.commit("setMessages", payload);
	},
	onMessagesAdded(toolkit, payload) {
		toolkit.commit("addMessage", payload);
	},
};

export const mutations = {
	setUsername(state, payload) {
		state.username = payload;
	},
	setOwner(state, payload) {
		state.owner = payload;
	},
	setRoomName(state, payload) {
		state.roomName = payload;
	},
	setAvailableGames(state, payload) {
		state.availableGames = payload;
	},
	setCurrentTool(state, payload) {
		state.currentTool = payload;
	},
	setPlayers(state, payload) {
		state.players = [];
		payload.forEach( (payl) => {
			const player = {
				id: payl.socketId,
				isRoomOwner: payl.name === state.owner,
				isCurrentUser: payl.name === state.username,
				name : payl.name
			};
			state.players.push(player);
		});
	},
	addPlayer(state, payload) {
		const player = {
			isRoomOwner: payload === state.owner,
			isCurrentUser: payload === state.username,
			name : payload
		};
		state.players.push(player);
	},
	removePlayer(state, payload) {
		state.players = state.players.filter(item => item.name !== payload);
	},
	setMessages(state, payload) {
		state.messages = payload;
	},
	addMessage(state, payload) {
		if(payload.author === state.username){
			payload.fromMe = true
		}
		state.messages.push(payload);
	},
};
