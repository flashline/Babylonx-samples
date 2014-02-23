/**
 * Copyright (c) jm Delettre.
 */
/**
* MeshTransform app root package
*/
package;
/**
* classes imports
*/
import babylonx.cameras.ArcRotateCamera;
import babylonx.cameras.FreeCamera;
import babylonx.Engine;
import babylonx.lights.PointLight;
import babylonx.materials.Material;
import babylonx.materials.MultiMaterial;
import babylonx.materials.StandardMaterial;
import babylonx.materials.textures.CubeTexture;
import babylonx.materials.textures.Texture;
import babylonx.mesh.Mesh;
import babylonx.mesh.SubMesh;
import babylonx.mesh.VertexBuffer;
import babylonx.Scene;
import babylonx.tools.math.Color3;
import babylonx.tools.math.Matrix;
import babylonx.tools.math.Vector3;
import babylonx.tools.Tools;
import custom.Face;
import haxe.Timer;
import js.Browser;
import js.html.Element;
import js.html.CanvasElement;
import net.flash_line.util.StepIterator;
//
import babylonx.mesh.Mesh; import custom.MeshExtender; using custom.MeshExtender;
//
/**
* root class
*/
class MeshTransform  {
	var engine:Engine;
	var scene:Scene;
	var renderLoop:Dynamic;
	var camera2:ArcRotateCamera;
	var camera:FreeCamera;
	var localDirection:Vector3 ;
    var transformedDirection:Vector3 ;
	var cameraTransformMatrix:Matrix;
	//translations
	var goCamEnable:Bool;
	var backCamEnable:Bool;
	var leftCamEnable:Bool;
	var rightCamEnable:Bool;
	var upCamEnable:Bool;
	var downCamEnable:Bool;
	//rotations
	var leftRotEnable:Bool;
	var rightRotEnable:Bool;
	var upRotEnable:Bool;
	var downRotEnable:Bool;
	var rightZRotEnable:Bool;
	var leftZRotEnable:Bool;
	var changeEnable:Bool;
	var box:Mesh ;
	var cyl:Mesh ;
	//html elems
	var canvas:CanvasElement;
	var startAll:Element;
	var stopAll:Element;
	var yo1:Float ;
		var yo2:Float ;
	var max:Int;
	var loop:Int;
	//
	public function new () {	
		// bug incompability btween babylon/haxe
		untyped __js__ ("var noop = function () {} ");
		untyped __js__ ("for (var i in Array.prototype) Array.prototype[i].prepare = noop ");
		//
		max = 300;
		loop = 0;
		//translations
		goCamEnable = false;
		backCamEnable = false;
		leftCamEnable = false;
		rightCamEnable = false;
		upCamEnable = false;
		downCamEnable = false;		
		//rotations
		leftRotEnable = false;
		rightRotEnable = false;
		upRotEnable = false;
		downRotEnable = false;
		rightZRotEnable=false;
		leftZRotEnable = false;
		changeEnable = false;
		//
		canvas = cast(Browser.document.getElementById("renderCanvas"),CanvasElement);
		var control:Element = Browser.document.getElementById("control");
		if (!Engine.isSupported()) {
			control.innerHTML = "<h1 style='text-align:center' >WEBGL is NOT supported ! </h1>";
		} else {
			
			//Browser.alert("WEBGL is SUPPORTED ! ");
			// used to translations
			localDirection= Vector3.Zero();
			transformedDirection = Vector3.Zero();
			cameraTransformMatrix = Matrix.Zero();
			//translations		
			var goCam = untyped Browser.document.getElementById("goCam");
			var backCam = untyped Browser.document.getElementById("backCam");
			var leftCam = untyped Browser.document.getElementById("leftCam");
			var rightCam = untyped Browser.document.getElementById("rightCam");
			var upCam = untyped Browser.document.getElementById("upCam");
			var downCam = untyped Browser.document.getElementById("downCam");
			//rotations
			var leftRot = untyped Browser.document.getElementById("leftRot");
			var rightRot = untyped Browser.document.getElementById("rightRot");
			var upRot = untyped Browser.document.getElementById("upRot");
			var downRot = untyped Browser.document.getElementById("downRot");
			var rightZRot = untyped Browser.document.getElementById("rightZRot");
			var leftZRot = untyped Browser.document.getElementById("leftZRot");
			// start/stop
			startAll = untyped Browser.document.getElementById("startAll");
			stopAll = untyped Browser.document.getElementById("stopAll");
			//
			engine = new Engine(canvas, true);
			scene = new Scene(engine);			
			camera = new FreeCamera("Camera", new Vector3(0, 0, -5), scene);
			camera.attachControl(canvas);
			//
			new PointLight("Omni0", new Vector3(200, 50, -100), scene);
			new PointLight("Omni1", new Vector3(-200, -50, -200), scene);
			/*
			cyl = Mesh.CreateCylinder("cyl", 30, 30, 30, 8, scene, true);
			cyl.position = new Vector3(30, 0, 60);
			var cylMat:StandardMaterial = new StandardMaterial("cylMat", scene);
			cylMat.emissiveColor=new Color3 (0.7, 0.3, 0.3);
			//cylMat.wireframe = true;
			cyl.material = cylMat;
			cyl.isPickable = true;
			*/
			//trace(cyl.verticesToString());
			box = Mesh.CreateBox("Box", 50, scene, true);
			
			box.position = new Vector3(0, 0, 200);
			// 
			var renderLoop = function () {scene.render(); };
			engine.runRenderLoop(renderLoop);
			//
			var alpha:Float = Math.PI/1024;
			var m:Int = 0;
			//
			scene.beforeRender = function() {
				//box.rotation.y += alpha*6;
				onClock();
			};
			// box mat
			var mat0:StandardMaterial = new StandardMaterial("mat0", scene);
			var mat1:StandardMaterial = new StandardMaterial("mat1", scene);
			var mat2:StandardMaterial = new StandardMaterial("mat2", scene);
			var mat3:StandardMaterial = new StandardMaterial("mat3", scene);
			var mat4:StandardMaterial = new StandardMaterial("mat4", scene);
			var mat5:StandardMaterial = new StandardMaterial("mat5", scene);
			
			mat0.diffuseTexture = new Texture("asset/clo0.jpg", scene);
			mat1.diffuseTexture = new Texture("asset/clo1.jpg", scene);
			mat2.diffuseTexture = new Texture("asset/clo2.jpg", scene);
			mat3.diffuseTexture = new Texture("asset/clo3.jpg", scene);
			mat4.diffuseTexture = new Texture("asset/clo4.jpg", scene);
			mat5.diffuseTexture = new Texture("asset/clo5.jpg", scene);
			box.isVisible = true;
			//mat2.backFaceCulling = true;
			//
			var xm = new MultiMaterial ("mx", scene);
			xm.subMaterials.push(mat0);
			xm.subMaterials.push(mat1);
			xm.subMaterials.push(mat2);
			xm.subMaterials.push(mat3);
			xm.subMaterials.push(mat4);
			xm.subMaterials.push(mat5);
			box.material = untyped xm;			
			box.subMeshes = [];
			//
			//
			var verticesCount = box.getTotalVertices();
			trace(box.verticesToString());
			//			
			//
			box.subMeshes.push(new SubMesh(0, 0, verticesCount, 0, 6, box));
			box.subMeshes.push(new SubMesh(1, 0, verticesCount, 6,6, box));
			box.subMeshes.push(new SubMesh(2, 0, verticesCount, 12,6, box));
			box.subMeshes.push(new SubMesh(3, 0, verticesCount, 18,6, box));			
			box.subMeshes.push(new SubMesh(4, 0, verticesCount, 24, 6, box));
			box.subMeshes.push(new SubMesh(5, 0, verticesCount, 30, 6, box));/**/
			//
			//
			// translations
			goCam.addEventListener("mousedown", onGoCamMouseDown, false);
			goCam.addEventListener("mouseup", onGoCamMouseUp, false);
			backCam.addEventListener("mousedown", onBackCamMouseDown, false);
			backCam.addEventListener("mouseup", onBackCamMouseUp, false);
			leftCam.addEventListener("mousedown", onLeftCamMouseDown, false);
			leftCam.addEventListener("mouseup", onLeftCamMouseUp, false);
			rightCam.addEventListener("mousedown", onRightCamMouseDown, false);
			rightCam.addEventListener("mouseup", onRightCamMouseUp, false);
			upCam.addEventListener("mousedown", onUpCamMouseDown, false);
			upCam.addEventListener("mouseup", onUpCamMouseUp, false);
			downCam.addEventListener("mousedown", onDownCamMouseDown, false);
			downCam.addEventListener("mouseup", onDownCamMouseUp, false);
			
			// rotations
			leftRot.addEventListener("mousedown", onLeftRotMouseDown , false);
			leftRot.addEventListener("mouseup", onLeftRotMouseUp , false);
			rightRot.addEventListener("mousedown", onRightRotMouseDown, false);
			rightRot.addEventListener("mouseup", onRightRotMouseUp, false);			
			upRot.addEventListener("mousedown", onUpRotMouseDown, false);
			upRot.addEventListener("mouseup", onUpRotMouseUp, false);
			downRot.addEventListener("mousedown", onDownRotMouseDown, false);
			downRot.addEventListener("mouseup", onDownRotMouseUp, false);
			rightZRot.addEventListener("mousedown", onRightZRotMouseDown, false);
			leftZRot.addEventListener("mousedown", onLeftZRotMouseDown, false);
			
			//start/stop
			(untyped canvas).addEventListener("click", onSceneClick , false);
			(untyped startAll).addEventListener("click", onStartClick , false);
			(untyped stopAll).addEventListener("click", onStopClick , false);
			(untyped Browser.document.getElementById("change")).addEventListener("click", onChangeMeshClick , false);
			
			
			box.saveSharp();
			// start all cube's rotations
			doStartAll ();
			
		}
	}
	function onSceneClick (evt) {  
		var pickResult = scene.pick(evt.clientX, evt.clientY);
		trace("hit="+pickResult.hit );
		trace("distance="+pickResult.distance );
		trace("meshname="+pickResult.pickedMesh.name );
		trace("picking v3="+pickResult.pickedPoint );
	}
	function onChangeMeshClick (e) { 		
		changeEnable = !changeEnable;
		if (!changeEnable) {
			loop = 0;
			box.restoreSharp();
		}
	}
	function onStartClick (e) { 	
		
		doStartAll();
	}
   function onStopClick (e) { 
		doStopAll();
	}
	function doChangeMesh() { 
		loop++;
		var val=.1;
		
		if (loop > 2 * max) {
			val = -.1;
			onChangeMeshClick (null);
		} else if (loop < max) {
			val = .1;
		} else {
			val = -.1;
		}
			
			
			var haut:Face = box.createFace([16, 17, 18, 19]);
			var bas:Face  = box.createFace([20,21,22,23]);
			
			haut.getEdge(1).move(new Vector3(val,0, 0));
			haut.getEdge(3).move(new Vector3( -val, 0, 0));
			
			haut.getEdge(0).move(new Vector3(0,0,-val));
			haut.getEdge(2).move(new Vector3(0,0,val));
			
			bas.getEdge(1).move(new Vector3(-val,0,0));
			bas.getEdge(3).move(new Vector3(val, 0, 0));
			
			bas.getEdge(0).move(new Vector3(0,0, -val));
			bas.getEdge(2).move(new Vector3(0, 0, val));
			
			
			
			box.updateSharp();
	}
	function doStartAll () { 
		startAll.style.display = "none";
		stopAll.style.display = "inline";
		leftRotEnable = true; rightRotEnable = false;
		Timer.delay(doAutoChange, 2000);
		//downRotEnable = true ;upRotEnable = false;
		//rightZRotEnable = true ;leftZRotEnable = false ;
	}
	function doAutoChange () :Void{ 
		onChangeMeshClick (null); 
	}
    function doStopAll () { 
		startAll.style.display = "inline";
		stopAll.style.display = "none";
		leftRotEnable = false;rightRotEnable = false;
		downRotEnable = false ;upRotEnable = false;
		rightZRotEnable = false ;leftZRotEnable = false ;
	}
    //function onClock (e) { 
	function onClock () { 
		var e=null;
		//translations
		if (goCamEnable) {
			onGoCamDoIt(e);
		}	
		if (backCamEnable) {
			onBackCamDoIt(e);
		}			
		if (leftCamEnable) {
			onLeftCamDoIt (e);
		}
		if (rightCamEnable) {
			onRightCamDoIt (e);
		}
		if (upCamEnable) {
			onUpCamDoIt (e);
		}
		if (downCamEnable) {
			onDownCamDoIt (e);
		}
		// rotations
		if (leftRotEnable) {
			onLeftRotDoIt (e);
		}	
		if (rightRotEnable) {
			onRightRotDoIt (e);
		}	
		if (upRotEnable) {
			onUpRotDoIt (e);
		}
		if (downRotEnable) {
			onDownRotDoIt (e);
		}
		if (rightZRotEnable) {
			onRightZRotDoIt(e);
		}
		if (leftZRotEnable) {
			onLeftZRotDoIt(e);
		}
		if (changeEnable) {
			
			doChangeMesh();
			//changeEnable = false;
		}
		
	}
	//listeners 
	/// translations
	function onGoCamMouseDown (e) { 
		goCamEnable = true;		
	}
	function onGoCamMouseUp (e) { 
		goCamEnable = false;		
	}
	function onBackCamMouseDown (e) { 
		backCamEnable = true;		
	}
	function onBackCamMouseUp (e) { 
		backCamEnable = false;		
	}
	function onLeftCamMouseDown (e) { 
		leftCamEnable = true;		
	}
	function onLeftCamMouseUp (e) { 
		leftCamEnable = false;		
	}
	function onRightCamMouseDown (e) { 
		rightCamEnable = true;		
	}
	function onRightCamMouseUp (e) { 
		rightCamEnable = false;		
	}
	function onUpCamMouseDown (e) { 
		upCamEnable = true;		
	}
	function onUpCamMouseUp (e) { 
		upCamEnable = false;		
	}
	function onDownCamMouseDown (e) { 
		downCamEnable = true;		
	}
	function onDownCamMouseUp (e) { 
		downCamEnable = false;		
	}
	/// rotations
	function onLeftRotMouseDown (e) { 
		leftRotEnable = !leftRotEnable;		
		if (leftRotEnable) rightRotEnable = false;
	}
	function onLeftRotMouseUp (e) { 
		//leftRotEnable = false;		
	}
	function onRightRotMouseDown (e) { 
		rightRotEnable = !rightRotEnable;		
		if (rightRotEnable) leftRotEnable = false;	
	}
	function onRightRotMouseUp (e) { 
		//rightRotEnable = false;		
	}
	function onUpRotMouseDown (e) { 
		upRotEnable = !upRotEnable;		
		if (upRotEnable) downRotEnable = false;
	}
	function onUpRotMouseUp (e) { 
		//upRotEnable = false;		
	}
	function onDownRotMouseDown (e) { 
		downRotEnable = !downRotEnable;		
		if (downRotEnable) upRotEnable = false;		
	}
	function onDownRotMouseUp (e) { 
		//downRotEnable = false;		
	}
	function onRightZRotMouseDown (e) { 
		rightZRotEnable = !rightZRotEnable;		
		if (rightZRotEnable) leftZRotEnable = false;		
	}
	function onLeftZRotMouseDown (e) { 
		leftZRotEnable = !leftZRotEnable;		
		if (leftZRotEnable) rightZRotEnable = false;		
	}
	//
	// actions
	/// translations
	function onGoCamDoIt (e) { 
		translate(new Vector3(0, 0, 0.05));
	}
	function onBackCamDoIt (e) { 
		translate(new Vector3(0, 0, -0.05));		
	}
	function onLeftCamDoIt (e) { 
		translate(new Vector3( -0.03, 0, 0) );		
	}
	function onRightCamDoIt (e) { 
		translate(new Vector3(0.03,0, 0 ));
	}
	function onUpCamDoIt (e) { 
		translate(new Vector3(0,0.03, 0 ));
	}
	function onDownCamDoIt (e) { 
		translate(new Vector3(0,-0.03, 0 ));
	}
	function translate (v3:Vector3) {
		 localDirection.copyFromFloats(v3.x,v3.y,v3.z); //
		 Matrix.RotationYawPitchRollToRef(camera.rotation.y, camera.rotation.x, 0, cameraTransformMatrix);
         Vector3.TransformCoordinatesToRef(localDirection, cameraTransformMatrix,transformedDirection);
         camera.cameraDirection.addInPlace(transformedDirection);
	}
	/// rotations
	function onLeftRotDoIt (e) { 
		//camera.position.z += 1;
		//camera.rotation.y -= 0.01;
		box.rotation.y += Math.PI / 128 ;// -0.025 radians // -1,41°
		//camera.cameraDirection.x = -0.03;
		//camera.rotation.y -= Math.PI / 16 ; //Math.PI*2;//360°//Math.PI;//180°//Math.PI/2;//90°//Math.PI/4;//45°//Math.PI/8;//22,5°//Math.PI/16;//11,25°  ;
	}
	function onRightRotDoIt (e) { 
		box.rotation.y +=-Math.PI / 128 ;// 0.025 radians // 1,41°
	}
	function onUpRotDoIt (e) { 
		box.rotation.x += 0.01;
	}
	function onDownRotDoIt (e) { 
		box.rotation.x += -0.01;
	}
	function onRightZRotDoIt (e) { 
		box.rotation.z += -0.01;
	}
	function onLeftZRotDoIt (e) { 
		box.rotation.z += 0.01;
	}
	/*
	class StringHelp {
    public static function startsWith( s : String, sub : String ) { .... }
    public static function isSpace( s : String, ?pos : Int ) { .... }
}
Then your code will often looks like :

function isHello( s : String ) {
    return StringHelp.startsWith(s,"hello") && StringHelp.isSpace(s,6);
}
With using, you can simply rewrite your code as the following :

// at the top of your file, together with imports
using StringHelp;
// ...
function isHello( s : String ) {
    return s.startsWith("hello") && s.isSpace(6);
}
*/
 /**/
    static function main() {  
		new MeshTransform();
	}
}