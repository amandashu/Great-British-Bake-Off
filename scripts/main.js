/*COLOR SCHEME*/
// definitions
var bcolor = '#f0e3e3';
var font = "Verdana";
var blue = '#123C69';
var skyblue = '#01a6ec';
var lightskyblue = '#88cbe7';
var lightblue = '#adc3cc'
var grey = '#BAB2B5';
var pink = "#AC3B61";
var purple = 'rgb(85, 25, 85)';

// background color
document.querySelector('html').style.backgroundColor =  bcolor;
document.getElementById('topbar').style.backgroundColor = pink
document.getElementById('viewership-more').style.backgroundColor = bcolor

// text color
document.querySelector('body').style.color = blue
document.querySelectorAll('#viewership-more a').forEach(e => {
	e.style.color = blue
})

// top bar color
document.querySelectorAll('.topbar-button').forEach(e => {
	e.style.backgroundColor = pink
	e.style.color = 'white'
})

// hr elements color
document.querySelectorAll('hr').forEach(e => {
	e.style.borderTop = '1px solid ' + lightblue
})

// text-emphasis elements color
document.querySelectorAll('.text-emphasis').forEach(e => {
	e.style.color = skyblue
})

// viewership-more-button
var vmButton = document.getElementById("viewership-more-button")
vmButton.style.backgroundColor = bcolor;
vmButton.style.color = skyblue;
function hovercolor(x){
	return function(){
		vmButton.style.backgroundColor = x
	}
}
vmButton.addEventListener("mouseover", hovercolor(lightblue));
vmButton.addEventListener("mouseout", hovercolor(bcolor));
let arr = document.querySelector(".arrow")
arr.style.border= "solid " + skyblue;
arr.style.borderWidth= '0 3px 3px 0';

// target=_blank for all a tags
document.querySelectorAll('a').forEach(e => {
  e.target = '_blank';
})


/*FUNCTION DEFINITIONS*/
function plotLine() {
	let line = Highcharts.chart('myLine', {
		chart: {
			type: "line",
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: grey
			}
		},
		title: {
			text: 'Viewership: Series 1-10',
			style: {
				fontWeight:'normal',
				color: blue,
			}
		},
		subtitle: {
			text: "Average 7 day viewership numbers for each series",
			style: {
				color: blue
			}
		},
		xAxis: {
			title: {
				text: "Series #",
				style: {
					fontWeight:'bold',
				}
			},
			lineColor: lightblue
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
			gridLineColor: lightblue
		},
		legend: false,
		credits: {
			enabled: false
		},
		series: [{
			 data: viewers['data'],
        }],
		tooltip: { enabled: false },
		plotOptions:{
			series: {
				animation: false,
				color: pink
			}
        },
        exporting: {
            enabled: false
          }
	});
}

function plotAgePie() {
	colors = [lightskyblue, purple, blue, pink]
	for (i in ages) {
		ages[i]['color'] = colors[i]
	}
	var pie = Highcharts.chart('myAgePie', {
		chart: {
			type: "pie",
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: blue
			}
		},
		title: {
			text: 'Age',
			style: {
				// fontWeight:'bold',
			},
			style: {
				color:blue
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
					fontSize: "8px",
					textOutline: false
				}
			},
			marker: {
				enabled: true
			},
			// color: {
			// 	pattern: {
			// 		image:,
			// 		aspectRatio: 9/4
			// 	}
			// },
		}],
		plotOptions: {
			pie: {
				showInLegend: true,
				startAngle: 90
			},
			series: {
				animation: false,
			}
		},
		tooltip: { enabled: false },
		legend: {
			enabled: true
        },
        exporting: {
            enabled: false
          }
	});
}

function plotGenderPie() {
	colors = [lightskyblue,pink]
	for (i in gender) {
		gender[i]['color'] = colors[i]
	}
	var pie = Highcharts.chart('myGenderPie', {
		chart: {
			type: "pie",
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: blue
			}
		},
		title: {
			text: 'Gender',
			style: {
				// fontWeight:'bold',
			},
			style: {
				color:blue
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
			enabled: true
        },
        exporting: {
            enabled: false
          }
	});
}

function plotWordCloud(){
    let myWordCloud = Highcharts.chart('myWordCloud', {
		chart: {
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: blue
			},
			marginLeft: 100,
			marginRight:100
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
			minFontSize: 14,
			colors: [blue,purple,pink,skyblue, lightblue]
        }],
        tooltip: {
			headerFormat:null,
			pointFormat:'{point.name}' + ": " + "{point.weight}" + " occurrences",
            enabled: true
        },
        exporting: {
            enabled: false
		  },
		title: {
			text: 'What do the bakers bake?',
			style: {
				fontFamily: 'Verdana',
				color: blue,
				fontSize: 30
			}
        },
        subtitle: {
			text: 'A wordcloud of bake descriptions.',
			style: {
				fontFamily: 'Verdana',
				color: blue,
				fontSize: 14
			}
        },
    });
}

function plotBubble(){
	var width = 600, height = 600;
	var svg = d3.select('#myBubbleChart')
		.append('svg')
		.attr('id','bubble-svg')
		.attr("width",'100%').attr("height","100%")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr('viewBox', '75 75 ' + (width-150) + ' ' + (height-150))
		.append('g')
		.attr("transform","translate(" + width/2 + "," + height/2 +")") // translate to center

	var defs = svg.append("defs")

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
				.text(function(d) {return "S" + d.series + " Winner"})

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
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: blue
			}
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


function viewershipmore() {
	var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 


}

document.getElementById("viewership-more-button").addEventListener("click", viewershipmore);
