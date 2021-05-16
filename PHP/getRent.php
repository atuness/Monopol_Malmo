<?php
include 'connect.php';
$pdo = connectDB();
$what = $_GET['houses'];

switch ($what) {
    case "0":
        $query =  "SELECT zeroHouse FROM pricelist WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "1":
        $query =  "SELECT oneHouse FROM pricelist WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "2":
        $query =  "SELECT twoHouse FROM pricelist WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "3":
        $query =  "SELECT threeHouse FROM pricelist WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "4":
        $query = "SELECT fourHouse FROM pricelist WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);      
}

$sql->execute();
$results = $sql->fetchAll(\PDO::FETCH_NUM);
echo json_encode($results);

?>
