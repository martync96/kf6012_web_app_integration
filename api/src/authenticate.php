<?php
/**
* 
* A child class of endpoint
*
* Authenticate username and password
* This class will check a username and password again those held in the 
* database. Where authentication is successful it will return a JWT.
*
* @author Martyn Clow
*/

use FirebaseJWT\JWT;

class Authenticate extends Endpoint
{
    public function __construct() 
    {
        $db = new Database("db/chiplay.sqlite");
        $this->validateRequestMethod("POST");
        $this->validateAuthParameters();
        $this->initialiseSQL();
        
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->validateUsername($queryResult);
        $this->validatePassword($queryResult);

        $data['token'] = $this->createJWT($queryResult);
    
        $this->setData( array(
            "length" => 0,
            "message" => "success",
            "data" => $data
          ));
    }

    private function validateAuthParameters() 
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) 
        {
            die( json_encode( array(
                "message" => "username and password required"
            )));
        }
    }

    protected function initialiseSQL()
    {
        $sql = "SELECT account_id, username, password FROM account WHERE username = :username";
        $this->setSQL($sql);
        $this->setSQLParams(['username'=>$_SERVER['PHP_AUTH_USER']]);
    }

    private function validateUsername($data) 
    {
        if (count($data)<1) 
        {
            http_response_code(400);
            die( json_encode( array(
                "message" => "invalid credentials"
            )));
        }
    }

    private function validatePassword($data) 
    {
        if (!password_verify($_SERVER['PHP_AUTH_PW'], $data[0]['password'])) 
        {
            http_response_code(400);
            die( json_encode( array(
                "message" => "invalid credentials"
            )));
        }
    }

    private function createJWT($queryResult)
    {
        $secretKey = SECRET;

        $time = time();
       
        $tokenPayload = [
          'iat' => $time,
          'exp' => strtotime('+1 day', $time),
          'iss' => $_SERVER['HTTP_HOST'],
          'sub' => $queryResult[0]['account_id']
        ];
              
        $jwt = JWT::encode($tokenPayload, $secretKey, 'HS256');
        
        return $jwt;
    }

    private function validateRequestMethod($method) 
    {
      if ($_SERVER['REQUEST_METHOD'] != $method) 
      {
        throw new ClientErrorException("Invalid Request Method", 405);
       }
    }
}