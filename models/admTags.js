/**
 * Admin Tags Models
 */

'use strict';

var tags = function(sequelize, DataTypes) {

    var tags =  sequelize.define('admTags', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            tagName: {
                type: DataTypes.STRING
            },
            tagCategoryID: {
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return tags;

};

module.exports = tags;
