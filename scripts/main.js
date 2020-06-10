/*COLOR SCHEME*/
// color definitions
var bcolor = '#f0e3e3';
var font = "Verdana";
var blue = '#123C69';
var skyblue = '#01a6ec';
var lightskyblue = '#88cbe7';
var lightblue = '#adc3cc';
var grey = '#BAB2B5';
var pink = "#AC3B61";
var purple = 'rgb(85, 25, 85)';
var lightpurple = 'rgb(177, 69, 177)';
var hcolor = '#ccc';

// all a tags
document.querySelectorAll('a').forEach(e => {
	e.target = '_blank';
	e.style.color = 'inherit';
})

// background color
document.querySelector('html').style.backgroundColor =  bcolor;
document.getElementById('topbar').style.backgroundColor = pink;
document.getElementById('viewership-more').style.backgroundColor = bcolor;

// text color
document.querySelector('body').style.color = blue;

// top bar color
document.querySelectorAll('.topbar-button').forEach(e => {
	e.style.backgroundColor = pink;
	e.style.color = 'white';
})

// hr elements color
document.querySelectorAll('hr').forEach(e => {
	e.style.borderTop = '1px solid ' + lightblue;
})

// text-emphasis elements color
document.querySelectorAll('.text-emphasis').forEach(e => {
	e.style.color = skyblue;
})

// viewership-more-button colors
var vmButton = document.getElementById("viewership-more-button")
vmButton.style.backgroundColor = bcolor;
vmButton.style.color = skyblue;

// arrow in viewship-more button
let arr = document.querySelector(".arrow");
arr.style.border= "solid " + skyblue;
arr.style.borderWidth= '0 3px 3px 0';

// bubble baker description
document.querySelectorAll('.bubble-stat').forEach(e => {
	e.style.color = lightpurple;
})

// dashboard descriptions
document.querySelectorAll('.dashboard-num').forEach(e => {
	e.style.color = skyblue;
})
document.querySelector('#dashboard-definition').style.color = lightpurple;

/*EVENT LISTENERS*/
// helper function for background colors
function hovercolor(tag, x){
	return function(){
		tag.style.backgroundColor = x;
	}
}

// topbar button hover
document.querySelectorAll('.topbar-button').forEach(e => {
	e.addEventListener("mouseover", hovercolor(e, hcolor));
})
document.querySelectorAll('.topbar-button').forEach(e => {
	e.addEventListener("mouseout", hovercolor(e, pink));
})

// viewership-more hover functionality
vmButton.addEventListener("mouseover", hovercolor(vmButton, lightblue));
vmButton.addEventListener("mouseout", hovercolor(vmButton, bcolor));

// helper function that reveals and hides tag
function seeMore(id) {
	return function(){
		let tag = document.getElementById(id);
		if (tag.style.maxHeight){
			tag.style.maxHeight = null;
		} else {
			tag.style.maxHeight = tag.scrollHeight + "px";
		} 
	}
}

// see more for line plot
document.getElementById("viewership-more-button").addEventListener("click", seeMore('viewership-more'));

// dashboard mouse over
function dashboardMouseOver(t){
	return function (){
		//background color of div
		let tag = document.getElementById(t);
		tag.style.backgroundColor = hcolor;

		//text of revealed div
		if (t=='handshake-div'){
			var words = "When judge Paul Hollywood is particulariy impressed with a contestant's bake, \
						he gives the contestant a handshake. This rare praise is coveted among bakers \
						(although arguably not as rare for the later seasons).";
		} else if (t == 'technical-div') {
			var words = "In the technical round, contestants are all given the same recipe with mimimal \
				instructions. The judges do a blind tasting and rank the bakes from worst to best.";
		} else {
			var words = "At the end of each week, the judges choose a \"star baker\" whom they feel \
				were the best performing baker that week.";
		}
		document.getElementById('dashboard-definition').innerText = words;

		//only reveal chart for handshake
		let otherTag = document.getElementById('other')
		if (t=='handshake-div'){
			otherTag.style.display = 'inline'; 
		} else {
			otherTag.style.display = 'none'; 
		}

		//reveal div
		seeMore('dashboard-definition-div')();
	}
}

// dashboard mouse out
function dashboardMouseOut(id){
	return function (){
		//background color of div
		let tag = document.getElementById(id);
		tag.style.backgroundColor = bcolor;

		//unreveal div
		seeMore('dashboard-definition-div')();
	}
}

// hover functionality for dashboard
document.querySelectorAll('.dashboard-item').forEach(e => {
	e.addEventListener("mouseover", dashboardMouseOver(e.id));
})
document.querySelectorAll('.dashboard-item').forEach(e => {
	e.addEventListener("mouseout", dashboardMouseOut(e.id));
})

// helper function for bubble chart: about the bakers
function bakermore(d) {
	// get span elements to update
	let series = document.getElementById('series');
	let name = document.getElementById('baker');
	let age = document.getElementById('age');
	let occupation = document.getElementById('occupation');
	let hometown = document.getElementById('hometown');
	let followers = document.getElementById('followers');

	//update text
	series.innerText = d.series;
	name.innerText = d.baker;
	age.innerText = d.age;
	occupation.innerText = d.occupation;
	hometown.innerText = d.hometown;
	followers.innerText = parseFloat((d.followers)).toFixed(1) + "k";
}

/*CHART FUNCTION DEFINITIONS*/
function plotViewerLine() {
	let line = Highcharts.chart('myViewerLine', {
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
			lineColor: lightblue,
			tickInterval: 1
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
		tooltip: { 
			headerFormat:null,
			pointFormat: 'Series {point.x}: {point.y:.1f}M viewers ',
		},	
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
	colors = [lightskyblue, purple, blue, pink];
	for (i in ages) {
		ages[i]['color'] = colors[i];
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
					textOutline: false
				}
			},
			marker: {
				enabled: true
			},
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
		tooltip: { 
			headerFormat:null,
			pointFormat: '{point.percentage:.1f}% are ages {point.name}',
		},	
		legend: {
			enabled: true,
			width: 200
		},
		exporting: {
			enabled: false
		}
	});
}

function plotGenderPie() {
	// add colors to data
	colors = [lightskyblue,pink];
	for (i in gender) {
		gender[i]['color'] = colors[i];
	}

	// plot chart
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
		tooltip: { 
			headerFormat:null,
			pointFormat: '{point.name}: {point.percentage:.1f}%',
		},			
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
			marginLeft: 50,
			marginRight:50,
			height: 500
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
            spiral: 'archimedean',
            rotation: {
                from: 0,
                to: 90,
            },
            placementStrategy: 'random',
            style: {
                "fontFamily":"Verdana", 
                "fontWeight": "900"},
            maxFontSize: 100,
			minFontSize: 20,
			colors: [blue,purple,pink,skyblue, lightblue],
			dataLabels: {
				enabled:true,
				padding:0
			},
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

function plotHandshakeLine() {
	let line = Highcharts.chart('other', {
		chart: {
			type: "line",
			backgroundColor: bcolor,
			style: {
				fontFamily: font,
				color: grey
			},
			height:350
		},
		title: {
			text: 'Number of Hollywood Handshakes by Series',
			style: {
				fontWeight:'normal',
				color: blue,
			}
		},
		xAxis: {
			title: {
				text: "Series #",
				style: {
					fontWeight:'bold',
				}
			},
			lineColor: lightblue,
			tickInterval: 1
		},
		yAxis: {
			min: 0,
			title: {
				text: '# of Hollywood Handshakes',
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
				data: handshakes['data'],
		}],
		tooltip: { 
			enabled: false 
		},
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

function plotBubble(){
	var width = 600, height = 600;
	var svg = d3.select('#myBubbleChart')
		.append('svg')
		.attr('id','bubble-svg')
		.attr("width",'100%').attr("height","100%")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr('viewBox', '75 75 ' + (width-150) + ' ' + (height-150))
		.append('g')
		.attr("transform","translate(" + width/2 + "," + height/2 +")"); // translate to center

	// holds pattern tags
	var defs = svg.append("defs");

	var radiusScale = d3.scaleSqrt()
		.domain([1,500]) //domain of data
		.range([10,80]); // radius of circles

	var simulation = d3.forceSimulation()
		.force("x", d3.forceX().strength(0.05)) // stay at center
		.force("y", d3.forceY().strength(0.05))
		.force("collide",d3.forceCollide(function(d){
			return radiusScale(d.followers) +1//pull circles apart based on radius of circle
		})); 

	d3.queue()
		.defer(d3.csv, "data/insta.csv")
		.await(ready);

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
			.attr("class","circletext");
		
		circle = g.append("circle")
			.on("click", function(d) { //onlick to reveal baker description
				// bakermore(d);
				window.open(d.wiki);
			})
			.attr("class","baker")
			.attr("r",function(d){
				return radiusScale(d.followers)
			})
			.attr("fill",function(d){
				return "url(#" + d.baker.toLowerCase() +")"
			})
			.attr("stroke",blue);

		// add labels to circles
		label = g.append("text")
				.attr("class","serieslabel")
				.attr("text-anchor","middle")
				.attr('fill',purple)
				.attr("stroke",'white')
				.attr("stroke-width","0.05px")
				.attr("dy",function(d){
					let h = d3.select(this.previousElementSibling).node().getBBox().height;
					return 4*h/7;
				})
				.attr("opacity",0)
				.text(function(d) {return d.baker});

		// hover functionality on circles
		g.on("mouseover",
		function mouseOver(d) {
			seeMore('bubble-more')(); 
			d3.selectAll("circle").attr("opacity", 0.3);
			d3.select(this).select(".baker").attr("opacity",1);
			d3.select(this).select(".serieslabel").attr("opacity",1);
			bakermore(d)
		  })
		  .on("mouseout", function mouseOut(d) {
			seeMore('bubble-more')();
			d3.selectAll("circle").attr("opacity", 1);
			d3.select(this).select(".serieslabel").attr("opacity",0);
		  });


		simulation.nodes(datapoints)
			.on("tick",ticked);

		function ticked(){
			circle.
				attr("cx",function(d){
					return d.x;
				})
				.attr("cy", function(d){
					return d.y;
				})
			label.
				attr("x",function(d){
					return d.x;
				})
				.attr("y", function(d){
					return d.y;
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
			},
        },
        title: {
			text: 'Recognitions for Each Winner',
			style: {
				color: blue
			}
        },
        xAxis: {
			categories: winnerStats['bakers'],
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
			enabled: true,
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
            name: 'handshake',
			data: winnerStats['handshake'],
			color: lightskyblue
        }, {
            name: 'technical win',
			data: winnerStats['technical'],
			color: blue
        }, {
            name: 'star baker',
			data: winnerStats['star_baker'],
			color: purple
        }],
        exporting: {
            enabled: false
          }
    });
}

/*LOAD DATA AND CALL CHART FUNCTIONS*/ 
async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
	//load data
    viewersPromise = loadJSON('./data/viewers_by_season.json');
    agePromise = loadJSON('./data/ages.json');
    genderPromise = loadJSON('./data/gender.json');
    wordsPromise = loadJSON('./data/bake_words.json');
	statsPromise = loadJSON('./data/winners_stats.json');
	handshakesPromise = loadJSON('./data/handshakes_by_season.json');

	// call charting functions
    viewersPromise.then(function (v){
        viewers = v;
        plotViewerLine();
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
	handshakesPromise.then(function (h){
        handshakes = h;
		plotHandshakeLine();
	});
	plotBubble();
    statsPromise.then(function (s) {
        winnerStats = s;
		plotStackColumn();
    });
}

// start once dom is loaded
document.addEventListener('DOMContentLoaded', init, false);

