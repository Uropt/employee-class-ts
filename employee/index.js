"use strict";
exports.__esModule = true;
var EmployeeOrgApp_1 = require("./classes/EmployeeOrgApp");
var ceo_1 = require("./instances/ceo");
var app = new EmployeeOrgApp_1.EmployeeOrgApp(ceo_1.ceo);
app.show();
app.moveSubAt({ from: 31, to: 21 });
app.show();
