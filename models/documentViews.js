/**
 * Document View Model
 */

'use strict';

var documentViews = function(sequelize, DataTypes) {

    var documentViews =  sequelize.define('documentViews', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            documentID: {
                type: DataTypes.STRING
            },
            userID: {
                type: DataTypes.STRING
            },
            positionID: {
                type: DataTypes.INTEGER
            },
            documentRating: {
                type: DataTypes.INTEGER
            },
            dateViewed: {
                type: DataTypes.DATE
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return documentViews;

};

module.exports = documentViews;
