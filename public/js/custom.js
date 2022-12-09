//Initially storing all the proucts

var products = [];
var filterProducts = [];

(function ($) {
  "use strict";

  $(function () {
    $("#tabs").tabs();
  });

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var box = $(".header-text").height();
    var header = $("header").height();

    if (scroll >= box - header) {
      $("header").addClass("background-header");
    } else {
      $("header").removeClass("background-header");
    }
  });

  $(".schedule-filter li").on("click", function () {
    var tsfilter = $(this).data("tsfilter");
    $(".schedule-filter li").removeClass("active");
    $(this).addClass("active");
    if (tsfilter == "all") {
      $(".schedule-table").removeClass("filtering");
      $(".ts-item").removeClass("show");
    } else {
      $(".schedule-table").addClass("filtering");
    }
    $(".ts-item").each(function () {
      $(this).removeClass("show");
      if ($(this).data("tsmeta") == tsfilter) {
        $(this).addClass("show");
      }
    });
  });

  // Window Resize Mobile Menu Fix
  mobileNav();

  // Scroll animation init
  window.sr = new scrollReveal();

  // Menu Dropdown Toggle
  if ($(".menu-trigger").length) {
    $(".menu-trigger").on("click", function () {
      $(this).toggleClass("active");
      $(".header-area .nav").slideToggle(200);
    });
  }




  $(document).ready(function () {

    //smoothscroll
    $('.scroll-to-section a[href^="#"]').on("click", function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $("a").each(function () {
        $(this).removeClass("active");
      });
      $(this).addClass("active");

      var target = this.hash,
        menu = target;
      var target = $(this.hash);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top + 1,
          },
          500,
          "swing",
          function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
          }
        );
    });


    //AJAX call to populate the products
    $.ajax(
      {
        method: 'GET',
        url: 'http://localhost:3000/products',
        success: function (response) {

          products = response;
          console.log(products);
          showProducts(products);
        }
      }
    )
  });

  // Page loading animation
  $(window).on("load", function () {
    $("#js-preloader").addClass("loaded");
  });

  // Window Resize Mobile Menu Fix
  $(window).on("resize", function () {
    mobileNav();
  });

  // Window Resize Mobile Menu Fix
  function mobileNav() {
    var width = $(window).width();
    $(".submenu").on("click", function () {
      if (width < 767) {
        $(".submenu ul").removeClass("active");
        $(this).find("ul").toggleClass("active");
      }
    });
  }
})(window.jQuery);


//Using fetchapi to get all the products
function showProducts(products) {

  document.getElementById("card").innerText = "";

  for (let i = 0; i < products.length; i++) {
    document.getElementById("card").innerHTML += `
    <div class="col-sm-12 col-md-6 col-lg-4 my-3">
    <div class="card h-100 text-center" style="width: 18rem;">
      <img src="${products[i].product_img[0]}" class="card-img-top h-100" alt="${products[i].category}" />
      <div class="card-body">
        <h5 class="card-title">${products[i].name}</h5>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    
    </div>
    `
  }
}

document.getElementById("product-search").addEventListener("keyup", function () {

  var text = document.getElementById('product-search').value;
  text = text.trim();
  filterProducts = products.filter(function (a) {

    let temp = a.name.toLowerCase();
    if (temp.includes(text.toLowerCase())) {
      return a;
    }
  });

  if (this.value == "") {
    document.getElementById("not-found").style.display = 'none';
    showProducts(products);
  }

  else {

    if (filterProducts.length === 0) {

      document.getElementById("not-found").style.display = 'block';
      document.getElementById("card").innerHTML = "";
    }

    else {

      showProducts(filterProducts);
      document.getElementById("not-found").style.display = 'none';
    }
  }

});


