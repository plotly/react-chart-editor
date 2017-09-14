import debounce from "@workspace/components/widgets/annotation_editor/editors/debounce";
jest.useFakeTimers();

/*
 * NOTE: Jest provides its own fake timers, use those with useFakeTimers
 * instead of using Jasmine's API!
 * https://facebook.github.io/jest/docs/timer-mocks.html
 */

describe("debounce", () => {
  it("calls the passed in function after a delay", () => {
    const mockFn = jest.genMockFn();
    const args = ["value"];

    debounce(mockFn, args);
    jest.runAllTimers();

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn).toBeCalledWith(...args);
  });

  it("cancels pending function call when called again", () => {
    const mockFn = jest.genMockFn();
    const firstArgs = ["first value"];
    const finalArgs = ["final value"];

    debounce(mockFn, firstArgs);
    debounce(mockFn, finalArgs);
    jest.runAllTimers();

    expect(mockFn.mock.calls.length).toBe(1);
    expect(mockFn).toBeCalledWith(...finalArgs);
  });
});
