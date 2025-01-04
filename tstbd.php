<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "finance_management";

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Checando a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Conectado com sucesso";

// Fechando a conexão
$conn->close();
?>
