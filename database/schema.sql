CREATE DATABASE IF NOT EXISTS kevinz_shop;
USE kevinz_shop;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(12,2) NOT NULL,
  image_url VARCHAR(500),
  stock INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(150) NOT NULL,
  customer_email VARCHAR(150) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  delivery_address TEXT NOT NULL,
  total_amount DECIMAL(12,2) NOT NULL,
  status ENUM('Pending Payment','Awaiting Verification','Paid','Processing','Completed','Cancelled') DEFAULT 'Pending Payment',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  unit_price DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  payment_method ENUM('Mobile Money','Airtel Money') NOT NULL,
  payment_reference VARCHAR(150) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  customer_phone VARCHAR(30) NOT NULL,
  status ENUM('Awaiting Verification','Paid','Rejected') DEFAULT 'Awaiting Verification',
  admin_notes TEXT,
  verified_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS settings (
  setting_key VARCHAR(100) PRIMARY KEY,
  setting_value VARCHAR(500) NOT NULL
);

INSERT IGNORE INTO settings VALUES
('business_name','Kevinz Jewelry and Bags Hub'),
('mtn_number','0765824970'),
('airtel_number','0755134204'),
('currency','UGX');
