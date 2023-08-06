<?php
/**
* The index page for the endpoints, this page verifies the request methods sent by the user
* and sets the pathways to access the APIs
* @author Martyn Clow - W20045942
*/

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {    
    exit(0);
}

define('SECRET', "DRK1U5FXS7");
include 'config/config.php';

if (!in_array($_SERVER['REQUEST_METHOD'], array("POST", "GET"))) 
{
    $endpoint = new ClientError("Invalid request method: " . $_SERVER['REQUEST_METHOD'], 405);
}else{
    $path = parse_url($_SERVER['REQUEST_URI'])['path'];
    $path = str_replace("kf6012/assignment/api/", "", $path);
    
    switch($path)
    {
        case '/':
            $endpoint = new Base();
            break;
        case '/paper':
            $endpoint = new Papers();
            break;
        case '/author':
            $endpoint = new Authors();
            break;
        case '/auth':
            $endpoint = new Authenticate();
            break;
        case '/update':
            $endpoint = new Update();
            break;
        default:
            $endpoint = new ClientError("Path not found: " . $path, 404);    
    }
}
    
$response = $endpoint->getData();
echo json_encode($response);