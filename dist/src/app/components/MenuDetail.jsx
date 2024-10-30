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
exports.default = MenuDetail;
var material_1 = require("@mui/material");
var lucide_react_1 = require("lucide-react");
var image_1 = __importDefault(require("next/image"));
var react_1 = require("react");
var Card_1 = __importDefault(require("./Card"));
var navigation_1 = require("next/navigation");
var react_query_1 = require("@tanstack/react-query");
var getSingleMenu_1 = require("../actions/menu/getSingleMenu");
var createOrder_1 = require("../actions/order/createOrder");
function MenuDetail(_a) {
    var _b;
    var data2 = _a.data;
    var params = (0, navigation_1.useParams)();
    var _c = (0, react_1.useState)(1), count = _c[0], setCount = _c[1];
    var data = (0, react_query_1.useQuery)({
        queryKey: ["singleMenu"],
        queryFn: function () { return (0, getSingleMenu_1.getSingleMenu)(params.id); },
    }).data;
    var _d = (0, react_1.useState)(""), selectedImage = _d[0], setSelectedImage = _d[1];
    var _e = (0, react_1.useState)([]), checkedToppings = _e[0], setCheckedToppings = _e[1];
    (0, react_1.useEffect)(function () {
        var _a;
        if (data) {
            setSelectedImage(data.Picture[0]);
            var initialChecked = ((_a = data.toppings) === null || _a === void 0 ? void 0 : _a.map(function () { return false; })) || [];
            setCheckedToppings(initialChecked);
        }
    }, [data]);
    var handleImageSelect = function (img) {
        setSelectedImage(img);
    };
    var handleToppingChange = function (index) {
        var updatedCheckedToppings = __spreadArray([], checkedToppings, true);
        updatedCheckedToppings[index] = !updatedCheckedToppings[index];
        setCheckedToppings(updatedCheckedToppings);
    };
    var _f = (0, react_1.useState)(false), open = _f[0], setOpen = _f[1];
    var handleClickOpen = function () { return setOpen(true); };
    var handleClose = function () { return setOpen(false); };
    var _g = (0, react_query_1.useMutation)({
        mutationFn: createOrder_1.createOrder,
        onSuccess: function (data) {
            console.log(data);
            handleClickOpen();
        },
    }), mutate = _g.mutate, isPending = _g.isPending;
    var handleOrder = function () {
        var _a;
        var selectedToppings = (_a = data === null || data === void 0 ? void 0 : data.toppings) === null || _a === void 0 ? void 0 : _a.filter(function (_, index) { return checkedToppings[index]; });
        mutate({ menuId: params.id, count: count, toppings: selectedToppings });
    };
    return (<material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100vw",
            height: "100vh",
            overflow: "scroll",
            backgroundColor: "#fff8f1",
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
      <material_1.Box sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "center" },
            justifyContent: { xs: "center", lg: "flex-start" },
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
            paddingY: 5,
            width: "100%",
            height: "100%",
        }}>
        {/* Large Image Box */}
        <material_1.Box sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            marginTop: { xs: 20, md: 20, lg: 0 },
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
        }}>
          {/* Main Image Box */}
          <material_1.Box sx={{
            minWidth: { xs: "250px", sm: "300px", md: "500px" },
            minHeight: { xs: "250px", sm: "300px", md: "500px" },
            position: "relative",
            overflow: "hidden",
            borderRadius: "10px",
            border: "2px solid #ddd",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: { md: 4 },
        }}>
            <image_1.default loader={function (_a) {
            var src = _a.src;
            return src;
        }} src={selectedImage} loading="lazy" alt="Selected" fill style={{ objectFit: "cover" }}/>
          </material_1.Box>

          {/* Thumbnails Box */}
          <material_1.Box sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column", md: "column" },
            gap: 2,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            overflowX: "hidden",
            overflowY: { xs: "auto", sm: "auto", md: "auto" },
            height: { xs: "auto", sm: "300px", md: "500px" },
            maxWidth: { xs: "100%", md: "200px" },
            marginTop: { md: 4 },
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
            {data === null || data === void 0 ? void 0 : data.Picture.map(function (img, index) { return (<material_1.Box key={index} sx={{
                minWidth: { xs: "100px", sm: "120px", md: "150px" },
                minHeight: { xs: "100px", sm: "120px", md: "150px" },
                maxHeight: { xs: "100px", sm: "120px", md: "150px" },
                maxWidth: { xs: "100px", sm: "120px", md: "150px" },
                cursor: "pointer",
                border: selectedImage === img ? "2px solid blue" : "2px solid #ddd",
                borderRadius: "5px",
                overflow: "hidden",
                transition: "border 0.3s ease",
            }} onClick={function () { return handleImageSelect(img); }}>
                <image_1.default src={img} loader={function (_a) {
                var src = _a.src;
                return src;
            }} alt={"Thumbnail ".concat(index + 1)} loading="lazy" width={80} height={80} style={{ objectFit: "cover", width: "100%", height: "100%" }}/>
              </material_1.Box>); })}
          </material_1.Box>
        </material_1.Box>

        {/* Toppings & Order Actions */}
        <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>
          <material_1.Typography sx={{ fontWeight: "bold", fontSize: 50 }}>
            {data === null || data === void 0 ? void 0 : data.name}
          </material_1.Typography>

          {/* Toppings Selection */}
          <material_1.Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
        }}>
            {(_b = data === null || data === void 0 ? void 0 : data.toppings) === null || _b === void 0 ? void 0 : _b.map(function (topping, index) { return (<material_1.FormControlLabel key={index} control={<material_1.Checkbox checked={checkedToppings[index] || false} onChange={function () { return handleToppingChange(index); }} size="medium" sx={{
                    color: "#e57b0f",
                    "&.Mui-checked": {
                        color: "#e57b0f",
                    },
                    "&.Mui-checked:hover": {
                        backgroundColor: "transparent",
                    },
                }}/>} label={<material_1.Typography sx={{ fontSize: "1.2rem" }}>
                    {" "}
                    {/* Adjust fontSize as needed */}
                    {topping}
                  </material_1.Typography>}/>); })}
          </material_1.Box>

          {/* Quantity and Price */}
          <material_1.Box sx={{ display: "flex", gap: 4, alignItems: "baseline" }}>
            <material_1.Box sx={{
            minWidth: 60,
            minHeight: 60,
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            border: "2px solid #e57b0f",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
        }} onClick={function () { return count > 1 && setCount(function (prev) { return prev - 1; }); }}>
              <lucide_react_1.Minus />
            </material_1.Box>
            <material_1.Typography sx={{ fontWeight: "bold", fontSize: 30 }}>
              {count}
            </material_1.Typography>
            <material_1.Box sx={{
            minWidth: 60,
            minHeight: 60,
            backgroundColor: "white",
            borderRadius: "5px",
            display: "flex",
            border: "2px solid #e57b0f",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
        }} onClick={function () { return setCount(function (prev) { return prev + 1; }); }}>
              <lucide_react_1.Plus />
            </material_1.Box>
            <material_1.Typography sx={{ fontWeight: "bold", color: "#e57b0f", fontSize: "3rem" }}>
              {data === null || data === void 0 ? void 0 : data.price}
              <material_1.Typography component="span" sx={{
            fontSize: "1rem",
            marginLeft: "4px",
            color: "black",
        }}>
                birr
              </material_1.Typography>
            </material_1.Typography>
          </material_1.Box>

          <material_1.Button sx={{
            alignSelf: "flex-start",
            backgroundColor: isPending ? "gray" : "#e57b0f",
            color: isPending ? "rgba(255, 255, 255, 0.5)" : "white",
            fontWeight: "bold",
            width: "100%",
            fontSize: 30,
            "&:hover": {
                backgroundColor: isPending ? "gray" : "#d96b0f",
            },
        }} onClick={handleOrder} disabled={isPending}>
            {isPending ? "ordering..." : "order"}
          </material_1.Button>
        </material_1.Box>
      </material_1.Box>

      {/* Related Section */}
      <material_1.Box sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: { xs: 20, sm: 30, md: 30, lg: 0 },
            gap: 2,
            backgroundColor: "#fff8f1",
            paddingX: { xs: 2, sm: 4, md: 6, lg: 10, xl: 12 },
        }}>
        <material_1.Typography sx={{ fontSize: 40, fontWeight: "regular", color: "#7f7c78" }}>
          Related
        </material_1.Typography>
        <material_1.Box sx={{
            display: "flex",
            gap: 2,
            width: "100%",
            justifyContent: "flex-start",
            overflow: "auto",
            marginBottom: 4,
            "&::-webkit-scrollbar": {
                width: "6px",
                height: "6px",
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            "&::-webkit-scrollbar-corner": {
                backgroundColor: "transparent",
            },
        }}>
          <Card_1.default mode="menuDetails" id={params.id} data2={data2}/>
        </material_1.Box>
      </material_1.Box>

      {/* Success Modal */}
      <material_1.Dialog open={open} onClose={handleClose} PaperProps={{
            sx: {
                borderRadius: "20px",
                overflow: "hidden",
            },
        }}>
        <material_1.DialogContent sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            gap: 4,
        }}>
          <material_1.Box sx={{
            width: 200,
            height: 200,
            backgroundColor: "#e6f9e6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <material_1.Box sx={{
            width: 120,
            height: 120,
            backgroundColor: "#05c605",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
              <lucide_react_1.Check color="white" size={100}/>
            </material_1.Box>
          </material_1.Box>
          <material_1.Typography sx={{
            fontSize: 25,
            textAlign: "center",
            color: "#05c605",
            fontWeight: "bold",
        }}>
            Your Order has been successfully completed!
          </material_1.Typography>
        </material_1.DialogContent>
      </material_1.Dialog>
    </material_1.Box>);
}
