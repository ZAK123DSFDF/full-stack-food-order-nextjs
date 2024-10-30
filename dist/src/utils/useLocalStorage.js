"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useLocalStorage;
var react_1 = require("react");
function useLocalStorage() {
    var _a = (0, react_1.useState)(false), init = _a[0], setInit = _a[1];
    var _b = (0, react_1.useState)(null), userData = _b[0], setUserData = _b[1];
    (0, react_1.useEffect)(function () {
        setInit(true);
    }, []);
    (0, react_1.useEffect)(function () {
        if (init) {
            try {
                var storedUser = localStorage.getItem("user");
                if (storedUser) {
                    var user = JSON.parse(storedUser);
                    console.log("this is user data", user);
                    setUserData(user);
                }
                else {
                    console.log("No user data found in localStorage.");
                }
            }
            catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, [init]);
    var hasPermissionToViewUsers = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("GET_USERS"))));
    }, [userData]);
    var hasPermissionToDeleteUser = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("DELETE_USER"))));
    }, [userData]);
    var hasPermissionToUpdateUser = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("UPDATE_USER"))));
    }, [userData]);
    var hasPermissionToAddUser = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("ADD_USER"))));
    }, [userData]);
    var hasPermissionToViewOrders = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("SEE_ORDERS"))));
    }, [userData]);
    var hasPermissionToUpdateOrders = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("UPDATE_ORDERS"))));
    }, [userData]);
    var hasPermissionToAddMenu = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("ADD_MENU"))));
    }, [userData]);
    var hasPermissionToAddRole = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("ADD_ROLE"))));
    }, [userData]);
    var hasPermissionToUpdateRole = (0, react_1.useMemo)(function () {
        var _a, _b, _c, _d;
        console.log("this is from update", (userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("UPDATE_ROLE"))));
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_d = (_c = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _c === void 0 ? void 0 : _c.allowedActions) === null || _d === void 0 ? void 0 : _d.includes("UPDATE_ROLE"))));
    }, [userData]);
    var hasPermissionToDeleteRole = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("DELETE_ROLE"))));
    }, [userData]);
    var hasPermissionToGetRoles = (0, react_1.useMemo)(function () {
        var _a, _b;
        return ((userData === null || userData === void 0 ? void 0 : userData.role) === "ADMIN" ||
            ((userData === null || userData === void 0 ? void 0 : userData.role) === "SERVANT" &&
                (userData === null || userData === void 0 ? void 0 : userData.active) &&
                ((_b = (_a = userData === null || userData === void 0 ? void 0 : userData.servantRole) === null || _a === void 0 ? void 0 : _a.allowedActions) === null || _b === void 0 ? void 0 : _b.includes("GET_ROLES"))));
    }, [userData]);
    return {
        hasPermissionToViewUsers: hasPermissionToViewUsers,
        hasPermissionToViewOrders: hasPermissionToViewOrders,
        hasPermissionToUpdateOrders: hasPermissionToUpdateOrders,
        hasPermissionToDeleteUser: hasPermissionToDeleteUser,
        hasPermissionToUpdateUser: hasPermissionToUpdateUser,
        hasPermissionToAddUser: hasPermissionToAddUser,
        hasPermissionToAddMenu: hasPermissionToAddMenu,
        hasPermissionToAddRole: hasPermissionToAddRole,
        hasPermissionToUpdateRole: hasPermissionToUpdateRole,
        hasPermissionToDeleteRole: hasPermissionToDeleteRole,
        hasPermissionToGetRoles: hasPermissionToGetRoles,
    };
}
