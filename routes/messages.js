/**
 * View Messages Routes
 */

'use strict';

var inboxController = require('../controllers/messages');
var auth = require('../auth');

var routes = function(app) {

	// GET a list of all messages for a particular user
	app.get('/messages', auth.isAuthenticated, inboxController.listMessages);

	// GET/UPDATE single message
	app.get('/message/:id', auth.isAuthenticated, inboxController.singleMessage);
	app.put('/message/:id', auth.isAuthenticated, inboxController.updateMessage);

	// GET all messages for a particular recipient
	app.get('/messages/recipient', auth.isAuthenticated, inboxController.listRecipientMessages);


};

module.exports = routes;