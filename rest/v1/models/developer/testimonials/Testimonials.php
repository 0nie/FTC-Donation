<?php

class Testimonials
{


    public $testimonials_aid;
    public $testimonials_is_active;
    public $testimonials_first_name;
    public $testimonials_last_name;
    public $testimonials_email;
    public $testimonials_description;
    public $testimonials_created;
    public $testimonials_updated;

    public $start;
    public $total;
    public $search;



    public $testimonials_start;
    public $testimonials_total;
    public $testimonials_search;




    public $connection;
    public $lastInsertedId;

    public $tblTestimonials;


    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblTestimonials = 'portfolio_testimonials';
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblTestimonials} (
            testimonials_is_active,
            testimonials_first_name,
            testimonials_last_name,
            testimonials_email,
            testimonials_description,
            testimonials_created,
            testimonials_updated
        ) VALUES (
            :testimonials_is_active,
            :testimonials_first_name,
            :testimonials_last_name,
            :testimonials_email,
            :testimonials_description,
            :testimonials_created,
            :testimonials_updated
        )";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active,
                "testimonials_first_name" => $this->testimonials_first_name,
                "testimonials_last_name" => $this->testimonials_last_name,
                "testimonials_email" => $this->testimonials_email,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_created" => $this->testimonials_created,
                "testimonials_updated" => $this->testimonials_updated,
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
            $sql .= "from {$this->tblTestimonials} ";
            $sql .= "order by ";
            $sql .= "testimonials_is_active desc, ";
            $sql .= "testimonials_first_name asc, ";
            $sql .= "testimonials_last_name asc ";
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
            $sql .= "from {$this->tblTestimonials} ";
            $sql .= "order by ";
            $sql .= "testimonials_is_active desc, ";
            $sql .= "testimonials_first_name asc ";
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
            $sql .= "testimonials_aid, ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_first_name, ";
            $sql .= "testimonials_last_name, ";
            $sql .= "testimonials_email, ";
            $sql .= "testimonials_description, ";
            $sql .= " testimonials_created,";
            $sql .= " testimonials_updated ";
            $sql .= "from {$this->tblTestimonials} ";
            $sql .= "where ";
            $sql .= "testimonials_first_name like :testimonials_first_name ";
            $sql .= "or testimonials_description like :testimonials_description ";
            $sql .= "or testimonials_last_name like :testimonials_last_name ";
            $sql .= "or testimonials_email like :testimonials_email ";
            $sql .= "order by ";
            $sql .= "testimonials_is_active desc, ";
            $sql .= "testimonials_first_name asc ";


            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'testimonials_first_name' => "%{$this->search}%",
                'testimonials_description' => "%{$this->search}%",
                'testimonials_last_name' => "%{$this->search}%",
                'testimonials_email' => "%{$this->search}%"



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
            $sql .= "testimonials_aid, ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_first_name, ";
            $sql .= "testimonials_last_name, ";
            $sql .= "testimonials_email, ";
            $sql .= "testimonials_description, ";
            $sql .= "testimonials_created, ";
            $sql .= "testimonials_updated ";
            $sql .= "from {$this->tblTestimonials} ";
            $sql .= "where ";
            $sql .= "testimonials_is_active = :testimonials_is_active ";
            $sql .= "and ( ";
            $sql .= "testimonials_first_name like :testimonials_first_name ";
            $sql .= "or testimonials_description like :testimonials_description ";
            $sql .= ") ";
            $sql .= "order by ";
            $sql .= "testimonials_is_active desc, ";
            $sql .= "testimonials_first_name asc, ";
            $sql .= "testimonials_last_name asc, ";
            $sql .= "testimonials_email asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                'testimonials_is_active' => $this->testimonials_is_active,
                'testimonials_first_name' => "%{$this->search}%",
                'testimonials_description' => "%{$this->search}%",
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
            $sql .= "testimonials_aid, ";
            $sql .= "testimonials_is_active, ";
            $sql .= "testimonials_first_name, ";
            $sql .= "testimonials_last_name, ";
            $sql .= "testimonials_email, ";
            $sql .= "testimonials_description, ";
            $sql .= " testimonials_created,";
            $sql .= " testimonials_updated ";
            $sql .= "from {$this->tblTestimonials} ";
            $sql .= "where ";
            $sql .= "testimonials_is_active =:testimonials_is_active ";
            $sql .= "order by ";
            $sql .= "testimonials_first_name asc, ";
            $sql .= "testimonials_last_name asc, ";
            $sql .= "testimonials_email asc ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                // est
                // test
                'testimonials_is_active' => $this->testimonials_is_active,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblTestimonials} ";
            $sql .= "WHERE testimonials_aid = :testimonials_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'testimonials_aid' => $this->testimonials_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }


    public function update()
    {
        try {
            $sql = "update {$this->tblTestimonials} set ";
            $sql .= "testimonials_first_name = :testimonials_first_name, ";
            $sql .= "testimonials_last_name = :testimonials_last_name, ";
            $sql .= "testimonials_email = :testimonials_email, ";
            $sql .= "testimonials_description = :testimonials_description, ";
            $sql .= "testimonials_updated = :testimonials_updated ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_first_name" => $this->testimonials_first_name,
                "testimonials_last_name" => $this->testimonials_last_name,
                "testimonials_email" => $this->testimonials_email,
                "testimonials_description" => $this->testimonials_description,
                "testimonials_updated" => $this->testimonials_updated,
                "testimonials_aid" => $this->testimonials_aid,
            ]);
        } catch (PDOException $ex) {

            $query = false;
        }
        return $query;
    }



    public function active()
    {
        try {
            $sql = "update {$this->tblTestimonials} set ";
            $sql .= "testimonials_is_active = :testimonials_is_active, ";
            $sql .= "testimonials_updated = :testimonials_updated ";
            $sql .= "where testimonials_aid = :testimonials_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "testimonials_is_active" => $this->testimonials_is_active,
                "testimonials_updated" => $this->testimonials_updated,
                "testimonials_aid" => $this->testimonials_aid,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function checkEmail()
    {
        $sql = "SELECT * FROM {$this->tblTestimonials} 
            WHERE LOWER(testimonials_email) = LOWER(:email)";
        $query = $this->connection->prepare($sql);
        $query->execute([
            'email' => $this->testimonials_email
        ]);
        return $query;
    }







    public function checkFullName()
    {
        try {
            $sql = "SELECT * FROM {$this->tblTestimonials} 
                WHERE LOWER(testimonials_first_name) = LOWER(:first_name) 
                AND LOWER(testimonials_last_name) = LOWER(:last_name)";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "first_name" => $this->testimonials_first_name,
                "last_name" => $this->testimonials_last_name
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }
}
