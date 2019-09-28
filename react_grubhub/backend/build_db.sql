create database grubhub;

CREATE TABLE customers 
  (cid int NOT NULL AUTO_INCREMENT, 
  email varchar(255) NOT NULL UNIQUE, 
  password varchar(255) NOT NULL, 
  fname varchar(255) NOT NULL, 
  lname varchar(255) NOT NULL,
  phone varchar(255) DEFAULT "",
  profile_image MEDIUMBLOB,
  PRIMARY KEY (cid)
);

CREATE TABLE owners 
  (oid int NOT NULL AUTO_INCREMENT, 
  email varchar(255) NOT NULL UNIQUE, 
  password varchar(255) NOT NULL, 
  fname varchar(255) NOT NULL, 
  lname varchar(255) NOT NULL,
  rname VARCHAR(255) NOT NULL,
  zipcode VARCHAR(255) NOT NULL,
  PRIMARY KEY (oid)
);

CREATE TABLE restaurants 
  (rid int NOT NULL AUTO_INCREMENT, 
  oid int NOT NULL,
  rname VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  PRIMARY KEY (rid),
  FOREIGN KEY (oid) REFERENCES owners(oid)
);
