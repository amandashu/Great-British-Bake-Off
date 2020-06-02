
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
    statsPromise.then(function (s) {
        winnerStats = s
		plotStackColumn();
    });
}

document.addEventListener('DOMContentLoaded', init, false);


