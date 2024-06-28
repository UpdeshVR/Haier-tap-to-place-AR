import { hideElement, showElement } from "../helper/helperFunctions.js";
// Component that places trees at cursor location when screen is tapped
const tapPlaceCursorComponent = () => ({
  init() {
    this.raycaster = new THREE.Raycaster();
    const scene = document.getElementById("scene");
    this.camera = document.getElementById("camera");
    this.threeCamera = this.camera.getObject3D("camera");
    this.ground = document.getElementById("ground");
    this.cursor = document.getElementById("cursor");
    this.model = document.getElementById("model");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    let hasPlacedModel = false;

    const startscreen = document.querySelector(".start-screen");
    const arscreen = document.querySelector(".ar-screen");
    const viewbtn = document.getElementById("view-btn");
    // 2D coordinates of the raycast origin, in normalized device coordinates (NDC)---X and Y
    // components should be between -1 and 1.  Here we want the cursor in the center of the screen.
    this.rayOrigin = new THREE.Vector2(0, 0);
    viewbtn.addEventListener("click", () => {
      hideElement(startscreen, 0);
      showElement(arscreen, "block");
    });
    this.cursorLocation = new THREE.Vector3(0, 0, 0);
    btn3.addEventListener("click", (event) => {
      if (hasPlacedModel !== true) {
        hasPlacedModel = true;

        this.model.setAttribute("position", this.el.object3D.position);
        this.model.setAttribute("visible", "true");

        // Remove ghosted model from scene after model is placed
        this.cursor.parentNode.removeChild(this.cursor);

        // Add raycaster to camera
        this.camera.setAttribute("raycaster", "objects: .cantap");
        hideElement(btn3, 0);
        showElement(btn4, 0);
      }
      btn4.addEventListener("click", () => {
        this.model.setAttribute("animation-mixer", {
          clip: "led",
          loop: "once",
          crossFadeDuration: 0.4,
        });
      });
    });
  },
  tick() {
    // Raycast from camera to 'ground'
    this.raycaster.setFromCamera(this.rayOrigin, this.threeCamera);
    const intersects = this.raycaster.intersectObject(
      this.ground.object3D,
      true
    );

    if (intersects.length > 0) {
      const [intersect] = intersects;
      this.cursorLocation = intersect.point;
    }
    this.el.object3D.position.y = 0.1;
    this.el.object3D.position.lerp(this.cursorLocation, 0.4);
    this.el.object3D.rotation.y = this.threeCamera.rotation.y;
  },
});

export { tapPlaceCursorComponent };
