<?php
	error_reporting (4) ;	 	
	$id=$_POST["id"];
	$pwd=$_POST["pwd"];
	
	if (!isset($id)) {
		require_once "login.htm.inc.php";	
		exit;
	} else {
		if ($id=="fmafwo" || $id="Fmafwo" ) {
			if($pwd!="do3hb5") {
				echo "Login inconnu !!!";exit ;
			}
		} else   {
			echo "Login inconnu !!!";exit ;
		}
	}
?>