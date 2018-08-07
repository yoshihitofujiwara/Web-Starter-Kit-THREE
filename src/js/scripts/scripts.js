import RenderManeger3D from "./utils/RenderManeger3D";


/*--------------------------------------------------------------------------
	init
--------------------------------------------------------------------------*/
function init() {
	let renderManeger3D = new RenderManeger3D($("#canvas_container"), {
		isController: true
	});

		// let uniforms = {
		// 	noiseAmount: { type: "f", value: 1.0 },
		// 	opacity: { type: "f", value: 0.2 },
		// 	color: { type: "c", value: new THREE.Color(0xffffff) },
		// 	time: { type: "f", value: 0},
		// 	progress: { type: "f", value: 0},
		// };

		// let shaderMaterial = new THREE.ShaderMaterial({
		// 	uniforms: uniforms,
		// 	vertexShader: require("../../shader/default.vert"),
		// 	fragmentShader: require("../../shader/default.frag"),
		// 	blending: THREE.AdditiveBlending,
		// 	depthTest: false,
		// 	transparent: true
		// });

		// renderManeger3D.scene.add(line);


		// Start
	// 	if (INK.isSmartPhone()) {
	// 		renderManeger3D.camera.position.z = 360;
	// 	} else {
	// 		renderManeger3D.camera.position.z = 150;
	// 	}
	// 	renderManeger3D.start();


	// // update
	// renderManeger3D.event.on("update", () => {
	// });
}




/*--------------------------------------------------------------------------
	dom ready
--------------------------------------------------------------------------*/
$(function () {
	init();
});
