/**
 * Admin Models
 */

'use strict';

var adminUserTypes = function(sequelize, DataTypes) {

    var adminUserTypes =  sequelize.define('admUserTypes', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userType: {
                type: DataTypes.STRING
            },
            avatar: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return adminUserTypes;

};

module.exports = adminUserTypes;
