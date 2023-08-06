<?php
/**
* A general class for endpoints
*
* This class will be a parent for all endpoints (author, paper, auth, update.)
* providing common methods. It has been declared as an abstract class
* which means it is not possible to make an instance of this class itself.
*
* @author Martyn Clow - W20045942
*/

abstract class Endpoint
{
    private $data;
    private $sql;
    private $sqlParams;

    public function __construct()
    {
        $db = new Database("db/chiplay.sqlite");
        $this->validateParams($this->endpointParams());
        $this->initialiseSQL();

        $data = $db->executeSQL($this->sql, $this->sqlParams);

        if(count($data) == 0){
            http_response_code(204);
        }else{
            $this->setData( array(
                "length" => count($data),
                "message" => "Success",
                "data" => $data
            )); 
        }
    }

    protected function setSQL($sql) 
    {
        $this->sql = $sql;
    }

    protected function getSQL() 
    {
        return $this->sql;
    }
    
    protected function setSQLParams($params) 
    {
        $this->sqlParams = $params;
    }

    protected function getSQLParams() 
    {
        return $this->sqlParams;
    }

    protected function initialiseSQL() 
    {
        $sql = "";
        $this->setSQL($sql);
        $this->setSQLParams([]);
    }

    protected function setData($data) 
    {
        $this->data = $data;
    }

    public function getData() 
    {
        return $this->data;
    }

    protected function endpointParams() 
    {
        return [];
    }

    protected function validateParams($params) 
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $params)) {
                http_response_code(400);
                $output['message'] = "Invalid parameter: " . $key;
                die(json_encode($output));
            }
         }    
    }
}