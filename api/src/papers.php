<?php
/**
* A child class of endpoint
*
* this class connects to the database to retrieve information about papers, 
* also included validation for the parameters, only accepting id & track
*
* @author Martyn Clow - W20045942
*/

class Papers extends Endpoint
{
    protected function initialiseSQL()
    {
        $sql = "SELECT paper.paper_id, paper.title, IFNULL(paper.award, 'false') AS award, paper.abstract, track.name AS track_name, track.short_name
        FROM paper
        JOIN track ON (track.track_id = paper.track_id)";

        $this->setSQL($sql);
        $sqlParams = [];

        if(filter_has_var(INPUT_GET, 'id'))
        {
            if(isset($where))
            {
                $where .= " AND paper.paper_id = :id";
            }else{
                $where = " WHERE paper.paper_id = :id";
            }
            $sqlParams['id'] = $_GET['id'];
        }

        if(filter_has_var(INPUT_GET, 'track'))
        {
            if(isset($where))
            {
                $where .= " AND (track.short_name LIKE :track)";
            }else{
                $where = " WHERE track.short_name LIKE :track";
            }
            $sqlParams['track'] = '%'.$_GET['track'].'%';
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
        return ['id', 'track'];
    }
}