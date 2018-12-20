/*
  Common javascript for nextbus
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
