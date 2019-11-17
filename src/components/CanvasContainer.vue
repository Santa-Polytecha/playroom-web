<template>
	<div id="canvas-container" class="container">
		<div class="row">
			<p class="col-12">
				<canvas :ref="'canvas-element'" width="900" height="900"></canvas>
			</p>
		</div>
		<div class="row">
			<button onclick="clearScreen()">Clear Area</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "CanvasContainer",
	data: function(){
		return {
			context: null,
			strokeColor: "#ffffff"
		}
	},
	sockets: {
		drawing: function (data) {
			console.log('this method was fired by the socket server. eg: io.emit("drawing", data)')
		}
	},
	methods: {
		prepareCanva(){
			this.context = this.$refs['canvas-element'].getContext('2d');
			
			this.$refs['canvas-element'].width = this.$refs['canvas-element'].parentElement.clientWidth;
			this.$refs['canvas-element'].height = this.$refs['canvas-element'].parentElement.clientHeight;
			
			this.context.strokeStyle = this.strokeColor;
			this.context.lineJoin = "round";
			this.context.lineWidth = 5;
			
			this.context.strokeRect(0,0, this.$refs['canvas-element'].width, this.$refs['canvas-element'].height);
			this.draw();
		},
		clearScreen(){
			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		},
		addClick(x, y, dragging,clickX,clickY, clickDrag)
		{
			clickX.push(x);
			clickY.push(y);
			clickDrag.push(dragging);
		},
		draw(){
			let addClick = this.addClick;
			let redraw  = this.redraw;
			let sendDrawing  = this.sendDrawing;
			let clickX = [];
			let clickY = [];
			let clickDrag = [];
			let paint = false;
			
			this.$refs['canvas-element'].addEventListener("mousedown", function(e){
				paint = true;
			});
			
			this.$refs['canvas-element'].addEventListener("mousemove", function(e){
				if(paint){
					//TODO change 83 because depend on navbar width
					addClick(e.pageX, e.pageY - 83, true, clickX,clickY, clickDrag);
					redraw(clickX,clickY, clickDrag);
				}
			});
			
			this.$refs['canvas-element'].addEventListener("mouseup", function(e){
				paint = false;
				sendDrawing(clickX,clickY, clickDrag);
				clickX = [];
				clickY = [];
				clickDrag = [];
			});
			
			this.$refs['canvas-element'].addEventListener("mouseleave", function(e){
				paint = false;
				clickX = [];
				clickY = [];
				clickDrag = [];
			});
		},
		redraw(clickX,clickY, clickDrag){
			
			for(let i=0; i < clickX.length; i++) {
				this.context.beginPath();
				if(clickDrag[i] && i){
					this.context.moveTo(clickX[i-1], clickY[i-1]);
					this.context.lineTo(clickX[i], clickY[i]);
				}else{
					this.context.moveTo(clickX[i], clickY[i]);
				}
				this.context.closePath();
				this.context.stroke();
			}
			
		},
		sendDrawing(clickX,clickY, clickDrag){
			const jsonStringMessage =  JSON.stringify({
				user: this.$store.getters.username,
				type: "newDrawing",
				room: this.$store.getters.roomName,
				content: {
					clickDrag: clickDrag,
					clickX: clickX,
					clickY: clickY
				},
			});
			this.$socket.emit('newDrawing', jsonStringMessage);
		},
	},
	mounted() {
		this.prepareCanva();
	},
	created() {
		this.$options.sockets.drawing = (data) => {
			const message = JSON.parse(data);
			if(message.user !== this.$store.getters.username)
				this.redraw(message.content.clickX, message.content.clickY, message.content.clickDrag);
		};
	}
};
</script>

<style scoped lang="scss">
@import "../assets/css/colors.scss";
@import "../assets/css/metrics.scss";

#canvas-container {
	width: 100%;
	min-width: 100%;
	max-width: 100%;
	height: 100%;
	min-height: 100%;
	max-height: 100%;
	background-color: $grayDark;
	border-radius: 0 $border-radius-big 0 0;
}

#canvas-container {
	.row {
		align-items: center;
		p {
			font-size: 100pt;
			font-weight: bold;
			text-align: center;
			color: darken($grayDark, 5);
		}
	}
}
</style>
