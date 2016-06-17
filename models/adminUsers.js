/**
 * Admin Models
 */

'use strict';

var adminUsers = function(sequelize, DataTypes) {

    var adminUsers =  sequelize.define('admUsers', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            employeeNum: {
                type: DataTypes.INTEGER
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            userTypeID: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return adminUsers;

};

module.exports = adminUsers;
