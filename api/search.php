<?php
    include 'database.php';
    if(isset($_GET["c"])) {
        $text = $_GET["s"];
        $count = $mysql->query("SELECT COUNT(*) FROM `task` WHERE description LIKE '%$text%'");
        echo json_encode(["count"=>$count->fetch_assoc()['COUNT(*)']]);
        exit();
    }

    $text = $_GET["s"];
    $page = $_GET["p"];
    $page *= 10;
    
    $srch_task = $mysql->query("SELECT * FROM `task` WHERE description LIKE '%$text%' ORDER BY id DESC LIMIT $page, 15");
    $count = $srch_task->num_rows;
    if($count == 0)  {
        echo json_encode(["error"=>'not found']);
    } else if($count == 1) {
        $result =$srch_task->fetch_assoc();
        echo json_encode($result);

    } else {
        while($result =$srch_task->fetch_assoc()) {
            $respons['id'][] = $result['id'];
            $respons['description'][] = $result['description'];
            $respons['date'][] = $result['date'];
            $respons['color'][] = $result['color'];
            $respons['chek'][] = $result['chek'];
        }
        echo json_encode($respons);
    }
?>