import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "@/components/Home_page_Banner/Banner.module.scss";
import "./scroll.css";
gsap.registerPlugin(ScrollTrigger);

const Animation = ({ loadImage, counter }) => {
  const [info, setInfo] = useState(false);
  const [animationEnded, setAnimationEnded] = useState(false);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textRef = useRef(null);
  const contextRef = useRef(null);
  const imagesRef = useRef([]);
  const airpodsRef = useRef({ frame: 0 });
  const [loading, setLoading] = useState(true);
  const [loadingCounter, setLoadingCounter] = useState(0);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  console.log(loadingCounter);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Increase for more smoothness (0 - 1)
      smooth: true, // Ensure smooth scrolling is enabled
      direction: "vertical", // Scrolling direction, use 'horizontal' for horizontal scroll
      gestureDirection: "vertical", // Direction for touch gestures
      mouseMultiplier: 1, // Adjust how sensitive the scroll reacts to the mouse
      smoothTouch: true, // Enable smooth scroll for touch devices
      touchMultiplier: 1.5, // Increase this value for a smoother effect on touch devices
    });

    // RAF (Request Animation Frame) loop for Lenis
    function raf(time) {
      lenis.raf(time);
      ScrollTrigger.update(); // 👈 Keeps ScrollTrigger in sync with smooth scrolling
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up Lenis instance on unmount
    };
  }, []);
  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    const setCanvasSize = () => {
      const aspectRatio = 1632 / 918;
      const availableWidth = window.innerWidth;

      if (availableWidth < 200) {
        canvas.width = 1632 / 2;
        canvas.height = 918 / 2;
        canvas.style.width = "1301px";
        canvas.style.height = "100vh";
      } else {
        canvas.width = 1632;
        canvas.height = 918;
        canvas.style.width = "100%";
        canvas.style.height = "100vh";
      }
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    const frameCount = 216;

    const currentFrame = (index) =>
      // https://interiormaataassets.humbeestudio.xyz/mainsiteassets/newRcFrames/
    // https://humbee-developers.github.io/framesdemo/
      `https://humbee-developers.github.io/framesdemo/newRcFrames/${(index + 1).toString().padStart(3, "0")}.jpg`;

    let imgL = [];
    for (let i = 0; i < frameCount; i++) {
      let img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
      imgL.push(img.src);
    }
    const loadImages = async () => {
      const loadBatch = async (startIndex) => {
        const batchSize = 10;
        const promises = [];

        for (
          let i = startIndex;
          i < Math.min(startIndex + batchSize, frameCount);
          i++
        ) {
          promises.push(
            new Promise((resolve) => {
              const img = new Image();
              img.src = currentFrame(i);
              img.onload = () => {
                imagesRef.current[i] = img;
                resolve();
              };
            })
          );
        }

        await Promise.all(promises);
        setLoadingCounter((prev) => prev + batchSize);
      };

      for (let i = 0; i < frameCount; i += 10) {
        await loadBatch(i);
      }
      setIsLoaded(true);
      setLoading(false);
    };
    loadImages();
    console.log(imgL);
    console.log("Counter", loadingCounter);

    const animationTimeline = gsap.timeline({
      onUpdate: () => {
        render();
        const progress = animationTimeline.progress();
        const frame = Math.floor(progress * (frameCount - 1));
        airpodsRef.current.frame = frame;
        console.log(`Scroll Progress: ${progress}, Frame: ${frame}`);
      },
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: true, // Increase scrub value for smoother transitions effect it will take 2 seconds to scroll use true for default effect
        //       smooth: 1, // how long (in seconds) it takes to "catch up" to the native scroll position
        // effects: true, // looks for data-speed and data-lag attributes on elements
        // smoothTouch: 100,
        end: "+=800%",
        // onUpdate: (self) => {
        //   const progress = self.progress;
        //   airpodsRef.current.frame = Math.floor(progress * (frameCount - 1));
        //   console.log(
        //     `Scroll Progress: ${progress}, Frame: ${airpodsRef.current.frame}`
        //   );
        //   render();
        // },
        onUpdate: (self) => {
          const progress = self.progress;
          const frame = Math.floor(progress * (frameCount - 1));
          if (airpodsRef.current.frame !== frame) {
            airpodsRef.current.frame = frame;
            // render();
            requestAnimationFrame(render); // Use RAF to optimize frame render timing
          }
        },
      },
    });
    imagesRef.current[0].onload = render;

    // function render() {
    //   if (imagesRef.current[airpodsRef.current.frame]) {
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     context.drawImage(
    //       imagesRef.current[airpodsRef.current.frame],
    //       0,
    //       0,
    //       canvas.width,
    //       canvas.height
    //     );
    //   }
    // }
    function render() {
      const frameImage = imagesRef.current[airpodsRef.current.frame];
      if (frameImage && frameImage.complete) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
      }
    }

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  useEffect(() => {
    const updateScrollPercentage = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScroll = documentHeight - windowHeight;
      const currentScrollPercentage = (scrollPosition / totalScroll) * 100;
      setScrollPercentage(currentScrollPercentage);
    };

    window.addEventListener("scroll", updateScrollPercentage);

    return () => window.removeEventListener("scroll", updateScrollPercentage);
  }, []);

  const loadingProgress = (loadingCounter / 250) * 100;
  const scrollDownByTenPercent = () => {
    const tenPercentOfHeight = window.innerHeight * 1.7;
    window.scrollBy({
      top: tenPercentOfHeight,
      behavior: "smooth",
    });
    setIsVisible(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <section>
      <section ref={sectionRef}>
        <canvas
          className={styles.canvas_factory_settings}
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100vh",
            willChange: "transform", // Hint the browser for optimization
            imageRendering: "auto", // "pixelated" or "crisp-edges" for non-HD frames
          }}
        ></canvas>
      </section>
    </section>
  );
};

export default Animation;
