AFRAME.registerComponent('gesture-controls', {
      schema: {
        enabled: { default: true }
      },
 
      init: function () {
        this.modelEntity = document.querySelector('#model');
        this.model = this.modelEntity.object3D;
 
        this.startDistance = 0;
        this.startScale = new THREE.Vector3();
        this.initScale = new THREE.Vector3();
        this.startRotation = new THREE.Vector3();
        this.initRotation = new THREE.Vector3();
 
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
        sceneEl.addEventListener('touchstart', this.onTouchStart);
        sceneEl.addEventListener('touchmove', this.onTouchMove);
        sceneEl.addEventListener('touchend', this.onTouchEnd);
      },
 
      removeEventListeners: function () {
        const sceneEl = this.el.sceneEl;
        sceneEl.removeEventListener('touchstart', this.onTouchStart);
        sceneEl.removeEventListener('touchmove', this.onTouchMove);
        sceneEl.removeEventListener('touchend', this.onTouchEnd);
      },
 
      onTouchStart: function (event) {
        console.log("touched")
        if (event.touches.length === 1) {
          this.startRotation.set(event.touches[0].pageX, event.touches[0].pageY, 0);
          this.initRotation.copy(this.model.rotation);
        }
 
        if (event.touches.length === 2) {
          this.startDistance = this.getDistance(event.touches[0], event.touches[1]);
          this.startScale.copy(this.model.scale);
        }
      },
 
      onTouchMove: function (event) {
        if (event.touches.length === 1) {
          const deltaX = event.touches[0].pageX - this.startRotation.x;
          const deltaY = event.touches[0].pageY - this.startRotation.y;
 
          this.model.rotation.y = this.initRotation.y + deltaX * 0.01;
          // this.model.rotation.x = this.initRotation.x + deltaY * 0.01;
        }
 
        if (event.touches.length === 2) {
          const currentDistance = this.getDistance(event.touches[0], event.touches[1]);
          const scaleFactor = currentDistance / this.startDistance;
          this.model.scale.set(
            this.startScale.x * scaleFactor,
            this.startScale.y * scaleFactor,
            this.startScale.z * scaleFactor
          );
        }
      },
 
      onTouchEnd: function (event) {
        if (event.touches.length === 0) {
          this.startDistance = 0;
        }
      },
 
      getDistance: function (touch1, touch2) {
        const dx = touch1.pageX - touch2.pageX;
        const dy = touch1.pageY - touch2.pageY;
        return Math.sqrt(dx * dx + dy * dy);
      },
 
      remove: function () {
        this.removeEventListeners();
      }
    });
 
    document.querySelector('a-scene').setAttribute('gesture-controls', '');