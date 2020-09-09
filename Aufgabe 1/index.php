<?php
/*
 Internetseite des Kurses "Programmieren" mit Aggregation der Steckbriefe der Teilnehmer
 (c) Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
 */
// includes
include "authorize.php";
$filename = getFilename();
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<!--<link rel="icon" href="../Pics/typescript32.jpg" type="image/png" />-->
		<script type="text/javascript">
			function Refresh() {
				var iCount = 0;
				var oFrame;
				while(( oFrame = document.getElementById("f" + iCount)) != null) {
					//oFrame.contentWindow.location.reload(true);
					oFrame.src = oFrame.src + "?r=" + Math.round(Math.random() * 1000000);
					iCount++;
				}
			}
		</script>
		<link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">  
		<title><?php print $title.$titleExtension;?></title>
</head>
<body bgcolor="#eeeeee" onLoad="Refresh()" style="font-family: 'Lato', sans-serif; font-size:12pt;">
	<div style="position:absolute; top:5px; left:260px; width:830px; overflow:auto;">
		<?php include "../Code/aggregateLights.php" ?>
</div>
<div style="position:fixed; top:0px; left:0px; width:230px; height:100%; background: #ffffff; padding: 10px; overflow-y:auto;">
	<!--
	<div style="position:absolute; top:60px; left:10px; width:32px; height:32px; background: #ffffff">
		<img src="../Pics/typescript32.jpg" alt="logo" border="0"></a>
	</div>
	-->
	<a href="https://webservdm.hs-furtwangen.de/dm.php?template=home" target="_blank"><img src="../Pics/logo.png" alt="logo" border="0"></a>
	<br> 
	<br>
	<p>
		<strong><?php print $title;?>
		<br/>
		</strong>
		Dozent: Adrian Vögtle
		<?php
		if ($UserRole == "Betreuer" || $UserRole == "Prof") {
			print '
		<form action="' . $currentFile . '" method="POST">
			';
			print '
			<select name="filter" size="1" onchange="submit();">
				<option value="0" ' . ($filter == "0" ? "selected" : "") . '>alle</option>
				<option value="1" ' . ($filter == "1" ? "selected" : "") . '>rot</option>
				<option value="2" ' . ($filter == "2" ? "selected" : "") . '>grün</option>
			</select>
			<input type="submit" name="form" value="filter" title="Gruppenfilter anwenden">
			';
			print '
		</form>
		';
		}
		?> 
		<br />
		<br />
		<strong>Anprechpartner</strong>
		<br />
		Fragen: 
		<br />
		ins <a href="https://www.dm.hs-furtwangen.de/dm.php?template=projects_nachrichten&projectid=1908">Forum</a> eintragen!
		<br/>
		oder in <a href="https://discord.gg/aKfbU7f">Discord</a> reinschreiben.
		<br/>
		Probleme:
		<?php print '<a href="' . $coachmail[1] . '">B</a>';?> |
		<?php print '<a href="' . $coachmail[2] . '">A</a>';?>
		<br/>
		<?php print('Katastrophen:<a href="mailto:' . $profmail . '"> Prof</a>'); ?>
		<br/>
		Studies:
		<?php print '<a href="' . $groupmail[1] . '">B</a>';?> |
		<?php print '<a href="' . $groupmail[2] . '">A</a>';?> |
		<?php print '<a href="' . $groupmail[0] . '">Alle</a>';?>
		<br/>
		<br/>
		<strong>Konzept</strong></a>
		Abgabe bis <?php print $deadlineKonzept;?>!
		<br/>
		<br/>
		<strong>Aufgaben</strong></a>
		Abgabe bis <?php print $deadline;?>!

		<!-- 
		Du hattest ein Easter-Egg erwartet? Da muss ich dich enttäuschen.
		Allerdings kannst du dafür dieses Beispiel betrachten, wie es NICHT gemacht wird:
		Mit ganz vielen <br />s.
		
		Ich bin gespannt ob einer von euch am 10.04.2019 schon dieses Kommentar entdeckt hat.
		
		Erwähnt es einfach in der nächsten Vorlesung und ich schreib bei der nächsten Aufgabenstellung vielleicht einen Tipp rein.
		-->

		<br/>
		<a href="Aufgaben/Aufgabe_02/Aufgabe_02.pdf" target="_blank">Aufgabe 02 - eure erste semantische HTML-Seite!</a>
		<br/>
		<a href="Aufgaben/Aufgabe_01/Aufgabe_01.pdf" target="_blank">Aufgabe 01 - eure (beinahe) erste HTML-Seite!</a>
		<br/>
		<a href="Aufgaben/Anleitung/Anleitung_Praktikum_1.pdf" target="_blank">Aufgabe 00 - Anleitung Steckbrief</a>
		<br/>
		<!--
		<br>
		<a href="Aufgaben/Anleitung-Aufgabe-0.pdf" target="_blank">Anleitung Registrierung und Setup Eclipse</a>
		-->
		
		<!--
		HEY, HIER GIBT ES NICHTS ZU SEHEN!
		Abschlussarbeit verlängert bis 21.2.
		<br>
		-->	
		
		<br/>
		<strong>Vorlesung</strong>
		<br/>
		<a href="../Vorlesung/Folien" target="_blank">Folien-Vorlesung (wird immer Mittwochs geupdated)</a>
		<br/>
		<!--
		<a href="../Vorlesung/Code-Vorlesung.zip" target="_blank">Code aus den Vorlesungen</a>
		<br/>
		-->
		<a href="../Vorlesung/EIA-1-Scriptum-Teil-1.pdf" target="_blank">Kurzskript – Teil 1 - HTML/CSS</a>
		<br/>
		<!--
		<a href="../Vorlesung/EIA-1-Scriptum-Gesamt.pdf" target="_blank">Kurzskript gesamt – HTML/CSS/TypeScript</a>
		<br/>
		-->

		<strong>Weiterführende Links</strong>
		<br/>
		<a href="http://www.typescriptlang.org/" target="_blank">TypeScriptLang.org</a>
		<br/>
		<a href="http://www.amazon.de/Pro-TypeScript-Application-Scale-JavaScript-Development/dp/1430267917" target="_blank">Pro TypeScript (Fenton, 2014)</a>
		<br/>
		<br/>
		
		<strong>Werkzeuge</strong><br />
		<!--	
		<a href="http://nodejs.org/download/" target="_blank">NodeJS</a> |  
		<a href="http://www.eclipse.org/" target="_blank">Eclipse</a><br/> -->
		<!-- <a href="http://download.aptana.com/studio3/plugin/install" target="_blank">Aptana Plugin</a> | -->
		<!--<a href="http://eclipse-update.palantir.com/eclipse-typescript/" target="_blank">TypeScript Plugin</a><br/>-->
		<a href="https://code.visualstudio.com/" target="_blank">VS Code</a><br/>
		<a href="https://pages.github.com/" target="_blank">Github pages</a><br/>
		
		<br/>
		<strong>Startpaket und Registrierung</strong><br />
		<a href="Startpaket/Startpaket.zip">Startpaket</a><br />
		<a href="register.php" target="_blank">Steckbrief registrieren</a>
	</p>
	<!--
	<div style="font-size:x-small; position:fixed; bottom: 0px;left:0px;background: #ffffff;margin:0;padding:2px 10px">
		&copy; Adrian Vögtle, HFU
	</div>
	-->
</div>
</body>
</html>