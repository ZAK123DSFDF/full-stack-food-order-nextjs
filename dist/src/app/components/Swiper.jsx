"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("swiper/react");
var modules_1 = require("swiper/modules");
var modules_2 = require("swiper/modules");
require("swiper/css");
require("swiper/css/pagination");
require("swiper/css/autoplay");
var ScrollableData_1 = __importDefault(require("./ScrollableData"));
var SwiperComponent = function () {
    return (<react_2.Swiper modules={[modules_2.Pagination, modules_1.Autoplay]} spaceBetween={50} slidesPerView={1} autoplay={{ delay: 3000 }} pagination={{
            clickable: true,
            renderBullet: function (index, className) {
                return "<span class=\"".concat(className, "\" style=\"background-color: ").concat(className.includes("swiper-pagination-bullet-active")
                    ? "#e57b0f"
                    : "#808080", "; width: 12px; height: 12px; border-radius: 50%; margin: 0 4px;\"></span>");
            },
        }}>
      {/* Slide 1 */}
      <react_2.SwiperSlide>
        <ScrollableData_1.default color="#2f2f2f"/>
      </react_2.SwiperSlide>

      {/* Repeat SwiperSlides as needed */}
      <react_2.SwiperSlide>
        {/* Content for Slide 2 */}
        <ScrollableData_1.default color="#50482b"/>
        {/* Add similar content as the first slide, or new content */}
      </react_2.SwiperSlide>

      <react_2.SwiperSlide>
        {/* Content for Slide 3 */}
        <ScrollableData_1.default color="#296d60"/>
        {/* Add similar content as the first slide, or new content */}
      </react_2.SwiperSlide>
    </react_2.Swiper>);
};
exports.default = SwiperComponent;
