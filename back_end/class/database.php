<?php
Class database
{
    public function open() 
	{
		$servername = "localhost";		
        $username = "root";
        $password = "admin";
	    $dbname = "firerspot";
        try
	    {
            $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
		    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    	    return $pdo;
        }
        catch(PDOException $e)
        {
            return 0;
        }
    }
	
    public function close() 
	{
	    $pdo = null;
        return $pdo;
    }
}
?>