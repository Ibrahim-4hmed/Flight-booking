"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderSkeleton = renderSkeleton;

function renderSkeleton() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  var cards = arguments.length > 1 ? arguments[1] : undefined;
  var template = arguments.length > 2 ? arguments[2] : undefined;
  cards.innerHTML = "";

  for (var i = 0; i < count; i++) {
    cards.append(template.content.cloneNode(true));
  }
}