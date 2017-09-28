"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _immutable = require("immutable");

var _UpgradeLink = require("@workspace/components/widgets/UpgradeLink");

var _UpgradeLink2 = _interopRequireDefault(_UpgradeLink);

var _enzyme = require("enzyme");

var _modal = require("@common/actions/modal");

var _requireAuthActionWrapper = require("@common/actions/requireAuthActionWrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock("../../../../common/actions/modal");
jest.mock("../../../../common/actions/requireAuthActionWrapper");

describe("dialogues", function () {
  describe("Upgrade Link", function () {
    function render() {
      var props = {
        plan: new _immutable.Map(),
        trackingProperties: {},
        dispatch: jest.fn()
      };

      return (0, _enzyme.mount)(_react2.default.createElement(_UpgradeLink2.default, props));
    }

    it("should open Subscription modal if user is logged in", function () {
      var wrapper = render();

      wrapper.ref("upgrade").simulate("click");
      expect(_modal.openModal).toBeCalled();
      expect(_requireAuthActionWrapper.requireAuthActionWrapper).toBeCalled();
    });
  });
});
//# sourceMappingURL=UpgradeLink-test.js.map