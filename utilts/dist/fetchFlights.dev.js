"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchData = fetchData;

//fetch data from api 
function fetchData(url) {
  var response, error;
  return regeneratorRuntime.async(function fetchData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch(url));

        case 2:
          response = _context.sent;

          if (response.ok) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          error = _context.sent;
          throw new Error(error.error);

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(response.json());

        case 10:
          return _context.abrupt("return", _context.sent);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  });
}