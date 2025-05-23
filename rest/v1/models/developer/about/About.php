<?php

class About
{


    public $about_aid;
    public $about_is_active;
    public $about_title;
    public $about_description;
    public $about_created;
    public $about_updated;

    public $start;
    public $total;
    public $search;



    public $about_start;
    public $about_total;
    public $about_search;




    public $connection;
    public $lastInsertedId;

    public $tblAbout;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblAbout = 'portfolio_about';
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblAbout} (
                about_is_active,
                about_title,
                about_description,
                about_created,
                about_updated
            ) VALUES (
                :about_is_active,
                :about_title,
                :about_description,
                :about_created,
                :about_updated
            )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_is_active" => $this->about_is_active,
                "about_title" => $this->about_title,
                "about_description" => $this->about_description,
                "about_created" => $this->about_created,
                "about_updated" => $this->about_updated,
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
            $sql .= "from {$this->tblAbout} ";
            $sql .= "order by ";
            $sql .= "about_is_active desc, ";
            $sql .= "about_title asc ";
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
            $sql .= "from {$this->tblAbout} ";
            $sql .= "order by ";
            $sql .= "about_is_active desc, ";
            $sql .= "about_title asc ";
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
            $sql .= "about_aid, ";
            $sql .= "about_is_active, ";
            $sql .= "about_title, ";
            $sql .= "about_description, ";
            $sql .= " about_created,";
            $sql .= " about_updated ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "where ";
            $sql .= "about_title like :about_title ";
            $sql .= "or about_description like :about_description ";
            $sql .= "order by ";
            $sql .= "about_is_active desc, ";
            $sql .= "about_title asc ";


            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'about_title' => "%{$this->search}%",
                'about_description' => "%{$this->search}%"

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
            $sql .= "about_aid, ";
            $sql .= "about_is_active, ";
            $sql .= "about_title, ";
            $sql .= "about_description, ";
            $sql .= "about_created, ";
            $sql .= "about_updated ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "where ";
            $sql .= "about_is_active = :about_is_active ";
            $sql .= "and ( ";
            $sql .= "about_title like :about_title ";
            $sql .= "or about_description like :about_description ";
            $sql .= ") ";
            $sql .= "order by ";
            $sql .= "about_is_active desc, ";
            $sql .= "about_title asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                'about_is_active' => $this->about_is_active,
                'about_title' => "%{$this->search}%",
                'about_description' => "%{$this->search}%",
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
            $sql .= "about_aid, ";
            $sql .= "about_is_active, ";
            $sql .= "about_title, ";
            $sql .= "about_description, ";
            $sql .= " about_created,";
            $sql .= " about_updated ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "where ";
            $sql .= "about_is_active =:about_is_active ";
            $sql .= "order by ";
            $sql .= "about_title asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'about_is_active' => $this->about_is_active,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblAbout} ";
            $sql .= "WHERE about_aid = :about_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'about_aid' => $this->about_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblAbout} set ";
            $sql .= "about_title = :about_title, ";
            $sql .= "about_description = :about_description, ";
            $sql .= "about_updated = :about_updated ";
            $sql .= "where about_aid = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_title" => $this->about_title,
                "about_description" => $this->about_description,
                "about_updated" => $this->about_updated,
                "about_aid" => $this->about_aid,
            ]);
        } catch (PDOException $ex) {

            $query = false;
        }
        return $query;
    }



    public function active()
    {
        try {
            $sql = "update {$this->tblAbout} set ";
            $sql .= "about_is_active = :about_is_active, ";
            $sql .= "about_updated = :about_updated ";
            $sql .= "where about_aid = :about_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "about_is_active" => $this->about_is_active,
                "about_updated" => $this->about_updated,
                "about_aid" => $this->about_aid,

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
            $sql .= "about_title ";
            $sql .= "from {$this->tblAbout} ";
            $sql .= "where ";
            $sql .= "about_title like :title ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "title" => "{$this->about_title}",
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }
}
