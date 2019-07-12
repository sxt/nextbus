/*
  Common javascript for nextbus app
*/
function extractPredictions (data) {
    var predictions = $(data).find('body').find('predictions');
    var agencyTitle = predictions.attr('agencyTitle');
    var routeTitle = predictions.attr('routeTitle');
    var stopTitle = predictions.attr('stopTitle');
    // Allow for multiple direction elements - just get first:
    var directionEles = predictions.find('direction').slice(0,1);
    var direction = directionEles.attr('title');

    $("#routeTitle").html(routeTitle);
    $("#agencyTitle").html(agencyTitle);
    $("#routeTitle").html(routeTitle);
    $("#stopTitle").html(stopTitle);
    $("#direction").html(direction);
    
    // We only care about the next three predictions:
    $predictionEles = $(data).find('direction').find('prediction').slice(0,3);
    console.log( $predictionEles.size());		      

    var i = 0;
    var minutesArr = new Array();
    
    $predictionEles.each(function() {
	var minutes = $(this).attr('minutes');

	if (minutes == "0") {
	    minutes = "Arriving";
	} else {
	    minutes = minutes  + " min"
	}

	//var timeStampDate = new Date(0);
	//timeStampDate.setUTCMilliseconds(epochTime);
	//console.log('Time: ' + epochTime + " "  + timeStampDate.toString('M/d/yyyy HH:mm'));
	minutesArr.push(minutes);
	console.log('Minutes: ' + minutes);

	i++;
	return;
    });

    return minutesArr;
}

function extractMbtaPredictions (data) {

    var predictions = data.data;
    var included = data.included;

    var routeTitle = '';
    var stopTitle = '';
    var direction = '';

    var arrivalsArr = new Array();
    var nowMs = new Date();

    $.each(included, function(index, include) {
	if (include.type == 'stop') {
	    stopTitle = include.attributes.name;
	} else {
	    if (include.type == 'route') {
		routeTitle = include.attributes.short_name;
	    } else {
		if (include.type == 'trip') {
		    direction = include.attributes.headsign;
		}	
	    }
	}
    });

    $("#routeTitle").html(routeTitle);
    $("#stopTitle").html(stopTitle);
    $("#direction").html(direction);

    $.each(predictions, function(index, prediction) {
	var arr = prediction.attributes.arrival_time;
	var arrDate = new Date(arr);

	var etaMs = arrDate.getTime();
	var etaMins = Math.round((etaMs - nowMs) / (60 * 1000));
	var minutes = "";

	if (etaMins == 0) {
	    minutes = "Arriving";
	} else {
	    minutes = etaMins.toString()  + " min"
	}

	arrivalsArr.push(minutes);
	//console.log('Minutes: ' + minutes);

	if (index >= 2) {
	    return;
	}
    });

    return arrivalsArr;
}
