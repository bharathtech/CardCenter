/**
 * Admin CRUD Models
 */

'use strict';

var admTableList = function(sequelize, DataTypes) {

    var admTableList =  sequelize.define('admTableList', {
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        adminTableName: {
            type: DataTypes.STRING
        },
        adminTableDescription: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    });

	return admTableList;

};

module.exports = admTableList;
