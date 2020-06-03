var bcolor = '#eaf1f8'

function plotLine() {
	let line = Highcharts.chart('myLine', {
		chart: {
			type: "line",
			backgroundColor: bcolor
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
			type: "pie",
			backgroundColor: bcolor
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
			type: "pie",
			backgroundColor: bcolor
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
		chart: {
			backgroundColor: bcolor
		},
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
		// create patterns for circles
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

		// example html
		// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
		// viewBox="0 0 500 500">
		// <g id="UrTavla">
		// 	<circle style="fill:url(#toning);stroke:#010101;stroke-width:1.6871;stroke-miterlimit:10;" cx="250" cy="250" r="245">
		// 	</circle>
		// 	<text x="50%" y="50%" text-anchor="middle" stroke="#51c5cf" stroke-width="2px" dy=".3em">Look, I’m centered!Look, I’m centered!</text>
		// </g>
		// </svg>

		//draw circles
		var g = svg.selectAll(".circletext")
			.data(datapoints)
			.enter()
			.append("g")
			.attr("class","circletext")
		
		circle = g.append("circle")
			.attr("class","baker")
			.attr("r",function(d){
				return radiusScale(d.followers)
			})
			.attr("fill",function(d){
				return "url(#" + d.baker.toLowerCase() +")"
			})
			.attr("stroke","black")

		label = g.append("text")
				.attr("class","serieslabel")
				.attr("text-anchor","middle")
				.attr("stroke","black")
				.attr("stroke-width","1px")
				.attr("dy",".3em")
				// .attr("fontsize","50%")
				.attr("opacity",0)
				.text(function(d) {return "Series " + d.series + " Winner"})

		g.on("mouseover",
		function mouseOver(d) {
			d3.select(this).select(".baker").attr("opacity",0.2)
			d3.select(this).select(".serieslabel").attr("opacity",1)
		  })
		  .on("mouseout", function mouseOut() {
			d3.select(this).select(".baker").attr("opacity",1)
			d3.select(this).select(".serieslabel").attr("opacity",0)
		  })


		simulation.nodes(datapoints)
			.on("tick",ticked)

		function ticked(){
			circle.
				attr("cx",function(d){
					return d.x
				})
				.attr("cy", function(d){
					return d.y
				})
			label.
				attr("x",function(d){
					return d.x
				})
				.attr("y", function(d){
					return d.y
				})
		}
	}

}


function plotStackColumn(){
    let myStackedColumn = Highcharts.chart('myStackedColumn', {
        chart: {
            type: 'column',
			animation: false,
			backgroundColor: bcolor
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


