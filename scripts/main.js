
// async function loadJSON(path) {
// 	let response = await fetch(path);
// 	let dataset = await response.json(); // Now available in global scope
// 	return dataset;
// }

// function init() {
// 	salesPromise = loadJSON('./data/sales.json');
// 	stocksPromise = loadJSON('./data/stocks.json');
// 	salesPromise.then(function (sales) {
// 		plotMap();
// 		data = sales;

// 	});
// 	stocksPromise.then(function (stocks) {
// 		plotStocks(stocks);
// 	});
// }

// document.addEventListener('DOMContentLoaded', init, false);
