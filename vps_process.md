# Install git 

```
sudo apt install git
```

# install nodejs

sudo curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh

sudo bash /tmp/nodesource_setup.sh

sudo apt install nodejs

# Create working directory

mkdir -p /apps/letslearn/repo
mkdir -p /apps/letslearn/dest


# git init
cd ~/apps/letslearn/repo
git --bare init

# add post-receive
nano hooks/post-receive

```
#!/bin/bash -l

echo 'post-receive: Triggered.'
cd ~/apps/letslearn/dest/
echo 'post-receive: git check out...'
git --git-dir=/root/apps/letslearn/repo/ --work-tree=/root/apps/letslearn/dest/ checkout master -f
echo 'post-receive: npm install..'
npm install
forever restart letslearn
```

# give permission to post-receive
chmod ug+x hooks/post-receive

sudo a2enmod proxy proxy_http rewrite headers expires

# create new site in apache
sudo nano /etc/apache2/sites-available/letslearn.live.conf

# content
```
<VirtualHost *:80>
        ServerName letslearn.live
        ServerAlias www.letslearn.live
        
                ProxyRequests off
                ProxyPreserveHost On
                ProxyVia Full

        <Proxy *>
                Require all granted
        </Proxy>

        ProxyPass / http://127.0.0.1:4000/
        ProxyPassReverse / http://127.0.0.1:4000/
RewriteEngine on
RewriteCond %{SERVER_NAME} =letslearn.live
RewriteRule ^ https://%{SERVER_NAME}%{REQUEST_URI} [END,NE,R=permanent]
</VirtualHost>
```

# restart apache2 
sudo systemctl restart apache2

# install python and certbot 
sudo apt install certbot python3-certbot-apache

# add ssl to our app 
sudo certbot -d letslearn.live -d www.letslearn.live --apache --agree-tos -m web.letslearn@gmail.com --no-eff-email --redirect

# install forever to keep node app running
npm install forever -g

# run forever 
forever start --uid="letslearn" --sourceDir="/root/apps/letslearn/dest" index.js