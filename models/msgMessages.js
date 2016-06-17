/**
 * Message Model
 */

'use strict';

var MessageModel = function(sequelize, DataTypes) {

	var Message =  sequelize.define('MSGS', {
		ID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
            autoIncrement: true
		},
		publishDate: {
			type: DataTypes.DATE
		},
		expireDate: {
			type: DataTypes.DATE
		},
		subject: {
			type: DataTypes.STRING
		},
		body: {
			type: DataTypes.STRING
		},
		priorityID: {
			type: DataTypes.INTEGER
		},
		typeID: {
			type: DataTypes.INTEGER
		},
		lastModifiedBy: {
			type: DataTypes.STRING
		},
		lastModifiedDate: {
			type: DataTypes.DATE
		},
        actionDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        hasAttachment: {
            type: DataTypes.BOOLEAN()
        },
        removedBy: {
            type: DataTypes.STRING
        },
        removedDate: {
            type: DataTypes.DATE
        },
        informationClassificationID: {
            type: DataTypes.INTEGER
        },
        saveStatusID: {
            type: DataTypes.INTEGER
        }
	}, {
		timestamps: false,
		freezeTableName: true
	});

	return Message;
};

module.exports = MessageModel;
