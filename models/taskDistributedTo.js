/**
 * Task Distributed To Models
 */

'use strict';

var taskDistributedTo = function(sequelize, DataTypes) {

    var taskDistributedTo =  sequelize.define('taskDistributedTo', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            taskID: {
                type: DataTypes.INTEGER
            },
            distributeByCategoryID: {
                type: DataTypes.INTEGER
            },
            distributeByCategoryValue: {
                type: DataTypes.STRING
            },
            distributeByCategoryValueName: {
                type: DataTypes.STRING
            },
            distributionGroup: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return taskDistributedTo;

};

module.exports = taskDistributedTo;
