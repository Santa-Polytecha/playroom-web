export const state = {
	username: "",
	roomName: "",
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
	players: [
		{
			id: 0,
			name: "Léa",
			isRoomOwner: false,
			isCurrentUser: false,
		},
		{
			id: 1,
			name: "Valentin",
			isRoomOwner: true,
			isCurrentUser: true,
		},
		{
			id: 2,
			name: "Antoine",
			isRoomOwner: true,
			isCurrentUser: false,
		},
	],
	messages: [
		{
			id: 0,
			author: "Léa🍰",
			fromMe: false,
			date: 1573227140,
			content: "Hey!<br/>🤣🤣🤣",
		},
		{
			id: 1,
			author: "Valentin🍣",
			fromMe: true,
			date: 1573227142,
			content: "Hey back! 🤗",
		},
		{
			id: 2,
			author: "Antoine🔥",
			fromMe: false,
			date: 1573227200,
			content: "Hey there! 🎉<br/>💜💙💚💛🧡❤️",
		},
		{
			id: 3,
			author: "Antoine🔥",
			fromMe: false,
			date: 1573227400,
			content:
				"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi venenatis rhoncus tortor sed congue. Ut consectetur pretium orci vel pellentesque. Aenean turpis magna, sodales suscipit molestie quis, ullamcorper ut turpis. Donec sodales orci vel dui semper, ut pellentesque diam convallis. Maecenas vitae enim vel libero accumsan sodales. Pellentesque eget enim sodales, eleifend purus quis, sodales libero. Vivamus et tortor metus. Mauris turpis turpis, hendrerit in tellus et, finibus gravida dolor. Phasellus eu semper tortor, vel venenatis ex. Pellentesque blandit elementum odio quis tempor. Sed bibendum enim mauris, et iaculis magna malesuada vel. Phasellus faucibus congue neque, non faucibus metus fermentum ac. Ut leo lacus, faucibus in dictum sed, sollicitudin at urna. Praesent a tristique lacus. Donec condimentum mauris eget velit vestibulum feugiat. Quisque in malesuada mauris. Pellentesque ultrices neque sit amet neque tristique, et suscipit elit ultricies. Morbi venenatis felis nibh, ac scelerisque metus dictum eu. Praesent auctor nunc risus, sed sagittis quam fringilla scelerisque. Maecenas eget dictum dui. Nam pellentesque maximus gravida. Quisque et auctor risus. Integer interdum vel eros at ullamcorper. Quisque in metus a purus cursus venenatis. Mauris aliquam felis et eros maximus hendrerit. Etiam eu purus suscipit, tincidunt massa non, ornare justo. Etiam tincidunt ultrices fermentum. Aenean vel augue ac purus hendrerit rhoncus ut at ligula. Fusce aliquam mi vitae aliquet fermentum. Mauris lobortis et quam sed facilisis. Ut sit amet nibh turpis. Mauris et lorem blandit, sagittis odio nec, dapibus nunc. Cras vel eros ac eros mollis egestas in id erat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer enim nisl, malesuada eget erat ut, mollis feugiat ex. Sed tincidunt, nibh vitae condimentum ultricies, augue elit auctor ligula, mattis sollicitudin urna urna imperdiet lorem. Donec rutrum egestas nibh, at ultricies tortor blandit ac. Pellentesque turpis ex, fermentum ac massa sed, convallis posuere urna. Phasellus turpis sem, semper nec fermentum vitae, mollis eget urna. Ut molestie eu est ut suscipit. Phasellus non nisi hendrerit, mollis purus eu, finibus dui. Nam mollis semper nunc a hendrerit. Proin commodo lacus non tempor placerat. Etiam ullamcorper sit amet orci quis dignissim. Vestibulum pharetra turpis vel varius tempus. Nam venenatis pulvinar pretium. Mauris id pulvinar urna, non lacinia ex. Proin molestie odio rutrum metus dictum, vel mattis enim sagittis. Integer venenatis justo vitae arcu convallis, at luctus nisl lacinia. Maecenas pulvinar pellentesque rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla vulputate mi dolor, id rutrum ligula scelerisque nec. Duis pharetra ligula ac urna rutrum faucibus id ac lorem.",
		},
	],
};

export const getters = {
	username(state) {
		return state.username;
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
		state.players = payload;
	},
	addPlayer(state, payload) {
		state.players.push(payload);
	},
	setMessages(state, payload) {
		state.messages = payload;
	},
	addMessage(state, payload) {
		state.messages.push(payload);
	},
};
