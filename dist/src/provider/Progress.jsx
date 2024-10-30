"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNProgress = exports.NProgressProvider = void 0;
var react_1 = require("react");
var nprogress_1 = __importDefault(require("nprogress"));
require("nprogress/nprogress.css");
var navigation_1 = require("next/navigation");
var NProgressContext = (0, react_1.createContext)(undefined);
var NProgressProvider = function (_a) {
    var children = _a.children;
    var pathName = (0, navigation_1.usePathname)();
    nprogress_1.default.configure({ showSpinner: false });
    var startProgress = (0, react_1.useCallback)(function () {
        nprogress_1.default.start();
    }, []);
    var stopProgress = (0, react_1.useCallback)(function (path) {
        if (pathName === path) {
            nprogress_1.default.done();
        }
    }, [pathName]);
    (0, react_1.useEffect)(function () {
        stopProgress(pathName);
    }, [pathName]);
    return (<NProgressContext.Provider value={{ startProgress: startProgress, stopProgress: stopProgress }}>
      {children}
    </NProgressContext.Provider>);
};
exports.NProgressProvider = NProgressProvider;
var useNProgress = function () {
    var context = (0, react_1.useContext)(NProgressContext);
    if (!context) {
        throw new Error("useNProgress must be used within a NProgressProvider");
    }
    return context;
};
exports.useNProgress = useNProgress;
