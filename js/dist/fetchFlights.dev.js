"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;

//fetch data from api 
function fetchData(url) {
  var response;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 5;
            break;
          }

          throw new Error("Failed to fetch flights");

        case 5:
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          return _context.abrupt("return", _context.sent);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}