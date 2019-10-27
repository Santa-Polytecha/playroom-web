export const state = {
	username: "",
	roomName: "",
};

export const getters = {
	username(state) {
		return state.username;
	},
	roomName(state) {
		return state.roomName;
	},
};

export const actions = {
	onUsernameChanged(toolkit, payload) {
		toolkit.commit("setUsername", payload);
	},
	onRoomNameChanged(toolkit, payload) {
		toolkit.commit("setRoomName", payload);
	},
};

export const mutations = {
	setUsername(state, payload) {
		state.username = payload;
	},
	setRoomName(state, payload) {
		state.roomName = payload;
	},
};
