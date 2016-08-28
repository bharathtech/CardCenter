/**
 * Message Recipient Models
 */

'use strict';

var msgRecipients = function(sequelize, DataTypes) {

    var msgRecipients =  sequelize.define('msgRecipients', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            msgID: {
                type: DataTypes.INTEGER
            },
            email: {
                type: DataTypes.STRING
            },
            isRead: {
                type: DataTypes.BOOLEAN
            },
            archiveDate: {
                type: DataTypes.DATE
            },
            forwardedTo: {
                type: DataTypes.STRING
            },
            forwardedDate: {
                type: DataTypes.DATE
            },
            isArchived: {
                type: DataTypes.BOOLEAN
            },
            isFlagged: {
                type: DataTypes.BOOLEAN
            }
        },
        {
            timestamps: false,
            freezeTableName: true,
	        classMethods: {
		        associate: function(models) {
			        msgRecipients.belongsTo(models.MSGS, {foreignKey: 'msgID'});
		        }
	        }
        });

    return msgRecipients;

};

module.exports = msgRecipients;
