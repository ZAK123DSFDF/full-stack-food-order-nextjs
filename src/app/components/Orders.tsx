"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import BreadCrumbs from "./BreadCrumbs";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Radio from "@mui/material/Radio";
import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ColumnFiltersState,
  MRT_SortingState,
  useMaterialReactTable,
} from "material-react-table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRestaurantOrders } from "../actions/order/getRestaurantOrders";
import { updateOrder } from "../actions/order/updateOrder";
import useLocalStorage from "@/utils/useLocalStorage";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Check, CheckCircleIcon } from "lucide-react";

export default function Orders() {
  const [dialogData, setDialogData] = useState<any>(null);
  const searchParams = useSearchParams();
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [columnFilter, setColumnFilter] = useState<MRT_ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [del, setDel] = useState(false);
  const router = useRouter();
  const { hasPermissionToViewOrders, hasPermissionToUpdateOrders } =
    useLocalStorage();
  const globalSearc = searchParams.get("globalSearch");
  const menuName = searchParams.get("menuname");
  const menuPrice = searchParams.get("menuprice");
  const createdAt = searchParams.get("createdAt");
  const count = searchParams.get("count");
  const customerPhoneNumber = searchParams.get("customerphoneNumber");
  const customerName = searchParams.get("customername");
  const customerEmail = searchParams.get("customeremail");
  const customerLocation = searchParams.get("customerLocation");
  const orderStatus = searchParams.get("orderStatus");
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  });
  const toppingColors = [
    "#01c550",
    "#c50101",
    "#008000",
    "#008077",
    "#3f51b5",
    "#2196f3",
    "#03a9f4",
  ];
  const {
    data: data1,
    isPending,
    isError,
  } = useQuery({
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
    queryFn: () =>
      getRestaurantOrders(
        globalSearc as string,
        orderStatus as string,
        menuName as string,
        count as string,
        menuPrice as string,
        createdAt as string,
        customerName as string,
        customerEmail as string,
        customerPhoneNumber as string,
        customerLocation as string,
        sortBy as string,
        sortOrder as string
      ),
  });
  useEffect(() => {
    console.log("this is orders", data1);
  }, [data1]);
  const [orderData, setOrderData] = useState<any>([]);
  const [status, setStatus] = useState<any>([]);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateOrder,
    onSuccess: (data) => {
      console.log(data);
      //@ts-ignore
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const handleUpdate = (id: any, status: any) => {
    mutate({ id, status });
  };
  useEffect(() => {
    if (data1) {
      setOrderData(data1);
      console.log(orderData);
      setStatus(data1?.map((order: any) => order.orderStatus || "PREPARING"));
    }
  }, [data1, orderData]);
  useEffect(() => {
    console.log(status);
  }, [status]);
  useEffect(() => {
    if (hasTyped) {
      const handle = setTimeout(() => {
        const query = new URLSearchParams();
        if (globalSearch) {
          query.set("globalSearch", globalSearch);
        } else {
          query.delete("globalSearch");
          setDel(true);
          if (del) {
            router.push(`/dashboard/orders?${query.toString()}`);
          }
        }
        columnFilter.forEach((filter) => {
          if (filter.value) {
            const key = filter.id.replace(".", "");
            query.set(key, filter.value as string);
          } else {
            const key = filter.id.replace(".", "");
            query.delete(key);
            setDel(true);
            if (del) {
              router.push(`/dashboard/orders?${query.toString()}`);
            }
          }
        });
        if (sorting.length > 0) {
          const { id, desc } = sorting[0];
          if (id) {
            const sortByKey = id.replace(".", "");
            query.set("sortBy", sortByKey);
            query.set("sortOrder", desc ? "desc" : "asc");
          }
        } else {
          query.delete("sortBy");
          query.delete("sortOrder");
          setDel(true);
          if (del) {
            router.push(`/dashboard/orders?${query.toString()}`);
          }
        }

        if (query.toString() !== "") {
          router.push(`/dashboard/orders?${query.toString()}`);
        }
      }, 500);

      return () => clearTimeout(handle);
    }
  }, [columnFilter, globalSearch, hasTyped, router, sorting]);
  const columns = useMemo(() => {
    const baseColumns = [
      {
        accessorKey: "menu.name",
        header: "Pizza Name",
      },
      { accessorKey: "menu.price", header: "Price" },
      {
        accessorKey: "toppings",
        header: "Toppings",
        enableSorting: false,
        Cell: ({ row }: any) => (
          <Button
            variant="text"
            sx={{
              color: "#e57b0f",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              textTransform: "none",
            }}
          >
            <IconButton
              sx={{ color: "#e57b0f" }}
              onClick={() => setDialogData(row.original)}
            >
              <VisibilityIcon />
            </IconButton>
            Toppings
          </Button>
        ),
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
        Cell: ({ cell }: any) => {
          const date = new Date(cell.getValue());
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
        Cell: ({ row }: any) => {
          const rowIndex = row.index;
          return (
            <FormControl
              fullWidth
              sx={{
                "& .MuiInputLabel-root": {
                  textAlign: "right",
                  marginRight: "10px",
                },
              }}
            >
              {status[rowIndex] !== "DELIVERED" ? (
                <Select
                  value={status[rowIndex] || row.original.orderStatus}
                  onChange={(e) => {
                    const updatedStatus = [...status];
                    updatedStatus[rowIndex] = e.target.value;
                    setStatus(updatedStatus);
                    handleUpdate(row.original.id, updatedStatus[rowIndex]);
                  }}
                  label=""
                  displayEmpty
                  renderValue={(selected) => (
                    <span>
                      {selected.charAt(0) + selected.slice(1).toLowerCase()}
                    </span>
                  )}
                  sx={{
                    backgroundColor:
                      status[rowIndex] === "PREPARING"
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
                  }}
                >
                  {["PREPARING", "READY", "DELIVERED"].map((value) => (
                    <MenuItem
                      key={value}
                      value={value}
                      sx={{
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
                      }}
                    >
                      {value.charAt(0) + value.slice(1).toLowerCase()}{" "}
                      <Radio
                        checked={status[rowIndex] === value}
                        sx={{
                          marginLeft: "auto",
                          color: "black",
                          "&.Mui-checked": {
                            color: "black",
                          },
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              ) : (
                <Typography
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "#000",
                    gap: 2,
                    padding: "6px 0",
                    fontSize: "0.875rem",
                  }}
                >
                  <Check color="#008000" />
                  <Typography sx={{ color: "#008000" }}>Delivered</Typography>
                </Typography>
              )}
            </FormControl>
          );
        },
      });
    }

    return baseColumns;
  }, [hasPermissionToUpdateOrders, status, handleUpdate]);
  const table = useMaterialReactTable({
    columns,
    manualFiltering: true,
    manualSorting: true,
    data: orderData || [],
    onColumnFiltersChange: (filters) => {
      setHasTyped(true);
      setColumnFilter(filters);
    },
    onGlobalFilterChange: (filters) => {
      setHasTyped(true);
      setGlobalSearch(filters);
    },
    onSortingChange: (sorting) => {
      setHasTyped(true);
      setSorting(sorting);
    },
    renderTopToolbarCustomActions: () => (
      <Typography
        sx={{ fontWeight: "bold", fontSize: "15px", marginLeft: "5px" }}
      >
        Orders
      </Typography>
    ),
    enablePagination: false,
    state: {
      //@ts-ignore
      columnFilter,
      sorting,
      globalSearch,
      isPending,
      showAlertBanner: isError,
      showProgressBars: isPending,
    },
  });
  return (
    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <BreadCrumbs />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f8f8f8",
          padding: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            maxHeight: "calc(100% - 60px)",
            overflow: "auto",
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
            padding: 2,
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              borderRadius: "0",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
              backgroundColor: "transparent",
            },
          }}
        >
          {hasPermissionToViewOrders && !loading ? (
            <Box
              sx={{
                width: "100%",
                maxHeight: "100%",
                overflow: "auto",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <MaterialReactTable table={table} />
            </Box>
          ) : loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <Image
                loader={({ src }) => {
                  return src;
                }}
                loading="lazy"
                width={30}
                height={30}
                alt="loading"
                src="/spinner.svg"
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                boxSizing: "border-box",
                backgroundColor: "white",
                borderRadius: "5px",
                padding: 2,
              }}
            >
              <Typography>You don't have permission to see this</Typography>
            </Box>
          )}
        </Box>
        <Dialog
          open={!!dialogData}
          onClose={() => setDialogData(null)}
          aria-labelledby="pizza-details-dialog"
          fullWidth
          maxWidth="sm"
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              padding: 4,
            },
          }}
        >
          {dialogData && (
            <>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                  position: "relative",
                }}
              >
                {/* Close Button */}
                <IconButton
                  onClick={() => setDialogData(null)}
                  sx={{
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
                  }}
                >
                  <CloseIcon sx={{ color: "black" }} />
                </IconButton>
                <Typography
                  sx={{ fontSize: 30, alignSelf: "center", fontWeight: "bold" }}
                >
                  Order Details
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={{ color: "#808080" }}>Name:</Typography>
                  <Typography>{dialogData.menu.name}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <Typography sx={{ color: "#808080" }}>Toppings:</Typography>
                  {dialogData.toppings.map((topping: any, index: any) => (
                    <Box
                      key={topping}
                      sx={{
                        padding: "4px 8px",
                        borderRadius: "9999px",
                        backgroundColor:
                          toppingColors[index % toppingColors.length],
                        color: "white",
                      }}
                    >
                      {topping}
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Typography sx={{ color: "#808080" }}>Count:</Typography>
                  <Typography>{dialogData.count}</Typography>
                </Box>
              </DialogContent>
            </>
          )}
        </Dialog>
      </Box>
    </Box>
  );
}
