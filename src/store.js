export const state = {
	username: "",
	roomName: "",
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
};

export const getters = {
	username(state) {
		return state.username;
	},
	roomName(state) {
		return state.roomName;
	},
	tools(state) {
		return state.tools;
	},
	currentTool(state) {
		return state.currentTool;
	},
};

export const actions = {
	onUsernameChanged(toolkit, payload) {
		toolkit.commit("setUsername", payload);
	},
	onRoomNameChanged(toolkit, payload) {
		toolkit.commit("setRoomName", payload);
	},
	onCurrentToolChanged(toolkit, payload) {
		toolkit.commit("setCurrentTool", payload);
	},
};

export const mutations = {
	setUsername(state, payload) {
		state.username = payload;
	},
	setRoomName(state, payload) {
		state.roomName = payload;
	},
	setCurrentTool(state, payload) {
		state.currentTool = payload;
	},
};
