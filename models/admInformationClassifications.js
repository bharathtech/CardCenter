/**
 * Information Classification Models
 */

'use strict';

var informationClassifications = function(sequelize, DataTypes) {

    var informationClassifications =  sequelize.define('admInformationClassifications', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            informationClassification: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return informationClassifications;

};

module.exports = informationClassifications;
