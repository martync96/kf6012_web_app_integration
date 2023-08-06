<?php

class autoload
{
    public static function autoloader($className) 
    {
        $filename = "src\\" . strtolower($className) . ".php";
        $filename = str_replace('\\', DIRECTORY_SEPARATOR, $filename);
        if (is_readable($filename)) {
            include_once $filename;
        } else {
            throw new exception("File not found: " . $className . " (" . $filename . ")");
        }
    }
}
