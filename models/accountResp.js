/**
 * Account Responsibility Models
 */

'use strict';

var accountResp = function(sequelize, DataTypes) {

    var accountResp =  sequelize.define('accountResp', {
            ID: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            bpSoldToNum : { type: DataTypes.STRING },
            accountNum : { type: DataTypes.INTEGER } ,
            crmTerritoryNum : { type: DataTypes.INTEGER } ,
            empBpNum : { type: DataTypes.STRING },
            employeeName : { type: DataTypes.STRING },
            employeeNum : { type: DataTypes.INTEGER } ,
            email : { type: DataTypes.STRING } ,
            sapPositionID : { type: DataTypes.INTEGER } ,
            jobFuncCode : { type: DataTypes.STRING },
            chainNum : { type: DataTypes.INTEGER, foreignKey: true } ,
            chainName : { type: DataTypes.STRING },
            channelNum : { type: DataTypes.INTEGER } ,
            channelName : { type: DataTypes.STRING },
            regionNum : { type: DataTypes.INTEGER } ,
            regionName : { type: DataTypes.STRING },
            districtNum : { type: DataTypes.INTEGER } ,
            districtName : { type: DataTypes.STRING },
            rmmBpNum : { type: DataTypes.STRING },
            rmmSapPositionID : { type: DataTypes.INTEGER } ,
            rmmJobFuncCode : { type: DataTypes.STRING },
            rmmEmployeeNum : { type: DataTypes.INTEGER } ,
            rmmName : { type: DataTypes.STRING },
            rmmEmail : { type: DataTypes.STRING } ,
            tmTerritoryNum : { type: DataTypes.INTEGER},
            tmTerritoryName : { type: DataTypes.STRING },
            tmBpNum : { type: DataTypes.STRING },
            tmSapPositionID : { type: DataTypes.INTEGER } ,
            tmJobFuncCode : { type: DataTypes.STRING },
            tmEmployeeNum : { type: DataTypes.INTEGER } ,
            tmName : { type: DataTypes.STRING },
            tmEmail : { type: DataTypes.STRING },
            fimBpNum : { type: DataTypes.STRING },
            fimSapPositionID : { type: DataTypes.INTEGER } ,
            fimJobFuncCode : { type: DataTypes.STRING },
            fimEmployeeNum : { type: DataTypes.INTEGER } ,
            fimName : { type: DataTypes.STRING },
            fimEmail : { type: DataTypes.STRING },
            tsTerritoryNum : { type: DataTypes.INTEGER },
            tsTerritoryName : { type: DataTypes.STRING },
            tsBpNum : { type: DataTypes.STRING },
            tsSapPositionID : { type: DataTypes.INTEGER } ,
            tsJobFuncCode : { type: DataTypes.STRING },
            tsEmployeeNum : { type: DataTypes.INTEGER } ,
            tsName : { type: DataTypes.STRING },
            tsEmail : { type: DataTypes.STRING },
            isBpNum : { type: DataTypes.STRING },
            isSapPositionID : { type: DataTypes.INTEGER } ,
            isJobFuncCode : { type: DataTypes.STRING },
            isEmployeeNum : { type: DataTypes.INTEGER } ,
            isName : { type: DataTypes.STRING },
            isEmail : { type: DataTypes.STRING },
            ttBpNum : { type: DataTypes.STRING },
            ttSapPositionID : { type: DataTypes.INTEGER } ,
            ttJobFuncCode : { type: DataTypes.STRING },
            ttEmployeeNum : { type: DataTypes.INTEGER } ,
            ttName : { type: DataTypes.STRING },
            ttEmail : { type: DataTypes.STRING },
            itBpNum : { type: DataTypes.STRING },
            itSapPositionID : { type: DataTypes.INTEGER } ,
            itJobFuncCode : { type: DataTypes.STRING },
            itEmployeeNum : { type: DataTypes.INTEGER } ,
            itName : { type: DataTypes.STRING },
            itEmail : { type: DataTypes.STRING }
        },
        {
            timestamps: false,
            freezeTableName: true
        });

	return accountResp;

};

module.exports = accountResp;
