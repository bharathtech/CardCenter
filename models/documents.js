/**
 * Document Models
 */

'use strict';

var documents = function(sequelize, DataTypes) {

    var documents =  sequelize.define('documents', {
            ID: {
                type: DataTypes.INTEGER
            },
            documentName: {
                type: DataTypes.STRING
            },
            documentID: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            documentTags: {
                type: DataTypes.STRING
            },
            documentFormat: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return documents;

};

module.exports = documents;
