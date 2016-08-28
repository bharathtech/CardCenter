/**
 * Admin Models
 */

'use strict';

var years = function(sequelize, DataTypes) {

    var years =  sequelize.define('admYears', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            year: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return years;

};

module.exports = years;
