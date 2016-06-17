/**
 * Admin Tag Category Model
 */

'use strict';

var tagCategories = function(sequelize, DataTypes) {

    var tagCategories =  sequelize.define('admTagCategories', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            tagCategory: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return tagCategories;

};

module.exports = tagCategories;
