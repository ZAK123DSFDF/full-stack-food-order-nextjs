"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DialogCom;
var material_1 = require("@mui/material");
var react_1 = require("react");
function DialogCom(_a) {
    var newRole = _a.newRole, setNewRole = _a.setNewRole, openAddDialog = _a.openAddDialog, setOpenAddDialog = _a.setOpenAddDialog, handleAddNewRole = _a.handleAddNewRole, isEditing = _a.isEditing, setIsEditing = _a.setIsEditing, roleId = _a.roleId, setRoleId = _a.setRoleId, data1 = _a.data1, isPending = _a.isPending, handleEditData = _a.handleEditData;
    (0, react_1.useLayoutEffect)(function () {
        if (isEditing && data1) {
            // Populate form with existing role data for editing
            var updatedPermissions = {
                SEE_ORDERS: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("SEE_ORDERS"),
                UPDATE_ORDERS: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("UPDATE_ORDERS"),
                ADD_MENU: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("ADD_MENU"),
                ADD_ROLE: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("ADD_ROLE"),
                UPDATE_ROLE: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("UPDATE_ROLE"),
                DELETE_ROLE: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("DELETE_ROLE"),
                GET_ROLES: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("GET_ROLES"),
                ADD_USER: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("ADD_USER"),
                UPDATE_USER: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("UPDATE_USER"),
                DELETE_USER: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("DELETE_USER"),
                GET_USERS: data1 === null || data1 === void 0 ? void 0 : data1.allowedActions.includes("GET_USERS"),
            };
            setNewRole({
                roleName: data1.name,
                permissions: updatedPermissions,
            });
        }
        // Cleanup function to reset the form when modal closes or component unmounts
        return function () {
            setNewRole({
                roleName: "",
                permissions: {
                    SEE_ORDERS: false,
                    UPDATE_ORDERS: false,
                    ADD_MENU: false,
                    ADD_ROLE: false,
                    UPDATE_ROLE: false,
                    DELETE_ROLE: false,
                    GET_ROLES: false,
                    ADD_USER: false,
                    UPDATE_USER: false,
                    DELETE_USER: false,
                    GET_USERS: false,
                },
            });
        };
    }, [isEditing, data1, setNewRole]);
    var handleCheck = function () {
        console.log(newRole);
    };
    return (<material_1.Dialog open={openAddDialog || isEditing} onClose={function () {
            setOpenAddDialog(false);
            setIsEditing(false);
            setRoleId(null);
            setNewRole({
                roleName: "",
                permissions: {
                    SEE_ORDERS: false,
                    UPDATE_ORDERS: false,
                    ADD_MENU: false,
                    ADD_ROLE: false,
                    UPDATE_ROLE: false,
                    DELETE_ROLE: false,
                    GET_ROLES: false,
                    ADD_USER: false,
                    UPDATE_USER: false,
                    DELETE_USER: false,
                    GET_USERS: false,
                },
            });
        }} fullWidth maxWidth="sm">
      <material_1.DialogTitle>Add New Role</material_1.DialogTitle>
      <material_1.DialogContent>
        <material_1.TextField label="Role Name" name="roleName" value={newRole.roleName} onChange={function (e) {
            var value = e.target.value;
            setNewRole(function (prev) { return (__assign(__assign({}, prev), { roleName: value })); });
        }} fullWidth margin="normal"/>
        <material_1.Typography sx={{ mt: 2 }}>Permissions:</material_1.Typography>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.SEE_ORDERS} name="SEE_ORDERS" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { SEE_ORDERS: checked }) })); });
            }}/>} label="See Orders"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.UPDATE_ORDERS} name="UPDATE_ORDERS" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { UPDATE_ORDERS: checked }) })); });
            }}/>} label="Update Orders"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.ADD_MENU} name="ADD_MENU" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { ADD_MENU: checked }) })); });
            }}/>} label="Add Menu"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.ADD_ROLE} name="ADD_ROLE" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { ADD_ROLE: checked }) })); });
            }}/>} label="Add Role"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.UPDATE_ROLE} name="UPDATE_ROLE" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { UPDATE_ROLE: checked }) })); });
            }}/>} label="Update Role"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.DELETE_ROLE} name="DELETE_ROLE" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { DELETE_ROLE: checked }) })); });
            }}/>} label="Delete Role"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.GET_ROLES} name="GET_ROLES" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { GET_ROLES: checked }) })); });
            }}/>} label="Get Roles"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.ADD_USER} name="ADD_USER" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { ADD_USER: checked }) })); });
            }}/>} label="Add User"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.UPDATE_USER} name="UPDATE_USER" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { UPDATE_USER: checked }) })); });
            }}/>} label="Update User"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.DELETE_USER} name="DELETE_USER" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { DELETE_USER: checked }) })); });
            }}/>} label="Delete User"/>
        <material_1.FormControlLabel control={<material_1.Checkbox checked={newRole.permissions.GET_USERS} name="GET_USERS" sx={{
                color: "#e57b0f",
                "&.Mui-checked": {
                    color: "#e57b0f",
                },
                "&.Mui-checked:hover": {
                    backgroundColor: "transparent",
                },
            }} onChange={function (e) {
                var checked = e.target.checked;
                setNewRole(function (prev) { return (__assign(__assign({}, prev), { permissions: __assign(__assign({}, prev.permissions), { GET_USERS: checked }) })); });
            }}/>} label="Get Users"/>
      </material_1.DialogContent>
      <material_1.DialogActions>
        <material_1.Button onClick={function () {
            setOpenAddDialog(false);
            setIsEditing(false);
            setRoleId(null);
            setNewRole({
                roleName: "",
                permissions: {
                    SEE_ORDERS: false,
                    UPDATE_ORDERS: false,
                    ADD_MENU: false,
                    ADD_ROLE: false,
                    UPDATE_ROLE: false,
                    DELETE_ROLE: false,
                    GET_ROLES: false,
                    ADD_USER: false,
                    UPDATE_USER: false,
                    DELETE_USER: false,
                    GET_USERS: false,
                },
            });
        }} sx={{ color: "#e57b0f" }}>
          Cancel
        </material_1.Button>
        <material_1.Button onClick={isEditing ? function () { return handleEditData(roleId); } : handleAddNewRole} color="primary" sx={{ backgroundColor: "#e57b0f", color: "white" }}>
          {isEditing ? "Edit Role" : "Add Role"}
        </material_1.Button>
      </material_1.DialogActions>
    </material_1.Dialog>);
}
