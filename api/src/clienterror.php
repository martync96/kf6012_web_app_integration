<?php
/**
* A child class of endpoint
*
* This class returns a client error and sets the data to null, returning an error message when called
*
* @author Martyn Clow - W20045942
*/
class ClientError extends Endpoint
{
    public function __construct($message = "", $code = 400) 
    {    
       http_response_code($code);
 
        $this->setData( array(
            "length" => 0,
            "message" => $message,
            "data" => null
        ));
    }
}