/* =========================================================
   DASS HIGH SCHOOL - main.js
   必要最低限の Vanilla JS のみ:
   1) スマートフォン用ハンバーガーメニューの開閉
   2) アンカーリンクのスムーズスクロール（メニューは自動で閉じる）
   3) スクロール時の簡易フェードイン表示
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1) ハンバーガーメニュー ---------- */
  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("global-nav");

  function closeNav() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
  }

  function openNav() {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    /* ---------- 2) メニュー内リンクをクリックしたら閉じる ---------- */
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeNav();
      });
    });

    /* 画面幅が広がった時に開いたままにならないようにする */
    window.addEventListener("resize", function () {
      if (window.innerWidth > 680) {
        closeNav();
      }
    });
  }

  /* ---------- 3) スクロール時の簡易フェードイン表示 ---------- */
  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    /* 非対応ブラウザでは全て表示しておく */
    revealTargets.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  /* ---------- フッター: 年号を自動更新 ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
