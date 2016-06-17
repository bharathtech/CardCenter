/**
 * Account Model
 */

'use strict';

var accounts = function(sequelize, DataTypes) {

    var accounts =  sequelize.define('accountInfo', {
            businessPartner: {
                type: DataTypes.STRING
            },
            accountNum: {
                type: DataTypes.INTEGER
            },
            storeName: {
                type: DataTypes.STRING
            },
            storeNum: {
                type: DataTypes.INTEGER
            },
            chainNum: {
                type: DataTypes.INTEGER
            },
            chainName: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            addressSuppl: {
                type: DataTypes.STRING
            },
            addressSuppl2: {
                type: DataTypes.STRING
            },
            shoppingCenter: {
                type: DataTypes.STRING
            },
            building: {
                type: DataTypes.STRING
            },
            floorNum: {
                type: DataTypes.STRING
            },
            poBox: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            stateCode: {
                type: DataTypes.INTEGER
            },
            postalCode: {
                type: DataTypes.STRING
            },
            country: {
                type: DataTypes.STRING
            },
            timeZone: {
                type: DataTypes.STRING
            },
            latitude: {
                type: DataTypes.STRING
            },
            longitude: {
                type: DataTypes.STRING
            },
            telephone: {
                type: DataTypes.STRING
            },
            telephoneFormatted: {
                type: DataTypes.STRING
            },
            fax: {
                type: DataTypes.STRING
            },
            storeEmail: {
                type: DataTypes.STRING
            },
            openDate: {
                type: DataTypes.DATE
            },
            closeDate: {
                type: DataTypes.DATE
            },
            serviceStartDate: {
                type: DataTypes.DATE
            },
            serviceStopDate: {
                type: DataTypes.DATE
            },
            serviceTypeCode: {
                type: DataTypes.STRING
            },
            servicePlanningCode: {
                type: DataTypes.INTEGER
            },
            facilityType: {
                type: DataTypes.STRING
            },
            abcClassInd: {
                type: DataTypes.STRING
            },
            posrInd: {
                type: DataTypes.STRING
            },
            sbtInd: {
                type: DataTypes.STRING
            },
            sbtXfrInd: {
                type: DataTypes.STRING
            },
            retailBrand: {
                type: DataTypes.STRING
            }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return accounts;

};

module.exports = accounts;
