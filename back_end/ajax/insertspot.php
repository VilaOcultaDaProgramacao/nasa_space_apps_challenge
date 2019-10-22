<?php
header('Content-Type: application/json');
require_once "../class/functions.php";
$Functions = new Functions();
$Functions->cors();
$_POST = !empty($_POST) ? $_POST : json_decode(file_get_contents("php://input"), true);
if (!empty($_POST['token']) && !empty($_POST['spot_name']) && !empty($_POST['spot_lat']) && !empty($_POST['spot_long']))
{
	$token = $_POST['token'];	
	$spot_name = $_POST['spot_name'];
	$spot_lat = (double)$_POST['spot_lat'];
	$spot_long = (double)$_POST['spot_long'];	
    require_once "../class/user.php";
	$user = new user();	
	$request = $user->insertSpot($token, $spot_name, $spot_lat, $spot_long);
}
else
{
    header("HTTP/1.0 400 Bad Request");
	exit();
}
?>