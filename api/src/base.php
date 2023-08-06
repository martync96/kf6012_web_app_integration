<?php
/**
* A child class of endpoint
*
* This class allows the user to connect to the database to return information about the conference
* as well as returning hardcoded information about the author 
*
* @author Martyn Clow - W20045942
*/

class Base extends Endpoint
{
    
    private $data;

    public function __construct() 
    {

        $db = new Database("db/chiplay.sqlite");
        $sql = "SELECT name AS conference_name FROM conference_information";
        $this->data = $db->executeSQL($sql);

        $name = array(
            "first_name" => "Martyn",
            "last_name" => "Clow",
        );
        $documentation = array(
            "link" => "placeholder"
        );
        $id = array(
            "id" => "W20045942"
        );
        $conference = array(
            $this->data
        );
        $data = array(
            "name" => $name,
            "id" => $id,
            "link to documentation: " => $documentation,
            "conference" => $conference
        );
        $this->setData( array(
            "length" => count($data),
            "message" => "Success",
            "data" => $data
        ));
    }

    public function validateRequestMethod($method) 
    {
        if ($_SERVER['REQUEST_METHOD'] != $method)
        {
            die( json_encode( array(
                "message" => "invalid request method"
            )));
        }
    }
}
