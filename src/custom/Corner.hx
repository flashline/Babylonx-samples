/**
 * Copyright (c) jm Delettre.
 */

package custom ;
import babylonx.mesh.Mesh;
import babylonx.tools.math.Vector3;


class Corner {
	public var mesh(default,null):Mesh;
	public var index(default,null):Int;
    public var children(default, null):Array<Vertex>;
    public var firstVertex(default, null):Int;
    public function new (m:Mesh,idx:Int,?first:Int=null){
        mesh = m;  
		index = idx;
		firstVertex = first ;
		children = null;
    }
	public function push(v:Vertex) : Void {
		//index++;
		if (children == null) children = [];
		children.push(v);
		v.corner = this;
	}
	//
	public function move(v3:Vector3) : Void {
		for (i in children) {
			i.move(v3);
		}
	}
	//
	public function toString() :String {
		var str = "";
		if (index == null) {
			 str += MeshExtender.EMPTY_ERROR_MSG;
		} else {
			//str += "[" + index+ "]" ;
			str += "\n corner [" + index+ "] with children:\t" ;
			
			for (i in children) {
				str +=  "[" + i.index + "] ";
				/* edges: "; 
				for (j in i.edgeArray) {
					str += j.toString(); 
				}
				*/
			}
		}
		return str;
    }
	/*
	public function edgeToString() :String {
		var str = "";
		if (index == null) {
			 str += MeshExtender.EMPTY_ERROR_MSG;
		} else {
			//str += "[" + index+ "]" ;
			str += "\n corner [" + index+ "] edges: " ;
			
		}
		return str;
    }
	*/
}

  