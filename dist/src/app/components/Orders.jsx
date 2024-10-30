"use strict";
"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Orders;
var material_1 = require("@mui/material");
var BreadCrumbs_1 = __importDefault(require("./BreadCrumbs"));
var Close_1 = __importDefault(require("@mui/icons-material/Close"));
var Radio_1 = __importDefault(require("@mui/material/Radio"));
var react_1 = require("react");
var material_react_table_1 = require("material-react-table");
var Visibility_1 = __importDefault(require("@mui/icons-material/Visibility"));
var react_query_1 = require("@tanstack/react-query");
var getRestaurantOrders_1 = require("../actions/order/getRestaurantOrders");
var updateOrder_1 = require("../actions/order/updateOrder");
var useLocalStorage_1 = __importDefault(require("@/utils/useLocalStorage"));
var navigation_1 = require("next/navigation");
var image_1 = __importDefault(require("next/image"));
var lucide_react_1 = require("lucide-react");
function Orders() {
    var _a = (0, react_1.useState)(null), dialogData = _a[0], setDialogData = _a[1];
    var searchParams = (0, navigation_1.useSearchParams)();
    var _b = (0, react_1.useState)(false), hasTyped = _b[0], setHasTyped = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(""), globalSearch = _d[0], setGlobalSearch = _d[1];
    var _e = (0, react_1.useState)([]), columnFilter = _e[0], setColumnFilter = _e[1];
    var _f = (0, react_1.useState)([]), sorting = _f[0], setSorting = _f[1];
    var _g = (0, react_1.useState)(false), del = _g[0], setDel = _g[1];
    var router = (0, navigation_1.useRouter)();
    var _h = (0, useLocalStorage_1.default)(), hasPermissionToViewOrders = _h.hasPermissionToViewOrders, hasPermissionToUpdateOrders = _h.hasPermissionToUpdateOrders;
    var globalSearc = searchParams.get("globalSearch");
    var menuName = searchParams.get("menuname");
    var menuPrice = searchParams.get("menuprice");
    var createdAt = searchParams.get("createdAt");
    var count = searchParams.get("count");
    var customerPhoneNumber = searchParams.get("customerphoneNumber");
    var customerName = searchParams.get("customername");
    var customerEmail = searchParams.get("customeremail");
    var customerLocation = searchParams.get("customerLocation");
    var orderStatus = searchParams.get("orderStatus");
    var sortBy = searchParams.get("sortBy");
    var sortOrder = searchParams.get("sortOrder");
    (0, react_1.useEffect)(function () {
        setTimeout(function () {
            setLoading(false);
        }, 500);
    });
    var toppingColors = [
        "#01c550",
        "#c50101",
        "#008000",
        "#008077",
        "#3f51b5",
        "#2196f3",
        "#03a9f4",
    ];
    var _j = (0, react_query_1.useQuery)({
        queryKey: [
            "orders",
            globalSearc,
            orderStatus,
            menuName,
            count,
            menuPrice,
            createdAt,
            customerName,
            customerEmail,
            customerPhoneNumber,
            customerLocation,
            sortBy,
            sortOrder,
        ],
        queryFn: function () {
            return (0, getRestaurantOrders_1.getRestaurantOrders)(globalSearc, orderStatus, menuName, count, menuPrice, createdAt, customerName, customerEmail, customerPhoneNumber, customerLocation, sortBy, sortOrder);
        },
    }), data1 = _j.data, isPending = _j.isPending, isError = _j.isError;
    (0, react_1.useEffect)(function () {
        console.log("this is orders", data1);
    }, [data1]);
    var _k = (0, react_1.useState)([]), orderData = _k[0], setOrderData = _k[1];
    var _l = (0, react_1.useState)([]), status = _l[0], setStatus = _l[1];
    var queryClient = (0, react_query_1.useQueryClient)();
    var mutate = (0, react_query_1.useMutation)({
        mutationFn: updateOrder_1.updateOrder,
        onSuccess: function (data) {
            console.log(data);
            //@ts-ignore
            queryClient.invalidateQueries(["orders"]);
        },
    }).mutate;
    var handleUpdate = function (id, status) {
        mutate({ id: id, status: status });
    };
    (0, react_1.useEffect)(function () {
        if (data1) {
            setOrderData(data1);
            console.log(orderData);
            setStatus(data1 === null || data1 === void 0 ? void 0 : data1.map(function (order) { return order.orderStatus || "PREPARING"; }));
        }
    }, [data1, orderData]);
    (0, react_1.useEffect)(function () {
        console.log(status);
    }, [status]);
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
                        router.push("/dashboard/orders?".concat(query.toString()));
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
                            router.push("/dashboard/orders?".concat(query.toString()));
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
                        router.push("/dashboard/orders?".concat(query.toString()));
                    }
                }
                if (query.toString() !== "") {
                    router.push("/dashboard/orders?".concat(query.toString()));
                }
            }, 500);
            return function () { return clearTimeout(handle_1); };
        }
    }, [columnFilter, globalSearch, hasTyped, router, sorting]);
    var columns = (0, react_1.useMemo)(function () {
        var baseColumns = [
            {
                accessorKey: "menu.name",
                header: "Pizza Name",
            },
            { accessorKey: "menu.price", header: "Price" },
            {
                accessorKey: "toppings",
                header: "Toppings",
                enableSorting: false,
                Cell: function (_a) {
                    var row = _a.row;
                    return (<material_1.Button variant="text" sx={{
                            color: "#e57b0f",
                            fontSize: "0.875rem",
                            display: "flex",
                            alignItems: "center",
                            textTransform: "none",
                        }}>
            <material_1.IconButton sx={{ color: "#e57b0f" }} onClick={function () { return setDialogData(row.original); }}>
              <Visibility_1.default />
            </material_1.IconButton>
            Toppings
          </material_1.Button>);
                },
            },
            {
                accessorKey: "count",
                header: "Quantity",
            },
            {
                accessorKey: "customer.phoneNumber",
                header: "Customer Phone",
            },
            {
                accessorKey: "customer.name",
                header: "Customer Name",
            },
            {
                accessorKey: "customer.email",
                header: "Customer Email",
            },
            {
                accessorKey: "customer.location",
                header: "Customer Location",
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
        ];
        if (hasPermissionToUpdateOrders) {
            baseColumns.push({
                accessorKey: "orderStatus",
                header: "Order Status",
                enableSorting: false,
                Cell: function (_a) {
                    var row = _a.row;
                    var rowIndex = row.index;
                    return (<material_1.FormControl fullWidth sx={{
                            "& .MuiInputLabel-root": {
                                textAlign: "right",
                                marginRight: "10px",
                            },
                        }}>
              {status[rowIndex] !== "DELIVERED" ? (<material_1.Select value={status[rowIndex] || row.original.orderStatus} onChange={function (e) {
                                var updatedStatus = __spreadArray([], status, true);
                                updatedStatus[rowIndex] = e.target.value;
                                setStatus(updatedStatus);
                                handleUpdate(row.original.id, updatedStatus[rowIndex]);
                            }} label="" displayEmpty renderValue={function (selected) { return (<span>
                      {selected.charAt(0) + selected.slice(1).toLowerCase()}
                    </span>); }} sx={{
                                backgroundColor: status[rowIndex] === "PREPARING"
                                    ? "orange"
                                    : status[rowIndex] === "READY"
                                        ? "darkgreen"
                                        : "inherit",
                                color: "#fff",
                                border: "none",
                                fontSize: "0.875rem",
                                "& .MuiSelect-select": {
                                    padding: "6px",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "white",
                                },
                            }}>
                  {["PREPARING", "READY", "DELIVERED"].map(function (value) { return (<material_1.MenuItem key={value} value={value} sx={{
                                    backgroundColor: "inherit",
                                    "&:hover": {
                                        backgroundColor: "inherit",
                                    },
                                    "&.Mui-selected": {
                                        backgroundColor: "inherit",
                                        "&:hover": {
                                            backgroundColor: "inherit",
                                        },
                                    },
                                }}>
                      {value.charAt(0) + value.slice(1).toLowerCase()}{" "}
                      <Radio_1.default checked={status[rowIndex] === value} sx={{
                                    marginLeft: "auto",
                                    color: "black",
                                    "&.Mui-checked": {
                                        color: "black",
                                    },
                                }}/>
                    </material_1.MenuItem>); })}
                </material_1.Select>) : (<material_1.Typography sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "#000",
                                gap: 2,
                                padding: "6px 0",
                                fontSize: "0.875rem",
                            }}>
                  <lucide_react_1.Check color="#008000"/>
                  <material_1.Typography sx={{ color: "#008000" }}>Delivered</material_1.Typography>
                </material_1.Typography>)}
            </material_1.FormControl>);
                },
            });
        }
        return baseColumns;
    }, [hasPermissionToUpdateOrders, status, handleUpdate]);
    var table = (0, material_react_table_1.useMaterialReactTable)({
        columns: columns,
        manualFiltering: true,
        manualSorting: true,
        data: orderData || [],
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
        renderTopToolbarCustomActions: function () { return (<material_1.Typography sx={{ fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}>
        Orders
      </material_1.Typography>); },
        enablePagination: false,
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
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: 2,
        }}>
          {hasPermissionToViewOrders && !loading ? (<material_1.Box sx={{
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
            }} loading="lazy" width={30} height={30} alt="loading" src="/spinner.svg"/>
            </material_1.Box>) : (<material_1.Box sx={{
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
              <material_1.Typography>You don't have permission to see this</material_1.Typography>
            </material_1.Box>)}
        </material_1.Box>
        <material_1.Dialog open={!!dialogData} onClose={function () { return setDialogData(null); }} aria-labelledby="pizza-details-dialog" fullWidth maxWidth="sm" sx={{
            "& .MuiDialog-paper": {
                backgroundColor: "background.paper",
                borderRadius: 2,
                boxShadow: 24,
                padding: 4,
            },
        }}>
          {dialogData && (<>
              <material_1.DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                position: "relative",
            }}>
                {/* Close Button */}
                <material_1.IconButton onClick={function () { return setDialogData(null); }} sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "transparent",
                border: "2px solid black",
                borderRadius: "50%",
                padding: "4px",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                },
            }}>
                  <Close_1.default sx={{ color: "black" }}/>
                </material_1.IconButton>
                <material_1.Typography sx={{ fontSize: 30, alignSelf: "center", fontWeight: "bold" }}>
                  Order Details
                </material_1.Typography>
                <material_1.Box sx={{ display: "flex", gap: 2 }}>
                  <material_1.Typography sx={{ color: "#808080" }}>Name:</material_1.Typography>
                  <material_1.Typography>{dialogData.menu.name}</material_1.Typography>
                </material_1.Box>
                <material_1.Box sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "flex-start",
            }}>
                  <material_1.Typography sx={{ color: "#808080" }}>Toppings:</material_1.Typography>
                  {dialogData.toppings.map(function (topping, index) { return (<material_1.Box key={topping} sx={{
                    padding: "4px 8px",
                    borderRadius: "9999px",
                    backgroundColor: toppingColors[index % toppingColors.length],
                    color: "white",
                }}>
                      {topping}
                    </material_1.Box>); })}
                </material_1.Box>
                <material_1.Box sx={{ display: "flex", gap: 2 }}>
                  <material_1.Typography sx={{ color: "#808080" }}>Count:</material_1.Typography>
                  <material_1.Typography>{dialogData.count}</material_1.Typography>
                </material_1.Box>
              </material_1.DialogContent>
            </>)}
        </material_1.Dialog>
      </material_1.Box>
    </material_1.Box>);
}
