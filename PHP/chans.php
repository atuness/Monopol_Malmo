<?php
include 'connect.php';
$pdo = connectDB();

$query = "SELECT summa FROM chans WHERE kod = ?";
$sql = $pdo->prepare($query);
$sql->bindParam(1, $_GET['code']);
$sql->execute();

$answer = $sql->fetchAll(\PDO::FETCH_NUM); 
echo $answer = json_encode($answer);

?>
