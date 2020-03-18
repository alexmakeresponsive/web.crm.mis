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
	

5. Copy files

	* client:
	
   		* copy `client/main/app/dist/client` to `/var/www/domain_name/html`

	* server

		* copy `server` to `/usr/src`
		
		* rename folder 
		
		```
		mv /usr/src/server /usr/src/mis
		```


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
   docker build -f ./docker.file.session -t mongo:mis.db.auth.session.pdn .
   docker build -f ./docker.file.main -t mariadb:mis.db.auth.main.pdn .
   ```
   ```
    cd /usr/src/mis/main/db
    docker build -f ./docker.file.main -t mariadb:mis.db.main.pdn .
    ```
   ```
    cd /usr/src/mis/msa/db
    docker build -f ./docker.file.main -t mariadb:mis.db.msa.pdn .
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

8. Run app

    create network
    
    ```
    docker network create --subnet 10.1.0.0/16 --driver=bridge mis.network
    ```

    run db containers:
    
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.1 \
        --restart=always
        --name mis.db.auth.session.pdn \
        -d mongo:mis.db.auth.session.pdn
    ```
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.2 \
        --restart=always
        --name mis.db.auth.main.pdn \
        --mount type=bind,source="/usr/src/mis/auth/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="/usr/src/mis/auth/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.auth.main.pdn
    ``` 
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.3 \
        --restart=always
        --name mis.db.main.pdn \
        --mount type=bind,source="/usr/src/mis/main/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="/usr/src/mis/main/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.main.pdn
    ``` 
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.4 \
        --restart=always
        --name mis.db.msa.pdn \
        --mount type=bind,source="/usr/src/mis/msa/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="/usr/src/mis/msa/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.msa.pdn
    ``` 
   
    run app containers:
    
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.21 \
        --restart=always
        -p 8202:3000 \
        --workdir=/usr/src/app \
        --name mis.server.auth.pdn \
        --mount type=bind,source="/usr/src/mis/auth/app/app_modules/dist",target=/usr/src/app/app_modules/dist \
    -d node:mis.server.auth.pdn
    ```    
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.22 \
        --restart=always
        -p 8203:3000 \
        --workdir=/usr/src/app \
        --name mis.server.main.pdn \
        --mount type=bind,source="/usr/src/mis/main/app/app_modules/dist",target=/usr/src/app/app_modules/dist \
    -d node:mis.server.main.pdn
    ```    
    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.23 \
        --restart=always
        -p 8204:3000 \
        --workdir=/usr/src/app \
        --name mis.server.msa.pdn \
        --mount type=bind,source="/usr/src/mis/msa/app/app_modules/dist",target=/usr/src/app/app_modules/dist \
    -d node:mis.server.msa.pdn
    ```
    

9. Install and configure **nginx**
	
	for Ubuntu:
	
	```
	cp client/main/app/mis.pdn.conf /etc/nginx/sites-available
    ln -s /etc/nginx/sites-available/mis.pdn.conf /etc/nginx/sites-enabled
	```
