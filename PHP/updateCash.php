<?php
include 'connect.php';
$pdo = connectDB();
  
    $query = "UPDATE team SET cash = ? WHERE teamID = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['price']);
    $sql->bindParam(2, $_GET['teamID']);
    $sql->execute();
?>
