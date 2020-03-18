# Deployment

## Configure domain

Create A record for domain


## Compile app

For server containers run command in container:

```
tsc -p .
```

For client(Angular) containers run command in container:

```
ng build
```


## Deploy

1. Check docker engine on hosting: run mariadb container, other containers, 
	do exec command
	If containers not working, reinstall OS, reinstall docker engine.
	
	
2. Check point `1` again


3. Pull images

	```
	docker pull mongo  
	```
     ```
    docker pull mariadb
    ```
    ```
    docker pull node:13.8.0-alpine3.10
    ```


4. Create file structure

	* client:
	
	```
	mkdir -p /var/www/domain_name/html
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
		`/var/www/domain_name/html`

	* db backups to

		* `/usr/src/mis/auth/db/data/dump`
	 	* `/usr/src/mis/main/db/data/dump`
	 	* `/usr/src/mis/msa/db/data/dump`
			
	* dist(compiled nodejs app) folder to

		 * `/usr/src/mis/auth/app/app_modules`
		 * `/usr/src/mis/main/app/app_modules`
		 * `/usr/src/mis/msa/app/app_modules`
		 
	* docker.file.pdn, package.json, .dockerignore, .env from /server/service_name/app to
		
		* `/usr/src/mis/auth/app`
		* `/usr/src/mis/main/app`
		* `/usr/src/mis/msa/app`
		
	* docker.extra.cnf from /server/service_name/db/config  to
		
		* `/usr/src/mis/auth/db/config`
       * `/usr/src/mis/main/db/config`
       * `/usr/src/mis/msa/db/config`


6. Check free space

    ```
   docker system df
   ```
   
   if vilumes size near 100%, clean volume data
   
   ```
   docker system prune --volumes
   ```
   
7. Create and run docker containers

    create db containers:
    
    ```
   cd /usr/src/mis/auth/db
   docker build -f ./docker.file.session.pdn -t mongo:mis.db.auth.session.pdn .
   docker build -f ./docker.file.main.pdn -t mariadb:mis.db.auth.main.pdn .
   ```
   ```
    cd /usr/src/mis/main/db
    docker build -f ./docker.file.main.pdn -t mariadb:mis.db.main.pdn .
    ```
   ```
    cd /usr/src/mis/msa/db
    docker build -f ./docker.file.main.pdn -t mariadb:mis.db.msa.pdn .
    ```
    
    create server containers:
    
	```
	cd /usr/src/mis/auth/app
	docker build -f ./docker.file.pdn -t node:mis.server.auth.pdn .
	```
	```
	cd /usr/src/mis/main/app
	docker build -f ./docker.file.pdn -t node:mis.server.main.pdn .
	```
	```
	cd /usr/src/mis/msa/app
	docker build -f ./docker.file.pdn -t node:mis.server.msa.pdn .
	```

	Check every container is not stopped


8. Run app

    Copy `server/docker.compose.pdn.yml` to `/usr/src/mis`

    run command:
    ```
    docker-compose -f docker.compose.pdn.yml up -d
    ``` 

9. Install and configure **nginx**
	
	for Ubuntu:
	
	```
	cp client/main/app/mis.pdn.conf /etc/nginx/sites-available
    ln -s /etc/nginx/sites-available/mis.pdn.conf /etc/nginx/sites-enabled
	```
