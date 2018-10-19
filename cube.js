//scaffold WebGL Insights ch 7 page 114 by Cozzi et al.
//js file





var gl;//WebGL context

window.onload = function init()
{
    var canvas = document.getElementById("gl-canvas");
    
	gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {alert("WebGL isn't available");}
	
	gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
	
	var program = initShaders(gl,"vertex-shader", "fragment-shader");
    gl.useProgram(program);
	
	var bufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);

	render();
};

function render() {
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, numVertices);
	requestAnimationFrame(render);
}

var vertices = [
	vec4(-0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, 0.5, 0.5, 1.0),
	vec4( 0.5, 0.5, 0.5, 1.0),
	vec4( 0.5, -0.5, 0.5, 1.0),
	vec4(-0.5, -0.5, -0.5, 1.0),
	vec4(-0.5, 0.5, -0.5, 1.0),
	vec4( 0.5, 0.5, -0.5, 1.0),
	vec4( 0.5, -0.5, -0.5, 1.0)
];

gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

var modelViewMatrix = lookAt(eye, at, up);
var projectionMatrix = ortho(left, right, bottom, ytop, near, far);

gl.uniformMatrix4fv(modelViewMatrixLoc, false,
	flatten(modelViewMatrix));
gl.uniformMatrix4fv(projectionMatrixLoc, false,
	flatten(projectionMatrix));
	
var image = document.getElementById
	("texImage");
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB,
		gl.RGB, gl.UNSIGNED_BYTE, image);	
