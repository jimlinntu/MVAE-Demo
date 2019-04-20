window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
var color = Chart.helpers.color;
function randomPoint() {
    return {
        x: Math.random(),
        y: Math.random()
    };
};
var userPoint = randomPoint();
function generateData() {
    var data = [];
    for (var i = 0; i < 7; i++) {
        data.push(randomPoint());
    }
    return data;
}

var scatterChartData = {
    datasets: [{
        borderColor: window.chartColors.red,
        backgroundColor: color(window.chartColors.red).alpha(0.2).rgbString(),
        pointRadius: 10,
        pointHoverRadius: 12,
        data: generateData()
    }, {
        borderColor: window.chartColors.green,
        backgroundColor: color(window.chartColors.green).alpha(0.2).rgbString(),
        pointRadius: 10,
        pointHoverRadius: 12,
        data: [userPoint]	
    }]
};

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myScatter = Chart.Scatter(ctx, {
        data: scatterChartData,
        options: {
            legend: {
                display: false
            },
            tooltips: {
                displayColors : false,
                callbacks: {
                    label: function(tooltipItem, data) {
                        // Do something when hover
                        return '(' + Math.round(tooltipItem.xLabel * 100) / 100 + ','
                            + Math.round(tooltipItem.yLabel * 100) / 100 + ')';
                    }
                }
            },
            onClick: function(event) {
                var top = window.myScatter.chartArea.top;
                var bottom = window.myScatter.chartArea.bottom;
                var right = window.myScatter.chartArea.right;
                var left = window.myScatter.chartArea.left;
            
                var yMin = window.myScatter.scales['y-axis-1'].min;
                var yMax = window.myScatter.scales['y-axis-1'].max;
                var xMin = window.myScatter.scales['x-axis-1'].min;
                var xMax = window.myScatter.scales['x-axis-1'].max;
            
                var yMouse = event.offsetY;
                var xMouse = event.offsetX;
                var activePoints = window.myScatter.getElementAtEvent(event)[0];
                if (activePoints) {
                    var y = (activePoints._model.y - bottom) / (top - bottom) * (yMax - yMin) + yMin;
                    var x = (activePoints._model.x - left) / (right - left) * (xMax - xMin) + xMin;
					$.get('/demo/generate_midi/', {'x': x, 'y': y}, function(ret) {
						$('#midi').text(ret);
						$('#midi').attr('href', ret);
					});
                    console.log("Click point: " + '(' + x  + ',' + y + ')');
                } else if (yMouse >= top && yMouse <= bottom && xMouse <= right && xMouse >= left) {
                    var y = (yMouse - bottom) / (top - bottom) * (yMax - yMin) + yMin;
                    var x = (xMouse - left) / (right - left) * (xMax - xMin) + xMin;
                    userPoint['x'] = x;
                    userPoint['y'] = y;
                    //console.log("Move point to: " + '(' + x  + ',' + y + ')');
                    window.myScatter.update();
                }
                //console.log(x + ',' + y);
            
            }
        }
    });
};
