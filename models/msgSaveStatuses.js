/**
 * Save Statuses Models
 */

'use strict';

var saveStatuses = function(sequelize, DataTypes) {

    var saveStatuses =  sequelize.define('msgSaveStatuses', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            saveStatus: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return saveStatuses;

};

module.exports = saveStatuses;
