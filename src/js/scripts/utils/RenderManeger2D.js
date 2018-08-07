const FPS = 0.0166666666; // 1/60;

/**
 * class RenderManeger2D 2D用
 */
export default class RenderManeger2D {
	/**
	 * constructor
	 * @param  {jQuery} $container canvas container
	 * @param  {Object} oprions
	 */
	constructor($container, options) {
		this.$container = $container;

		this.options = $.extend(true, {
			isRAF: true,
			isAxis: false,
			isGui: true,
			isStats: true
		}, options);


		this.width = this.$container.width();
		this.height = this.$container.height();

		this.startTime = null;
		this.time = null;
		this._animationId = null;

		// event: [start, stop, resize, update]
		this.event = new INK.Events();

		// stats
		if (this.options.isStats) {
			this.stats = new Stats();
			this.$container[0].appendChild(this.stats.dom);
		}

		// gui
		if (this.options.isGui) {
			this.gui = new dat.GUI();
			this.gui.params = {};

			if (this.options.isStats) {
				this.gui.params.stats = this.options.isStats;
				this.gui.add(this.gui.params, 'stats').name('FPS Metor').onChange(() => {
					if (this.gui.params.stats) {
						$(this.stats.domElement).css('display', 'block');
					} else {
						$(this.stats.domElement).css('display', 'none');
					}
				});
			}
		}

		// renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setClearColor(0x000000);
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(this.width, this.height);

		// scene
		this.scene = new THREE.Scene();

		// camera
		this.camera = new THREE.Camera();

		// AxisHelper
		if (this.options.isAxis) {
			this.axis = new THREE.AxisHelper(1000);
			this.scene.add(this.axis);
		}

		this.$container[0].appendChild(this.renderer.domElement);

		// resize
		$(window).resize(this.resize.bind(this));
	}


	/**
	 * start
	 */
	start() {
		this.startTime = performance.now();
		if (this.options.isRAF) {
			cancelAnimationFrame(this._animationId);
		} else {
			clearTimeout(this._animationId);
		}
		this.event.trigger('start', this);
		this.update();
	}


	/**
	 * stop
	 */
	stop() {
		if (this.options.isRAF) {
			cancelAnimationFrame(this._animationId);
		} else {
			clearTimeout(this._animationId);
		}
		this.event.trigger('stop', this);
	}


	/**
	 * update
	 */
	update() {
		this.time = (performance.now() - this.startTime) / 1000;

		if (this.options.isRAF) {
			this._animationId = requestAnimationFrame(this.update.bind(this));
		} else {
			this._animationId = setTimeout(this.update.bind(this), FPS);
		}

		this.event.trigger('update', this);
		this.render();

		if (this.controller) {
			this.controller.update();
		}
		if (this.stats) {
			this.stats.update();
		}
	}


	/**
	 * render description
	 */
	render() {
		this.renderer.render(this.scene, this.camera);
	}


	/**
	 * resize
	 */
	resize() {
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.renderer.setSize(this.width, this.height);
		// this.camera.left = -this.width / 2;
		// this.camera.right = this.width / 2;
		// this.camera.top = this.height / 2;
		// this.camera.bottom = -this.height / 2;

		this.event.trigger('resize', this);
	}
}
