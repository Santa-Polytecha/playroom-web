import ConnectRoom from "./components/ConnectRoom";
import Room from "./components/Room";

export const routes = [
	{
		path: "/",
		name: "home",
		component: ConnectRoom,
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
