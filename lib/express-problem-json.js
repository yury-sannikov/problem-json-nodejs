'use strict';

var problemJsonMiddleware = function(options) {
	return function(req, res, next) {

		return next();
	};
}
module.exports = problemJsonMiddleware;