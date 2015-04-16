define(function (require) {
	var $ = require('jquery');
	var CryptoJS = require('cryptojs');
	
	var ehehdadaltd = ehehdadaltd || {};
		
	ehehdadaltd.Highscores = function(tableName, tableKey, sharedSecret) {
		this.tableName = tableName;
		this.tableKey = tableKey;
		this.sharedSecret = sharedSecret;
	};
	
	function genFingerprint(uri,requestBody,timestamp,tableKey,sharedSecret) {
		stringToHash = 
			uri 
			+ "|"
			+ requestBody
			+ "|"
			+ timestamp
			+ "|"
			+ tableKey
			+ "|"
			+ sharedSecret
			;
		return CryptoJS.SHA256(stringToHash + "|" + stringToHash.length);
	}
	
	ehehdadaltd.Highscores.prototype.getServerTimestamp = function(callback) {
		var uriToResource = "/api/" + encodeURIComponent($("#table_name").val());
		$.ajax({
			url: "https://highscores.ehehdada.com" + uriToResource,
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: callback.onSuccess,
			error: callback.onOtherError
		});
	}
	
	return ehehdadaltd;
});
