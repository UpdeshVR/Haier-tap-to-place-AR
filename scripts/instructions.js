import { hideElement, showElement } from "../helper/helperFunctions.js";
let isclick = false;
let isScale = false;
const instructionsComponent = () => ({
  init() {
    const scene = this.el.sceneEl;
    const model = document.getElementById("model");

    scene.setAttribute("rotate-gesture", "");
    this.previousYRotation = model.getAttribute("rotation"); // Store the previous Y rotation value
    // Store the previous scale value
    // console.log(" lekejejejeje" + this.previousScale.y);
    model.addEventListener("click", () => {
      isclick = true;
    });
  },
  tick() {
    const model = document.getElementById("model");
    const rotation = model.getAttribute("rotation");
    const step1 = document.querySelector(".step-1");
    const step2 = document.querySelector(".step-2");

    const scale = model.getAttribute("scale");

    const step1Done = document.getElementById("step1Done");

    const oneFingerRotate = document.getElementById("oneFingerRotate");
    const step2Done = document.getElementById("step2Done");
    const twoFingerScale = document.getElementById("twoFingerScale");

    if (rotation.y !== this.previousYRotation && rotation.y !== 0 && !isclick) {
      const scene = this.el.sceneEl;

      console.log(`Y rotation changed: ${rotation.y}`);
      // Handle the Y-axis rotation change here if needed
      showElement(step1Done);
      hideElement(oneFingerRotate);
      isclick = true;
      setTimeout(() => {
        scene.removeAttribute("rotate-gesture");
        scene.setAttribute("scale-gesture", "");

        scene.emit("recenter");
        hideElement(step1Done);
        console.log("rotate ho gya ji");
        model.setAttribute("rotation", "0 0 0");
        hideElement(step1, 0);
        showElement(step2, 0);
        showElement(twoFingerScale);
      }, 2000);
      this.previousYRotation = rotation.y;
    }
    // console.log(scale);
    // console.log(scale.y !== 4);
    // console.log(scale.y);
    // console.log(this.previousScale.y);
    if (scale.y !== 4 && !isScale) {
      console.log(`Y scale changed: ${scale.y}`);
      // alert("change scale");
      this.sliderPlay();
      isScale = true;
      hideElement(twoFingerScale);
      showElement(step2Done, 0);
    }
  },

  sliderPlay() {
    const carouselcontainer = document.querySelector(".carousel-container");
    const nextButton = document.getElementById("nextbutton");
    const model = document.getElementById("model");
    const bendmodel = document.getElementById("bend-model");
    const bendui = document.getElementById("bendui_1_model");
    const step2Done = document.getElementById("step2Done");
    const instructionsscreen = document.querySelector(".instructions-screen");
    const scene = this.el.sceneEl;

    setTimeout(() => {
      carouselcontainer.style.visibility = "visible";
      carouselcontainer.style.opacity = "1";
      carouselcontainer.style.pointerEvents = "auto";
      hideElement(step2Done, 0);
      hideElement(instructionsscreen, 0);

      scene.setAttribute("rotate-gesture", "");

      nextButton.style.display = "flex";

      nextButton.style.visibility = "visible";
      nextButton.style.opacity = "1";

      setTimeout(() => {
        nextButton.style.opacity = "0";
        // nextButton.style.visibility = "hidden";
        // nextButton.style.backgroundImage = "unset";
        // nextButton.style.borderRadius = "50%";
        // nextButton.style.backgroundRepeat = "no-repeat";
        // nextButton.style.backgroundSize = "100%";
        // nextButton.style.backgroundPosition = "center";
      }, 2000);

      // reduceBending.style.display = 'block'
      // instructioninfo.style.display = 'none'
      model.setAttribute("animation-mixer", {
        clip: "bend",
        loop: "once",
        crossFadeDuration: 0.4,
      });
      bendmodel.setAttribute("animation-mixer", {
        clip: "bend",
        loop: "once",
        crossFadeDuration: 0.4,
      });
      bendui.setAttribute("animation-mixer", {
        clip: "bend",
        loop: "once",
        crossFadeDuration: 0.4,
      });
    }, 2000);

    console.log("Play Animation 0");
  },
});

export { instructionsComponent };
