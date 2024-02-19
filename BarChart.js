class barChart {
	constructor({
		_chartWidth = 300,
		_chartHeight = 300,
		_posX = 100,
		_posY = 400,
		_title = "Chart",
		_data,
		_xValue,
		_yValue }) {

		this.chartWidth = _chartWidth;
		this.chartHeight = _chartHeight;
		this.posX = _posX;
		this.posY = _posY;
		this.data = _data;
		this.xValue = _xValue;
		this.yValue = _yValue;
		this.title = _title;

		this.rounding = 1;

		this.maxNum = this.calMax();
		this.numTicks = 12;

		this.margin = 10;
		this.spacing = 10;

	}

	render() {
		noFill();
		push();
		translate(this.posX, this.posY);
		this.drawHAxis();
		this.drawVAxis();
		this.drawBars();
		pop();

	}

	// Drawing bars
	drawBars() {
		let barNum = this.data.getRowCount()
		let remainWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.spacing);
		let barWidth = remainWidth / barNum;
		let barUnit = barWidth + this.spacing;

		push()
		translate(this.margin, 0)
		for (let x = 0; x < barNum; x++) {
			let value = int(-this.data.rows[x].obj[this.yValue])
			rect(x * barUnit, 0, barWidth, this.scaler(value));
		}
		pop()
	}

	// x
	drawHAxis() {
		line(0, 0, this.chartWidth, 0);
		let barNum = this.data.getRowCount()
		let remainWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.spacing);
		let barWidth = remainWidth / barNum;
		let barUnit = barWidth + this.spacing;
		push()
		translate(this.margin, 0)

		// Draw title
		let titleHeading = this.title;
		textAlign(CENTER, CENTER);
		textSize(20);
		fill(0);
		text(titleHeading, this.chartWidth / 2, -325);


		// Creating label for x-axis
		let labelArray = this.data.getColumn(this.xValue);
		for (let x = 0; x < labelArray.length; x++) {
			let value = labelArray[x];
			push()
			translate(x * barUnit + (barWidth / 2), 10);
			rotate(45);
			fill(0);
			noStroke();
			textSize(14);
			textAlign(LEFT, TOP);
			text(value, 0, 0);
			pop()
		}

		pop()
	}

	// y
	drawVAxis() {

		line(0, 0, 0, -this.chartHeight);
		for (let y = 1; y < this.numTicks + 1; y++) {
			// ySpace = 30
			let ySpace = this.chartHeight / this.numTicks;
			stroke(50);
			line(0, -ySpace * y, -10, -ySpace * y);

			let unitSpace = (this.maxNum / this.numTicks).toFixed();
			noStroke();
			fill(50);
			textSize(15);
			textAlign(RIGHT, CENTER);
			text(y * unitSpace, -15, -ySpace * y);

		}
	}


	calMax() {
		let max = 0;
		for (let x = 0; x < this.data.getRowCount(); x++) {

			if (int(this.data.rows[x].obj[this.yValue]) > max) {
				max = int(this.data.rows[x].obj[this.yValue]);
			}
		}
		for (let x = max; x < 1000000; x++) {
			if (x % this.numTicks == 0 && x % this.rounding == 0) {
				max = x;
				break
			}
		}

		return max;
	}

	// scaler(_num){
	// let scaleValue = this.maxNum/this.chartHeight;
	// return _num/scaleValue;
	// }

	// Scaling the barchart
	scaler(_num) {
		return map(_num, 0, this.maxNum, 0, this.chartHeight)
	}
}

class horizontalBarChart {
	constructor({
		_chartWidth = 300,
		_chartHeight = 300,
		_posX = 100,
		_posY = 400,
		_title = "Chart",
		_data,
		_xValue,
		_yValue }) {

		this.chartWidth = _chartWidth;
		this.chartHeight = _chartHeight;
		this.posX = _posX;
		this.posY = _posY;
		this.data = _data;
		this.xValue = _xValue;
		this.yValue = _yValue;
		this.title = _title;

		this.rounding = 1;

		this.maxNum = this.calMax();
		this.numTicks = 4;

		this.margin = 10;
		this.spacing = 10;




		// this.axisLineColour = "#303236";
		// this.axisLineThickness = 2;
		// this.barWidth = 20;
		// this.barColour = "#0e3069";
	}

	render() {
		noFill();
		push();
		translate(this.posX, this.posY);
		this.drawHAxis();
		this.drawVAxis();
		this.drawBars();
		pop();

	}

	// Drawing bars
	drawBars() {
        let barNum = this.data.getRowCount();
        let remainHeight = this.chartHeight - (this.margin * 2) - ((barNum - 1) * this.spacing);
        let barHeight = remainHeight / barNum;
        let barUnit = barHeight + this.spacing;

        push();
        translate(0, this.chartHeight - this.margin);
        for (let y = 0; y < barNum; y++) {
            let value = int(this.data.rows[y].obj[this.yValue]);
            rect(0, -y * barUnit, this.scaler(value), -barHeight);
        }
        pop();
    }

	// x
	drawHAxis() {
        line(0, this.chartHeight, this.chartWidth, this.chartHeight);
        let barNum = this.data.getRowCount();
        let remainHeight = this.chartHeight - (this.margin * 2) - ((barNum - 1) * this.spacing);
        let barHeight = remainHeight / barNum;
        let barUnit = barHeight + this.spacing;

        // Draw title
        let titleHeading = this.title;
        textAlign(CENTER, CENTER);
        textSize(20);
        fill(0);
        text(titleHeading, this.chartWidth / 2, this.chartHeight - 325);

        // Creating label for y-axis
        let labelArray = this.data.getColumn(this.xValue);
        for (let y = 0; y < labelArray.length; y++) {
            let value = labelArray[y];
            push();
            translate(0, this.chartHeight - y * barUnit - (barHeight / 2) -10);
            fill(0);
            noStroke();
            textSize(14);
            textAlign(RIGHT, CENTER);
            text(value, -5, 0);
            pop();
        }
    }

	// y
	drawVAxis() {
        line(0, this.chartHeight, 0, 0);
        for (let x = 1; x < this.numTicks + 1; x++) {
            let xSpace = this.chartWidth / this.numTicks;
            stroke(50);
            line(xSpace * x, this.chartHeight, xSpace * x, this.chartHeight + 10);

            let unitSpace = (this.maxNum / this.numTicks).toFixed();
            noStroke();
            fill(50);
            textSize(15);
            textAlign(CENTER, CENTER);
            text(x * unitSpace, xSpace * x, this.chartHeight + 25);
        }
    }

	calMax() {
		let max = 0;
		for (let x = 0; x < this.data.getRowCount(); x++) {

			if (int(this.data.rows[x].obj[this.yValue]) > max) {
				max = int(this.data.rows[x].obj[this.yValue]);
			}
		}
		for (let x = max; x < 1000000; x++) {
			if (x % this.numTicks == 0 && x % this.rounding == 0) {
				max = x;
				break
			}
		}

		return max;
	}

	// scaler(_num){
	// let scaleValue = this.maxNum/this.chartHeight;
	// return _num/scaleValue;
	// }

	// Scaling the barchart
	scaler(_num) {
        return map(_num, 0, this.maxNum, 0, this.chartWidth);
    }
}

class stackedBarChart {
	constructor({
		_chartWidth = 300,
		_chartHeight = 300,
		_posX = 100,
		_posY = 400,
		_title = "Chart",
		_data,
		_xValue,
		_yValue, 
		_zValue}) {

		this.chartWidth = _chartWidth;
		this.chartHeight = _chartHeight;
		this.posX = _posX;
		this.posY = _posY;
		this.data = _data;
		this.xValue = _xValue;
		this.yValue = _yValue;
		this.zValue = _zValue;
		this.title = _title;

		this.rounding = 1;

		this.maxNum = this.calMax();
		this.numTicks = 10;

		this.margin = 10;
		this.spacing = 10;

		

	}

	render() {
		noFill();
		push();
		translate(this.posX, this.posY);
		this.drawHAxis();
		this.drawVAxis();
		this.drawBars();
		pop();

	}

	// Drawing bars
drawBars() {
    let barNum = this.data.getRowCount();
    let remainWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.spacing);
    let barWidth = remainWidth / barNum;
    let barUnit = barWidth + this.spacing;

    push();
    translate(this.margin, 0);
    for (let x = 0; x < barNum; x++) {
        let value = int(this.data.rows[x].obj[this.yValue]);
        let value2 = int(this.data.rows[x].obj[this.zValue]);
        let barHeight1 = (this.scaler(value));
        let barHeight2 = (this.scaler(value2));
		fill(50);
        rect(x * barUnit, 0, barWidth, -barHeight1);
		fill(155);
        rect(x * barUnit, -barHeight1, barWidth, -barHeight2);
    }
    pop();
}


	// x
	drawHAxis() {
		line(0, 0, this.chartWidth, 0);
		let barNum = this.data.getRowCount()
		let remainWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.spacing);
		let barWidth = remainWidth / barNum;
		let barUnit = barWidth + this.spacing;
		push()
		translate(this.margin, 0)

		// Draw title
		let titleHeading = this.title;
		textAlign(CENTER, CENTER);
		textSize(20);
		fill(0);
		text(titleHeading, this.chartWidth / 2, -325);


		// Creating label for x-axis
		let labelArray = this.data.getColumn(this.xValue);
		for (let x = 0; x < labelArray.length; x++) {
			let value = labelArray[x];
			push()
			translate(x * barUnit + (barWidth / 2), 10);
			rotate(45);
			fill(0);
			noStroke();
			textSize(14);
			textAlign(LEFT, TOP);
			text(value, 0, 0);
			pop()
		}

		pop()
	}

	// y
	drawVAxis() {

		line(0, 0, 0, -this.chartHeight);
		for (let y = 1; y < this.numTicks + 1; y++) {
			// ySpace = 30
			let ySpace = this.chartHeight / this.numTicks;
			stroke(50);
			line(0, -ySpace * y, -10, -ySpace * y);

			let unitSpace = (this.maxNum / this.numTicks).toFixed();
			noStroke();
			fill(50);
			textSize(15);
			textAlign(RIGHT, CENTER);
			text(y * unitSpace, -15, -ySpace * y);

		}
	}


	calMax() {
		let max = 0;
		for (let x = 0; x < this.data.getRowCount(); x++) {
			let value = int(this.data.rows[x].obj[this.yValue]);
			let value2 = int(this.data.rows[x].obj[this.zValue]);
			let totalValue = value + value2;
			if (totalValue > max) {
				max = totalValue;
			}
		}
		for (let x = max; x < 1000000; x++) {
			if (x % this.numTicks == 0 && x % this.rounding == 0) {
				max = x;
				break;
			}
		}
		return max;
	}
	
	
	scaler(_num) {
		return map(_num, 0, this.maxNum, 0, this.chartHeight)
	}
	
	
}

class scatterPlotChart {
	constructor({
		_chartWidth = 300,
		_chartHeight = 300,
		_posX = 100,
		_posY = 400,
		_title = "Chart",
		_data,
		_xValue,
		_yValue }) {

		this.chartWidth = _chartWidth;
		this.chartHeight = _chartHeight;
		this.posX = _posX;
		this.posY = _posY;
		this.data = _data;
		this.xValue = _xValue;
		this.yValue = _yValue;
		this.title = _title;

		this.rounding = 1;

		this.maxNum = this.calMax(this.yValue);
		this.numTicks = 12;

		this.margin = 10;
		this.spacing = 10;

	}

	render() {
		noFill();
		push();
		translate(this.posX, this.posY);
		this.drawHAxis();
		this.drawVAxis();
		this.drawPlots();
		pop();

	}

	// Drawing plots
	drawPlots() {
		let plotNum = this.data.getRowCount()
		let remainWidth = this.chartWidth - (this.margin * 2) - ((plotNum - 1) * this.spacing);
		let barWidth = remainWidth / plotNum;
		let barUnit = barWidth + this.spacing;

		push()
		translate(this.margin, 0)
		for (let x = 0; x < plotNum; x++) {
			let value = int(this.data.rows[x].obj[this.yValue]);
			console.log(value);
			ellipse(x * barUnit, -this.scaler(value), 10, 10);
			// (x * barUnit, 0, barWidth, this.scaler(value));
		}
		pop()
	}

	// x
	drawHAxis() {
		line(0, 0, this.chartWidth, 0);
		let barNum = this.data.getRowCount()
		let remainWidth = this.chartWidth - (this.margin * 2) - ((barNum - 1) * this.spacing);
		let barWidth = remainWidth / barNum;
		let barUnit = barWidth + this.spacing;
		push()
		translate(this.margin, 0)

		// Draw title
		let titleHeading = this.title;
		textAlign(CENTER, CENTER);
		textSize(20);
		fill(0);
		text(titleHeading, this.chartWidth / 2, -325);


		// Creating label for x-axis
		let labelArray = this.data.getColumn(this.xValue);
		for (let x = 0; x < labelArray.length; x++) {
			let value = labelArray[x];
			push()
			translate(x * barUnit + (barWidth / 2), 10);
			rotate(45);
			fill(0);
			noStroke();
			textSize(14);
			textAlign(LEFT, TOP);
			text(value, 0, 0);
			pop()
		}

		pop()
	}

	// y
	drawVAxis() {

		line(0, 0, 0, -this.chartHeight);
		for (let y = 1; y < this.numTicks + 1; y++) {
			// ySpace = 30
			let ySpace = this.chartHeight / this.numTicks;
			stroke(50);
			line(0, -ySpace * y, -10, -ySpace * y);

			let unitSpace = (this.maxNum / this.numTicks).toFixed();
			noStroke();
			fill(50);
			textSize(15);
			textAlign(RIGHT, CENTER);
			text(y * unitSpace, -15, -ySpace * y);

		}
	}


	calMax() {
		let max = 0;
		for (let x = 0; x < this.data.getRowCount(); x++) {

			if (int(this.data.rows[x].obj[this.yValue]) > max) {
				max = int(this.data.rows[x].obj[this.yValue]);
			}
		}


		for (let x = max; x < 1000000; x++) {
			if (x % this.numTicks == 0 && x % this.rounding == 0) {
				max = x;
				break
			}
		}

		return max;
	}

	// scaler(_num){
	// let scaleValue = this.maxNum/this.chartHeight;
	// return _num/scaleValue;
	// }

	// Scaling the barchart
	scaler(_num) {
		return map(_num, 0, this.maxNum, 0, this.chartHeight)
		
	}
}
