/**
 * Employee Controller
 */

'use strict';

var _ = require('lodash');

var db = require('../config/database');
var EmployeeModel = db.employees;
var Sequelize = require('sequelize');

var modelMsoFieldHierarchy = db["msoFieldHierarchy"];

//-- Read all the data from the msoFieldHierarchy table based on Level1 data
var readMsoFieldHierarchyByLevel1 = function (req, res, next) {
    var level2Data = {
        "filterData": [
            {
                "level2List": [
                    {"emailL2": "LPAVOL1", "employeeNameL2": "Linda Pavola"},
                    {"emailL2": "KWEINE2", "employeeNameL2": "Kim Weiner"}
                ]
            }
        ]
    };

    var level1Email = req.params.level1Email;
    //console.log("level1Email: " + JSON.stringify(level1Email));

    //-- Build the Options object
    var level2Options = {};
    level2Options["attributes"] = ['emailL2',['max(employeeNameL2)','employeeNameL2']];
    level2Options["where"] = {"emailL1": {$in: [level1Email]}, "emailL2": {$not: null}};
    level2Options["group"] = ['emailL2'];
    level2Options["order"] = ['employeeNameL2'];

    modelMsoFieldHierarchy
        .findAll(level2Options)
        .then(function (level2List) {
            if (level2List) {
                level2Data["filterData"][0]["level2List"] = level2List;
                res.json(level2Data);
            }
        }).error(function (err) {
            if (err)
                return next(err);
        });

};


// GET method for tags and categories
var listEmployees = function (req, res, next) {

	var nameFilter = req.query.nameFilter;

	EmployeeModel.findAll({
		attributes: [['email', 'id'], ['employeeName', 'text']],
		where: Sequelize.where(
			Sequelize.fn(
				'upper', Sequelize.col('employeeName')
			), {
				$like: '%' + nameFilter.toUpperCase() + '%'
			}
		)
	}).then(function(employees) {

		if (employees) {
			return res.status(200).json({
				employees: employees
			})
		}

	}).error(function (err) {
		if (err) return next(err);
	})

};

module.exports = {
    readMsoFieldHierarchyByLevel1: readMsoFieldHierarchyByLevel1,
	listEmployees: listEmployees
};