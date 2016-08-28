/**
 * Message Distributed To Models
 */

'use strict';

var msgDistributedTo = function(sequelize, DataTypes) {

    var msgDistributedTo =  sequelize.define('msgDistributedTo', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            msgID: {
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

	return msgDistributedTo;

};

module.exports = msgDistributedTo;
