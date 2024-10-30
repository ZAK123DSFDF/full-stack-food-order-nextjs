"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RoleManagement;
var material_1 = require("@mui/material");
var react_1 = require("react");
var material_react_table_1 = require("material-react-table");
var Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var BreadCrumbs_1 = __importDefault(require("./BreadCrumbs"));
var react_query_1 = require("@tanstack/react-query");
var getAllRoles_1 = require("../actions/role/getAllRoles");
var createRole_1 = require("../actions/role/createRole");
var Dialog_1 = __importDefault(require("./Dialog"));
var getSingleRole_1 = require("../actions/role/getSingleRole");
var updateRole_1 = require("../actions/role/updateRole");
var activateRole_1 = require("../actions/role/activateRole");
var deactivateRole_1 = require("../actions/role/deactivateRole");
var deleteRole_1 = require("../actions/role/deleteRole");
var useLocalStorage_1 = __importDefault(require("@/utils/useLocalStorage"));
var navigation_1 = require("next/navigation");
var image_1 = __importDefault(require("next/image"));
function RoleManagement() {
    var _a = (0, react_1.useState)(null), dialogData = _a[0], setDialogData = _a[1];
    var _b = (0, react_1.useState)(false), isEditing = _b[0], setIsEditing = _b[1];
    var _c = (0, react_1.useState)(false), openAddDialog = _c[0], setOpenAddDialog = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), roleId = _e[0], setRoleId = _e[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var _f = (0, react_1.useState)(false), hasTyped = _f[0], setHasTyped = _f[1];
    var _g = (0, react_1.useState)(""), globalSearch = _g[0], setGlobalSearch = _g[1];
    var _h = (0, react_1.useState)([]), columnFilter = _h[0], setColumnFilter = _h[1];
    var _j = (0, react_1.useState)([]), sorting = _j[0], setSorting = _j[1];
    var _k = (0, react_1.useState)(false), del = _k[0], setDel = _k[1];
    var router = (0, navigation_1.useRouter)();
    var _l = (0, react_1.useState)({
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
    }), newRole = _l[0], setNewRole = _l[1];
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            setLoading(false);
        }, 500);
    });
    var globalSearc = searchParams.get("globalSearch");
    var roleName = searchParams.get("name");
    var createdAt = searchParams.get("createdAt");
    var active = searchParams.get("active");
    var sortBy = searchParams.get("sortBy");
    var sortOrder = searchParams.get("sortOrder");
    var queryClient = (0, react_query_1.useQueryClient)();
    var _m = (0, react_query_1.useQuery)({
        queryKey: [
            "allRoles",
            globalSearc,
            roleName,
            createdAt,
            active,
            sortBy,
            sortOrder,
        ],
        queryFn: function () {
            return (0, getAllRoles_1.getAllRoles)(globalSearc, roleName, createdAt, active, sortBy, sortOrder);
        },
    }), data = _m.data, isPending = _m.isPending, isError = _m.isError;
    (0, react_1.useEffect)(function () {
        console.log("this is roles", data);
    }, [data]);
    var mutate = (0, react_query_1.useMutation)({
        mutationFn: createRole_1.createRole,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allRoles"]);
        },
    }).mutate;
    var handleAddNewRole = function () {
        console.log(newRole);
        console.log(Object.entries(newRole.permissions));
        if (newRole.roleName.trim() === "") {
            console.log("You need to type something for the role name.");
            return;
        }
        var hasSelectedPermission = Object.values(newRole.permissions).some(function (value) { return value === true; });
        if (!hasSelectedPermission) {
            console.log("You should at least select one permission.");
            return;
        }
        var selectedPermissions = Object.entries(newRole.permissions)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return value === true;
        })
            .map(function (_a) {
            var key = _a[0];
            return key;
        });
        mutate({ name: newRole.roleName, allowedActions: selectedPermissions });
        setOpenAddDialog(false);
    };
    var data1 = (0, react_query_1.useQuery)({
        queryKey: ["getSingleRole"],
        queryFn: function () { return (0, getSingleRole_1.getSingleRole)(roleId); },
        enabled: !!roleId,
    }).data;
    var mutate1 = (0, react_query_1.useMutation)({
        mutationFn: updateRole_1.updateRole,
        onSuccess: function (data) {
            console.log(data);
            setIsEditing(false);
            //@ts-ignore
            queryClient.invalidateQueries(["allRoles"]);
        },
    }).mutate;
    var activate = (0, react_query_1.useMutation)({
        mutationFn: activateRole_1.activateRole,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allRoles"]);
        },
    }).mutate;
    var deactivate = (0, react_query_1.useMutation)({
        mutationFn: deactivateRole_1.deactivateRole,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allRoles"]);
        },
    }).mutate;
    var deleteId = (0, react_query_1.useMutation)({
        mutationFn: deleteRole_1.deleteRole,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allRoles"]);
        },
    }).mutate;
    var handleDelete = function (id) {
        deleteId(id);
    };
    var handleToggle = function (id, state) {
        if (state) {
            deactivate(id);
        }
        else {
            activate(id);
        }
    };
    var handleEditData = function (id) {
        console.log(newRole);
        console.log(Object.entries(newRole.permissions));
        if (newRole.roleName.trim() === "") {
            console.log("You need to type something for the role name.");
            return;
        }
        var hasSelectedPermission = Object.values(newRole.permissions).some(function (value) { return value === true; });
        if (!hasSelectedPermission) {
            console.log("You should at least select one permission.");
            return;
        }
        var selectedPermissions = Object.entries(newRole.permissions)
            .filter(function (_a) {
            var key = _a[0], value = _a[1];
            return value === true;
        })
            .map(function (_a) {
            var key = _a[0];
            return key;
        });
        console.log(newRole);
        mutate1({
            name: newRole.roleName,
            allowedActions: selectedPermissions,
            id: id,
        });
    };
    (0, react_1.useEffect)(function () {
        console.log(data1);
    }, [data1]);
    var _o = (0, useLocalStorage_1.default)(), hasPermissionToAddRole = _o.hasPermissionToAddRole, hasPermissionToDeleteRole = _o.hasPermissionToDeleteRole, hasPermissionToGetRoles = _o.hasPermissionToGetRoles, hasPermissionToUpdateRole = _o.hasPermissionToUpdateRole;
    var columns = (0, react_1.useMemo)(function () { return [
        {
            accessorKey: "name",
            header: "Role Name",
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            Cell: function (_a) {
                var cell = _a.cell;
                var date = new Date(cell.getValue());
                return date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            },
        },
        {
            accessorKey: "active",
            header: "Actions",
            enableSorting: false,
            Cell: function (_a) {
                var row = _a.row;
                return (<material_1.Box display="flex" alignItems="center">
            <material_1.Box sx={{
                        height: "max-content",
                        width: 150,
                        padding: 1,
                        backgroundColor: "hsl(34,34%,85%)",
                        whiteSpace: "nowrap",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "50px",
                    }}>
              <material_1.Switch checked={row.original.active} name="activeToggle" onClick={function () {
                        return handleToggle(row.original.id, row.original.active);
                    }} disabled={!hasPermissionToUpdateRole} sx={{
                        "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "#e57b0f",
                        },
                        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                            backgroundColor: "#e57b0f",
                        },
                        "& .MuiSwitch-switchBase": {
                            color: !row.original.active ? "red" : "#e57b0f",
                        },
                        "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                            backgroundColor: !row.original.active ? "red" : "#e57b0f",
                        },
                    }}/>

              <material_1.Typography sx={{
                        mr: 2,
                        color: row.original.active ? "#e57b0f" : "red",
                    }}>
                {row.original.active ? "Active" : "Inactive"}
              </material_1.Typography>
            </material_1.Box>
            <material_1.IconButton onClick={function () {
                        setDialogData(row.original);
                        setRoleId(row.original.id);
                        setTimeout(function () {
                            setIsEditing(true);
                        }, 700);
                    }} disabled={!hasPermissionToUpdateRole}>
              <Visibility_1.default />
            </material_1.IconButton>
            <material_1.IconButton onClick={function () { return handleDelete(row.original.id); }} disabled={!hasPermissionToDeleteRole}>
              <Delete_1.default />
            </material_1.IconButton>
          </material_1.Box>);
            },
        },
    ]; }, [hasPermissionToUpdateRole, hasPermissionToDeleteRole]);
    (0, react_1.useEffect)(function () {
        if (hasTyped) {
            var handle_1 = setTimeout(function () {
                var query = new URLSearchParams();
                if (globalSearch) {
                    query.set("globalSearch", globalSearch);
                }
                else {
                    query.delete("globalSearch");
                    setDel(true);
                    if (del) {
                        router.push("/dashboard/roles?".concat(query.toString()));
                    }
                }
                columnFilter.forEach(function (filter) {
                    if (filter.value) {
                        var key = filter.id.replace(".", "");
                        query.set(key, filter.value);
                    }
                    else {
                        var key = filter.id.replace(".", "");
                        query.delete(key);
                        setDel(true);
                        if (del) {
                            router.push("/dashboard/roles?".concat(query.toString()));
                        }
                    }
                });
                if (sorting.length > 0) {
                    var _a = sorting[0], id = _a.id, desc = _a.desc;
                    if (id) {
                        var sortByKey = id.replace(".", "");
                        query.set("sortBy", sortByKey);
                        query.set("sortOrder", desc ? "desc" : "asc");
                    }
                }
                else {
                    query.delete("sortBy");
                    query.delete("sortOrder");
                    setDel(true);
                    if (del) {
                        router.push("/dashboard/roles?".concat(query.toString()));
                    }
                }
                if (query.toString() !== "") {
                    router.push("/dashboard/roles?".concat(query.toString()));
                }
            }, 500);
            return function () { return clearTimeout(handle_1); };
        }
    }, [columnFilter, globalSearch, hasTyped, router, sorting]);
    var table = (0, material_react_table_1.useMaterialReactTable)({
        columns: columns,
        manualFiltering: true,
        manualSorting: true,
        data: data || [],
        onColumnFiltersChange: function (filters) {
            setHasTyped(true);
            setColumnFilter(filters);
        },
        onGlobalFilterChange: function (filters) {
            setHasTyped(true);
            setGlobalSearch(filters);
        },
        onSortingChange: function (sorting) {
            setHasTyped(true);
            setSorting(sorting);
        },
        renderTopToolbarCustomActions: function () { return (<material_1.Button onClick={function () { return setOpenAddDialog(true); }} variant="contained" color="primary" disabled={!hasPermissionToAddRole} sx={{ backgroundColor: "#e57b0f", color: "white" }}>
        Add New Role
      </material_1.Button>); },
        state: {
            //@ts-ignore
            columnFilter: columnFilter,
            sorting: sorting,
            globalSearch: globalSearch,
            isPending: isPending,
            showAlertBanner: isError,
            showProgressBars: isPending,
        },
    });
    return (<material_1.Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs_1.default />
      <material_1.Box sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f8f8f8",
            padding: 2,
        }}>
        <material_1.Box sx={{
            maxWidth: "100%",
            maxHeight: "calc(100% - 60px)",
            overflow: "auto",
            boxSizing: "border-box",
            backgroundColor: "white",
            borderRadius: "5px",
            padding: 2,
        }}>
          {hasPermissionToGetRoles && !loading ? (<material_1.Box sx={{
                width: "100%",
                maxHeight: "100%",
                overflow: "auto",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
            }}>
              <material_react_table_1.MaterialReactTable table={table}/>
            </material_1.Box>) : loading ? (<material_1.Box sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
            }}>
              <image_1.default loader={function (_a) {
                var src = _a.src;
                return src;
            }} width={30} loading="lazy" height={30} alt="loading" src="/spinner.svg"/>
            </material_1.Box>) : (<material_1.Box sx={{
                width: "100%",
                height: "100vh", // Full viewport height
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
            }}>
              <material_1.Typography>You don't have permission to see this</material_1.Typography>
            </material_1.Box>)}
        </material_1.Box>
      </material_1.Box>
      <Dialog_1.default newRole={newRole} isEditing={isEditing} setIsEditing={setIsEditing} setNewRole={setNewRole} openAddDialog={openAddDialog} setOpenAddDialog={setOpenAddDialog} handleAddNewRole={handleAddNewRole} roleId={roleId} setRoleId={setRoleId} data1={data1} isPending={isPending} handleEditData={handleEditData}/>
    </material_1.Box>);
}
