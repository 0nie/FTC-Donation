<?php

class Notifications
{
    // DATABASE COLUMN
    public $notifications_aid;
    public $notifications_is_active;
    public $notifications_name;
    public $notifications_email;
    public $notifications_purpose;
    public $notifications_created;
    public $notifications_updated;

    // DATABASE CONNECTION

    public $connection;
    public $lastInsertedId;

    // DATABASE TABLE
    public $tblNotifications;


    public function __construct($db)
    {

        $this->connection = $db;
        $this->tblNotifications = 'ftcd_settings_notifications';
    }

    // insert into `ftcd_settings_notifications`
    //     ( notifications_is_active,
    //      notifications_name,
    //      notifications_description,
    //      notifications_created,
    //      notifications_updated ) values ( 
    //     1, 
    //     "Kamote", 
    //     "Utot", 
    //     "2025-1-1",
    //     "2025-1-1" ) 



    //CREATE
    public function create()
    {
        try {
            $sql = "insert into {$this->tblNotifications}";
            $sql .= "( notifications_is_active,";
            $sql .= " notifications_name,";
            $sql .= " notifications_email,"; //
            $sql .= " notifications_purpose,";
            $sql .= " notifications_created,";
            $sql .= " notifications_updated ) values ( ";
            $sql .= ":notifications_is_active, ";
            $sql .= ":notifications_name, ";
            $sql .= ":notifications_email, "; //
            $sql .= ":notifications_purpose,";
            $sql .= ":notifications_created, ";
            $sql .= ":notifications_updated ) ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notifications_is_active" => $this->notifications_is_active,
                "notifications_name" => $this->notifications_name,
                "notifications_email" => $this->notifications_email, //
                "notifications_purpose" => $this->notifications_purpose,
                "notifications_created" => $this->notifications_created,
                "notifications_updated" => $this->notifications_updated,
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
            $sql .= "from {$this->tblNotifications} ";
            $sql .= "order by ";
            $sql .= "notifications_is_active desc, ";
            $sql .= "notifications_name asc ";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function update()
    {
        try {
            $sql = "update {$this->tblNotifications} set ";
            $sql .= "notifications_name = :notifications_name, ";
            $sql .= "notifications_email = :notifications_email, "; //
            $sql .= "notifications_purpose = :notifications_purpose, ";
            $sql .= "notifications_updated = :notifications_updated ";
            $sql .= "where notifications_aid = :notifications_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notifications_name" => $this->notifications_name,
                "notifications_email" => $this->notifications_email, //
                "notifications_purpose" => $this->notifications_purpose,
                "notifications_updated" => $this->notifications_updated,
                "notifications_aid" => $this->notifications_aid,
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
            $sql = "update {$this->tblNotifications} set ";
            $sql .= "notifications_is_active = :notifications_is_active, ";
            $sql .= "notifications_updated = :notifications_updated ";
            $sql .= "where notifications_aid = :notifications_aid ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notifications_is_active" => $this->notifications_is_active,
                "notifications_updated" => $this->notifications_updated,
                "notifications_aid" => $this->notifications_aid,

            ]);
        } catch (PDOException $ex) {
            $query = false;
        }
        return $query;
    }

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblNotifications} ";
            $sql .= "WHERE notifications_aid = :notifications_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                'notifications_aid' => $this->notifications_aid
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }

    function checkName()
    {
        try {
            $sql = "select notifications_name ";
            $sql .= "from {$this->tblNotifications} ";
            $sql .= "where notifications_name = :notifications_name ";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "notifications_name" => $this->notifications_name
            ]);
        } catch (PDOException $ex) {
            $query = false;
        }

        return $query;
    }
}
