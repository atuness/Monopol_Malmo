<?php
include 'connect.php';
$pdo = connectDB();
$what = $_GET['rent'];

switch ($what) {
    case "0":
 $query = "UPDATE street SET teamID = 0 WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "1":
 $query = "UPDATE street SET nrHouse = 0 WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "2":
 $query = "UPDATE street SET nrHouse = 1 WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "3":
 $query = "UPDATE street SET nrHouse = 2 WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);
    break;
    case "4":
 $query = "UPDATE street SET nrHouse = 3 WHERE streetID = ?";
        $sql = $pdo->prepare($query);
        $sql->bindParam(1, $_GET['code']);      
}
  $sql->execute();
?>
