formatDate = function(isoDateStr){
	var time = moment(isoDateStr);
	var now = moment();
	if (time.isBefore(moment().subtract(1,'years'))){
		return "on" + time.format("MMM Do YYYY");
	}
	else if (time.isBefore(moment().subtract(7,'days'))){
		return "on" + time.format("MMMM Do");
	}
	// else  (time.isBefore(moment().subtract(2,'days'))){
	// 	return time.from(moment())
	// }
	// else if (time.isBefore(moment().subtract(1,'days'))){
	// 	return "yesterday";
	// }
	else {
		return time.from(moment())
		// return "at " + time.format("HH:mm");
	}
}