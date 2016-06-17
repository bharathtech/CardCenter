/**
 * chains model
 */

'use strict';

var chainsModel = function(sequelize, DataTypes) {

    var chains =  sequelize.define('chains', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            chainNum: {
                type: DataTypes.INTEGER
            },
            chainName: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return chains;

};

module.exports = chainsModel;
