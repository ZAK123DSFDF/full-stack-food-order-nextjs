"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = QueryProvider;
var react_query_1 = require("@tanstack/react-query");
var react_1 = __importDefault(require("react"));
function QueryProvider(_a) {
    var children = _a.children;
    var queryClient = new react_query_1.QueryClient();
    return (<react_query_1.QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </react_query_1.QueryClientProvider>);
}
