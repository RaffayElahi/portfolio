window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  document.fonts.ready.then(() => {
    const images = Array.from(document.images);
    const imagesLoaded = images.map(img => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });

    Promise.all(imagesLoaded).then(() => {
      gsap.registerPlugin(ScrollTrigger);

      // GSAP Timeline for Loader
      const tl = gsap.timeline();
      const loader = document.querySelector(".site-loader");
      const inner = document.querySelector(".loader-img");
      tl.from(inner, {
        y: 200,
        delay: 1,
        duration: 1,
        ease: "power3.inOut",
      });
      tl.to(loader, {
        y: "-100%",
        delay: 0.5,
        ease: "linear",
        duration: 1,
      });

      // Magic Mouse Initialization
      const options = {
        outerStyle: "circle",
        hoverEffect: "circle-move",
        hoverItemMove: false,
        defaultCursor: false,
        outerWidth: 30,
        outerHeight: 30,
      };
      magicMouse(options);

      // GSAP Timeline for Mobile Toggle
      const tlMobileToggle = gsap.timeline({ paused: true, reversed: true });
      const mobileToggle = document.querySelector('.mobile-toggle');
      tlMobileToggle.fromTo('.line:nth-child(2)', {
        width: '80%',
        position: 'static',
        rotate: 0
      }, {
        width: '0',
        ease: 'power1.inOut',
        duration: 0.2,
      }, 'line')
      .fromTo('.line:first-child', {
        position: 'static',
        width: '40%',
        rotate: 0
      }, {
        width: '100%',
        position: 'absolute',
        rotate: '135deg',
        ease: 'power1.inOut',
        duration: 0.2,
      }, 'line')
      .fromTo('.line:last-child', {
        position: 'static',
        width: '50%',
        rotate: 0
      }, {
        position: 'absolute',
        width: '100%',
        rotate: '45deg',
        ease: 'power1.inOut',
        duration: 0.2,
      }, 'line')
      .fromTo('.mobile-nav-cover', {
        height: 0,
        display: 'none'
      }, {
        minHeight: '100%',
        ease: 'power1.inOut',
        duration: 1,
        display: 'flex'
      }, 'display')
      .fromTo('.mobile-nav-links-upper', {
        display: "none",
      }, {
        display: "flex",
      }, 'display')
      .fromTo('.mobile-nav-links-upper a', {
        display: "none",
      }, {
        display: "block"
      }, 'display')
      .fromTo('.mobile-nav-links-lower', {
        display: "none"
      }, {
        display: "flex"
      }, 'display')
      .fromTo('.partial-important-mobile-nav', {
        display: "none"
      }, {
        display: "flex"
      }, 'display')
      .fromTo('.website-policies-mobile-nav', {
        display: "none"
      }, {
        display: "block"
      }, 'display')
      .fromTo('.nav-text-mobile', {
        y: 100
      }, {
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        yoyo: true
      })
      .fromTo('.nav-text-mobile-anim', {
        y: 100
      }, {
        y: 0,
        duration: 0.3,
        stagger: 0.2,
        yoyo: true
      });

      mobileToggle.addEventListener('click', () => {
        if (tlMobileToggle.reversed()) {
          tlMobileToggle.play();
        } else {
          tlMobileToggle.reverse();
        }
      });


      const sect = document.querySelectorAll('.scroll-item');
      sect.forEach((sectt) => {
        gsap.to(sectt, {
          transform: 'translateX(-100%)',
          repeat: -1,
          duration: 10,
          ease: 'linear'
        });
      });

      const allHead = document.querySelectorAll('.scroll-item h2');
      allHead.forEach((h) => {
        gsap.from(h, {
          y: -500,
          duration: 1,
          delay: 0.1,
          scrollTrigger: {
            trigger: h,
          }
        });
      });

      // Update Year Text
      const yearChangingText = document.querySelector('.rights p');
      const date = new Date();
      const currentYear = date.getFullYear();
      yearChangingText.innerHTML = `Raffay Elahi ${currentYear} | All rights reserved &#169.`;
    });
  });
});
