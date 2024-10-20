// ------------------ Split ------------------ //

function runSplit() {
  text = new SplitType("[animation=loading-split]", {
    types: "lines, chars",
    lineClass: "line-animation-split",
    charClass: "char-animation-split",
  });
  textfade = new SplitType("[animation=fade-split]", {
    types: "lines, chars",
    lineClass: "line-split-fade",
    charClass: "char-split-fade",
  });
  textheading = new SplitType("[animation=load--heading]", {
    types: "lines",
    lineClass: "animation-heading-split",
  });

  textquotes = new SplitType("[animation=quote-fade]", {
    types: "words",
    wordClass: "quote-fade-split",
  });

  // Wrap each line in a div with class 'overflow-hidden'
  $(".animation-heading-split").each(function () {
    $(this).wrap("<div class='overflow-hidden'></div>");
  });
}

runSplit();

// Update on window resize
let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    text.revert();
    textfade.revert();
    textheading.revert();
    textquotes.revert();
    runSplit();
  }
});

// ------------------ gsap ------------------ //

gsap.registerPlugin(ScrollTrigger, CustomEase);

// ------------------ smooth ease ------------------ //

CustomEase.create("smooth", "M0,0 C0.38,0.005 0.215,1 1,1");

// ------------------ loading screen ------------------ //

function pageLoad() {
  let tl = gsap.timeline();

  tl.to(".main-wrapper", {
    opacity: 1,
    ease: "smooth",
    duration: 0.6,
  });

  // Add a label to mark the starting point of simultaneous animations
  tl.add("loadingAnimationsStart");

  // Add the 'loading' animation and set its position to the label
  tl.from(
    ".char-animation-split",
    {
      y: "-100%",
      opacity: "0",
      stagger: { each: 0.02, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  );
  tl.from(
    "[animation=loading]",
    {
      y: "20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 0.6,
    },
    "loadingAnimationsStart"
  ); // <-- position parameter set to the label

  // Add the 'loading-reverse' animation and set its position to the label
  tl.from(
    "[animation=loading-reverse]",
    {
      y: "-20rem",
      opacity: "0",
      stagger: { each: 0.1, from: "start" },
      ease: "smooth",
      duration: 1,
    },
    "loadingAnimationsStart"
  ); // <-- position parameter set to the label
}

pageLoad();

// ------------------ scroll trigger ------------------ //

document.querySelectorAll(".line-split-fade").forEach(function (fadeSplitElem) {
  gsap.from(fadeSplitElem.querySelectorAll(".char-split-fade"), {
    scrollTrigger: {
      trigger: fadeSplitElem,
      start: "bottom bottom",
      markers: false,
    },
    y: "-100%",
    ease: "smooth",
    duration: 0.6,
    stagger: {
      each: 0.05,
    },
  });
});

document.querySelectorAll("[animation=fade]").forEach(function (fadeElem) {
  gsap.from(fadeElem, {
    scrollTrigger: {
      trigger: fadeElem,
      start: "top bottom-=50",
      markers: false,
    },
    y: "20rem",
    opacity: 0,
    ease: "smooth",
    duration: 0.6,
  });
});

document
  .querySelectorAll("[animation=fade-stagger]")
  .forEach(function (fadeSplitElem) {
    gsap.from(fadeSplitElem.querySelectorAll("[animation=fade-item]"), {
      scrollTrigger: {
        trigger: fadeSplitElem,
        start: "top bottom-=200",
        markers: false,
      },
      y: "40rem",
      opacity: 0,
      ease: "smooth",
      duration: 0.6,
      stagger: {
        each: 0.1,
      },
    });
  });

document
  .querySelectorAll("[animation=quote-fade]")
  .forEach(function (fadeSplitElem) {
    gsap.from(fadeSplitElem.querySelectorAll(".quote-fade-split"), {
      scrollTrigger: {
        trigger: fadeSplitElem,
        start: "top center+=100",
        end: "bottom center+=100",
        markers: false,
        scrub: true,
      },
      opacity: "0.1",
      stagger: {
        each: 0.05,
      },
    });
  });

//torro parallax
$(".torro-circle").each((index, element) => {
  let triggerElement = $(".torro-wrapper");
  let targetElement = $(element); // Change target to .torro-wrapper

  gsap
    .timeline({
      scrollTrigger: {
        trigger: triggerElement,
        scrub: true,
        start: "top bottom", // Animation starts when the element enters the viewport
        end: "bottom top", // Animation ends when the element leaves the viewport
      },
    })
    .fromTo(
      targetElement,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 1.3,
        opacity: 1,
      }
    );
});

// lines-horizontal
$(".line").each(function (index) {
  let triggerElement = $(this);
  let targetElement = $(this);

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement,
      // trigger element - viewport
      start: "top bottom",
      end: "bottom top",
    },
  });
  tl.fromTo(
    targetElement,
    {
      opacity: 0,
      width: "0%",
    },
    {
      duration: 1,
      delay: 0.3,
      opacity: 1,
      width: "100%",
      ease: "smooth",
      stagger: {
        amount: 0.3,
        from: "0",
      },
    }
  );
});

// ------------------ Menu -------------------- //

// navbar menu hamburger click

$(".menu-link").click(function () {
  let clicks = $(this).data("clicks");
  if (clicks) {
    // odd clicks
    gsap.to(".is--navbar-load", {
      y: "10rem",
      duration: 0.2,
      opacity: 0,
      ease: "smooth",
      stagger: {
        each: 0.1,
        from: "end",
      },
    });
  } else {
    // even clicks
    gsap.fromTo(
      ".is--navbar-load",
      {
        y: "10rem",
        opacity: 0,
      },
      {
        duration: 0.5,
        delay: 0.4,
        y: "0rem",
        opacity: 1,
        ease: "smooth",
        stagger: {
          each: 0.1,
        },
      }
    );
  }
  $(this).data("clicks", !clicks);
});

// navbar menu hamburger click
$(".dropdown-parent").click(function () {
  let clicks = $(this).data("clicks");
  if (clicks) {
    // odd clicks
    gsap.to(".dropdown-link", {
      y: "10rem",
      duration: 0.2,
      opacity: 0,
      ease: "smooth",
      stagger: {
        each: 0.1,
        from: "end",
      },
    });
  } else {
    // even clicks
    gsap.fromTo(
      ".dropdown-link",
      {
        y: "10rem",
        opacity: 0,
      },
      {
        duration: 0.5,
        delay: 0.4,
        y: "0rem",
        opacity: 1,
        ease: "smooth",
        stagger: {
          each: 0.1,
        },
      }
    );
  }
  $(this).data("clicks", !clicks);
});

// navbar color
$(document).ready(function () {
  var scrollTop = 0;
  $(window).scroll(function () {
    scrollTop = $(window).scrollTop();
    if (scrollTop >= 50) {
      $(".navbar").addClass("is--scrolled");
    } else if (scrollTop < 50) {
      $(".navbar").removeClass("is--scrolled");
    }
  });
});

// ------------------ accordion ------------------ //

$(".faq--question").on("click", function () {
  // Close other accordions when opening new one
  if (!$(this).hasClass("open")) {
    $(".faq--question.open").click();
  }
  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".faq--response");
  let animationDuration = 500;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration);
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height();
    sibling.css("height", "0px");
    sibling.animate({ height: autoHeight }, animationDuration, () => {
      sibling.css("height", "auto");

      // Scroll the page to the accordion, leaving 200 pixels from the top
    });
  }
  // Open and close the toggle div
  $(this).toggleClass("open");
});
