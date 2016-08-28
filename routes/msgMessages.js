/**
 * Messages Routes
 */

'use strict';

var messageController = require('../controllers/msgMessages');
var auth = require('../auth');

var routes = function(app) {

	// GET message(s)
    app.get('/GET/messages/:whereField/:whereValue', auth.isAuthenticated, messageController.readByFieldValue);
    app.get('/messages/READ/:msgID', auth.isAuthenticated, messageController.readMessageModel);
    app.get('/GET/messages/types', auth.isAuthenticated, messageController.getTypes);
    app.get('/GET/messages/priorities', auth.isAuthenticated, messageController.getPriorities);
    app.get('/GET/messages/saveStatuses', auth.isAuthenticated, messageController.getSaveStatuses);
    app.get('/messages/distributeByCategory', auth.isAuthenticated, messageController.distributeByCategory);
    app.get('/messages/getMessagesToEdit', auth.isAuthenticated, messageController.getMessagesToEdit);

	// UPDATE message(s)
    app.post('/messages/UPDATE/:msgID', auth.isAuthenticated, messageController.updateMessage);

    // INSERT a new message
    app.post('/messages/INSERT', auth.isAuthenticated, messageController.insertNewMessage);

    // DELETE message(s)
    app.post('/messages/DELETE/:msgID', auth.isAuthenticated, messageController.deleteMessage);

	// Validate custom account list
	app.post('/messages/validateCustomAccountList', auth.isAuthenticated, messageController.validateCustomAccountList);

};


module.exports = routes;
