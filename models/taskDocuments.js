/**
 * Task Document Models
 */

'use strict';

var taskDocuments = function(sequelize, DataTypes) {

    var taskDocuments =  sequelize.define('taskDocuments', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            taskID: {
                type: DataTypes.INTEGER
            },
            documentID: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return taskDocuments;

};

module.exports = taskDocuments;
