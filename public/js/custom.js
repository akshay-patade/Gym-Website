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

  //Date of Birth Datepicker
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  $("#dob").attr("max", today);

  //Email ID validation
  // $(".error").hide();
  // $(".emailID").on("change", function () {
  //   var email = $(this).val();
  //   var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
  //   if (!email.match(mailformat)) {
  //     $(this).next().text("Please Enter Valid Email ID.");
  //     $(this).next().show();
  //   } else {
  //     $(this).next().text("");
  //     $(this).next().hide();
  //   }
  // });

  //Firstname and Lastname validation
  $("#firstname").on("change", function () {
    var value = $(this).val();
    var res = /^[a-zA-Z]+$/.test(value);
    // console.log(res);
    if (res === false) {
      $(this).next().text("Please Enter Valid Firstname");
      $(this).next().show();
    } else {
      $(this).next().text("");
      $(this).next().hide();
    }
  });
  $("#lastname").on("change", function () {
    var value = $(this).val();
    var res = /^[a-zA-Z]+$/.test(value);
    // console.log(res);
    if (res === false) {
      $(this).next().text("Please Enter Valid Lastname");
      $(this).next().show();
    } else {
      $(this).next().text("");
      $(this).next().hide();
    }
  });

  //Register Form Validations
  $("#registerForm").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      address: "required",
      gender: "required",
      dob: "required",

      zipcode: {
        required: true,
        number: true,
      },
      email: {
        required: true,
        email: true,
      },
      cell: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10,
      },
      password: {
        required: true,
        minlength: 8,
      },
      cpassword: {
        required: true,
        minlength: 8,
        equalTo: "#password",
      },
    },

    messages: {
      firstname: "Please enter your firstname",
      lastname: "Please enter your lastname",
      address: "Please enter your address",
      gender: "This field is required",
      dob: "This field is required",
      zipcode: {
        required: "Please enter your zipcode",
        number: "Please enter numeric value",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
      },
      cpassword: {
        required: "Please enter Confirm Password",
        minlength: "Your Confirm Password must be at least 8 characters long",
        equalTo: "Confirm Password must match with Password",
      },
      email: {
        required: "Please provide an email",
        minlength: "Please enter a valid email address",
      },
      cell: {
        required: "Please Enter Cell Number",
        number: "Please Enter Numeric value",
        minlength: "Cell number must be minimum of 10 digits",
        maxlength: "Cell number can be maximum of 10 digits",
      },
    },

    submitHandler: function (form) {
      form.submit();
    },
  });

  //Login Form Validations
  $("#loginForm").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 8,
      },
    },
    messages: {
      email: {
        required: "Please provide an email",
        minlength: "Please enter a valid email address",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
      },
    },
    submitHandler: function (form) {
      form.submit();
    },
  });

  //Forgot Password with Ajax
  $(document).ready(function () {
    $("#forgotPasswordForm").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        email: {
          required: "Please provide an email",
          minlength: "Please enter a valid email address",
        },
      },
    });

    $("#forgotPasswordForm").submit(function (event) {
      var formData = {
        email: $("#email").val(),
      };
      $.ajax({
        type: "POST",
        url: "http://localhost:3000/forgotPassword",
        data: formData,
        dataType: "json",
        encode: true,
      });
    });
  });

  $(document).ready(function () {
    // $(document).on("scroll", onScroll);

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
  });

  // function onScroll(event) {
  //   var scrollPos = $(document).scrollTop();
  //   $(".nav a").each(function () {
  //     var currLink = $(this);
  //     var refElement = $(currLink.attr("href"));
  //     if (
  //       refElement.position().top <= scrollPos &&
  //       refElement.position().top + refElement.height() > scrollPos
  //     ) {
  //       $(".nav ul li a").removeClass("active");
  //       currLink.addClass("active");
  //     } else {
  //       currLink.removeClass("active");
  //     }
  //   });
  // }

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

//Sorting the products by date or price
if (document.querySelector('input[name="filter_by_price"]')) {
  document.querySelectorAll('input[name="filter_by_price"]').forEach((elem) => {
    elem.addEventListener("change", function (event) {
      var item = event.target.value;
      if (item == "price_low_to_high") {
        products.sort(function (a, b) {
          return a.price - b.price;
        });

        showProducts(products);
      } else if (item == "price_high_to_low") {
        products.sort(function (a, b) {
          return b.price - a.price;
        });

        showProducts(products);
      } else if (item == "date_low_to_high") {
        products.sort(function (a, b) {
          return new moment(a.date, "MM/DD/YYYY").diff(
            moment(b.date, "MM/DD/YYYY"),
            "days"
          );
        });

        showProducts(products);
      } else if (item == "date_high_to_low") {
        products.sort(function (a, b) {
          return new moment(b.date, "MM/DD/YYYY").diff(
            moment(a.date, "MM/DD/YYYY"),
            "days"
          );
        });
        showProducts(products);
      }
    });
  });
}
