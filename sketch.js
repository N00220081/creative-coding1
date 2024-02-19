let chart = [];
let data;

function preload() {
	data = loadTable("data/combined.csv", "csv", "header");
}


// barCharts.push(new barChart(12,15,34,13,[1,2,3,4,5]));

function setup() {
	
	createCanvas(windowWidth, windowHeight);
	pixelDensity(2);
	angleMode(DEGREES);
	noLoop();

	chart = new barChart({
		_title: "How many people have GP Cards",
		_data: data,
		_xValue: "Year",
		_yValue: "Gp_Card"
	});


	chart2 = new horizontalBarChart({
		_posY: 500,
		_title: "How many people have a Medical Cards",
		_data: data,
		_xValue: "Year",
		_yValue: "Medical_Card"
	});

	chart3 = new stackedBarChart({
		_posX: 500,
		_posY: 800,
		_title: "How many people have a Medical/GP Card",
		_data: data,
		_xValue: "Year",
		_yValue: "Gp_Card",
		_zValue: "Medical_Card"
	});

	chart4 = new scatterPlotChart({
		_posX: 500,
		_title: "How many people have GP Cards",
		_data: data,
		_xValue: "Year",
		_yValue: "Gp_Card"
	});

}

function draw() {
	background(200);
	chart.render();
	chart2.render();
	chart3.render();
	chart4.render();

}
