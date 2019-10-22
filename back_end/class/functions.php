<?php
class Functions
{
    public function killPage(array $my = array())
	{
		if (empty($my)) exit();
		$arr = array();
    	$arr[] = $my;
    	echo json_encode($arr);
    	exit();		
	}
	public function calcDist($lat1, $lon1, $lat2, $lon2, $unit)
	{
		$theta = $lon1 - $lon2;
		$dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
		$dist = acos($dist);
		$dist = rad2deg($dist);
		$miles = $dist * 60 * 1.1515;
		$unit = strtoupper($unit);
		
		if ($unit == "K") {
        return ($miles * 1.609344);
		} else if ($unit == "N") {
        return ($miles * 0.8684);
		} else {
        return $miles;
		}
	}
	public function checkFires(float $lat, float $long)
	{
		$json = file_get_contents("data/firenrt.json", true);
		$str = preg_replace( '/: (\w+[0-9a-zA-Z_=.+-]*)/', ': "$1"', $json);
		$str = json_decode($str);
		if (is_array($str)) 
		{
			foreach ($str as $key => $object) 
			{
				$milesd = Functions::calcDist($object->latitude, $object->longitude, $lat, $long, "K");
				//echo $milesd . "<br/>"; 
				if ($milesd < 6.1) return 1;
			}
		}
		return 0;
	}
	public function cors() 
	{		
		if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        header('Content-Type: application/json');
        die();
		}

		header('Access-Control-Allow-Origin: *');
		header('Content-Type: application/json');
	}	
}

?>