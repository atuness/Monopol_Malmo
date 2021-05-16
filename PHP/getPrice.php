<?php
include 'connect.php';
$pdo = connectDB();

$query = "SELECT * FROM pricelist WHERE streetID = ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['code']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC);

$answer = json_encode($answer);

echo $answer;
?>
