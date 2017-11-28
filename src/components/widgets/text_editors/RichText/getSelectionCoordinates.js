/*
 * A small helper module for getting the coordinates of a DOM Selection object.
 */

const getSelectionRect = selection => {
    // We need a range to get a rect.
    if (!selection.rangeCount) {
        return null;
    }

    // Introduction to the Range objects:
    // http://www.quirksmode.org/dom/range_intro.html
    const range = selection.getRangeAt(0);

    // Collapse selection to end for consistent positioning
    range.collapse(false);

    /*
     * Safari/WebKit has a bug where getBoundingClientRect has incorrect results
     * I've consistently seen all measurements be 0 for Safari;
     * use getClientRects as a workaround. -@coopy
     * https://bugs.webkit.org/show_bug.cgi?id=46203
     */
    const boundingClientRect = range.getBoundingClientRect();
    const clientRect = range.getClientRects()[0];

    return (
        boundingClientRect.top > 0 ?
            boundingClientRect :
            clientRect
    );
};

const getscrollOffset = containerOffset => {
    if (typeof window.pageXOffset === 'number') {
        return {
            x: window.pageXOffset,
            y: containerOffset + window.pageYOffset
        };
    }

    if (typeof window.scrollX === 'number') {
        return {
            x: window.scrollX,
            y: containerOffset + window.scrollY
        };
    }

    return {x: 0, y: containerOffset};
};

/**
 * Get the {x, y} coordinates of a DOM Selection object,
 * relative to the viewport.
 *
 * @param {Selection} selection a DOM Selection object
 *        (i.e. from `window.getSelection()`)
 * @param {Number} containerOffset offset of the container
 *
 * @returns {Object} An object with x and y in pixels
 */
const getSelectionCoordinates = (selection, containerOffset) => {
    const scrollOffset = getscrollOffset(containerOffset);
    const coordinates = {x: scrollOffset.x, y: scrollOffset.y};

    if (!selection || !selection.anchorNode) {
        return coordinates;
    }

    const rect = getSelectionRect(selection);

    if (rect) {
        // Add to the offset
        coordinates.x += rect.left;
        coordinates.y += rect.top;
    }

    return coordinates;
};

export default getSelectionCoordinates;
