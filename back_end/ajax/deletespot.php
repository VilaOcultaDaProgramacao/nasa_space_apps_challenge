<?php
require_once "../class/functions.php";
$Functions = new Functions();
$Functions->cors();

$_POST = !empty($_POST) ? $_POST : json_decode(file_get_contents("php://input"), true);
if (!empty($_POST['token']) && !empty($_POST['spot_id']))
{
	$spot_id = $_POST['spot_id'];
	$token = $_POST['token'];
    require_once "../class/user.php";
	$user = new user();	
	$request = $user->deleteUserSpots($token, $spot_id);
}
else
{
    header("HTTP/1.0 400 Bad Request");
	exit();
}
?>