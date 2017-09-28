"use strict";

var _debounce = require("@workspace/components/widgets/annotation_editor/editors/debounce");

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.useFakeTimers();

/*
 * NOTE: Jest provides its own fake timers, use those with useFakeTimers
 * instead of using Jasmine's API!
 * https://facebook.github.io/jest/docs/timer-mocks.html
 */

describe("debounce", function () {
  it("calls the passed in function after a delay", function () {
    var _expect;

    var mockFn = jest.genMockFn();
    var args = ["value"];

    (0, _debounce2.default)(mockFn, args);
    jest.runAllTimers();

    expect(mockFn.mock.calls.length).toBe(1);
    (_expect = expect(mockFn)).toBeCalledWith.apply(_expect, args);
  });

  it("cancels pending function call when called again", function () {
    var _expect2;

    var mockFn = jest.genMockFn();
    var firstArgs = ["first value"];
    var finalArgs = ["final value"];

    (0, _debounce2.default)(mockFn, firstArgs);
    (0, _debounce2.default)(mockFn, finalArgs);
    jest.runAllTimers();

    expect(mockFn.mock.calls.length).toBe(1);
    (_expect2 = expect(mockFn)).toBeCalledWith.apply(_expect2, finalArgs);
  });
});
//# sourceMappingURL=debounce-test.js.map