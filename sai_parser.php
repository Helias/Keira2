<?php


include_once './database_functions.php';


if(isset($_POST))
{

    
    $REMOTE_DB->exec($_POST["SQL_"]);


}

  

    


