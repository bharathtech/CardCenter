/**
 * Message Document Models
 */

'use strict';

var msgDocuments = function(sequelize, DataTypes) {

    var msgDocuments =  sequelize.define('msgDocuments', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            msgID: {
                type: DataTypes.INTEGER
            },
            documentID: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return msgDocuments;

};

module.exports = msgDocuments;
