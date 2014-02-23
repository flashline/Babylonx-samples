/**
 * Copyright (c) jm Delettre.
 */

package custom ;
import babylonx.mesh.Mesh;
import babylonx.mesh.VertexBuffer;
import babylonx.tools.math.Vector3;
import custom.Vertex;
import net.flash_line.util.StepIterator;


class MeshExtender {
	/** properties added to Mesh as dynamic vars 
	public var vertexInfoArray  :Array<Vertex> ;
	public var cornerArray  :Array<Corner> ;
	public var faceArray  :Array<Face> ;
	*/	
	/**
	 * in Mesh.hx added by flnet TODO otherwise
	var _vertexBuffers:Dynamic; // see VertexBuffer xxxxKind
	*/
	static public inline var EMPTY_ERROR_MSG:String = "vertexInfoArray is empty. Call Mesh.getVertexInfoArray() before." ;
	static public inline var VERTEX_INDEX_ERROR_MSG:String = "index in a Vertex's instance is not valid." ;
	static public inline var NORMAL_EQUAL_ERROR_MSG:String = "Vertices with same position must have not equal normal." ;
	static public inline var POSITION_EQUAL_ERROR_MSG:String = "Vertices with same normal must have not equal position." ;
	static var saveStack:Array<Array<Float>> ;
	public static function createVertexInfoArray (m:Mesh,?unconditional:Bool=false):Array<Vertex> {
        var mesh:Mesh = m; 
		var vertexInfoArray:Array<Vertex>=[];
		var arr=mesh.getVerticesData(VertexBuffer.PositionKind);  
		var vertexNumber = mesh.getTotalVertices();		
		var stride:Int = Std.int(arr.length / vertexNumber) ;
		var vi:Vertex;
		if (getDynamic(m,"vertexInfoArray")==null || unconditional ) {
			for (i in 0...vertexNumber) {
				vi = new Vertex(mesh,i);
				vi.position = new Vector3(arr[i * stride], arr[i * stride + 1], arr[i * stride + 2]);				
				vertexInfoArray.push(vi);			
			}		
			arr=mesh.getVerticesData(VertexBuffer.NormalKind);  
			if (stride != Std.int(arr.length / vertexNumber) || (arr.length/stride)!=vertexInfoArray.length) {
				trace("FATALE ERROR :");
				trace("                 stride=" + stride + " vs arr.length/vertexNumber=" + Std.int(arr.length / vertexNumber));
				trace("                 arr.length=" + arr.length + " vs vertexInfoArray.length=" + vertexInfoArray.length);
				
			} else {
				for (i in 0...vertexNumber) {
					vertexInfoArray[i].normal = new Vector3(arr[i * stride], arr[i * stride + 1], arr[i * stride + 2]);			
				}
				
			}
			setDynamic(m,"vertexInfoArray",vertexInfoArray );
		} else {
			vertexInfoArray = getDynamic(m,"vertexInfoArray") ;
		}
		createCorner(m);
		createTriangle(m);
			
		return vertexInfoArray;		
    }
	public static function verticesToString (m:Mesh):String {
		if (getDynamic(m,"vertexInfoArray") == null ) createVertexInfoArray (m);
		var title:String = "\n\n             ** Vertices info **\n";
		var str:String = "";
		str += "\nTotal vertices : " + m.getTotalVertices() ; 
		str += "\nTotal indices : " +  m.getTotalIndices () ;
		str += "\n";
		str += vertexInfoArrayToString (m);
		str += "\n";
		str += cornerArrayToString  (m);
		str += "\n";
		str += faceArrayToString (m);
		
		//
		str += "\n\nIndices:\n";
		var arr = m.getIndices(); var len = m.getTotalIndices ();
		for (vi in 0...len) {
			str += "[" + vi + "]" + arr[vi]+"\n";			
		}	
		return title+str;
	}
	public static function vertexInfoArrayToString (m:Mesh):String {
		var title:String = "\nPosition and normal : ";
		var str:String = "\n";
		//var vertexInfoArray:Array<Dynamic>=[];
		if (getDynamic(m,"vertexInfoArray") == null ) {
			str = EMPTY_ERROR_MSG;
		} else {			
			for (i in getDynamic(m,"vertexInfoArray")) {
				str +=  i.toString() + "\n"; //var vi:Int = 0; "[" + vi + "] " + ; 	vi++;
			}
		}
		return title+str;		
	}
	
	
	public static function getVertex (m:Mesh, vNum:Int):Vertex {
		if (getDynamic(m,"vertexInfoArray") == null ) createVertexInfoArray (m);
		return getDynamic(m,"vertexInfoArray")[vNum];
	}
	public static function getTriangle (m:Mesh, faceNum:Int):Face {
		if (getDynamic(m,"vertexInfoArray") == null ) createVertexInfoArray (m);
		return cast(getDynamic(m,"faceArray")[faceNum],Face);
	}
	public static function getCorner (m:Mesh, cornerNum:Int):Corner {
		if (getDynamic(m,"vertexInfoArray") == null ) createVertexInfoArray (m);
		return cast(getDynamic(m,"cornerArray")[cornerNum],Corner);
	}
	
	public static function updateSharp (m:Mesh):Mesh {
		var arr = [];
		if (getDynamic(m,"vertexInfoArray") != null ) {
			for (i in getDynamic(m,"vertexInfoArray")) {
				arr.push(i.position.x);
				arr.push(i.position.y);
				arr.push(i.position.z);			
			}	
		}
		m.updateVerticesData (VertexBuffer.PositionKind, arr);
		return m;
	}
	public static function saveSharp (m:Mesh):Mesh {
		if (saveStack == null) saveStack = [];
		saveStack.push(m.getVerticesData (VertexBuffer.PositionKind));
		return m;
	}
	public static function restoreSharp (m:Mesh):Mesh {
		if (saveStack != null) {
			if (saveStack.length>0) {
				m.updateVerticesData (VertexBuffer.PositionKind, saveStack[saveStack.length - 1]);
				createVertexInfoArray (m, true);
			}
		}
		return m;
	}
	
	
	static function cornerArrayToString (m:Mesh):String {
		var title:String = "\nList of corner (vertices with same position) : ";
		var str:String = "\n"; 
		if (getDynamic(m,"vertexInfoArray") == null ) {
			str = EMPTY_ERROR_MSG ;
		} else {
			
			str += getDynamic(m,"cornerArray").toString();
		}
		return title+str;		
	}
	static function createCorner (m:Mesh):Void {
		setDynamic(m,"cornerArray",null);
		var done:Array<Int>=[];
		var corner:Corner = null;
		var idx:Int = 0;
		for (i in getDynamic(m,"vertexInfoArray")) {
			if (!isDone(done, i.index)) {
				for (j in getDynamic(m,"vertexInfoArray")) {
					if (i.index != j.index) {
						if (i.position.equals(j.position)) {	
							//match
							if (corner == null) { 								
								corner=new Corner(m,idx,i.index);idx++;
								corner.push(i);
								done.push(i.index);
							}
							corner.push(j);
							done.push(j.index);							
						}						
					}					
				}
				if (corner != null) {
					if (getDynamic(m,"cornerArray") == null) setDynamic(m,"cornerArray",[]);
					getDynamic(m,"cornerArray").push(untyped corner);
				}
				corner = null;
			}
		}		
	}
	static function faceArrayToString (m:Mesh):String {
		var title:String = "\nList of triangle : ";
		var str:String = "\n"; 
		if (getDynamic(m,"vertexInfoArray") == null ) {
			str = EMPTY_ERROR_MSG ;
		} else {			
			str += getDynamic(m,"faceArray").toString();
		}
		return title+str;		
	}
	static function createTriangle (m:Mesh):Void {
		var face:Face = null;
		var idx:Int = 0;
		var arr =  m.getIndices(); var len = arr.length; var v:Vertex;
		for (i in new StepIterator(0, len, 3)) { 			
			face=new Face(m,idx);idx++;
			for (j in new StepIterator(0, 3 ) ) {
				v = getDynamic(m,"vertexInfoArray")[arr[i + j]]	; 
				face.push(v);	
				face.indiceArray.push(i + j) ;
				//
				v.faceArray.push(face);
			}
			face.finishEdgeSetUp();
			if (getDynamic(m,"faceArray") == null) setDynamic(m,"faceArray",[]); 
			getDynamic(m,"faceArray").push(untyped face);
		}
	}
	public static function createFace (m:Mesh,indArr:Array<Int>,?idx:Int=null):Face {
		var face:Face = new Face(m,idx);	
		var len = indArr.length; var v:Vertex;
		for (i in 0...len) { 			
			v = getDynamic(m,"vertexInfoArray")[indArr[i]]	; 
			face.push(v);
			face.finishEdgeSetUp();			
		}
		return face;
	}
	
	static function isDone (d:Array<Int>,n:Int):Bool {
		var ret:Bool = false;
		for (di in d) {
			if (n == di) {
				ret = true;
				break;
			}
		}
		return ret;
	}
	
	static function setDynamic (m:Mesh,prop:String,?val:Dynamic=null) {
		untyped __js__ ("m[prop]=val;");
		return untyped m;
	}
	static function getDynamic (m:Mesh,prop:String)  {
		return untyped __js__ ("m[prop];");
	}
	
}

  
        