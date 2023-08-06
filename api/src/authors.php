<?php
/**
* A child class of endpoint
*
* this class connects to the database to retrieve information about authors, 
* also included validation for the parameters, only accepting id & paper_id
*
* @author Martyn Clow - W20045942
*/

class Authors extends Endpoint
{
    protected function initialiseSQL()
    {
        
        $sql = "SELECT DISTINCT author.author_id, first_name, IFNULL(middle_initial, '') AS middle_name, last_name, country, IFNULL(state, '') as state, city, institution, IFNULL(department, '') AS department
        FROM author
        JOIN paper_has_author on (paper_has_author.author_id = author.author_id)
        INNER JOIN paper on (paper.paper_id = paper_has_author.paper_id)
        INNER JOIN affiliation on (affiliation.author_id = author.author_id)";

        $this->setSQL($sql);
        $sqlParams = [];

        if(filter_has_var(INPUT_GET, 'id'))
        {
            if(isset($where)){
                $where .= " AND author.author_id = :id";
            }else{
                $where = " WHERE author.author_id = :id";
            }
            $sqlParams['id'] = $_GET['id'];
        }

        if(filter_has_var(INPUT_GET, 'paper_id'))
        {
            if(isset($where)){
                $where .= " AND paper.paper_id = :paper_id";
            }else{
                $where = " where paper.paper_id = :paper_id";
            }
            $sqlParams['paper_id'] = $_GET['paper_id'];
        }

        if(isset($where))
        {
            $sql .= $where;
        }

        $this->setSQL($sql);
        $this->setSQLParams($sqlParams);
    }

    protected function endpointParams() 
    {
        return ['id', 'paper_id'];
    }
}