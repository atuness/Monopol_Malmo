<?php
include 'connect.php';
$pdo = connectDB();

    $query = "UPDATE street SET teamID = ? WHERE streetID = ?";
    $sql = $pdo->prepare($query);
    $sql->bindParam(1, $_GET['user']);
    $sql->bindParam(2, $_GET['code']);
    $sql->execute();
?>
