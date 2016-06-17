/**
 * Admin Models
 */

'use strict';

var positions = function(sequelize, DataTypes) {

    var positions =  sequelize.define('admPositions', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            positionTitle: {
                type: DataTypes.STRING
            },
            positionName: {
                type: DataTypes.STRING
            },
            hrPositionName: {
                type: DataTypes.STRING
            },
            hrJobFuncCode: {
                type: DataTypes.INTEGER
            },
            sapPositionName: {
                type: DataTypes.STRING
            },
            sapJobFuncCode: {
                type: DataTypes.STRING
            }
        },
        /*
        {
            getterMethods: {
                value: function() {
                    return this.positionName + ' (' + this.positionTitle + ')';
                }
            }
        },
        */
        {
            timestamps: false,
            freezeTableName: true
        });

	return positions;

};

module.exports = positions;
