'use strict';

var problemJsonMiddleware = function(options) {
	
	var makeError = function(err) {
		return {
			type: "about:blank",
			title: "An error occured",
			status: 500,
			detail: err
		}
	}

	return function(err, req, res, next) {
		var errObject = makeError(err);
		res.set('Content-Type', 'application/problem+json').send(errObject.status, errObject);
	};
}
module.exports = problemJsonMiddleware;