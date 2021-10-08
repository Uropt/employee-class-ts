"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.EmployeeOrgApp = void 0;
var Employee_1 = require("../interfaces/Employee");
var EmployeeOrgApp = /** @class */ (function () {
    // constructor
    function EmployeeOrgApp(ceo) {
        // Member Variable
        // main instance
        this._ceo = Employee_1.defaultEmployee;
        // history
        this._history = [];
        this._ceo = ceo;
    }
    // make flat employee array
    EmployeeOrgApp.prototype.values = function (subs) {
        var _this = this;
        return subs.subordinate.reduce(function (ret, cur) {
            var _a;
            return __spreadArray(__spreadArray([], (ret !== null && ret !== void 0 ? ret : []), true), ((_a = _this.values(cur)) !== null && _a !== void 0 ? _a : []), true);
        }, []);
    };
    // get employee at
    EmployeeOrgApp.prototype.getAt = function (id) {
        var subs = this.values(this._ceo);
        return subs.reduce(function (ret, cur) {
            if (ret.uniqueId > 0) {
                return ret;
            }
            if (cur.uniqueId === id) {
                return cur;
            }
            return ret;
        }, Employee_1.defaultEmployee);
    };
    // get employee super
    EmployeeOrgApp.prototype.getSuper = function (id) {
        var subs = this.values(this._ceo);
        return subs.reduce(function (ret, cur) {
            if (
            // check if in subs
            cur.subordinate.reduce(function (retSub, curSub) {
                if (curSub.uniqueId === id) {
                    return curSub;
                }
                return retSub;
            }, Employee_1.defaultEmployee).uniqueId > 0) {
                return cur;
            }
            return ret;
        }, Employee_1.defaultEmployee);
    };
    // remove at
    EmployeeOrgApp.prototype.removeAt = function (id) {
        // get super employee
        var superEmployee = this.getSuper(id);
        // save old length
        var originLength = superEmployee.subordinate.length;
        // remove target
        superEmployee.subordinate = superEmployee.subordinate.filter(function (item) { return Boolean(item.uniqueId !== id); });
        // compair with old length
        return originLength !== superEmployee.subordinate.length;
    };
    EmployeeOrgApp.prototype.moveSubAt = function (action) {
        // get src employee
        var srcEmployee = this.getAt(action.from);
        if (!Boolean(srcEmployee.uniqueId)) {
            console.log("There is no matching Employee");
            return false;
        }
        // remove src employee at old position
        this.removeAt(action.from);
        // save as sub employee at dest employy
        var destEmployee = this.getAt(action.to);
        destEmployee.subordinate.push(srcEmployee);
        // record history
        action.action = 'moveToSub';
        this._history.push(action);
        // success
        return true;
    };
    // show all
    EmployeeOrgApp.prototype.show = function () {
        console.log(this._ceo);
    };
    return EmployeeOrgApp;
}());
exports.EmployeeOrgApp = EmployeeOrgApp;
