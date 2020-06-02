
function plotLine() {
	let line = Highcharts.chart('myLine', {
		chart: {
			type: "line"
		},
		title: {
			text: 'Average Viewership Within 7 Days',
			style: {
				fontWeight:'bold',
			}
		},
		xAxis: {
			// categories: ['January','February','March'],
			title: {
				text: "Series",
				style: {
					fontWeight:'bold',
				}
			},
		},
		yAxis: {
			min: 0,
			title: {
				text: 'Viewers (Millions)',
				align: 'middle',
				style: {
					fontWeight:'bold',
				}
			},
		},
		legend: false,
		credits: {
			enabled: false
		},
		series: [{
             data: viewers['data']
        }],
		tooltip: { enabled: false },
		plotOptions:{
			series: {
				animation: false
			}
        },
        exporting: {
            enabled: false
          }
	});
}

function plotAgePie() {
	var pie = Highcharts.chart('myAgePie', {
		chart: {
			type: "pie"
		},
		title: {
			text: 'Age',
			style: {
				fontWeight:'bold',
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			data: ages,
			dataLabels: {
				enabled: true,
				format:'<b>{point.percentage:.1f}%',
				distance: '-40%',
				color:  '#FFFFFF',
				borderColor: '#FFFFFF',
				style: {
					fontSize: "14px",
					textOutline: false
				}
			},
			marker: {
				enabled: true
			}
		}],
		plotOptions: {
			pie: {
				showInLegend: true,
				startAngle: 90
			},
			series: {
				animation: false
			}
		},
		tooltip: { enabled: false },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: 0,
			y: 30,
			floating: true,
			borderWidth: 1,
			backgroundColor:'#FFFFFF',
			borderColor: '#FFFFFF',
			symbolRadius: 0
        },
        exporting: {
            enabled: false
          }
	});
}

function plotGenderPie() {
	var pie = Highcharts.chart('myGenderPie', {
		chart: {
			type: "pie"
		},
		title: {
			text: 'Gender',
			style: {
				fontWeight:'bold',
			}
		},
		credits: {
			enabled: false
		},
		series: [{
			data: gender,
			dataLabels: {
				enabled: true,
				format:'<b>{point.percentage:.1f}%',
				distance: '-40%',
				color:  '#FFFFFF',
				borderColor: '#FFFFFF',
				style: {
					fontSize: "14px",
					textOutline: false
				}
			},
			marker: {
				enabled: true
			}
		}],
		plotOptions: {
			pie: {
				showInLegend: true,
				startAngle: 90
			},
			series: {
				animation: false
			}
		},
		tooltip: { enabled: false },
		legend: {
			layout: 'vertical',
			align: 'right',
			verticalAlign: 'top',
			x: 0,
			y: 30,
			floating: true,
			borderWidth: 1,
			backgroundColor:'#FFFFFF',
			borderColor: '#FFFFFF',
			symbolRadius: 0
        },
        exporting: {
            enabled: false
          }
	});
}

function plotWordCloud(){
    let myWordCloud = Highcharts.chart('myWordCloud', {
        accessibility: {
            screenReaderSection: {
                beforeChartFormat: '<h5>{chartTitle}</h5>' +
                    '<div>{chartSubtitle}</div>' +
                    '<div>{chartLongdesc}</div>' +
                    '<div>{viewTableButton}</div>'
            }
        },
        credits: {
			enabled: false
        },
        series: [{
            type: 'wordcloud',
            data: words['words'],
            name: 'Occurrences',
            // spiral: 'archimedean',
            rotation: {
                from: 0,
                to: 0,
                orientations: 20
            },
            placementStrategy: 'random',
            style: {
                "fontFamily":"sans-serif", 
                "fontWeight": "900"},
            maxFontSize: 80,
            minFontSize: 10,
        }],
        tooltip: {
            enabled: false
        },
        exporting: {
            enabled: false
          }
        // title: {
        //     text: 'Wordcloud of Bake Descriptions'
        // },
        // dataLabels: {
        //     enabled: true,
        //     allowOverlap: true,
        //     padding:0,
        //     shape: 'circle'
        // }
    });
}

function plotBubble(){
	// var width = 500, height = 500;
	// var svg = d3.select('#myBubbleChart')
	// 	.append('svg')
	// 	.attr('height', height)
	// 	.attr('width',width)
	// 	.append('g')
	// 	.attr("transform","translate(" + width/2 + "," + height/2 +")") // translate to center

	// var defs = svg.append("defs") // add defs in svg
	// defs.append("pattern") //add pattern in defs
	// 	.attr("id","test")
	// 	.attr("height","100%")
	// 	.attr("weight","100%")
	// 	.attr("patternContentUnits","objectBoundingBox")
	// 	.append("image") //image in the pattern
	// 	.attr("height",1)
	// 	.attr("width",1)
	// 	.attr("preserveAspectRatio","none")
	// 	.attr("xmlns:xlink","http://www.w3.org/1999/xlink")
	// 	.attr("xlink:href","images/frances.jpg");


	// var radiusScale = d3.scaleSqrt()
	// 	.domain([1,500]) //domain of data
	// 	.range([10,80]) // radius of circles

	// var simulation = d3.forceSimulation()
	// 	.force("x", d3.forceX().strength(0.05)) // stay at center
	// 	.force("y", d3.forceY().strength(0.05))
	// 	.force("collide",d3.forceCollide(function(d){
	// 		return radiusScale(d.followers) +1//pull circles apart based on radius of circle
	// 	})) 

	// d3.queue()
	// 	.defer(d3.csv, "data/insta.csv")
	// 	.await(ready)

	// function ready (error, datapoints){
	// 	//create patterns for circles
	// 	defs.selectAll(".baker-pattern")
	// 	.data(datapoints)
	// 	.enter().append("pattern")
	// 	.attr("class", "baker-pattern")
	// 	.attr("id","test")

	// 	//draw circles
	// 	var circles = svg.selectAll(".artist")
	// 		.data(datapoints)
	// 		.enter().append("circle")
	// 		.attr("class","artist")
	// 		.attr("r",function(d){
	// 			return radiusScale(d.followers)
	// 		})
	// 		.attr("fill","lightblue")
	// 		.attr("stroke","black")


	// simulation.nodes(datapoints)
	// 	.on("tick",ticked)

	// function ticked(){
	// 	circles.
	// 		attr("cx",function(d){
	// 			return d.x
	// 		})
	// 		.attr("cy", function(d){
	// 			return d.y
	// 		})
	// }
	// }

	var width = 500, height = 500;
	var svg = d3.select('#myBubbleChart')
		.append('svg')
		.attr('height', height)
		.attr('width',width)
		.append('g')
		.attr("transform","translate(" + width/2 + "," + height/2 +")") // translate to center

	var defs = svg.append("defs") // add defs in svg
	defs.append("pattern") //add pattern in defs
		.attr("id","test")
		.attr("height","100%")
		.attr("weight","100%")
		.attr("patternContentUnits","objectBoundingBox")
		.append("image") //image in the pattern
		.attr("height",1)
		.attr("width",1)
		.attr("preserveAspectRatio","none")
		.attr("xmlns:xlink","http://www.w3.org/1999/xlink")
		.attr("xlink:href","images/frances.jpg");


	var radiusScale = d3.scaleSqrt()
		.domain([1,500]) //domain of data
		.range([10,80]) // radius of circles

	var simulation = d3.forceSimulation()
		.force("x", d3.forceX().strength(0.05)) // stay at center
		.force("y", d3.forceY().strength(0.05))
		.force("collide",d3.forceCollide(function(d){
			return radiusScale(d.followers) +1//pull circles apart based on radius of circle
		})) 

	d3.queue()
		.defer(d3.csv, "data/insta.csv")
		.await(ready)

	function ready (error, datapoints){
		// example html
		// <svg viewBox="0 0 300 100">
		// 	<defs>
		// 	<pattern id="test" height = "100%" width = "100%"            
		// 	patternContentUnits = "objectBoundingBox">
		// 		<image x="0" y="0" height=1 width=1 href="images/edd.jpg"></image>
		// 	</pattern>
		// 	</defs>
		
		// 	<circle cx="150" cy="50" r="40" fill="url(#test)" />
		// </svg>

		//create patterns for circles
		defs.selectAll(".baker-pattern")
		.data(datapoints)
		.enter().append("pattern")
		.attr("class", "baker-pattern")
		.attr("id",function(d) {
			return d.baker.toLowerCase()
		})
		.attr("height","100%")
		.attr("width","100%")
		.attr("patternContentUnits","objectBoundingBox")
		.append("image") //image in the pattern
		.attr("height",1)
		.attr("width",1)
		.attr("preserveAspectRatio","none")
		.attr("xmlns:xlink","http://www.w3.org/1999/xlink")
		.attr("xlink:href",function(d){
			return d.image_path
		});

		//draw circles
		var circles = svg.selectAll(".artist")
			.data(datapoints)
			.enter().append("circle")
			.attr("class","artist")
			.attr("r",function(d){
				return radiusScale(d.followers)
			})
			.attr("fill",function(d){
				return "url(#" + d.baker.toLowerCase() +")"
			})
			.attr("stroke","black")


	simulation.nodes(datapoints)
		.on("tick",ticked)

	function ticked(){
		circles.
			attr("cx",function(d){
				return d.x
			})
			.attr("cy", function(d){
				return d.y
			})
	}
	}

}


function plotStackColumn(){
    let myStackedColumn = Highcharts.chart('myStackedColumn', {
        chart: {
            type: 'column',
            animation: false
        },
        // title: {
        //     // text: 'Stacked column chart'
        // },
        xAxis: {
            categories: winnerStats['bakers']
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Total Recognitions'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: ( // theme
                        Highcharts.defaultOptions.title.style &&
                        Highcharts.defaultOptions.title.style.color
                    ) || 'gray'
                }
            }
        },
        credits: {
			enabled: false
		},
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || 'white',
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
            },
            series: {
                animation: false
            }
        },
        series: [{
            name: 'handshakes',
            data: winnerStats['handshake']
        }, {
            name: 'technical win',
            data: winnerStats['technical']
        }, {
            name: 'star baker',
            data: winnerStats['star_baker']
        }],
        exporting: {
            enabled: false
          }
    }
    );
}


async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
    viewersPromise = loadJSON('./data/viewers_by_season.json');
    agePromise = loadJSON('./data/ages.json');
    genderPromise = loadJSON('./data/gender.json');
    wordsPromise = loadJSON('./data/bake_words.json');
    statsPromise = loadJSON('./data/winners_stats.json');

    viewersPromise.then(function (v){
        viewers = v;
        plotLine();
    });
    agePromise.then(function (a){
        ages = a;
        plotAgePie();
    });
    genderPromise.then(function (g){
        gender = g;
        plotGenderPie();
    });
    wordsPromise.then(function (w){
        words = w;
        plotWordCloud();
	});
	plotBubble();
    statsPromise.then(function (s) {
        winnerStats = s
		plotStackColumn();
    });
}

document.addEventListener('DOMContentLoaded', init, false);


