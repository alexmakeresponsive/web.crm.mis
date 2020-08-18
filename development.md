# Development

## Download files

Download assets from [link](https://drive.google.com/file/d/1HpTMscRqREqJax6owD5MIUQoxM9-tmpe/view) and copy it to
`client/main/app/src`


## Development

1. Create network

	```
	docker network create --subnet 10.1.0.0/16 --driver=bridge mis.network
	```

2. Run db containers

    create images:
            
    ```
    cd server/auth/db
    docker build -f ./docker.file.session -t mongo:mis.db.auth.session.local .
    docker build -f ./docker.file.main -t mariadb:mis.db.auth.main.local .
    ```
    ```
    cd ../../main/db 
    docker build -f ./docker.file.main -t mariadb:mis.db.main.local .
    ```
    ```
    cd ../../msa/db
    docker build -f ./docker.file.main -t mariadb:mis.db.msa.local .
    ```

    run containers:

	* db auth session
	
	```
	docker run \
        --net mis.network \
        --ip=10.1.2.1 \
        --name mis.db.auth.session.local \
        -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
        -e MONGO_INITDB_ROOT_PASSWORD=secret \
        -d mongo:mis.db.auth.session.local
    ```
    
    * db auth main

	```
	docker run \
        --net mis.network \
        --ip=10.1.2.2 \
        --name mis.db.auth.main.local \
        -e MYSQL_ROOT_PASSWORD=pass \
        -e MYSQL_DATABASE=main \
        --mount type=bind,source="parh/to/workdir/server/auth/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="parh/to/workdir/server/auth/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.auth.main.local
    ```
    

	* db main

    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.3 \
        --name mis.db.main.local \
        -e MYSQL_ROOT_PASSWORD=pass \
        -e MYSQL_DATABASE=main \
        --mount type=bind,source="parh/to/workdir/server/main/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="parh/to/workdir/server/main/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.main.local
    ```

	* db msa

    ```
    docker run \
        --net mis.network \
        --ip=10.1.2.4 \
        --name mis.db.msa.local \
        -e MYSQL_ROOT_PASSWORD=pass \
        -e MYSQL_DATABASE=main \
        --mount type=bind,source="parh/to/workdir/server/msa/db/data/dump",target=/var/tmp/dump \
        --mount type=bind,source="parh/to/workdir/server/msa/db/config/docker.extra.cnf",target=/etc/mysql/conf.d/docker.custom.cnf \
        -d mariadb:mis.db.msa.local
    ```

4. Run server containers

	create image:
    
    ```
    cd server/auth/app
    docker build -f ./docker.file.dev -t ts.tsnode.nodemon:3.8.2 .
    ```
    ```
    cd ../../main/app
    docker build -f ./docker.file.dev -t ts.tsnode.nodemon:3.8.2 .
    ```
    ```
    cd ../../msa/app
    docker build -f ./docker.file.dev -t ts.tsnode.nodemon:3.8.2 .
    ```

	Each container must be run in self terminal. After start container terminal open container shell.
	Run this command for each server container:
	
	```
    npm install
    ```
 
    and then run this command:
	
	```
    npm run dv
    ```
    
    run containers:

	* server auth
	
	```
	docker run \
        --net mis.network \
        --ip=10.1.2.21 \
        -p 8202:3000 \
        -it --rm \
        --workdir=/usr/src/app \
        --name mis.server.auth.local \
        --mount type=bind,source="parh/to/workdir/server/auth/app",target=/usr/src/app \
    ts.tsnode.nodemon:3.8.2 /bin/sh
    ```

	*  server main

	```
	docker run \
        --net mis.network \
        --ip=10.1.2.22 \
        -p 8203:3000 \
        -it --rm \
        --workdir=/usr/src/app/service_modules \
        --name mis.server.main.local \
        --mount type=bind,source="path/to/workdir/service_modules/server/main/app",target=/usr/src/app/service_modules \
        --mount type=bind,source="path/to/workdir/node_modules",target=/usr/src/app/node_modules \
    ts.tsnode.nodemon:3.8.2 /bin/sh
    ```
	

	* server msa

	```
	docker run \
        --net mis.network \
        --ip=10.1.2.23 \
        -p 8204:3000 \
        -it --rm \
        --workdir=/usr/src/app \
        --name mis.server.msa.local \
        --mount type=bind,source="parh/to/workdir/server/msa/app",target=/usr/src/app \
    ts.tsnode.nodemon:3.8.2 /bin/sh
    ```


5. Install and configure **nginx**

    macos
	```
    cd client/main/app
	cp ./mis.local.conf /usr/local/etc/nginx/servers
	```


6. Add to `/etc/hosts`

	```	    
    127.0.0.1 mis.local
    ```

   
7. run client containers

	create image:
	
	```
    cd client/main/app
    docker build -f ./docker.file.dev -t angular:8 .
    ```
	
	run containers:

	* client main

    ```
    docker run \
        -p 4202:4200 \
        -it --rm \
        --workdir=/usr/src/app \
        --name mis.client.main.local \
        --mount type=bind,source="parh/to/workdir/client/main/app",target=/usr/src/app \
    angular:8 /bin/sh
    ```
   
    Container must be run in self terminal. After start container terminal open container shell.
   	Run this command:
   	
    ```
    npm install
    ```

    and then run this command:
   	
   	```
    ng serve --host 0.0.0.0 --disable-host-check
    ```
   
   On the host machine run:
   
   ```
   sudo nginx
   ```
   or
   ```
   sudo nginx -s reload
   ```
   then open url: `http://mis.local`