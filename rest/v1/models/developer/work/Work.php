<?php

class Work
{


    public $work_aid;
    public $work_is_active;
    public $work_title;
    public $work_description;
    public $work_created;
    public $work_updated;

    public $start;
    public $total;
    public $search;



    public $work_start;
    public $work_total;
    public $work_search;




    public $connection;
    public $lastInsertedId;

    public $tblWork;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblWork = 'portfolio_work';
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblWork} (
                work_is_active,
                work_title,
                work_description,
                work_created,
                work_updated
            ) VALUES (
                :work_is_active,
                :work_title,
                :work_description,
                :work_created,
                :work_updated
            )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "work_is_active" => $this->work_is_active,
                "work_title" => $this->work_title,
                "work_description" => $this->work_description,
                "work_created" => $this->work_created,
                "work_updated" => $this->work_updated,
            ]);

            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }



    public function readAll()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "order by ";
            $sql .= "work_is_active desc, ";
            $sql .= "work_title asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function readLimit()
    {
        try {
            $sql = "select ";
            $sql .= "* ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "order by ";
            $sql .= "work_is_active desc, ";
            $sql .= "work_title asc ";
            $sql .= "limit :start, ";
            $sql .= ":total ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'start' => $this->start - 1,
                'total' => $this->total
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function search()
    {
        try {
            $sql = "select ";
            $sql .= "work_aid, ";
            $sql .= "work_is_active, ";
            $sql .= "work_title, ";
            $sql .= "work_description, ";
            $sql .= " work_created,";
            $sql .= " work_updated ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "where ";
            $sql .= "work_title like :work_title ";
            $sql .= "or work_description like :work_description ";
            $sql .= "order by ";
            $sql .= "work_is_active desc, ";
            $sql .= "work_title asc ";


            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'work_title' => "%{$this->search}%",
                'work_description' => "%{$this->search}%"

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }


    public function filterSearch()
    {
        try {
            $sql = "select ";
            $sql .= "work_aid, ";
            $sql .= "work_is_active, ";
            $sql .= "work_title, ";
            $sql .= "work_description, ";
            $sql .= "work_created, ";
            $sql .= "work_updated ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "where ";
            $sql .= "work_is_active = :work_is_active ";
            $sql .= "and ( ";
            $sql .= "work_title like :work_title ";
            $sql .= "or work_description like :work_description ";
            $sql .= ") ";
            $sql .= "order by ";
            $sql .= "work_is_active desc, ";
            $sql .= "work_title asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                'work_is_active' => $this->work_is_active,
                'work_title' => "%{$this->search}%",
                'work_description' => "%{$this->search}%",
            ]);
        } catch (PDOException $ex) {
            returnError($ex);
            $query = false;
        }
        return $query;
    }

    public function filter()
    {
        try {
            $sql = "select ";
            $sql .= "work_aid, ";
            $sql .= "work_is_active, ";
            $sql .= "work_title, ";
            $sql .= "work_description, ";
            $sql .= " work_created,";
            $sql .= " work_updated ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "where ";
            $sql .= "work_is_active =:work_is_active ";
            $sql .= "order by ";
            $sql .= "work_title asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'work_is_active' => $this->work_is_active,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblWork} ";
            $sql .= "WHERE work_aid = :work_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'work_aid' => $this->work_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblWork} set ";
            $sql .= "work_title = :work_title, ";
            $sql .= "work_description = :work_description, ";
            $sql .= "work_updated = :work_updated ";
            $sql .= "where work_aid = :work_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "work_title" => $this->work_title,
                "work_description" => $this->work_description,
                "work_updated" => $this->work_updated,
                "work_aid" => $this->work_aid,
            ]);
        } catch (PDOException $ex) {

            $query = false;
        }
        return $query;
    }



    public function active()
    {
        try {
            $sql = "update {$this->tblWork} set ";
            $sql .= "work_is_active = :work_is_active, ";
            $sql .= "work_updated = :work_updated ";
            $sql .= "where work_aid = :work_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "work_is_active" => $this->work_is_active,
                "work_updated" => $this->work_updated,
                "work_aid" => $this->work_aid,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }






    function checkTitle()
    {
        try {
            $sql = "select ";
            $sql .= "work_title ";
            $sql .= "from {$this->tblWork} ";
            $sql .= "where ";
            $sql .= "work_title like :title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "title" => "{$this->work_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }
}
