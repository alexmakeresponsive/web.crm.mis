CREATE USER 'nodeuser' IDENTIFIED BY 'U^O&Tg2e23%^fH';
GRANT ALL privileges ON `main`.* TO 'nodeuser'@'%';
FLUSH PRIVILEGES;