jQuery.ajaxSettings.traditional = true;

$(document).ready(function() {
	// Instantiate sliders
	let q1Slider = $("#q1.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q2Slider = $("#q2.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q3Slider = $("#q3.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q4Slider = $("#q4.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q5Slider = $("#q5.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q6Slider = $("#q6.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q7Slider = $("#q7.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q8Slider = $("#q8.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q9Slider = $("#q9.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});
	let q10Slider = $("#q10.slider").slider({
		tooltip: 'show',
		formatter: function(value) {
			return value;
		}
	});

	$('#surveySubmit').on("click", function(e) {
		e.preventDefault();

		let newPotentialFriend = {
			name: $("#nameFirst").val().trim() + ' ' + $("#nameLast").val().trim(),
			photo: $("#profilePhoto").val().trim(),
			scores: [
				q1Slider.slider('getValue'),
				q2Slider.slider('getValue'),
				q3Slider.slider('getValue'),
				q4Slider.slider('getValue'),
				q5Slider.slider('getValue'),
				q6Slider.slider('getValue'),
				q7Slider.slider('getValue'),
				q8Slider.slider('getValue'),
				q9Slider.slider('getValue'),
				q10Slider.slider('getValue')
			]
		};
		$.ajax({
			async: true,
		  url: "/api/friends",
		  type: "POST",
		  dataType: "json", // expected format for response
		  contentType: "application/json", // send as JSON
		  data: JSON.stringify(newPotentialFriend),
		  complete: function(data) {
		    //called when complete

		  },
		  success: function() {
		    //called when successful
				$("#nameFirst").val("");
				$("#nameLast").val("");
				$("#profilePhoto").val("");
				$("#reserve-unique-id").val("");
				q1Slider.slider('setValue', 5);
				q2Slider.slider('setValue', 5);
				q3Slider.slider('setValue', 5);
				q4Slider.slider('setValue', 5);
				q5Slider.slider('setValue', 5);
				q6Slider.slider('setValue', 5);
				q7Slider.slider('setValue', 5);
				q8Slider.slider('setValue', 5);
				q9Slider.slider('setValue', 5);
				q10Slider.slider('setValue', 5);

				console.log('New potential friend added.');

				determineClosestMatch();
		 	},
		  error: function(e) {
		    //called when there is an error
				document.body.parentNode.innerHTML = e.responseText;
		  },
		});
	});
});

function determineClosestMatch() {
	// TODO: finish comparison logic and add modal popup
	$.get("/api/friends", function(data) {
		let currUser = data[data.length - 1];
		console.log(currUser);
		let scoreDiff = 0;
		let closestMatch;
		let closestScore = 1000;
		for (var i = 0; i < data.length - 1; i++) {
			currUser.scores.forEach(function(currScore, index) {
				scoreDiff += Math.abs(data[i].scores[index] - currScore);
			});
			console.log(scoreDiff);

			if (scoreDiff < closestScore) {
				closestScore = scoreDiff;
				closestMatch = data[i];
			}

			scoreDiff = 0;
		}

		createModal(closestMatch);
	});
}

function createModal(user) {
	$('#closestName').text('Closest match: ' + user.name);
	$('#closestPhoto').attr({
		src: user.photo,
		alt: user.name
	});
	$('#closestFriend').on('shown.bs.modal', function () {
	  $('#friendModal').trigger('focus')
	});
}
