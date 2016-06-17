/**
 * Distribute By Categories Models
 */

'use strict';

var msgDistributeByCategories = function(sequelize, DataTypes) {

    var msgDistributeByCategories =  sequelize.define('msgDistributeByCategories', {
            ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            distributeByCategoryName: {
                type: DataTypes.STRING
            },
            accountRespField: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return msgDistributeByCategories;

};

module.exports = msgDistributeByCategories;
