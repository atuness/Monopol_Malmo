<?php

include 'connect.php';
$pdo = connectDB();

$query = "SELECT * FROM street WHERE teamID= ?";

$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['myTeam']);

$sql->execute(); 

$answer = $sql->fetchAll(\PDO::FETCH_ASSOC); 

$answer = json_encode($answer);

echo $answer;

?>
