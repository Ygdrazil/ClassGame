# ClassGame


If you want to run it on your machine, here's what you need to do :

```bash
npm install

// you should modify the values contained in .env
cp .env.example .env

npx prisma migrate dev
npx prisma db seed

npm run dev
```

The project will run in http://localhost:5174.

If you want to build it, you just need to do :
```bash
npm run build
cd build && node index.js
```

The project will run on http://localhost:3000.

## State of the database

If you need to see the state of the database during development, just do this :

```bash
npx prisma studio
```

You can access a prisma dashboard on http://localhost:5555.
