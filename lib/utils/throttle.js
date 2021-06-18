"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.throttle = void 0;
var throttle = function (func, delay) {
    var timerId = undefined;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timerId) {
            return;
        }
        timerId = setTimeout(function () {
            func.apply(void 0, args);
            timerId = undefined;
        }, delay);
    };
};
exports.throttle = throttle;
//# sourceMappingURL=throttle.js.map