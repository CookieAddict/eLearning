var records = [
    { username: 'han', password: 'solo' }
];

exports.authenticate = function(username, password, callback) {
    for (var i = 0; i < records.length; i++) {
      	var record = records[i];
      	if (record.username === username &&
      		record.password === password) {
        	return callback(null, true);
      	}
    }
	return callback(null, false);
}