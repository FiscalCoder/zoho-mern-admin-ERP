## MERN-Admin-ERP

## Available Script

### With Docker
A simple Docker script only for Demo. Cannot be used in Development nor in Production.
`docker build -t admin-erp/react:latest .`
`docker run -p 3000:3000 admin-erp/react`

### Without Docker
node and npm are basic requirements assumed to be installed

Install dependencies with
`npm run install && npm run client-install`

To start server and client simultaneously

`npm run dev`

To Build react application

cd client and run

`npm run build`


## Go to http://localhost:3000 to view the web app

Login Creds
ADMIN:
admin123@gmail.com
password123

EMPLOYEE:
employee2@gmail.com
password

Go to users from the sidebar and click on the first action button of employee2 to get into the task page with already populated data
