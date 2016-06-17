/**
 * Employee Model
 */

'use strict';

var employeeModel = function(sequelize, DataTypes) {

    var employees =  sequelize.define('employees', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            employeeNum: {
                type: DataTypes.INTEGER
            },
            firstName: {
                type: DataTypes.STRING
            },
            lastName: {
                type: DataTypes.STRING
            },
            employeeName: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            address1: {
                type: DataTypes.STRING
            },
            address2: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            stateCode: {
                type: DataTypes.STRING
            },
            postalCode: {
                type: DataTypes.STRING
            },
            officePhone: {
                type: DataTypes.STRING
            },
            cellPhone: {
                type: DataTypes.STRING
            },
            birthday: {
                type: DataTypes.STRING
            },
            hmkAnniversary: {
                type: DataTypes.STRING
            },
            sapPositionID: {
                type: DataTypes.STRING
            },
            positionName: {
                type: DataTypes.STRING
            },
            mgrEmployeeNum: {
                type: DataTypes.INTEGER
            },
            mgrSapPositionID: {
                type: DataTypes.INTEGER
            },
            hrJobCodeID: {
                type: DataTypes.INTEGER
            },
            hrOrganization: {
                type: DataTypes.STRING
            },
            userTypeID: {
                type: DataTypes.INTEGER
            }

        },
        {
            timestamps: false,
            freezeTableName: true
        });

    return employees;

};

module.exports = employeeModel;
