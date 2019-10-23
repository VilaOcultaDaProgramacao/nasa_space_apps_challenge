<?php
require_once "../class/functions.php";
$Functions = new Functions();
$Functions->cors();

$_POST = !empty($_POST) ? $_POST : json_decode(file_get_contents("php://input"), true);
if (!empty($_POST['email']) && !empty($_POST['pass']))
{
	if (strlen($_POST["pass"]) < 6) $Functions->killPage(array("status" => "error", "msg" => "invalid_pass"));
	if (strlen($_POST["email"]) > 254) $Functions->killPage(array("status" => "error", "msg" => "invalid_email"));
	if (!filter_var($_POST["email"], FILTER_VALIDATE_EMAIL))  $Functions->killPage(array("status" => "error", "msg" => "invalid_email"));
	$email = $_POST["email"];
	$pass = $_POST["pass"];
	$ip = $_SERVER['REMOTE_ADDR'];
    require_once "../class/user.php";
	$user = new user();	
	$request = $user->login($email, $pass, $ip);
}
else
{
    header("HTTP/1.0 400 Bad Request");
	exit();
}
?>