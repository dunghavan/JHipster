--  *********************************************************************
--  Update Database Script
--  *********************************************************************
--  Change Log: src/main/resources/config/liquibase/master.xml
--  Ran at: 8/21/17 4:23 PM
--  Against: root@localhost@jdbc:mysql://localhost:3306/DemoAngular1x
--  Liquibase version: 3.5.3
--  *********************************************************************

--  Lock Database
UPDATE DemoAngular1x.DATABASECHANGELOGLOCK SET LOCKED = 1, LOCKEDBY = '10.199.36.24 (10.199.36.24)', LOCKGRANTED = '2017-08-21 16:23:02.049' WHERE ID = 1 AND LOCKED = 0;

--  Release Database Lock
UPDATE DemoAngular1x.DATABASECHANGELOGLOCK SET LOCKED = 0, LOCKEDBY = NULL, LOCKGRANTED = NULL WHERE ID = 1;

