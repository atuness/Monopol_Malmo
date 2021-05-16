<?php
include 'connect.php';
$pdo = connectDB();

    $query = "UPDATE street SET teamID = 0, nrHouse = 0 WHERE teamID = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['teamID']);
    $sql->execute();
?>
