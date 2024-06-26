
export function registerRotateGesture() {
    AFRAME.registerComponent('rotate-gesture', {
        schema: {
            enabled: { default: true }
        },

        init: function () {
            this.modelEntity = document.querySelector('#model');
            this.model = this.modelEntity.object3D;

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
            if (event.touches.length === 1) {
                this.startRotation.set(event.touches[0].pageX, event.touches[0].pageY, 0);
                this.initRotation.copy(this.model.rotation);
            }
        },

        onTouchMove: function (event) {
            if (event.touches.length === 1) {
                this.rotateModel(event.touches[0].pageX, event.touches[0].pageY);
            }
        },

        onTouchEnd: function (event) {
            // No specific actions needed on touch end for rotation
        },

        rotateModel: function (pageX, pageY) {
            const deltaX = pageX - this.startRotation.x;
            const deltaY = pageY - this.startRotation.y;

            this.model.rotation.y = this.initRotation.y + deltaX * 0.01;
            // Uncomment the next line if you also want to allow rotation around the x-axis
            // this.model.rotation.x = this.initRotation.x + deltaY * 0.01;
        },

        remove: function () {
            this.removeEventListeners();
        }
    });

    // document.querySelector('a-scene').setAttribute('rotate-gesture', '');
}
