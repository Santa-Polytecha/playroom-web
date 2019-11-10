import ConnectRoom from "./components/ConnectRoom";
import Room from "./components/Room";
import WaitingRoom from "./components/WaitingRoom";

export const routes = [
	{
		path: "/",
		name: "home",
		component: ConnectRoom,
	},
	{
		path: "/waiting-room/:id",
		name: "waiting-room",
		component: WaitingRoom,
	},
	{
		path: "/wait-room/:id",
		name: "wait-room",
		redirect: "/waiting-room/:id",
	},
	{
		path: "/room/:id",
		name: "room",
		component: Room,
	},
	{
		path: "*",
		name: "error",
		redirect: "/",
	},
];
