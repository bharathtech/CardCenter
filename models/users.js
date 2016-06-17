/**
 * User Model
 */

'use strict';

var UserModel = function (sequelize, DataTypes) {
	var User = sequelize.define('user', {
		lastName: {
			type: DataTypes.STRING
		},
		firstName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: {
				isLowercase: true
			}
		},
		sapPositionID: {
			type: DataTypes.INTEGER
		},
		positionName: {
			type: DataTypes.STRING,
			defaultValue: 'user'
		},
		password: {
			type: DataTypes.STRING
		},
		sessionKey: {
			type: DataTypes.STRING
		}
	}, {
		getterMethods: {
			fullName: function () {
				return this.firstName + ' ' + this.lastName
			}
		},
		timestamps: false,
		classMethods: {
			associate: function(models) {
				User.hasOne(models.employees, {foreignKey: 'email'});
			}
		}
	});

	return User;
};

module.exports = UserModel;