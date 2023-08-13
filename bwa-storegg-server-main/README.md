
# Store GG Dashboard Admin & API

Admin Panel for Store GG APP.




## Features

Build with:
- Javascript
- Node.js (Express.js)
- MongoDB


## App Url

[Open Admin App](https://nada-bwa-store-gg.herokuapp.com/)
- email: admbwa@gmail.com
- password: rahasia

[REST Api Documentation](https://documenter.getpostman.com/view/10944704/UyxdLUdf)


## Installation

modify and provide env.local & env.prod using example below:
```bash
MODE=dev
SERVICE_NAME={YOUR_SERVICE_NAME}
MONGO_URL={YOUR_MONGODB_URL}
SECRET={YOUR_CUSTOM_SECRET_KEY}
```

Install this with npm

```bash
  npm Install
```

Run in development by

```bash
  npm run dev
```

Build to production by
```bash
  npm run prod
```

## Insert main admin user
open mongodb by type mongosh, use database 'db_bwa_store_gg', then type 
db.users.insert({
  email: "admin@admin.com",
  name: "admin",
  password: "$2a$12$SKv86A5L.C4Y/XNB.54i6OnlbVOfJzVpAOElOyTgaFUtetdy9JC0G",
  role: "admin",
  status: "Y",
  phoneNumber: "1234567890"
});

Nah, sekarang nanti login akun,
email: admin@admin.com
pass: admin

