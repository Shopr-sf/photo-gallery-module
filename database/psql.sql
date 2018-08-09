DROP TABLE products;
DROP TABLE images;
DROP TABLE product_images;

CREATE TABLE products (
  id serial NOT NULL,
  name character varying(255),
  detail character varying(255),
  PRIMARY KEY (id)
);

CREATE TABLE images (
  id serial NOT NULL,
  img_path character varying(255),
  PRIMARY KEY (id)
);

CREATE TABLE product_images (
  id serial NOT NULL,
  product_id INT NOT NULL,
  image_id INT NOT NULL,
  PRIMARY KEY (id)
);

\COPY images FROM '/Users/hyukkim/Desktop/SDC/photo-gallery-module/database/images.csv' DELIMITER ',' CSV;

\COPY products FROM '/Users/hyukkim/Desktop/SDC/photo-gallery-module/database/products.csv' DELIMITER ',' CSV;

\COPY product_images(product_id, image_id) FROM '/Users/hyukkim/Desktop/SDC/photo-gallery-module/database/product_images.csv' DELIMITER ',' CSV;