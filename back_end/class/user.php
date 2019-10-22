<?php
require_once "database.php";

class user
{	
	public function generateToken($uid, $pass)
	{
		$gentoken = $uid . "token" . $pass;
		return md5($gentoken);
	}
	public function getUid($token)
	{
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();		
		$CheckUid = $dbconnection->prepare("SELECT uid FROM users WHERE token = :token LIMIT 1");
		$CheckUid->bindParam(':token', $token);
		$CheckUid->execute();
		$dbconnection = $database->close();		
		$row = $CheckUid->fetch(PDO::FETCH_ASSOC);
		if ($CheckUid->rowCount() > 0)
		{
			$uid = $row["uid"];
			return $uid;
		}			
		return null;
	}
	public function login($email, $pass, $last_ip)
	{
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();		
	    $pass = md5($pass);	
		$CheckEmailPass = $dbconnection->prepare("SELECT uid, name FROM users WHERE email = :email AND pass = :pass");
		$CheckEmailPass->bindParam(':email', $email);
		$CheckEmailPass->bindParam(':pass', $pass);
		$CheckEmailPass->execute();	
		$row = $CheckEmailPass->fetch(PDO::FETCH_ASSOC);
		if ($CheckEmailPass->rowCount() > 0) 
		{
			date_default_timezone_set("America/Sao_Paulo");
			$now = date("Y-m-d H:i:s");
			$uid = $row['uid'];
			$token = user::generateToken($uid, $pass);
			$update = $dbconnection->prepare("UPDATE users SET last_ip = :last_ip, last_activity = :last_activity, token = :token WHERE email = :email");
			$update->bindParam(":last_ip", $last_ip);
			$update->bindParam(":last_activity", $now, PDO::PARAM_STR);
			$update->bindParam(":token", $token);
			$update->bindParam(":email", $email);
			$update->execute();	
			$dbconnection = $database->close();	
            
			$name = $row['name'];	
			$Functions->killPage(array("status" => "success", "uname" => $name, "token" => $token));
		} 
		else
		{
			$dbconnection = $database->close();		
			header("HTTP/1.0 401 Unauthorized");
			$Functions->killPage();
		}	    	
	}

	public function register($name, $email, $pass, $ip)
	{
		$Functions = new Functions();		
		$database = new database();
		$dbconnection = $database->open();			
		$RegisterEmailCheck = $dbconnection->prepare("SELECT email FROM users WHERE email = :email");
		$RegisterEmailCheck->bindParam(":email", $email);
		$RegisterEmailCheck->execute();
		$dbconnection = $database->close();
		if ($RegisterEmailCheck->rowCount() > 0) $Functions->killPage(array("status" => "error", "msg" => "existent_email"));
		else 
		{
			$name = strtolower($name); 
			$name = ucfirst($name);
			$pass = md5($pass);
			date_default_timezone_set("America/Sao_Paulo");
			$now = date("Y-m-d H:i:s");
        	$Register = $dbconnection->prepare("INSERT INTO users (name, email, pass, last_ip, last_activity) VALUES (:name, :email, :pass, :last_ip, :last_activity)");
			$Register->bindParam(":name", $name);
			$Register->bindParam(":email", $email);
			$Register->bindParam(":pass", $pass);
			$Register->bindParam(":last_ip", $ip);
			$Register->bindParam(":last_activity", $now, PDO::PARAM_STR);
			if ($Register->execute())
			{
				//$last_insert_id = $dbconnection->lastInsertId();
                //return $last_insert_id;
				$Functions->killPage(array("status" => "success"));
			}
            else $Functions->killPage(array("status" => "register_failed"));			
	    }     	
	}
	
	public function insertSpot($token, $spot_name, $spot_lat, $spot_long)
	{
		$uid = user::getUid($token);
		if ($uid === null)
		{
			header("HTTP/1.0 401 Unauthorized");
			exit();			
		}
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();
		$InsertSpot = $dbconnection->prepare("INSERT INTO u_spots (spot_uid, spot_name, spot_lat, spot_long) VALUES (:spot_uid, :spot_name, :spot_lat, :spot_long)");
		$InsertSpot->bindParam(":spot_uid", $uid, PDO::PARAM_INT);
		$InsertSpot->bindParam(":spot_name", $spot_name);
		$InsertSpot->bindParam(":spot_lat", $spot_lat);
		$InsertSpot->bindParam(":spot_long", $spot_long);
		if ($InsertSpot->execute())
		{
			$dbconnection = $database->close();	
			$Functions->killPage(array("status" => "success"));
		}
        else
		{
			$dbconnection = $database->close();
			header("HTTP/1.0 400 Bad Request");
			exit();
		}			
	}	
	public function getUserSpots($token)
	{
		$uid = user::getUid($token);
		if ($uid === null)
		{
			header("HTTP/1.0 401 Unauthorized");
			exit();			
		}	
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();	
		$SelectUserSpots = $dbconnection->prepare("SELECT * FROM u_spots WHERE spot_uid = :uid");
		$SelectUserSpots->bindParam(":uid", $uid, PDO::PARAM_INT);
		$SelectUserSpots->execute();
		$dbconnection = $database->close();
		if ($SelectUserSpots->rowCount() > 0)	
		{
			$arr = array();
			while ($row = $SelectUserSpots->fetch(PDO::FETCH_ASSOC)) 
			{
				$my = array ( 
				"spot_id" => $row["spot_id"], 
				"spot_name" => $row["spot_name"],
				"spot_lat" => $row["spot_lat"],
				"spot_long" => $row["spot_long"]
				);
				$arr[] = $my;
			}
			echo json_encode($arr);
			exit();
		}
	}
	public function deleteUserSpots($token, $spot_id)
	{
		$uid = user::getUid($token);
		if ($uid === null)
		{
			header("HTTP/1.0 401 Unauthorized");
			exit();			
		}	
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();	
		$SelectUserSpots = $dbconnection->prepare("DELETE FROM u_spots WHERE spot_id = :spot_id");
		$SelectUserSpots->bindParam(":spot_id", $spot_id, PDO::PARAM_INT);
		$SelectUserSpots->execute();
		$dbconnection = $database->close();
		$Functions->killPage(array("status" => "success"));
	}	
	public function updateSpotWarning($spot_id)
	{
		$database = new database();
		$dbconnection = $database->open();	
		date_default_timezone_set("America/Sao_Paulo");
		$now = date("Y-m-d H:i:s");
		$update = $dbconnection->prepare("UPDATE u_spots SET spot_lastwarning = :now WHERE spot_id = :spot_id");
		$update->bindParam(":now", $now);
		$update->bindParam(":spot_id", $spot_id, PDO::PARAM_INT);
		$update->execute();	
		$dbconnection = $database->close();
        return 1;		
	}
	public function sendMailAlert($spot_id)
	{
		date_default_timezone_set("America/Sao_Paulo");
		$Functions = new Functions();
		$database = new database();
		$dbconnection = $database->open();	
		$SelectUserpots = $dbconnection->prepare("SELECT spot_lastwarning FROM u_spots WHERE spot_id = :spot_id");
		$SelectUserpots->bindParam(":spot_id", $spot_id, PDO::PARAM_INT);
		$SelectUserpots->execute();
		$dbconnection = $database->close();
		$row = $SelectUserpots->fetch(PDO::FETCH_ASSOC);
		if ($SelectUserSpots->rowCount() > 0)	
		{
			$now = date("Y-m-d H:i:s");
			$spot_lastwarning = $row["spot_lastwarning"];
			$d1= new DateTime($now); 
			$d2= new DateTime($spot_lastwarning);
			$interval= $d1->diff($d2);
			$intervalo = ($interval->days * 24) + $interval->h;
			if ($intervalo < 12) return 0;
		}		

		require '../PHPMailer-master/PHPMailerAutoload.php';
		$mail = new PHPMailer;
		$mail->isSMTP();
		$mail->SMTPDebug = 2;
		$mail->Debugoutput = 'html';
		$mail->Host = 'smtp.gmail.com';
		$mail->Port = 587;
		$mail->SMTPSecure = "tls";
		$mail->SMTPAuth = true;
		$mail->Username = sender_mail_here;
		$mail->Password = sender_mail_pass_here;
		$mail->setFrom('firespotnasa@gmail.com', 'FireSpot');
		$mail->addAddress(receiver_mail_here);
		$mail->Charset = 'utf8_decode()';
		$mail->Subject = utf8_decode('[ALERTA INCÊNDIO]');
		$mail->IsHTML(true);
		$mail->Body = utf8_decode('<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body>
    <div
      style="background: #eee; padding: 10px 20px; max-width: 550px; margin: 0 auto;"
    >
      <img src="" />

      <h1
        style="text-align: center;
      font-family: sans-serif;
      background: white;
      color: #fda614;
      padding: 10px;
      margin-top: 0px;
      "
      >
        Smoke Signal
      </h1>

      <h3
        style="text-align: center;
      font-family: sans-serif;
      background: white;
      padding: 10px;"
      >
        Localizacao com o nome de Minha Casa , esta com alerta de incendio .
      </h3>

      <h3
        style="text-align: center;
      font-family: sans-serif;
      background: white;
      padding: 10px;"
      >
        Entre em contanto com possiveis conhecidos que possam estar neste lugar
        se possivel se proteja.
      </h3>

      <h3
        style="text-align: center;
      font-family: sans-serif;
      background: white;
      color: red;
      padding: 10px;"
      >
        Nao tente entrar nesta localizao , nao se coloque em perigo!
      </h3>
    </div>
  </body>
</html>');
		$mail->AltBody = 'This is a plain-text message body';

		if (!$mail->send()) {
			echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
			return 1;
		}	
	}
}
?>