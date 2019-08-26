Set up the ```dev.env``` and production environment:
```
MONGODB_URI=<the_uri>
JWT_SECRET=<the_secret>
CLIENT_URL=<http://localhost:5000>
USER_EMAIL=<email>
USER_PASSWORD=<password_email>
SOURCE_CODE_LINK=<the_source_code_link>
```
1. ```CLIENT_URL```: is domain
1. ```USER_PASSWORD```: password of app/ email

for example: ```dev.env```
```
MONGODB_URI=mongodb://localhost:27017/prod
JWT_SECRET=sada2addf_324fsf4@#@!$_production
CLIENT_URL=http://localhost:3000
USER_EMAIL=abc123123@gmail.com
USER_PASSWORD=jasdwqeohhaofib
SOURCE_CODE_LINK=http://google.com.vn
```