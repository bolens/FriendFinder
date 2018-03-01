$(document).ready(function() {
	// Instantiate a slider
	var mySlider = $("input.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});

	// Call a method on the slider
	var value = mySlider.slider('getValue');
	console.log(value);
	// For non-getter methods, you can chain together commands
		// mySlider
		// 	.slider('setValue', 5)
		// 	.slider('setValue', 7);

});
