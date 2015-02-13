formatDate = function(isoDateStr){
	var time = moment(isoDateStr);
	var now = moment();
	if (time.isBefore(moment().subtract(1,'years'))){
		return time.format("MMM Do YYYY");
	}
	else if (time.isBefore(moment().subtract(7,'days'))){
		return time.format("MMM Do");
	}
	else if (time.isBefore(moment().subtract(2,'days'))){
		return time.format("dddd");
	}
	else if (time.isBefore(moment().subtract(1,'days'))){
		return "yesterday";
	}else {
		return time.format("HH:mm");
	}
}