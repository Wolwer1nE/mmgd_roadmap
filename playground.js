/**
 * Collection of 2D collision detection functions
 */

/**
 * Checks if two points are in the same location
 * @param {number} x1 - X coordinate of first point
 * @param {number} y1 - Y coordinate of first point
 * @param {number} x2 - X coordinate of second point
 * @param {number} y2 - Y coordinate of second point
 * @returns {boolean} True if points are in same location
 */
function pointPoint(x1, y1, x2, y2) {
    return x1 === x2 && y1 === y2;
}

/**
 * Checks if a point is inside a circle
 * @param {number} px - Point X coordinate
 * @param {number} py - Point Y coordinate
 * @param {number} cx - Circle center X coordinate
 * @param {number} cy - Circle center Y coordinate
 * @param {number} r - Circle radius
 * @returns {boolean} True if point is inside circle
 */
function pointCircle(px, py, cx, cy, r) {
    const distX = px - cx;
    const distY = py - cy;
    const distance = Math.sqrt((distX * distX) + (distY * distY));
    return distance <= r;
}

/**
 * Checks if two circles are colliding
 * @param {number} c1x - First circle center X
 * @param {number} c1y - First circle center Y
 * @param {number} c1r - First circle radius
 * @param {number} c2x - Second circle center X
 * @param {number} c2y - Second circle center Y
 * @param {number} c2r - Second circle radius
 * @returns {boolean} True if circles are colliding
 */
function circleCircle(c1x, c1y, c1r, c2x, c2y, c2r) {
    const distX = c1x - c2x;
    const distY = c1y - c2y;
    const distance = Math.sqrt((distX * distX) + (distY * distY));
    return distance <= c1r + c2r;
}

/**
 * Checks if a point is inside a rectangle
 * @param {number} px - Point X coordinate
 * @param {number} py - Point Y coordinate
 * @param {number} rx - Rectangle X coordinate (top-left)
 * @param {number} ry - Rectangle Y coordinate (top-left)
 * @param {number} rw - Rectangle width
 * @param {number} rh - Rectangle height
 * @returns {boolean} True if point is inside rectangle
 */
function pointRect(px, py, rx, ry, rw, rh) {
    return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh;
}

/**
 * Checks if two rectangles are colliding
 * @param {number} r1x - First rectangle X coordinate
 * @param {number} r1y - First rectangle Y coordinate
 * @param {number} r1w - First rectangle width
 * @param {number} r1h - First rectangle height
 * @param {number} r2x - Second rectangle X coordinate
 * @param {number} r2y - Second rectangle Y coordinate
 * @param {number} r2w - Second rectangle width
 * @param {number} r2h - Second rectangle height
 * @returns {boolean} True if rectangles are colliding
 */
function rectRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return r1x + r1w >= r2x && r1x <= r2x + r2w && r1y + r1h >= r2y && r1y <= r2y + r2h;
}

/**
 * Checks if a circle and rectangle are colliding
 * @param {number} cx - Circle center X
 * @param {number} cy - Circle center Y
 * @param {number} radius - Circle radius
 * @param {number} rx - Rectangle X coordinate
 * @param {number} ry - Rectangle Y coordinate
 * @param {number} rw - Rectangle width
 * @param {number} rh - Rectangle height
 * @returns {boolean} True if circle and rectangle are colliding
 */
function circleRect(cx, cy, radius, rx, ry, rw, rh) {
    let testX = cx;
    let testY = cy;

    // Find closest edge
    if (cx < rx) testX = rx;
    else if (cx > rx + rw) testX = rx + rw;
    if (cy < ry) testY = ry;
    else if (cy > ry + rh) testY = ry + rh;

    const distX = cx - testX;
    const distY = cy - testY;
    const distance = Math.sqrt((distX * distX) + (distY * distY));

    return distance <= radius;
}

/**
 * Calculate distance between two points
 * @param {number} x1 - First point X coordinate
 * @param {number} y1 - First point Y coordinate
 * @param {number} x2 - Second point X coordinate
 * @param {number} y2 - Second point Y coordinate
 * @returns {number} Distance between points
 */
function dist(x1, y1, x2, y2) {
    const distX = x2 - x1;
    const distY = y2 - y1;
    return Math.sqrt((distX * distX) + (distY * distY));
}

/**
 * Checks if a point is on a line segment
 * @param {number} x1 - Line start X coordinate
 * @param {number} y1 - Line start Y coordinate
 * @param {number} x2 - Line end X coordinate
 * @param {number} y2 - Line end Y coordinate
 * @param {number} px - Point X coordinate
 * @param {number} py - Point Y coordinate
 * @returns {boolean} True if point is on line segment
 */
function linePoint(x1, y1, x2, y2, px, py) {
    const d1 = dist(px, py, x1, y1);
    const d2 = dist(px, py, x2, y2);
    const lineLen = dist(x1, y1, x2, y2);
    const buffer = 0.1; // Higher number = less accurate collision detection

    return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer;
}

/**
 * Checks if a line segment and circle are colliding
 * @param {number} x1 - Line start X coordinate
 * @param {number} y1 - Line start Y coordinate
 * @param {number} x2 - Line end X coordinate
 * @param {number} y2 - Line end Y coordinate
 * @param {number} cx - Circle center X coordinate
 * @param {number} cy - Circle center Y coordinate
 * @param {number} r - Circle radius
 * @returns {boolean} True if line and circle are colliding
 */
function lineCircle(x1, y1, x2, y2, cx, cy, r) {
    // Check if either endpoint is inside the circle
    if (pointCircle(x1, y1, cx, cy, r) || pointCircle(x2, y2, cx, cy, r)) return true;

    const distX = x1 - x2;
    const distY = y1 - y2;
    const len = Math.sqrt((distX * distX) + (distY * distY));

    // Find point on line closest to circle center
    const dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / (len * len);
    const closestX = x1 + (dot * (x2 - x1));
    const closestY = y1 + (dot * (y2 - y1));

    if (!linePoint(x1, y1, x2, y2, closestX, closestY)) return false;

    const distance = dist(cx, cy, closestX, closestY);
    return distance <= r;
}

/**
 * Checks if two line segments intersect
 * @param {number} x1 - First line start X coordinate
 * @param {number} y1 - First line start Y coordinate
 * @param {number} x2 - First line end X coordinate
 * @param {number} y2 - First line end Y coordinate
 * @param {number} x3 - Second line start X coordinate
 * @param {number} y3 - Second line start Y coordinate
 * @param {number} x4 - Second line end X coordinate
 * @param {number} y4 - Second line end Y coordinate
 * @returns {boolean} True if lines intersect
 */
function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
        ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1;
}

/**
 * Checks if a line segment intersects with a rectangle
 * @param {number} x1 - Line start X coordinate
 * @param {number} y1 - Line start Y coordinate
 * @param {number} x2 - Line end X coordinate
 * @param {number} y2 - Line end Y coordinate
 * @param {number} rx - Rectangle X coordinate
 * @param {number} ry - Rectangle Y coordinate
 * @param {number} rw - Rectangle width
 * @param {number} rh - Rectangle height
 * @returns {boolean} True if line and rectangle intersect
 */
function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
    const left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
    const right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
    const top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
    const bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

    return left || right || top || bottom;
}

/**
 * Checks if a point is inside a polygon
 * @param {Array<{x: number, y: number}>} vertices - Array of polygon vertices
 * @param {number} px - Point X coordinate
 * @param {number} py - Point Y coordinate
 * @returns {boolean} True if point is inside polygon
 */
function polyPoint(vertices, px, py) {
    let collision = false;

    // Check each edge of the polygon
    for (let current = 0; current < vertices.length; current++) {
        let next = current + 1;
        if (next === vertices.length) next = 0;

        const vc = vertices[current];
        const vn = vertices[next];

        // Compare position and flip collision variable
        if (((vc.y >= py && vn.y < py) || (vc.y < py && vn.y >= py)) &&
            (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
            collision = !collision;
        }
    }

    return collision;
}

/**
 * Checks if a circle intersects with a polygon
 * @param {Array<{x: number, y: number}>} vertices - Array of polygon vertices
 * @param {number} cx - Circle center X coordinate
 * @param {number} cy - Circle center Y coordinate
 * @param {number} r - Circle radius
 * @returns {boolean} True if circle and polygon intersect
 */
function polyCircle(vertices, cx, cy, r) {
    // Check if circle intersects any polygon edge
    for (let current = 0; current < vertices.length; current++) {
        let next = current + 1;
        if (next === vertices.length) next = 0;

        const vc = vertices[current];
        const vn = vertices[next];

        if (lineCircle(vc.x, vc.y, vn.x, vn.y, cx, cy, r)) {
            return true;
        }
    }

    // Optional: Check if circle center is inside polygon
    // if (polyPoint(vertices, cx, cy)) return true;

    return false;
}

/**
 * Checks if two polygons intersect
 * @param {Array<{x: number, y: number}>} p1 - First polygon vertices
 * @param {Array<{x: number, y: number}>} p2 - Second polygon vertices
 * @returns {boolean} True if polygons intersect
 */
function polyPoly(p1, p2) {
    // Check if any edge of p1 intersects with p2
    for (let current = 0; current < p1.length; current++) {
        let next = current + 1;
        if (next === p1.length) next = 0;

        const vc = p1[current];
        const vn = p1[next];

        // Check for line intersection with polygon
        if (polyLine(p2, vc.x, vc.y, vn.x, vn.y)) return true;

        // Check if second polygon is inside first
        if (polyPoint(p1, p2[0].x, p2[0].y)) return true;
    }

    return false;
}

/**
 * Helper function: Checks if a line intersects with a polygon
 * @param {Array<{x: number, y: number}>} vertices - Polygon vertices
 * @param {number} x1 - Line start X coordinate
 * @param {number} y1 - Line start Y coordinate
 * @param {number} x2 - Line end X coordinate
 * @param {number} y2 - Line end Y coordinate
 * @returns {boolean} True if line and polygon intersect
 */
function polyLine(vertices, x1, y1, x2, y2) {
    // Check if line intersects with any polygon edge
    for (let current = 0; current < vertices.length; current++) {
        let next = current + 1;
        if (next === vertices.length) next = 0;

        const x3 = vertices[current].x;
        const y3 = vertices[current].y;
        const x4 = vertices[next].x;
        const y4 = vertices[next].y;

        if (lineLine(x1, y1, x2, y2, x3, y3, x4, y4)) {
            return true;
        }
    }
    return false;
}