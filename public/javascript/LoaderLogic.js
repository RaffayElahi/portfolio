const tl = gsap.timeline()
const loader = document.querySelector(".site-loader")
const inner = document.querySelector(".loader-img")
tl.from(inner,{
    y: 200,
    delay:1,
    duration: 1,
    ease: "power3.inOut",

    
})
tl.to(loader, {
    y: "-100%",
    delay: 0.5,
    ease: "power3.inOut",
    duration:1,
    ease: "linear",
    
})