<?php
    include 'database.php';
    $task = $mysql->query("SELECT * FROM `task`");
    while($result =$task->fetch_assoc()) {
        $tasks['id'][] = $result['id'];
        $tasks['description'][] = $result['description'];
        $tasks['date'][] = $result['date'];
        $tasks['color'][] = $result['color'];
        $tasks['chek'][] = $result['chek'];
    }
    header("Access-Control-Allow-Origin:*");
    header("Content-type: application/json");
    echo json_encode($tasks);
?>