<?php

class Category
{
    // DATABASE COLUMN
    public $category_aid;
    public $category_is_active;
    public $category_name;
    public $category_description;
    public $category_created;
    public $category_updated;

    // DATABASE CONNECTION

    public $connection;
    public $lastInsertedId;

    // DATABASE TABLE
    public $tblCategory;

    public function __construct($db)
    {

        $this->connection = $db;
        $this->tblCategory = 'ftcd_settings_category';
    }

    // insert into `ftcd_settings_category`
    //     ( category_is_active,
    //      category_name,
    //      category_description,
    //      category_created,
    //      category_updated ) values ( 
    //     1, 
    //     "Kamote", 
    //     "Utot", 
    //     "2025-1-1",
    //     "2025-1-1" ) 



    //CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblCategory}";
            $sql .= "( category_is_active,";
            $sql .= " category_name,";
            $sql .= " category_description,";
            $sql .= " category_created,";
            $sql .= " category_updated ) values ( ";
            $sql .= ":category_is_active, ";
            $sql .= ":category_name, ";
            $sql .= ":category_description, ";
            $sql .= ":category_created, ";
            $sql .= ":category_updated ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_created" => $this->category_created,
                "category_updated" => $this->category_updated,
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
            $sql .= "from {$this->tblCategory} ";
            $sql .= "order by ";
            $sql .= "category_is_active desc, ";
            $sql .= "category_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblCategory} set ";
            $sql .= "category_name = :category_name, ";
            $sql .= "category_description = :category_description, ";
            $sql .= "category_updated = :category_updated ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_name" => $this->category_name,
                "category_description" => $this->category_description,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,
            ]);
        } catch (PDOException $ex) {
            returnError($ex);
            $query = false;
        }
        return $query;
    }

    public function active()
    {
        try {
            $sql = "update {$this->tblCategory} set ";
            $sql .= "category_is_active = :category_is_active, ";
            $sql .= "category_updated = :category_updated, ";
            $sql .= "where category_aid = :category_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "category_is_active" => $this->category_is_active,
                "category_updated" => $this->category_updated,
                "category_aid" => $this->category_aid,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }
}
