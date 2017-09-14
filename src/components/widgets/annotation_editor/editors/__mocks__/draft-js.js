const Draft = require.requireActual("draft-js");

const expectedURL = "http://url.com";

Draft.Entity = {
  get: () => {
    return {
      getData: () => {
        return {
          url: expectedURL,
        };
      },
    };
  },
};

Draft.mockURL = expectedURL;

module.exports = Draft;
