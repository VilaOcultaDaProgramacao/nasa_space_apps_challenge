<?php
header('Content-Type: application/json');
require_once "../class/functions.php";
$Functions = new Functions();
$Functions->cors();
if (!empty($_GET["token"]))
{
	$token = $_GET["token"];	
    require_once "../class/user.php";
	$user = new user();	
	$request = $user->getUserSpots($token);
}
else
{
    header("HTTP/1.0 400 Bad Request");
	exit();
}
?>