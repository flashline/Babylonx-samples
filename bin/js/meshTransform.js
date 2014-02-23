(function () { "use strict";
var MeshTransform = function() {
	var _g = this;
	var noop = function () {} ;
	for (var i in Array.prototype) Array.prototype[i].prepare = noop ;
	this.max = 300;
	this.loop = 0;
	this.goCamEnable = false;
	this.backCamEnable = false;
	this.leftCamEnable = false;
	this.rightCamEnable = false;
	this.upCamEnable = false;
	this.downCamEnable = false;
	this.leftRotEnable = false;
	this.rightRotEnable = false;
	this.upRotEnable = false;
	this.downRotEnable = false;
	this.rightZRotEnable = false;
	this.leftZRotEnable = false;
	this.changeEnable = false;
	this.canvas = js.Boot.__cast(js.Browser.document.getElementById("renderCanvas") , HTMLCanvasElement);
	var control = js.Browser.document.getElementById("control");
	if(!BABYLON.Engine.isSupported()) control.innerHTML = "<h1 style='text-align:center' >WEBGL is NOT supported ! </h1>"; else {
		this.localDirection = BABYLON.Vector3.Zero();
		this.transformedDirection = BABYLON.Vector3.Zero();
		this.cameraTransformMatrix = BABYLON.Matrix.Zero();
		var goCam = js.Browser.document.getElementById("goCam");
		var backCam = js.Browser.document.getElementById("backCam");
		var leftCam = js.Browser.document.getElementById("leftCam");
		var rightCam = js.Browser.document.getElementById("rightCam");
		var upCam = js.Browser.document.getElementById("upCam");
		var downCam = js.Browser.document.getElementById("downCam");
		var leftRot = js.Browser.document.getElementById("leftRot");
		var rightRot = js.Browser.document.getElementById("rightRot");
		var upRot = js.Browser.document.getElementById("upRot");
		var downRot = js.Browser.document.getElementById("downRot");
		var rightZRot = js.Browser.document.getElementById("rightZRot");
		var leftZRot = js.Browser.document.getElementById("leftZRot");
		this.startAll = js.Browser.document.getElementById("startAll");
		this.stopAll = js.Browser.document.getElementById("stopAll");
		this.engine = new BABYLON.Engine(this.canvas,true);
		this.scene = new BABYLON.Scene(this.engine);
		this.camera = new BABYLON.FreeCamera("Camera",new BABYLON.Vector3(0,0,-5),this.scene);
		this.camera.attachControl(this.canvas);
		new BABYLON.PointLight("Omni0",new BABYLON.Vector3(200,50,-100),this.scene);
		new BABYLON.PointLight("Omni1",new BABYLON.Vector3(-200,-50,-200),this.scene);
		this.box = BABYLON.Mesh.CreateBox("Box",50,this.scene,true);
		this.box.position = new BABYLON.Vector3(0,0,200);
		var renderLoop = function() {
			_g.scene.render();
		};
		this.engine.runRenderLoop(renderLoop);
		var alpha = Math.PI / 1024;
		var m = 0;
		this.scene.beforeRender = function() {
			_g.onClock();
		};
		var mat0 = new BABYLON.StandardMaterial("mat0",this.scene);
		var mat1 = new BABYLON.StandardMaterial("mat1",this.scene);
		var mat2 = new BABYLON.StandardMaterial("mat2",this.scene);
		var mat3 = new BABYLON.StandardMaterial("mat3",this.scene);
		var mat4 = new BABYLON.StandardMaterial("mat4",this.scene);
		var mat5 = new BABYLON.StandardMaterial("mat5",this.scene);
		mat0.diffuseTexture = new BABYLON.Texture("asset/clo0.jpg",this.scene);
		mat1.diffuseTexture = new BABYLON.Texture("asset/clo1.jpg",this.scene);
		mat2.diffuseTexture = new BABYLON.Texture("asset/clo2.jpg",this.scene);
		mat3.diffuseTexture = new BABYLON.Texture("asset/clo3.jpg",this.scene);
		mat4.diffuseTexture = new BABYLON.Texture("asset/clo4.jpg",this.scene);
		mat5.diffuseTexture = new BABYLON.Texture("asset/clo5.jpg",this.scene);
		this.box.isVisible = true;
		var xm = new BABYLON.MultiMaterial("mx",this.scene);
		xm.subMaterials.push(mat0);
		xm.subMaterials.push(mat1);
		xm.subMaterials.push(mat2);
		xm.subMaterials.push(mat3);
		xm.subMaterials.push(mat4);
		xm.subMaterials.push(mat5);
		this.box.material = xm;
		this.box.subMeshes = [];
		var verticesCount = this.box.getTotalVertices();
		console.log(custom.MeshExtender.verticesToString(this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(0,0,verticesCount,0,6,this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(1,0,verticesCount,6,6,this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(2,0,verticesCount,12,6,this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(3,0,verticesCount,18,6,this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(4,0,verticesCount,24,6,this.box));
		this.box.subMeshes.push(new BABYLON.SubMesh(5,0,verticesCount,30,6,this.box));
		goCam.addEventListener("mousedown",$bind(this,this.onGoCamMouseDown),false);
		goCam.addEventListener("mouseup",$bind(this,this.onGoCamMouseUp),false);
		backCam.addEventListener("mousedown",$bind(this,this.onBackCamMouseDown),false);
		backCam.addEventListener("mouseup",$bind(this,this.onBackCamMouseUp),false);
		leftCam.addEventListener("mousedown",$bind(this,this.onLeftCamMouseDown),false);
		leftCam.addEventListener("mouseup",$bind(this,this.onLeftCamMouseUp),false);
		rightCam.addEventListener("mousedown",$bind(this,this.onRightCamMouseDown),false);
		rightCam.addEventListener("mouseup",$bind(this,this.onRightCamMouseUp),false);
		upCam.addEventListener("mousedown",$bind(this,this.onUpCamMouseDown),false);
		upCam.addEventListener("mouseup",$bind(this,this.onUpCamMouseUp),false);
		downCam.addEventListener("mousedown",$bind(this,this.onDownCamMouseDown),false);
		downCam.addEventListener("mouseup",$bind(this,this.onDownCamMouseUp),false);
		leftRot.addEventListener("mousedown",$bind(this,this.onLeftRotMouseDown),false);
		leftRot.addEventListener("mouseup",$bind(this,this.onLeftRotMouseUp),false);
		rightRot.addEventListener("mousedown",$bind(this,this.onRightRotMouseDown),false);
		rightRot.addEventListener("mouseup",$bind(this,this.onRightRotMouseUp),false);
		upRot.addEventListener("mousedown",$bind(this,this.onUpRotMouseDown),false);
		upRot.addEventListener("mouseup",$bind(this,this.onUpRotMouseUp),false);
		downRot.addEventListener("mousedown",$bind(this,this.onDownRotMouseDown),false);
		downRot.addEventListener("mouseup",$bind(this,this.onDownRotMouseUp),false);
		rightZRot.addEventListener("mousedown",$bind(this,this.onRightZRotMouseDown),false);
		leftZRot.addEventListener("mousedown",$bind(this,this.onLeftZRotMouseDown),false);
		this.canvas.addEventListener("click",$bind(this,this.onSceneClick),false);
		this.startAll.addEventListener("click",$bind(this,this.onStartClick),false);
		this.stopAll.addEventListener("click",$bind(this,this.onStopClick),false);
		js.Browser.document.getElementById("change").addEventListener("click",$bind(this,this.onChangeMeshClick),false);
		custom.MeshExtender.saveSharp(this.box);
		this.doStartAll();
	}
};
MeshTransform.__name__ = true;
MeshTransform.main = function() {
	new MeshTransform();
}
MeshTransform.prototype = {
	onLeftZRotDoIt: function(e) {
		this.box.rotation.z += 0.01;
	}
	,onRightZRotDoIt: function(e) {
		this.box.rotation.z += -0.01;
	}
	,onDownRotDoIt: function(e) {
		this.box.rotation.x += -0.01;
	}
	,onUpRotDoIt: function(e) {
		this.box.rotation.x += 0.01;
	}
	,onRightRotDoIt: function(e) {
		this.box.rotation.y += -Math.PI / 128;
	}
	,onLeftRotDoIt: function(e) {
		this.box.rotation.y += Math.PI / 128;
	}
	,translate: function(v3) {
		this.localDirection.copyFromFloats(v3.x,v3.y,v3.z);
		BABYLON.Matrix.RotationYawPitchRollToRef(this.camera.rotation.y,this.camera.rotation.x,0,this.cameraTransformMatrix);
		BABYLON.Vector3.TransformCoordinatesToRef(this.localDirection,this.cameraTransformMatrix,this.transformedDirection);
		this.camera.cameraDirection.addInPlace(this.transformedDirection);
	}
	,onDownCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,-0.03,0));
	}
	,onUpCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0.03,0));
	}
	,onRightCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0.03,0,0));
	}
	,onLeftCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(-0.03,0,0));
	}
	,onBackCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0,-0.05));
	}
	,onGoCamDoIt: function(e) {
		this.translate(new BABYLON.Vector3(0,0,0.05));
	}
	,onLeftZRotMouseDown: function(e) {
		this.leftZRotEnable = !this.leftZRotEnable;
		if(this.leftZRotEnable) this.rightZRotEnable = false;
	}
	,onRightZRotMouseDown: function(e) {
		this.rightZRotEnable = !this.rightZRotEnable;
		if(this.rightZRotEnable) this.leftZRotEnable = false;
	}
	,onDownRotMouseUp: function(e) {
	}
	,onDownRotMouseDown: function(e) {
		this.downRotEnable = !this.downRotEnable;
		if(this.downRotEnable) this.upRotEnable = false;
	}
	,onUpRotMouseUp: function(e) {
	}
	,onUpRotMouseDown: function(e) {
		this.upRotEnable = !this.upRotEnable;
		if(this.upRotEnable) this.downRotEnable = false;
	}
	,onRightRotMouseUp: function(e) {
	}
	,onRightRotMouseDown: function(e) {
		this.rightRotEnable = !this.rightRotEnable;
		if(this.rightRotEnable) this.leftRotEnable = false;
	}
	,onLeftRotMouseUp: function(e) {
	}
	,onLeftRotMouseDown: function(e) {
		this.leftRotEnable = !this.leftRotEnable;
		if(this.leftRotEnable) this.rightRotEnable = false;
	}
	,onDownCamMouseUp: function(e) {
		this.downCamEnable = false;
	}
	,onDownCamMouseDown: function(e) {
		this.downCamEnable = true;
	}
	,onUpCamMouseUp: function(e) {
		this.upCamEnable = false;
	}
	,onUpCamMouseDown: function(e) {
		this.upCamEnable = true;
	}
	,onRightCamMouseUp: function(e) {
		this.rightCamEnable = false;
	}
	,onRightCamMouseDown: function(e) {
		this.rightCamEnable = true;
	}
	,onLeftCamMouseUp: function(e) {
		this.leftCamEnable = false;
	}
	,onLeftCamMouseDown: function(e) {
		this.leftCamEnable = true;
	}
	,onBackCamMouseUp: function(e) {
		this.backCamEnable = false;
	}
	,onBackCamMouseDown: function(e) {
		this.backCamEnable = true;
	}
	,onGoCamMouseUp: function(e) {
		this.goCamEnable = false;
	}
	,onGoCamMouseDown: function(e) {
		this.goCamEnable = true;
	}
	,onClock: function() {
		var e = null;
		if(this.goCamEnable) this.onGoCamDoIt(e);
		if(this.backCamEnable) this.onBackCamDoIt(e);
		if(this.leftCamEnable) this.onLeftCamDoIt(e);
		if(this.rightCamEnable) this.onRightCamDoIt(e);
		if(this.upCamEnable) this.onUpCamDoIt(e);
		if(this.downCamEnable) this.onDownCamDoIt(e);
		if(this.leftRotEnable) this.onLeftRotDoIt(e);
		if(this.rightRotEnable) this.onRightRotDoIt(e);
		if(this.upRotEnable) this.onUpRotDoIt(e);
		if(this.downRotEnable) this.onDownRotDoIt(e);
		if(this.rightZRotEnable) this.onRightZRotDoIt(e);
		if(this.leftZRotEnable) this.onLeftZRotDoIt(e);
		if(this.changeEnable) this.doChangeMesh();
	}
	,doStopAll: function() {
		this.startAll.style.display = "inline";
		this.stopAll.style.display = "none";
		this.leftRotEnable = false;
		this.rightRotEnable = false;
		this.downRotEnable = false;
		this.upRotEnable = false;
		this.rightZRotEnable = false;
		this.leftZRotEnable = false;
	}
	,doAutoChange: function() {
		this.onChangeMeshClick(null);
	}
	,doStartAll: function() {
		this.startAll.style.display = "none";
		this.stopAll.style.display = "inline";
		this.leftRotEnable = true;
		this.rightRotEnable = false;
		haxe.Timer.delay($bind(this,this.doAutoChange),2000);
	}
	,doChangeMesh: function() {
		this.loop++;
		var val = .1;
		if(this.loop > 2 * this.max) {
			val = -.1;
			this.onChangeMeshClick(null);
		} else if(this.loop < this.max) val = .1; else val = -.1;
		var haut = custom.MeshExtender.createFace(this.box,[16,17,18,19]);
		var bas = custom.MeshExtender.createFace(this.box,[20,21,22,23]);
		haut.getEdge(1).move(new BABYLON.Vector3(val,0,0));
		haut.getEdge(3).move(new BABYLON.Vector3(-val,0,0));
		haut.getEdge(0).move(new BABYLON.Vector3(0,0,-val));
		haut.getEdge(2).move(new BABYLON.Vector3(0,0,val));
		bas.getEdge(1).move(new BABYLON.Vector3(-val,0,0));
		bas.getEdge(3).move(new BABYLON.Vector3(val,0,0));
		bas.getEdge(0).move(new BABYLON.Vector3(0,0,-val));
		bas.getEdge(2).move(new BABYLON.Vector3(0,0,val));
		custom.MeshExtender.updateSharp(this.box);
	}
	,onStopClick: function(e) {
		this.doStopAll();
	}
	,onStartClick: function(e) {
		this.doStartAll();
	}
	,onChangeMeshClick: function(e) {
		this.changeEnable = !this.changeEnable;
		if(!this.changeEnable) {
			this.loop = 0;
			custom.MeshExtender.restoreSharp(this.box);
		}
	}
	,onSceneClick: function(evt) {
		var pickResult = this.scene.pick(evt.clientX,evt.clientY);
		console.log("hit=" + Std.string(pickResult.hit));
		console.log("distance=" + pickResult.distance);
		console.log("meshname=" + pickResult.pickedMesh.name);
		console.log("picking v3=" + Std.string(pickResult.pickedPoint));
	}
	,__class__: MeshTransform
}
var Std = function() { }
Std.__name__ = true;
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
var babylonx = {}
babylonx.culling = {}
babylonx.culling.BB = function() { }
babylonx.culling.BB.__name__ = true;
babylonx.culling.BB.getExtends = function(bb) {
	var ret = bb.extends;
	return js.Boot.__cast(ret , BABYLON.Vector3);
}
babylonx.culling.BB.setExtends = function(bb,v3) {
	bb.extends=v3;;
}
var custom = {}
custom.Corner = function(m,idx,first) {
	this.mesh = m;
	this.index = idx;
	this.firstVertex = first;
	this.children = null;
};
custom.Corner.__name__ = true;
custom.Corner.prototype = {
	toString: function() {
		var str = "";
		if(this.index == null) str += "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else {
			str += "\n corner [" + this.index + "] with children:\t";
			var _g = 0, _g1 = this.children;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				str += "[" + i.index + "] ";
			}
		}
		return str;
	}
	,move: function(v3) {
		var _g = 0, _g1 = this.children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.move(v3);
		}
	}
	,push: function(v) {
		if(this.children == null) this.children = [];
		this.children.push(v);
		v.corner = this;
	}
	,__class__: custom.Corner
}
custom.Edge = function(m,v) {
	this.mesh = m;
	this.start = v;
	this.end = new custom.Vertex(m,-1);
};
custom.Edge.__name__ = true;
custom.Edge.prototype = {
	toString: function() {
		var str = "";
		str += " (" + this.start.index + "," + this.end.index + ") ";
		return str;
	}
	,move: function(v3) {
		var _g = 0, _g1 = this.start.corner.children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.move(v3);
		}
		var _g = 0, _g1 = this.end.corner.children;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.move(v3);
		}
		return this.mesh;
	}
	,__class__: custom.Edge
}
custom.Face = function(m,idx) {
	this.mesh = m;
	this.index = idx;
	this.children = null;
	this.cornerChildren = null;
	this.edgeChildren = null;
	this.indiceArray = [];
};
custom.Face.__name__ = true;
custom.Face.prototype = {
	toString: function() {
		var str = "";
		if(this.index == null) str += "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else {
			str += "\ntriangle [" + this.index + "] \twith vertex children:\t";
			var _g = 0, _g1 = this.children;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				str += "[" + i.index + "]";
			}
			str += "\n\t\t\twith corner children : ";
			var _g = 0, _g1 = this.cornerChildren;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(i != null) str += "[" + i.index + "]";
			}
			str += "\n\t\t\twith edge children : ";
			var _g = 0, _g1 = this.edgeChildren;
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				str += i.toString();
			}
			str += "\n\t\t\twith indices : " + this.indiceArray.join(",") + " \n";
		}
		return str;
	}
	,move: function(v3) {
		var _g = 0, _g1 = this.cornerChildren;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			i.move(v3);
		}
		return this.mesh;
	}
	,getCorner: function(vtxNum) {
		return this.children[vtxNum].corner;
	}
	,getEdge: function(edgeNum) {
		return this.edgeChildren[edgeNum];
	}
	,finishEdgeSetUp: function() {
		var j = 0;
		var _g = 0, _g1 = this.edgeChildren;
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			j++;
			if(j == this.edgeChildren.length) j = 0;
			i.end = this.children[j];
		}
	}
	,push: function(v) {
		if(this.children == null) {
			this.children = [];
			this.cornerChildren = [];
			this.edgeChildren = [];
		}
		this.children.push(v);
		this.cornerChildren.push(v.corner);
		var ed = new custom.Edge(this.mesh,v);
		this.edgeChildren.push(ed);
	}
	,__class__: custom.Face
}
custom.MeshExtender = function() { }
custom.MeshExtender.__name__ = true;
custom.MeshExtender.createVertexInfoArray = function(m,unconditional) {
	if(unconditional == null) unconditional = false;
	var mesh = m;
	var vertexInfoArray = [];
	var arr = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
	var vertexNumber = mesh.getTotalVertices();
	var stride = arr.length / vertexNumber | 0;
	var vi;
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null || unconditional) {
		var _g = 0;
		while(_g < vertexNumber) {
			var i = _g++;
			vi = new custom.Vertex(mesh,i);
			vi.position = new BABYLON.Vector3(arr[i * stride],arr[i * stride + 1],arr[i * stride + 2]);
			vertexInfoArray.push(vi);
		}
		arr = mesh.getVerticesData(BABYLON.VertexBuffer.NormalKind);
		if(stride != (arr.length / vertexNumber | 0) || arr.length / stride != vertexInfoArray.length) {
			console.log("FATALE ERROR :");
			console.log("                 stride=" + stride + " vs arr.length/vertexNumber=" + (arr.length / vertexNumber | 0));
			console.log("                 arr.length=" + arr.length + " vs vertexInfoArray.length=" + vertexInfoArray.length);
		} else {
			var _g = 0;
			while(_g < vertexNumber) {
				var i = _g++;
				vertexInfoArray[i].normal = new BABYLON.Vector3(arr[i * stride],arr[i * stride + 1],arr[i * stride + 2]);
			}
		}
		custom.MeshExtender.setDynamic(m,"vertexInfoArray",vertexInfoArray);
	} else vertexInfoArray = custom.MeshExtender.getDynamic(m,"vertexInfoArray");
	custom.MeshExtender.createCorner(m);
	custom.MeshExtender.createTriangle(m);
	return vertexInfoArray;
}
custom.MeshExtender.verticesToString = function(m) {
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) custom.MeshExtender.createVertexInfoArray(m);
	var title = "\n\n             ** Vertices info **\n";
	var str = "";
	str += "\nTotal vertices : " + m.getTotalVertices();
	str += "\nTotal indices : " + m.getTotalIndices();
	str += "\n";
	str += custom.MeshExtender.vertexInfoArrayToString(m);
	str += "\n";
	str += custom.MeshExtender.cornerArrayToString(m);
	str += "\n";
	str += custom.MeshExtender.faceArrayToString(m);
	str += "\n\nIndices:\n";
	var arr = m.getIndices();
	var len = m.getTotalIndices();
	var _g = 0;
	while(_g < len) {
		var vi = _g++;
		str += "[" + vi + "]" + arr[vi] + "\n";
	}
	return title + str;
}
custom.MeshExtender.vertexInfoArrayToString = function(m) {
	var title = "\nPosition and normal : ";
	var str = "\n";
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) str = "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else {
		var _g = 0, _g1 = custom.MeshExtender.getDynamic(m,"vertexInfoArray");
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			str += i.toString() + "\n";
		}
	}
	return title + str;
}
custom.MeshExtender.getVertex = function(m,vNum) {
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) custom.MeshExtender.createVertexInfoArray(m);
	return custom.MeshExtender.getDynamic(m,"vertexInfoArray")[vNum];
}
custom.MeshExtender.getTriangle = function(m,faceNum) {
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) custom.MeshExtender.createVertexInfoArray(m);
	return js.Boot.__cast(custom.MeshExtender.getDynamic(m,"faceArray")[faceNum] , custom.Face);
}
custom.MeshExtender.getCorner = function(m,cornerNum) {
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) custom.MeshExtender.createVertexInfoArray(m);
	return js.Boot.__cast(custom.MeshExtender.getDynamic(m,"cornerArray")[cornerNum] , custom.Corner);
}
custom.MeshExtender.updateSharp = function(m) {
	var arr = [];
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") != null) {
		var _g = 0, _g1 = custom.MeshExtender.getDynamic(m,"vertexInfoArray");
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			arr.push(i.position.x);
			arr.push(i.position.y);
			arr.push(i.position.z);
		}
	}
	m.updateVerticesData(BABYLON.VertexBuffer.PositionKind,arr);
	return m;
}
custom.MeshExtender.saveSharp = function(m) {
	if(custom.MeshExtender.saveStack == null) custom.MeshExtender.saveStack = [];
	custom.MeshExtender.saveStack.push(m.getVerticesData(BABYLON.VertexBuffer.PositionKind));
	return m;
}
custom.MeshExtender.restoreSharp = function(m) {
	if(custom.MeshExtender.saveStack != null) {
		if(custom.MeshExtender.saveStack.length > 0) {
			m.updateVerticesData(BABYLON.VertexBuffer.PositionKind,custom.MeshExtender.saveStack[custom.MeshExtender.saveStack.length - 1]);
			custom.MeshExtender.createVertexInfoArray(m,true);
		}
	}
	return m;
}
custom.MeshExtender.cornerArrayToString = function(m) {
	var title = "\nList of corner (vertices with same position) : ";
	var str = "\n";
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) str = "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else str += custom.MeshExtender.getDynamic(m,"cornerArray").toString();
	return title + str;
}
custom.MeshExtender.createCorner = function(m) {
	custom.MeshExtender.setDynamic(m,"cornerArray",null);
	var done = [];
	var corner = null;
	var idx = 0;
	var _g = 0, _g1 = custom.MeshExtender.getDynamic(m,"vertexInfoArray");
	while(_g < _g1.length) {
		var i = _g1[_g];
		++_g;
		if(!custom.MeshExtender.isDone(done,i.index)) {
			var _g2 = 0, _g3 = custom.MeshExtender.getDynamic(m,"vertexInfoArray");
			while(_g2 < _g3.length) {
				var j = _g3[_g2];
				++_g2;
				if(i.index != j.index) {
					if(i.position.equals(j.position)) {
						if(corner == null) {
							corner = new custom.Corner(m,idx,i.index);
							idx++;
							corner.push(i);
							done.push(i.index);
						}
						corner.push(j);
						done.push(j.index);
					}
				}
			}
			if(corner != null) {
				if(custom.MeshExtender.getDynamic(m,"cornerArray") == null) custom.MeshExtender.setDynamic(m,"cornerArray",[]);
				custom.MeshExtender.getDynamic(m,"cornerArray").push(corner);
			}
			corner = null;
		}
	}
}
custom.MeshExtender.faceArrayToString = function(m) {
	var title = "\nList of triangle : ";
	var str = "\n";
	if(custom.MeshExtender.getDynamic(m,"vertexInfoArray") == null) str = "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else str += custom.MeshExtender.getDynamic(m,"faceArray").toString();
	return title + str;
}
custom.MeshExtender.createTriangle = function(m) {
	var face = null;
	var idx = 0;
	var arr = m.getIndices();
	var len = arr.length;
	var v;
	var $it0 = new net.flash_line.util.StepIterator(0,len,3);
	while( $it0.hasNext() ) {
		var i = $it0.next();
		face = new custom.Face(m,idx);
		idx++;
		var $it1 = new net.flash_line.util.StepIterator(0,3);
		while( $it1.hasNext() ) {
			var j = $it1.next();
			v = custom.MeshExtender.getDynamic(m,"vertexInfoArray")[arr[i + j]];
			face.push(v);
			face.indiceArray.push(i + j);
			v.faceArray.push(face);
		}
		face.finishEdgeSetUp();
		if(custom.MeshExtender.getDynamic(m,"faceArray") == null) custom.MeshExtender.setDynamic(m,"faceArray",[]);
		custom.MeshExtender.getDynamic(m,"faceArray").push(face);
	}
}
custom.MeshExtender.createFace = function(m,indArr,idx) {
	var face = new custom.Face(m,idx);
	var len = indArr.length;
	var v;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		v = custom.MeshExtender.getDynamic(m,"vertexInfoArray")[indArr[i]];
		face.push(v);
		face.finishEdgeSetUp();
	}
	return face;
}
custom.MeshExtender.isDone = function(d,n) {
	var ret = false;
	var _g = 0;
	while(_g < d.length) {
		var di = d[_g];
		++_g;
		if(n == di) {
			ret = true;
			break;
		}
	}
	return ret;
}
custom.MeshExtender.setDynamic = function(m,prop,val) {
	m[prop]=val;;
	return m;
}
custom.MeshExtender.getDynamic = function(m,prop) {
	return m[prop];;
}
custom.Vertex = function(m,i) {
	this.mesh = m;
	this.index = i;
	this.faceArray = [];
};
custom.Vertex.__name__ = true;
custom.Vertex.prototype = {
	toString: function() {
		var str = "";
		if(this.position == null) str += "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before."; else {
			str += "vertex [" + this.index + "]";
			str += " position=" + Std.string(this.position) + "   ";
			str += "normal=" + Std.string(this.normal);
		}
		return str;
	}
	,move: function(v3) {
		this.position.addInPlace(v3);
	}
	,__class__: custom.Vertex
}
var haxe = {}
haxe.Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe.Timer.__name__ = true;
haxe.Timer.delay = function(f,time_ms) {
	var t = new haxe.Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
}
haxe.Timer.prototype = {
	run: function() {
		console.log("run");
	}
	,stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,__class__: haxe.Timer
}
var js = {}
js.Boot = function() { }
js.Boot.__name__ = true;
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		if(cl == Class && o.__name__ != null) return true; else null;
		if(cl == Enum && o.__ename__ != null) return true; else null;
		return o.__enum__ == cl;
	}
}
js.Boot.__cast = function(o,t) {
	if(js.Boot.__instanceof(o,t)) return o; else throw "Cannot cast " + Std.string(o) + " to " + Std.string(t);
}
js.Browser = function() { }
js.Browser.__name__ = true;
var net = {}
net.flash_line = {}
net.flash_line.util = {}
net.flash_line.util.StepIterator = function(min,max,step) {
	this.min = min;
	this.max = max;
	if(step == null) {
		if(min < max) step = 1; else step = -1;
	}
	if(min <= max && step < 0 || min > max && step >= 0) step *= -1;
	this.step = step;
};
net.flash_line.util.StepIterator.__name__ = true;
net.flash_line.util.StepIterator.prototype = {
	next: function() {
		var ret = this.min;
		this.min += this.step;
		return ret;
	}
	,hasNext: function() {
		var ret;
		if(this.step > 0) ret = this.min < this.max; else ret = this.min > this.max;
		return ret;
	}
	,__class__: net.flash_line.util.StepIterator
}
var $_;
function $bind(o,m) { var f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; return f; };
Math.__name__ = ["Math"];
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i) {
	return isNaN(i);
};
String.prototype.__class__ = String;
String.__name__ = true;
Array.prototype.__class__ = Array;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
custom.MeshExtender.EMPTY_ERROR_MSG = "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before.";
custom.MeshExtender.VERTEX_INDEX_ERROR_MSG = "index in a Vertex's instance is not valid.";
custom.MeshExtender.NORMAL_EQUAL_ERROR_MSG = "Vertices with same position must have not equal normal.";
custom.MeshExtender.POSITION_EQUAL_ERROR_MSG = "Vertices with same normal must have not equal position.";
js.Browser.document = typeof window != "undefined" ? window.document : null;
MeshTransform.main();
})();
