"use strict";

var Draft = require.requireActual("draft-js");

var expectedURL = "http://url.com";

Draft.Entity = {
  get: function get() {
    return {
      getData: function getData() {
        return {
          url: expectedURL
        };
      }
    };
  }
};

Draft.mockURL = expectedURL;

module.exports = Draft;
//# sourceMappingURL=draft-js.js.map