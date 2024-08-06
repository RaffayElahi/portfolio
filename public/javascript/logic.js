window.addEventListener("resize", () => {
  location.reload();
});
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  options = {
    outerStyle: "circle",
    hoverEffect: "circle-move",
    hoverItemMove: false,
    defaultCursor: false,
    outerWidth: 30,
    outerHeight: 30,
  };
  magicMouse(options);

  const lineBreaker = document.querySelectorAll(".line-breaker");
  lineBreaker.forEach((line) => {
    gsap.to(line, {
      width: "100%",
      opacity: 1,
      scrollTrigger: {
        trigger: line,
      },
    });
  });
  const para = document.querySelectorAll(".txt-s");
  para.forEach((p) => {
    gsap.from(p, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.inOut",
      y: 100,
      scrollTrigger: {
        trigger: p,
      },
    });
  });
  const subHeading = document.querySelectorAll("h3");
  subHeading.forEach((Heading) => {
    gsap.from(Heading, {
      opacity: 0,
      duration: 0.2,
      ease: "power1.inOut",
      y: 100,
      scrollTrigger: {
        trigger: Heading,
      },
    });
  });
  var footer = document.querySelector(".contact");
  const lastCard = document.querySelector(".card.scroll");
  const pinnedSections = gsap.utils.toArray(".pinned");
  pinnedSections.forEach((section, index, sections) => {
    let img = section.querySelector(".img");
    let nextSection = section[index + 1] || lastCard;
    let endScalePoint = `top +=${
      nextSection.offsetTop - section.offsetTop
    } top`;
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end:
          index === sections.lenght
            ? `+=${lastCard.offsetTop / 2}`
            : footer.offsetTop - window.innerHeight,
        pin: true,
        pinSpacing: false,
        scrub: 1,
      },
    });
    gsap.fromTo(
      img,
      {
        scale: 1,
      },
      {
        scale: 0.2,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top ",
          end: endScalePoint - 5,
          scrub: 2,
        },
      }
    );

    const tlMobileToggle = gsap.timeline({ paused: true, reversed: true });
    const mobileToggle = document.querySelector(".mobile-toggle");
    tlMobileToggle.fromTo(
      ".line:nth-child(2)",
      {
        width: "80%",
        position: "static",
        rotate: 0,
      },
      {
        width: "0",
        ease: "power1.inOut",
        duration: 0.2,
      },
      "line"
    );
    tlMobileToggle.fromTo(
      ".line:first-child",
      {
        position: "static",
        width: "40%",
        rotate: 0,
      },
      {
        width: "100%",
        position: "absolute",
        rotate: "135 deg",
        ease: "power1.inOut",
        duration: 0.2,
      },
      "line"
    );
    tlMobileToggle.fromTo(
      ".line:last-child",
      {
        position: "static",
        width: "50%",
        rotate: 0,
      },
      {
        position: "absolute",
        width: "100%",
        rotate: "45 deg",
        ease: "power1.inOut",
        duration: 0.2,
      },
      "line"
    );
    tlMobileToggle.fromTo(
      ".mobile-nav-cover",
      {
        height: 0,
        display: "none",
      },
      {
        minHeight: "100%",
        ease: "power1.inOut",
        duration: 1,
        display: "flex",
      },
      "display"
    );
    tlMobileToggle.fromTo(
      ".mobile-nav-links-upper",
      {
        display: "none",
      },
      {
        display: "flex",
      },
      "display"
    );
    tlMobileToggle.fromTo(
      ".mobile-nav-links-upper a",
      {
        display: "none",
      },
      {
        display: "block",
      },
      "display"
    );
    tlMobileToggle.fromTo(
      ".mobile-nav-links-lower",
      {
        display: "none",
      },
      {
        display: "flex",
      },
      "display"
    );
    tlMobileToggle.fromTo(
      ".partial-important-mobile-nav",
      {
        display: "none",
      },
      {
        display: "flex",
      },
      "display"
    );
    tlMobileToggle.fromTo(
      ".website-policies-mobile-nav",
      {
        display: "none",
      },
      {
        display: "block",
      },
      "display"
    );

    tlMobileToggle.fromTo(
      ".nav-text-mobile",
      {
        y: 100,
      },
      {
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        yoyo: true,
      }
    );
    tlMobileToggle.fromTo(
      ".nav-text-mobile-anim",
      {
        y: 100,
      },
      {
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        yoyo: true,
      }
    );
    mobileToggle.addEventListener("click", () => {
      if (tlMobileToggle.reversed()) {
        tlMobileToggle.play();
      } else {
        tlMobileToggle.reverse();
      }
    });
  });
  const hero = document.querySelector(".selected h1");
  gsap.to(hero, {
    scrollTrigger: {
      trigger: document.body,
      scrub: 2,
    },
  });
});
gsap.from(".heading", {
  y: -500,
  duration: 1,
});
const sect = document.querySelectorAll(".scroll-item");
sect.forEach((sectt) => {
  gsap.to(sectt, {
    transform: "translateX(-100%)",
    repeat: -1,
    duration: 10,
    ease: "linear",
  });
});
const allHead = document.querySelectorAll(".scroll-item h2");
allHead.forEach((h) => {
  gsap.from(h, {
    y: -500,
    duration: 1,
    delay: 0.1,
    scrollTrigger: {
      trigger: h,
    },
  });
});
document.querySelector(".img").style.display = "block";
const yearChangingText = document.querySelector(".rights p");
const date = new Date();
const currentYear = date.getFullYear();
yearChangingText.innerHTML = `Raffay Elahi ${currentYear} | All rights reserved &#169.`;
gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();
if (!mm) {
  console.error(
    "gsap.matchMedia is not available or not returning the expected object"
  );
}

mm.add({
  "(max-width: 1004px)": function () {
    gsap.from(".side-image", {
      y: -50,
      scrollTrigger: {
        trigger: ".side-image",
        scrub: true,
      },
    });
  },

  "(min-width: 1005px)": function () {
    gsap.from(".side-image", {
      y: -200,
      scrollTrigger: {
        trigger: ".side-image",
        scrub: true,
      },
    });
  },
});

const contactButton = document.querySelector("#contentContact");
contactButton.addEventListener("click", () => {
  window.location.href = "/contact";
});
