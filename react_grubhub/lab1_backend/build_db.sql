create database grubhub;

USE grubhub;

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
  profile_image MEDIUMBLOB,
  PRIMARY KEY (oid)
);

CREATE TABLE restaurants 
  (rid int NOT NULL AUTO_INCREMENT, 
  oid int NOT NULL,
  rname VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  cuisine VARCHAR(255) DEFAULT "",
  restaurant_image MEDIUMBLOB,
  PRIMARY KEY (rid),
  FOREIGN KEY (oid) REFERENCES owners(oid) ON DELETE CASCADE
);

CREATE TABLE orders 
  (order_id int NOT NULL AUTO_INCREMENT, 
  rid int NOT NULL,
  cid int NOT NULL,
  status VARCHAR(255) NOT NULL,
  items VARCHAR(255) NOT NULL,
  cname VARCHAR(255) NOT NULL,
  caddress VARCHAR(255) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (rid) REFERENCES restaurants(rid) ON DELETE CASCADE,
  FOREIGN KEY (cid) REFERENCES customers(cid) ON DELETE CASCADE
);

CREATE TABLE sections 
  (sid int NOT NULL AUTO_INCREMENT, 
  rid int NOT NULL,
  sname VARCHAR(255) NOT NULL,
  PRIMARY KEY (sid),
  FOREIGN KEY (rid) REFERENCES restaurants(rid) ON DELETE CASCADE
);


CREATE TABLE menus 
  (mid int NOT NULL AUTO_INCREMENT, 
  rid int NOT NULL,
  sid int NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price FLOAT NOT NULL,
  menu_image MEDIUMBLOB,
  PRIMARY KEY (mid),
  FOREIGN KEY (rid) REFERENCES restaurants(rid) ON DELETE CASCADE,
  FOREIGN KEY (sid) REFERENCES sections(sid) ON DELETE CASCADE
);



