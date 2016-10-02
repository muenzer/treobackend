module.exports.addItem = function(dynamodb, tableName, item, callback) {
	'use strict';
	var params = {
        TableName: tableName,
		Item : item
	};

	console.log("Calling add item with: " + JSON.stringify(item));

	dynamodb.put(params, function(err, data) {
		if (err) {
			callback(err, data);
	    } else {
	    	callback(null, 'Added item to ' + tableName);
	    }
    });
};

module.exports.getItems = function(dynamodb, tableName, params, callback) {
	'use strict';

	params.TableName = tableName;

	console.log("Calling get items with: " + JSON.stringify(params));

	dynamodb.scan(params, function(err, data) {
		if (err) {
			callback(err, data);
	    } else {
	    	callback(null, data);
	    }
    });
};

module.exports.query = function(dynamodb, tableName, params, callback) {
	'use strict';

	params.TableName = tableName;

	console.log("Calling query with: " + JSON.stringify(params));

	dynamodb.query(params, function(err, data) {
		if (err) {
			callback(err, data);
	    } else {
	    	callback(null, data);
	    }
    });
};

module.exports.scan = function(dynamodb, tableName, params, callback) {
	'use strict';

	params.TableName = tableName;

	console.log("Calling scan with: " + JSON.stringify(params));

	dynamodb.scan(params, function(err, data) {
		if (err) {
			callback(err, data);
	    } else {
	    	callback(null, data);
	    }
    });
};


module.exports.getParticipant = function(dynamodb, event, callback) {
	'use strict';

	var params = { 
    TableName: 'Participants',
    Key: event
    };

    dynamodb.get(params, function(err, data) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
		callback(err, data);
    	}
    else {
        console.log(JSON.stringify(data, null, 2));
        callback(null, data);
    	}
	});

};

module.exports.deleteParticipant = function(dynamodb, event, callback) {
	'use strict';

	var params = { 
    TableName: 'Participants',
    Key: event
    };

    dynamodb.delete(params, function(err, data) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
		callback(err, data);
    	}
    else {
        console.log(JSON.stringify(data, null, 2));
        callback(null, data);
    	}
	});

};

module.exports.getStatus = function(dynamodb, status, callback) {
	'use strict';

	if(!status) {
		callback("Missing Status");
		return;
	}

	var params = {
		TableName: "Participants",
		IndexName: "PaymentStatus",
		KeyConditionExpression: "PaymentStatus = :status",
		ExpressionAttributeValues: {":status": status}
	};
		

    dynamodb.query(params, function(err, data) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
		callback(err, data);
    	}
    else {
        console.log(JSON.stringify(data, null, 2));
        callback(null, data);
    	}
	});

};

module.exports.updateStatus = function(dynamodb, event, status, callback) {
	'use strict';

	if(!status) {
		callback("Missing Status");
		return;
	}

	var params = { 
    TableName: 'Participants',
    Key: event,
    UpdateExpression: "SET PaymentStatus = :status",
	ExpressionAttributeValues: {":status": status},
    ReturnValues: "UPDATED_NEW"
    };

    dynamodb.update(params, function(err, data) {
    if (err) {
        console.log(JSON.stringify(err, null, 2));
		callback(err, data);
    	}
    else {
        console.log(JSON.stringify(data, null, 2));
        callback(null, data);
    	}
	});

};

