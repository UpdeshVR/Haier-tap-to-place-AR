export function registerScaleGesture() {
  AFRAME.registerComponent("scale-gesture", {
    schema: {
      enabled: { default: true },
    },

    init: function () {
      this.modelEntity = document.querySelector("#model");
      this.model = this.modelEntity.object3D;

      this.startDistance = 0;
      this.startScale = new THREE.Vector3();
      this.initScale = new THREE.Vector3();

      this.bindMethods();
      this.addEventListeners();
    },

    bindMethods: function () {
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
    },

    addEventListeners: function () {
      const sceneEl = this.el.sceneEl;
      sceneEl.addEventListener("touchstart", this.onTouchStart);
      sceneEl.addEventListener("touchmove", this.onTouchMove);
      sceneEl.addEventListener("touchend", this.onTouchEnd);
    },

    removeEventListeners: function () {
      const sceneEl = this.el.sceneEl;
      sceneEl.removeEventListener("touchstart", this.onTouchStart);
      sceneEl.removeEventListener("touchmove", this.onTouchMove);
      sceneEl.removeEventListener("touchend", this.onTouchEnd);
    },

    onTouchStart: function (event) {
      if (event.touches.length === 2) {
        this.startDistance = this.getDistance(
          event.touches[0],
          event.touches[1]
        );
        this.startScale.copy(this.model.scale);
      }
    },

    onTouchMove: function (event) {
      if (event.touches.length === 2) {
        const currentDistance = this.getDistance(
          event.touches[0],
          event.touches[1]
        );
        this.scaleModel(currentDistance);
      }
    },

    onTouchEnd: function (event) {
      if (event.touches.length === 0) {
        this.startDistance = 0;
      }
    },

    scaleModel: function (currentDistance) {
      const scaleFactor = currentDistance / this.startDistance;

      // Calculate the new scale
      const newScale = new THREE.Vector3(
        this.startScale.x * scaleFactor,
        this.startScale.y * scaleFactor,
        this.startScale.z * scaleFactor
      );

      // Clamp the new scale to min and max values
      const minScale = 1.0; // 100%
      const maxScale = 4.0; // 400%

      newScale.clampScalar(minScale, maxScale);

      // Apply the clamped scale to the model
      this.model.scale.set(newScale.x, newScale.y, newScale.z);
    },

    getDistance: function (touch1, touch2) {
      const dx = touch1.pageX - touch2.pageX;
      const dy = touch1.pageY - touch2.pageY;
      return Math.sqrt(dx * dx + dy * dy);
    },

    remove: function () {
      this.removeEventListeners();
    },
  });

  // document.querySelector('a-scene').setAttribute('scale-gesture', '');
}
