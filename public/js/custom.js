(function ($) {
  "use strict";

  $(function () {
    $("#tabs").tabs();
  });

  $(".like").on("click", function (e) {

    var temp = $(".like").attr('id');
    temp = temp.split('-');

    var like = '#' + $(".like").attr('id');
    var dislike = '#' + temp[0] + '-dislike';
    var commentId = temp[0];

    e.preventDefault();

    //Check if the user is logged in
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/isLoggedIn",
    }).done(function (response) {
      if (response.status) {

        $.ajax({

          type: "POST",
          url: "http://localhost:3000/products/addLike",
          data: JSON.stringify({ commentId: commentId }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        }).done(function (response) {

          if (response.result.like) {
            $(like).removeClass("icon-background-color");
            $(like).addClass("thumbsup-enabled");
          }
          else {
            $(like).addClass("icon-background-color");
            $(like).removeClass("thumbsup-enabled");
          }

          $(dislike).addClass("icon-background-color");
          $(dislike).removeClass("thumbsdown-enabled");
        });

      }
      else {
        alert("User must be logged in to drop a like")
      }
    });
  });

  $(".dislike").on("click", function (e) {

    var temp = $(".dislike").attr('id');
    temp = temp.split('-');

    var dislike = '#' + $(".dislike").attr('id');
    var like = '#' + temp[0] + '-like';
    var commentId = temp[0];

    e.preventDefault();

    //Check if the user is logged in
    $.ajax({
      type: "GET",
      url: "http://localhost:3000/isLoggedIn",
    }).done(function (response) {

      if (response.status) {

        $.ajax({

          type: "POST",
          url: "http://localhost:3000/products/addDislike",
          data: JSON.stringify({ commentId: commentId }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
        }).done(function (response) {

          if (response.result.dislike) {
            $(dislike).removeClass("icon-background-color");
            $(dislike).addClass("thumbsdown-enabled");
          }
          else {
            $(dislike).addClass("icon-background-color");
            $(dislike).removeClass("thumbsdown-enabled");
          }

          $(like).addClass("icon-background-color");
          $(like).removeClass("thumbsup-enabled");
        });
      }
      else {
        alert("User must be logged in to drop a dislike")
      }
    });
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

  //Add regax As Method
  $.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    },
    "Please check your input."
  );

  function AgeMustBe12(dateString) {
    const dob = new Date(dateString);

    const dobPlus12 = new Date(
      dob.getFullYear() + 12,
      dob.getMonth(),
      dob.getDate() + 1
    );
    // console.log(dobPlus12.valueOf() <= Date.now());
    return dobPlus12.valueOf() <= Date.now();
  }

  //Date of Birth Datepicker
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;
  $("#dob").attr("max", today);

  //Register Form Validations
  $("#registerForm").validate({
    rules: {
      firstname: {
        required: true,
        regex: /^[a-zA-Z]+$/,
      },
      lastname: {
        required: true,
        regex: /^[a-zA-Z]+$/,
      },
      address: "required",
      gender: "required",
      dob: {
        required: true,
      },
      zipcode: {
        required: true,
        regex: /^\d{5}(-\d{4})?$/,
      },
      email: {
        required: true,
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      cell: {
        required: true,
        regex: /^[0]?[0-9]\d{9}$/,
      },
      password: {
        required: true,
        minlength: 8,
        regex: /^[A-Za-z0-9\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
      },
      cpassword: {
        required: true,
        minlength: 8,
        regex: /^[A-Za-z0-9\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
        equalTo: "#password",
      },
    },

    messages: {
      firstname: {
        required: "Please enter your firstname",
        regex:
          "Please enter valid firstname (No space or numeric values allowed, one word only)",
      },
      lastname: {
        required: "Please enter your lastname",
        regex:
          "Please enter valid lastname (No space or numeric values allowed, one word only)",
      },
      address: "Please enter your address",
      gender: "Please Select Gender",
      dob: {
        required: "Please Select Date of Birth",
      },
      zipcode: {
        required: "Please enter your zipcode",
        regex: "Please enter valid zipcode",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
        regex: "Password must not include whitespace",
      },
      cpassword: {
        required: "Please enter Confirm Password",
        minlength: "Your Confirm Password must be at least 8 characters long",
        regex: "Password must not include whitespace",
        equalTo: "Confirm Password must match with Password",
      },
      email: {
        required: "Please provide an email",
        regex: "Please enter a valid email address",
      },
      cell: {
        required: "Please Enter Cell Number",
        regex: "Please Enter valid Cell Number",
      },
    },

    submitHandler: function (form) {
      console.log(AgeMustBe12($("#dob").val()));
      if (AgeMustBe12($("#dob").val()) === true) {
        form.submit();
      } else {
        $("#AgeErr").append(
          '<label id="dob-age-error" class="error" for="dob">Minimum age to register is 12</label>'
        );
      }
    },
  });

  //Login Form Validations
  $("#loginForm").validate({
    rules: {
      email: {
        required: true,
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      password: {
        required: true,
        minlength: 8,
        regex: /^[A-Za-z0-9\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
      },
    },
    messages: {
      email: {
        required: "Please provide an email",
        regex: "Please enter a valid email address",
      },
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
        regex: "Password must not include whitespace",
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
          regex:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        },
      },
      messages: {
        email: {
          required: "Please provide an email",
          regex: "Please enter a valid email address",
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

  //Profile Form
  $("#ProfileForm #email").prop("disabled", true);
  //ProfileForm
  let date_dob = new Date($("#ProfileForm #hiddendobVal").val());
  let final_dob =
    date_dob.getFullYear() +
    "-" +
    String(date_dob.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date_dob.getDate()).padStart(2, "0");

  $("#ProfileForm .ChooseImg").hide();
  $("#ProfileForm #ChangeImg").on("click", function () {
    $("#ProfileForm .ChooseImg").click();
  });
  $("#ProfileForm #RemoveImg").on("click", function () {
    $("#ProfileForm #CurrImg").val("");
    $(this).prop("disabled", true);
    $("#ProfileForm #currentImage").attr(
      "src",
      "/public/images/UserProfile/blank.webp"
    );
  });

  if ($("#ProfileForm #CurrImg").val() === "") {
    $("#ProfileForm #RemoveImg").prop("disabled", true);
  }

  $("#ProfileForm #gender").val($("#ProfileForm #hiddenGenderVal").val());
  $("#ProfileForm #dob").val(final_dob);
  $("#ProfileForm").validate({
    rules: {
      firstname: {
        required: true,
        regex: /^[a-zA-Z]+$/,
      },
      lastname: {
        required: true,
        regex: /^[a-zA-Z]+$/,
      },
      address: "required",
      gender: "required",
      dob: {
        required: true,
      },
      zipcode: {
        required: true,
        regex: /^\d{5}(-\d{4})?$/,
      },
      email: {
        required: true,
        regex:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      },
      cell: {
        required: true,
        regex: /^[0]?[0-9]\d{9}$/,
      },
      new_password: {
        minlength: 8,
        regex: /^[A-Za-z0-9\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
      },
      cnew_password: {
        required: function () {
          if ($("#new_password").val() != "") {
            return true;
          } else {
            return false;
          }
        },
        minlength: 8,
        regex: /^[A-Za-z0-9\`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/,
        equalTo: "#new_password",
      },
    },

    messages: {
      firstname: {
        required: "Please enter your firstname",
        regex:
          "Please enter valid firstname (No space or numeric values allowed, one word only)",
      },
      lastname: {
        required: "Please enter your lastname",
        regex:
          "Please enter valid lastname (No space or numeric values allowed, one word only)",
      },
      address: "Please enter your address",
      gender: "Please Select Gender",
      dob: {
        required: "Please Select Date of Birth",
      },
      zipcode: {
        required: "Please enter your zipcode",
        regex: "Please enter valid zipcode",
      },
      new_password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 8 characters long",
        regex: "Password must not include whitespace",
      },
      cnew_password: {
        required: "Please enter Confirm Password",
        minlength: "Your Confirm Password must be at least 8 characters long",
        regex: "Password must not include whitespace",
        equalTo: "Confirm Password must match with Password",
      },
      email: {
        required: "Please provide an email",
        regex: "Please enter a valid email address",
      },
      cell: {
        required: "Please Enter Cell Number",
        regex: "Please Enter valid Cell Number",
      },
    },

    submitHandler: function (form) {
      console.log(AgeMustBe12($("#dob").val()));
      if (AgeMustBe12($("#dob").val()) === true) {
        form.submit();
      } else {
        $("#AgeErr").append(
          '<label id="dob-age-error" class="error" for="dob">Minimum age to register is 12</label>'
        );
      }
    },
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
