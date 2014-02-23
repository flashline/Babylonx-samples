/**
 * Copyright (c) jm Delettre.
 */

package custom ;
import babylonx.mesh.Mesh;
import babylonx.tools.math.Vector3;

/**
 * edge 
 */
class Edge {
	public var mesh(default,null):Mesh;
	//public var index(default,null):Int;
    public var start(default, null):Vertex;
	public var end(default, default):Vertex;
	
    public function new (m:Mesh,v:Vertex){
        mesh = m;  
		//index = v.index;
		start = v;
		end = new Vertex(m, -1);
    }
	//
	public function move(v3:Vector3) : Mesh {
		for (i in start.corner.children) {		
			i.move(v3);
		}
		for (i in end.corner.children) {		
			i.move(v3);
		}
		return mesh;
	}
	//
	public function toString() :String {
		var str = ""; 
		//str += "\nedge [" + index + "] \tstart vertex :[" + start.index + "]\tend vertex :[" + end.index + "]\t" ;		
		str += " ("+start.index + ","+end.index + ") " ;			
		return str;
    }
	/*public function cornerToString() :String {
		var str = ""; 
		if (index == null) {
			 str += MeshExtender.EMPTY_ERROR_MSG;
		} else {
			TODO		
		}
		return str;
    }*/
	
}

  