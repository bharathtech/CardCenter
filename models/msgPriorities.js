/**
 * Message Priority Models
 */

'use strict';

var msgPriorities = function(sequelize, DataTypes) {

    var msgPriorities =  sequelize.define('msgPriorities', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            priority: {
                type: DataTypes.STRING
            },
            priorityColor: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return msgPriorities;

};

module.exports = msgPriorities;
