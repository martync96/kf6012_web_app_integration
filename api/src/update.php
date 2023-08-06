<?php
use FirebaseJWT\JWT;
use FirebaseJWT\Key;
/**
* A child class of endpoint
*
* this class allows the user to update the paper table, changing the award status to true or NULL 
* includes various validation methods for parameters and tokens
*
* @author Martyn Clow - W20045942
*/

class Update extends Endpoint
{
    public function __construct()
    {
        $this->validateRequestMethod("POST");
        $this->validateToken();
        $this->validateUpdateParams();
        
        $db = new Database("db/chiplay.sqlite");
        
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQL(), $this->getSQLParams());

        $this->setData( array(
          "length" => 0,
          "message" => "Success",
          "data" => null
        ));
    }

    protected function initialiseSQL() 
    {
      $award_ids = ["true"=>"true","false"=>"false"];
      $award_id = $award_ids[strtolower($_POST['award'])];
      if($award_id == "false"){
        $award_id = NULL;
      }

      $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
      $this->setSQL($sql);
      $this->setSQLParams(['award'=> $award_id, 'paper_id'=>$_POST['paper_id']]);
    }  

    private function validateToken() 
    {
      // 1. Use the secret key
      $secretKey = SECRET;
            
      // Get all headers from the http request
      $allHeaders = getallheaders();
      $authorizationHeader = "";
            
      // 3. Look for an Authorization header. This 
      // this might not exist. It might start with a capital A (requests
      // from Postman do), or a lowercase a (requests from browsers might)
      if (array_key_exists('Authorization', $allHeaders)) 
      {
        $authorizationHeader = $allHeaders['Authorization'];
      } elseif (array_key_exists('authorization', $allHeaders)) 
      {
        $authorizationHeader = $allHeaders['authorization'];
      }
            
      // 4. Check if there is a Bearer token in the header
      if (substr($authorizationHeader, 0, 7) != 'Bearer ') 
      {
        throw new ClientErrorException("Bearer token required", 401);
      }
    
      // 5. Extract the JWT from the header (by cutting the text 'Bearer ')
      $jwt = trim(substr($authorizationHeader, 7));
    
      try 
      {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));
      } catch (Exception $e) {
        throw new ClientErrorException($e->getMessage(), 401);
      }

      if ($decoded->iss != $_SERVER['HTTP_HOST']) 
      {
        throw new ClientErrorException("invalid token issuer", 401);
      }
    }

    private function validateUpdateParams() 
    {
      if (!filter_has_var(INPUT_POST,'award')) 
      {
         throw new ClientErrorException("award parameter required", 400);
      }
      if (!filter_has_var(INPUT_POST,'paper_id')) 
      {
         throw new ClientErrorException("paper_id parameter required", 400);
      }
             
      $award = ["true", "false"];
      if (!in_array(strtolower($_POST['award']), $award)) 
      {
        throw new ClientErrorException("invalid award status", 400);
      }
     }

    private function validateRequestMethod($method) 
    {
      if ($_SERVER['REQUEST_METHOD'] != $method) 
      {
        throw new ClientErrorException("Invalid Request Method", 405);
      }
    }
}