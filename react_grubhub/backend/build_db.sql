create database grubhub;

CREATE TABLE customers 
  (id int NOT NULL AUTO_INCREMENT, 
  email varchar(255) NOT NULL UNIQUE, 
  password varchar(255) NOT NULL, 
  fname varchar(255) NOT NULL, 
  lname varchar(255) NOT NULL,
  PRIMARY KEY (ID)
);