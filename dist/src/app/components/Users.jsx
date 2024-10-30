"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Users;
var material_1 = require("@mui/material");
var react_1 = require("react");
var material_react_table_1 = require("material-react-table");
var Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
var BreadCrumbs_1 = __importDefault(require("./BreadCrumbs"));
var react_hook_form_1 = require("react-hook-form");
var react_query_1 = require("@tanstack/react-query");
var getAllServants_1 = require("../actions/user/getAllServants");
var activateServant_1 = require("../actions/user/activateServant");
var deactivateServant_1 = require("../actions/user/deactivateServant");
var deleteServant_1 = require("../actions/user/deleteServant");
var getAllActiveRoles_1 = require("../actions/role/getAllActiveRoles");
var createServant_1 = require("../actions/user/createServant");
var useLocalStorage_1 = __importDefault(require("@/utils/useLocalStorage"));
var navigation_1 = require("next/navigation");
var image_1 = __importDefault(require("next/image"));
function Users() {
    var _a = (0, react_1.useState)(false), dialogOpen = _a[0], setDialogOpen = _a[1];
    var _b = (0, react_1.useState)(null), userData = _b[0], setUserData = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var _d = (0, react_1.useState)(false), hasTyped = _d[0], setHasTyped = _d[1];
    var _e = (0, react_1.useState)(""), globalSearch = _e[0], setGlobalSearch = _e[1];
    var _f = (0, react_1.useState)([]), columnFilter = _f[0], setColumnFilter = _f[1];
    var _g = (0, react_1.useState)([]), sorting = _g[0], setSorting = _g[1];
    var _h = (0, react_1.useState)(false), del = _h[0], setDel = _h[1];
    var router = (0, navigation_1.useRouter)();
    var _j = (0, react_hook_form_1.useForm)({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            role: "",
            location: "",
        },
    }), handleSubmit = _j.handleSubmit, control = _j.control, reset = _j.reset, watch = _j.watch, errors = _j.formState.errors, trigger = _j.trigger;
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            setLoading(false);
        }, 500);
    }, []);
    var handleDialogOpen = function () { return setDialogOpen(true); };
    var handleDialogClose = function () {
        setDialogOpen(false);
        reset();
    };
    var queryClient = (0, react_query_1.useQueryClient)();
    var globalSearc = searchParams.get("globalSearch");
    var name = searchParams.get("name");
    var phoneNumber = searchParams.get("phoneNumber");
    var email = searchParams.get("email");
    var location = searchParams.get("location");
    var actions = searchParams.get("actions");
    var sortBy = searchParams.get("sortBy");
    var sortOrder = searchParams.get("sortOrder");
    var _k = (0, react_query_1.useQuery)({
        queryKey: [
            "allServants",
            globalSearc,
            name,
            phoneNumber,
            email,
            location,
            actions,
            sortBy,
            sortOrder,
        ],
        queryFn: function () {
            return (0, getAllServants_1.getAllServants)(globalSearc, name, phoneNumber, email, location, actions, sortBy, sortOrder);
        },
    }), data = _k.data, isPending = _k.isPending, isError = _k.isError;
    (0, react_1.useEffect)(function () {
        console.log(data);
    }, [data]);
    var addUser = (0, react_query_1.useMutation)({
        mutationFn: createServant_1.createServant,
        onSuccess: function (data) {
            console.log(data);
            handleDialogClose();
            //@ts-ignore
            queryClient.invalidateQueries(["allServants"]);
        },
    }).mutate;
    var activate = (0, react_query_1.useMutation)({
        mutationFn: activateServant_1.activateServant,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allServants"]);
        },
    }).mutate;
    var data1 = (0, react_query_1.useQuery)({
        queryKey: ["activeRoles"],
        queryFn: function () { return (0, getAllActiveRoles_1.getAllActiveRoles)(); },
        enabled: dialogOpen,
    }).data;
    (0, react_1.useEffect)(function () {
        console.log(data1);
    }, [data1]);
    var deactivate = (0, react_query_1.useMutation)({
        mutationFn: deactivateServant_1.deactivateServant,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allServants"]);
        },
    }).mutate;
    var deleteServant1 = (0, react_query_1.useMutation)({
        mutationFn: deleteServant_1.deleteServant,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["allServants"]);
        },
    }).mutate;
    var onSubmit = function (data) {
        addUser({
            name: data.name,
            email: data.email,
            password: data.password,
            phoneNumber: data.phoneNumber,
            location: data.location,
            servantRoleId: data.role,
        });
    };
    var handleClick = function (id, status) {
        if (status) {
            deactivate(id);
        }
        else {
            activate(id);
        }
    };
    var handleDelete = function (id) {
        deleteServant1(id);
    };
    var _l = (0, useLocalStorage_1.default)(), hasPermissionToViewUsers = _l.hasPermissionToViewUsers, hasPermissionToDeleteUser = _l.hasPermissionToDeleteUser, hasPermissionToAddUser = _l.hasPermissionToAddUser, hasPermissionToUpdateUser = _l.hasPermissionToUpdateUser;
    var columns = (0, react_1.useMemo)(function () { return [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone Number",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "location",
            header: "Location",
        },
        {
            accessorKey: "actions",
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
                        opacity: !hasPermissionToUpdateUser ? 0.5 : 1,
                    }}>
              <material_1.Switch checked={row.original.active} name="activeToggle" onClick={function () {
                        return hasPermissionToUpdateUser &&
                            handleClick(row.original.id, row.original.active);
                    }} disabled={!hasPermissionToUpdateUser} sx={{
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
            <material_1.IconButton onClick={function () { return handleDelete(row.original.id); }} disabled={!hasPermissionToDeleteUser} sx={{
                        color: !hasPermissionToDeleteUser ? "gray" : "inherit",
                        cursor: !hasPermissionToDeleteUser ? "not-allowed" : "pointer",
                    }}>
              <Delete_1.default />
            </material_1.IconButton>
          </material_1.Box>);
            },
        },
    ]; }, [hasPermissionToDeleteUser, hasPermissionToUpdateUser]);
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
                        router.push("/dashboard/users?".concat(query.toString()));
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
                            router.push("/dashboard/users?".concat(query.toString()));
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
                        router.push("/dashboard/users?".concat(query.toString()));
                    }
                }
                if (query.toString() !== "") {
                    router.push("/dashboard/users?".concat(query.toString()));
                }
            }, 500);
            return function () { return clearTimeout(handle_1); };
        }
    }, [columnFilter, globalSearch, hasTyped, router, sorting]);
    var table = (0, material_react_table_1.useMaterialReactTable)({
        columns: columns,
        data: data || [],
        manualFiltering: true,
        manualSorting: true,
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
        renderTopToolbarCustomActions: function () { return (<material_1.Box sx={{ padding: 2, textAlign: "center" }}>
        <material_1.Button variant="contained" color="primary" onClick={handleDialogOpen} disabled={!hasPermissionToAddUser} sx={{
                backgroundColor: !hasPermissionToAddUser ? "gray" : "#e57b0f",
                color: !hasPermissionToAddUser ? "#718096" : "white",
                cursor: !hasPermissionToAddUser ? "not-allowed" : "pointer",
            }}>
          Add New User
        </material_1.Button>
      </material_1.Box>); },
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
    var watchPassword = watch("password");
    return (<material_1.Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs_1.default />
      <material_1.Box sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#f8f8f8",
            padding: 2,
        }}>
        {hasPermissionToViewUsers && !loading ? (<material_1.Box sx={{
                maxWidth: "100%",
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
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
                minHeight: "100%",
            }}>
            <image_1.default loader={function (_a) {
                var src = _a.src;
                return src;
            }} loading="lazy" width={30} height={30} alt="loading" src="/spinner.svg"/>
          </material_1.Box>) : (<material_1.Box sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
                minHeight: "100%",
            }}>
            <material_1.Typography>you dont have permission to see this</material_1.Typography>
          </material_1.Box>)}
      </material_1.Box>

      {/* Dialog for Adding New User */}
      <material_1.Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <material_1.DialogTitle>Add New User</material_1.DialogTitle>
        <material_1.DialogContent>
          <material_1.Box id="userForm" component="form" display="flex" flexDirection="column" gap={2} onSubmit={handleSubmit(onSubmit)}>
            <react_hook_form_1.Controller name="name" control={control} rules={{ required: "Name is required" }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Name" fullWidth {...field} onBlur={function () { return trigger("name"); }} error={!!errors.name} helperText={(_b = errors.name) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <react_hook_form_1.Controller name="email" control={control} rules={{
            required: "Email is required",
            pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email address",
            },
        }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Email" fullWidth {...field} onBlur={function () { return trigger("email"); }} error={!!errors.email} helperText={(_b = errors.email) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <react_hook_form_1.Controller name="password" control={control} rules={{
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
            },
        }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Password" type="password" fullWidth {...field} onBlur={function () { return trigger("password"); }} error={!!errors.password} helperText={(_b = errors.password) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <react_hook_form_1.Controller name="confirmPassword" control={control} rules={{
            required: "Confirm Password is required",
            validate: function (value) {
                return value === watchPassword || "Passwords do not match";
            },
        }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Confirm Password" type="password" fullWidth {...field} onBlur={function () { return trigger("confirmPassword"); }} error={!!errors.confirmPassword} helperText={(_b = errors.confirmPassword) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <react_hook_form_1.Controller name="phoneNumber" control={control} rules={{ required: "Phone Number is required" }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Phone Number" fullWidth {...field} onBlur={function () { return trigger("phoneNumber"); }} error={!!errors.phoneNumber} helperText={(_b = errors.phoneNumber) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <react_hook_form_1.Controller name="location" control={control} rules={{ required: "Location is required" }} render={function (_a) {
            var _b;
            var field = _a.field;
            return (<material_1.TextField label="Location" fullWidth {...field} onBlur={function () { return trigger("location"); }} error={!!errors.location} helperText={(_b = errors.location) === null || _b === void 0 ? void 0 : _b.message}/>);
        }}/>
            <material_1.FormControl fullWidth error={!!errors.role}>
              <material_1.InputLabel id="role-select-label">Role</material_1.InputLabel>
              <react_hook_form_1.Controller name="role" control={control} rules={{ required: "Role is required" }} render={function (_a) {
            var field = _a.field;
            return (<material_1.Select labelId="role-select-label" fullWidth {...field} onBlur={function () { return trigger("role"); }}>
                    {data1 === null || data1 === void 0 ? void 0 : data1.map(function (role) { return (<material_1.MenuItem key={role.id} value={role.id}>
                        {role.name}
                      </material_1.MenuItem>); })}
                  </material_1.Select>);
        }}/>
              {errors.role && (<material_1.Typography variant="body2" color="error">
                  {errors.role.message}
                </material_1.Typography>)}
            </material_1.FormControl>
          </material_1.Box>
        </material_1.DialogContent>
        <material_1.DialogActions>
          <material_1.Button onClick={handleDialogClose} color="secondary" sx={{ color: "#e57b0f" }}>
            Cancel
          </material_1.Button>
          <material_1.Button type="submit" form="userForm" color="primary" variant="contained" sx={{ backgroundColor: "#e57b0f", color: "white" }}>
            Add User
          </material_1.Button>
        </material_1.DialogActions>
      </material_1.Dialog>
    </material_1.Box>);
}
