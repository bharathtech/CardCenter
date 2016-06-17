/**
 * Task Model
 */

'use strict';

var TaskModel = function(sequelize, DataTypes) {

	var Task =  sequelize.define('tasks', {
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
		requestorID: {
			type: DataTypes.INTEGER
		},
		reasonID: {
			type: DataTypes.INTEGER
		},
        actionDate: {
            type: DataTypes.DATE
        },
        hasAttachment: {
            type: DataTypes.BOOLEAN
        },
        completedBy: {
            type: DataTypes.STRING
        },
        completedDate: {
            type: DataTypes.DATE
        },
        removedBy: {
            type: DataTypes.STRING
        },
        removedDate: {
            type: DataTypes.DATE
        },
        saveStatusID: {
            type: DataTypes.INTEGER
        },
        surveyID: {
            type: DataTypes.INTEGER
        },
        lastModifiedBy: {
            type: DataTypes.STRING
        },
        lastModifiedDate: {
            type: DataTypes.DATE
        }
	}, {
		timestamps: false,
		freezeTableName: true
	});

	return Task;
};

module.exports = TaskModel;
