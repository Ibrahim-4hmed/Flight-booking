"use strict";

function renderSkeleton() {
  var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  var cards = document.querySelector(".cards");
  cards.innerHTML = "";
  var template = document.getElementById("skeleton-template");

  for (var i = 0; i < count; i++) {
    cards.append(template.content.cloneNode(true));
  }
}