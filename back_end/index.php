<?php
require_once "class/database.php";
require_once "class/functions.php";
$Functions = new Functions();
$Functions->cors();
$spot_id = 10;
date_default_timezone_set("America/Sao_Paulo");
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();	
		$SelectUserSpots = $dbconnection->prepare("SELECT spot_lastwarning FROM u_spots WHERE spot_id = :spot_id");
		$SelectUserSpots->bindParam(":spot_id", $spot_id, PDO::PARAM_INT);
		$SelectUserSpots->execute();
		$dbconnection = $database->close();
		$row = $SelectUserSpots->fetch(PDO::FETCH_ASSOC);
		if ($SelectUserSpots->rowCount() > 0)	
		{
			$now = date("Y-m-d H:i:s");
			$spot_lastwarning = $row["spot_lastwarning"];
$d1= new DateTime($now); 
$d2= new DateTime($spot_lastwarning);
$interval= $d1->diff($d2);
echo ($interval->days * 24) + $interval->h;
		}	
		
?>