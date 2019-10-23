<?php
header('Content-Type: text/html');
ini_set('max_execution_time', '0');
require_once "class/functions.php";
require_once "class/user.php";
require_once "class/database.php";
$Functions = new Functions();
$Functions->cors();
$user = new user();
$database = new database();

function getFirstSpot() 
{
	$dbconnection = database::open();
	$SelectFirstSpot = $dbconnection->prepare("SELECT spot_id FROM u_spots ORDER BY spot_id ASC LIMIT 1");
	$SelectFirstSpot->execute();
	$dbconnection = database::close();	
	$row = $SelectFirstSpot->fetch(PDO::FETCH_ASSOC);
	return $row["spot_id"];
}
ob_start();
function doCheck()
{	
    $last_checkid = getFirstSpot();
	$database = new database();
	for(;;)
	{
		$last_checkid = is_null($last_checkid) ? getFirstSpot() : intval($last_checkid);
		$dbconnection = database::open();
		$SelectUsersSpots = $dbconnection->prepare("SELECT * FROM u_spots WHERE spot_id = :last_checkid LIMIT 1");
		$SelectUsersSpots->bindParam(":last_checkid", $last_checkid, PDO::PARAM_INT);
		$SelectUsersSpots->execute();
		$dbconnection = database::close();
		$row = $SelectUsersSpots->fetch(PDO::FETCH_ASSOC);	
		if ($SelectUsersSpots->rowCount() > 0)	
		{
			$spot_id = $row["spot_id"];
			$spot_name = $row["spot_name"];
			$spot_lat = (float)$row["spot_lat"];
			$spot_long = (float)$row["spot_long"];
			$found = Functions::checkFires($spot_lat, $spot_long);
			if ($found === 1)
			{
				if (user::sendMailAlert($spot_id) != 0)
				{
				user::updateSpotWarning($spot_id);
				}
				echo "[Alerta] o spot id " . $spot_id . " está em incendio (Coordenadas: " . $spot_lat . ", " . $spot_long . ").<br/>";				
			}
			echo "ID " . $last_checkid . " verificado com sucesso.<br/>";
			flush();
			ob_flush();
			sleep(2);
			$last_checkid++;
		}
		else
		{
			//sleep(5);
			$last_checkid = null;
		}
		$SelectUsersSpots = null;
        //flush();		
	}
}
ob_end_flush();
doCheck();
?>