<?php
    include 'database.php';
    if(isset($_GET["c"])) {
        $count = $mysql->query("SELECT COUNT(*) FROM `task`");
        echo json_encode(["count"=>$count->fetch_assoc()['COUNT(*)']]);
        exit();
    }
    $page = $_GET["p"];
    if(isset($page)) {
        $page *= 10;
        $request = "SELECT * FROM `task` ORDER BY id DESC LIMIT $page, 10";
    } else {
        $request = "SELECT * FROM `task` ORDER BY id DESC LIMIT 0, 10";
    }
    $task = $mysql->query($request);
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