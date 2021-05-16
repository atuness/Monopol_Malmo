<?php
include 'connect.php';
$pdo = connectDB();
$price = $_GET['price'];

$query = "SELECT cash FROM team WHERE teamID = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['teamID']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_NUM); 
echo $answer = json_encode($answer);

?>
