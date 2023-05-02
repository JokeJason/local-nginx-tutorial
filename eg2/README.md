# e.g. 2: nginx docker serving file from different location

In this e.g., we want to serve test.html from `/data/www` directory.

We
1. created `nginx.conf` to be copied into container `/etc/nginx/conf.d/`
2. copy `test.html` into `/data/www`

How to run this test:
1. `docker-compose build` in `/eg2` directory
2. `docker-compose up` to start container
3. visit `http://localhost:8085/test.html` which will be served with `/data/www/test.html`

Learning from this e.g.; Best way to debug nginx conf is to
1. attach shell to the nginx container
2. run `nginx -t` to test config, which will show the configuration file nginx in the container use
3. Check the nginx config file. In this case, it's `/etc/nginx/nginx.conf` as shown below. Analyze the config file to check how to implement customized nginx config

```conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

As shown in config above:
* all `.conf` files in `/etc/nginx/conf.d/ file will be loaded.
* Through the lead, we identified related `default.conf` as shown below

```conf
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```

We need overwite the config above for our purpose