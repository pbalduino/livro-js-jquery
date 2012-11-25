function moneyTextToFloat(text) {
	var cleanText = text.replace("R$ ", "").replace(",", ".");
	return parseFloat(cleanText);
}

function floatToMoneyText(value) {
	var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
	text = "R$ " + text;
	return text.substr(0, text.length - 2) + "," + text.substr(-2);
}

function readTotal() {
	var total = document.getElementById("total");
	return moneyTextToFloat(total.innerHTML);
}

function writeTotal(value) {
	var total = document.getElementById("total");
	total.innerHTML = floatToMoneyText(value);
}

function calculateTotalProducts() {
	var items = document.getElementsByClassName("item");

	var totalProducts = 0;

	for(var pos = 0; pos < items.length; pos++) {
		var priceElements = items[pos].getElementsByClassName("price");
		var priceText = priceElements[0].innerHTML;
		var price = moneyTextToFloat(priceText);

		var qtyElements = items[pos].getElementsByClassName("quantity");
		var qtyText = qtyElements[0].value;
		var quantity = moneyTextToFloat(qtyText);

		var totalItem = quantity * price;

		totalProducts += totalItem;

	}

	return totalProducts;
}

function getFreightPrice() {
	
}