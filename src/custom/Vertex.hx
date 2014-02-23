/**
 * Copyright (c) jm Delettre.
 */

package custom ;
import babylonx.mesh.Mesh;
import babylonx.tools.math.Vector3;


class Vertex {
	public var mesh(default,null):Mesh;
	public var index(default, null):Int;
	//
	//public var edgeArray(default, default):Array<Edge>;
    public var faceArray(default, default):Array<Face>;
    //
	public var corner(default,default):Corner;
	public var position:Vector3;
    public var normal:Vector3;
    //
	public function new (m:Mesh,i:Int){
        mesh = m;  	
		index = i;
		faceArray = [];
    }
	public function move (v3:Vector3){
       position.addInPlace(v3);
    }
	/*function updateMeshSharp (){
      var arr = box.getVerticesData(VertexBuffer.PositionKind);
	  mesh.
    }*/
	
	/*
	 * var arr = box.getVerticesData(VertexBuffer.PositionKind);
		var v = 4; 
		arr[v * 3 + 0] += val;			
		v = 8;
		arr[v * 3 + 0] += val;	
		v = 18;
		arr[v * 3 + 0] += val;	
		//
		v = 5; 
		arr[v * 3 + 0] += val;			
		v = 15;
		arr[v * 3 + 0] += val;	
		v = 17;
		arr[v * 3 + 0] += val;	
		//
		v = 6; 
		arr[v * 3 + 0] += val;			
		v = 14;
		arr[v * 3 + 0] += val;	
		v = 22;
		arr[v * 3 + 0] += val;	
		//
		v = 7; 
		arr[v * 3 + 0] += val;			
		v = 9;
		arr[v * 3 + 0] += val;	
		v = 21;
		arr[v * 3 + 0] += val;	
		//
		
		box.updateVerticesData (VertexBuffer.PositionKind, arr);
		*/
	public function toString() :String {
		var str = "";
		if (position == null) {
			 str += MeshExtender.EMPTY_ERROR_MSG;
		} else {
			str += "vertex [" + index+ "]" ;
			str += " position=" + position+"   ";
			str += "normal=" + normal ;
		}
		return str;
    }	
}

  