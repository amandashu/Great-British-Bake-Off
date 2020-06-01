
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
        }]
    });
}


async function loadJSON(path) {
	let response = await fetch(path);
	let dataset = await response.json(); // Now available in global scope
	return dataset;
}

function init() {
    statsPromise = loadJSON('./data/winners_stats.json');
    wordsPromise = loadJSON('./data/bake_words.json');

	statsPromise.then(function (stats) {
        winnerStats = stats
		plotStackColumn();
    });
    wordsPromise.then(function (w){
        words = w;
        plotWordCloud();
    });
}

document.addEventListener('DOMContentLoaded', init, false);


