
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<?
$url="index.php";
	
// Par défaut : anglais
$directoryListing = "Folders in server root (\"www\")";
$noDir = "no folder";
$presentation = "This page display folders in server root. You can delete this page if you want to organize differently the folder. There'e a backup oh this file in &quot;safe&quot; directory (index-safe.php).";

$browser_languages = explode(",", getenv("HTTP_ACCEPT_LANGUAGE"));
$nb_browser_languages = sizeof($browser_languages);
$browser_lang = "";	// ne pas initialiser
$biContinue = true;

for ($niI = 0; $biContinue==true && $niI < $nb_browser_languages; $niI++)
{
	$biContinue = false;
	$lg = explode("-", $browser_languages[$niI]);
	switch ($lg[0])
	{
	case "fr" : $directoryListing = "R&eacute;pertoire(s) &agrave; la racine du serveur (\"www\")";
				$noDir = "aucun répertoire";
				$presentation = "Cette page permet de visualiser les r&eacute;pertoires plac&eacute;s &agrave; la racine du serveur. Si vous souhaitez organiser autrement le r&eacute;pertoire &quot;www&quot;, vous pouvez effacer ce fichier. Il en existe une copie de sauvegarde dans le r&eacute;pertoire &quot;safe&quot; (index-safe.php).";
				break;
	case "en" : break;
	default: $biContinue = true;
	}
}
				
?>
<html>
<head>
<title>Liste du dossier</title>

</head>

<body>
<table>
<?
$rep=opendir('.');
$bAuMoinsUnRepertoire = false;
//
while ( $file = readdir($rep)    ) {
	if($file != '..' && $file !='.' && $file !=''){ 
		//if (is_dir($file)){
			$arr[]=$file;			
		//}
	}
}
closedir($rep);
sort($arr);
$nb = count($arr);
//
for ($i=0;$i<$nb;$i++) {
		$file=$arr[$i];
		$bAuMoinsUnRepertoire = true;
		if (is_dir($file))  $lnk="&nbsp;&nbsp;Dossier : &nbsp;"."<a href='$file/' class='text1'>$file</a>";
		else $lnk="&nbsp;&nbsp;Fichier : &nbsp;"."<a href='$file' class='text1'>$file</a>";
		print("<tr><td nowrap class='text1'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>");
		print("<td width='100%' class='text1'>");
		print $lnk."\n";
		print("</td></tr>");
		
	
}
if ($bAuMoinsUnRepertoire == false) {
	print("<tr><td nowrap class='text1'><div align='center'>-&nbsp; $noDir &nbsp;-</div></td>");
	print("</td></tr>");
}

closedir($rep);
clearstatcache();
?>
</table>
</body>
</html>
