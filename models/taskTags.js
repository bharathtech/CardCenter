/**
 * Task Tag Models
 */

'use strict';

var taskTags = function(sequelize, DataTypes) {

    var taskTags =  sequelize.define('taskTags', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            taskID: {
                type: DataTypes.INTEGER
            },
            tagID: {
                type: DataTypes.INTEGER,
                references: "admTags",
                referencesKey: "ID"
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return taskTags;

};

module.exports = taskTags;
