# Deployment

1. Check docker engine on hosting: run mariadb container, other containers, 
	do exec command
	If containers not working, reinstall OS, reinstall docker engine.
	
2. Check point `1` again

3. Pull images

	```
	docker pull mongo  mariadb node:13.8.0-alpine3.10
	```

4. Create file structure

	* client:
	
	```
	mkdir -p /var/www/icearea.amrxt.ru/html
	```
	
	* server:
	
 	```
	mkdir -p /usr/src/mis \
		 /usr/src/mis/auth/app/app_modules \
		 /usr/src/mis/main/app/app_modules \
		  /usr/src/mis/msa/app/app_modules \
	\
		 /usr/src/mis/auth/db/config \
		 /usr/src/mis/main/db/config \
		  /usr/src/mis/msa/db/config \
	\
		 /usr/src/mis/auth/db/data/dump \
		 /usr/src/mis/main/db/data/dump \
		  /usr/src/mis/msa/db/data/dump \
	\
		 /usr/src/mis/auth/db/data/mount \
		 /usr/src/mis/main/db/data/mount \
		  /usr/src/mis/msa/db/data/mount
	```

5. Copy files

	* angular app to 
		`/var/www/icearea.amrxt.ru/html`

	* db backups to

		* `/usr/src/mis/auth/db/data/dump`
	 	* `/usr/src/mis/main/db/data/dump`
	 	* `/usr/src/mis/msa/db/data/dump`
			
	* dist(compiled nodejs app) folder to

		 * `/usr/src/mis/auth/app/app_modules`
		 * `/usr/src/mis/main/app/app_modules`
		 * `/usr/src/mis/msa/app/app_modules`
		 
	* docker.file.pdn and package.json from /server/service_name/app to
		
		* `/usr/src/mis/auth/app`
		* `/usr/src/mis/main/app`
		* `/usr/src/mis/msa/app`
		
	* docker.extra.cnf from /server/service_name/db/config  to
		
		* `/usr/src/mis/auth/db/config`
       * `/usr/src/mis/main/db/config`
       * `/usr/src/mis/msa/db/config`


6. Create and run docker containers

	```
	cd /usr/src/mis/auth/app
	docker build -f ./docker.file.pdn -t express.4:mis.server.auth.pdn .
	```
	```
	cd /usr/src/mis/main/app
	docker build -f ./docker.file.pdn -t express.4:mis.server.main.pdn .
	```
	```
	cd /usr/src/mis/msa/app
	docker build -f ./docker.file.pdn -t express.4:mis.server.msa.pdn .
	```

	Check every container is not stopped

7. Copy `server/docker.compose.pdn.yml` to `/usr/src/mis`

8. Create db, setup user, restore data
	
	```
	docker exec -it mis.db.auth.main.pdn /bin/bash
	docker exec -it mis.db.main.pdn /bin/bash
	docker exec -it mis.db.msa.pdn /bin/bash
	
	# do for each container
	mysql -uroot -ppass
   mysql -uroot -ppass main < /var/tmp/dump/dump.sql
	
	# do for each container	
	CREATE USER 'nodeuser' IDENTIFIED BY 'U^O&Tg2e23%^fH';
	GRANT ALL privileges ON `main`.* TO 'nodeuser'@'%';
	FLUSH PRIVILEGES;
	```

9. Install and configure **nginx**
	
	```
	cp client/main/app/mis.pdn.conf /usr/local/etc/nginx/servers
	```
	
10. Run app

	```
    cd /usr/src/mis
    docker-compose -f docker.compose.pdn.yml up
    ```
