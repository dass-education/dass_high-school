/* DASS HIGH SCHOOL FAQ
   details/summaryで開閉。JS無効でもFAQ本文は閲覧できます。 */

(function () {
  "use strict";

  var root = document.getElementById("dass-highschool-faq");
  if (!root) return;

  var items = Array.prototype.slice.call(
    root.querySelectorAll("details.dhfaq-item")
  );

  function openHashTarget() {
    var id;

    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch (error) {
      return;
    }

    var target = items.find(function (item) {
      return item.id === id;
    });

    if (target) {
      target.open = true;
    }
  }

  openHashTarget();
  window.addEventListener("hashchange", openHashTarget);

  var printState = null;

  window.addEventListener("beforeprint", function () {
    if (printState) return;

    printState = items.map(function (item) {
      return item.open;
    });

    items.forEach(function (item) {
      item.open = true;
    });
  });

  window.addEventListener("afterprint", function () {
    if (!printState) return;

    items.forEach(function (item, index) {
      item.open = printState[index];
    });

    printState = null;
  });
})();
