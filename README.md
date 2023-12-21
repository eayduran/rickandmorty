This is a Rick and Morty app with NextJS.

Here is live url of this app:

[http://localhost:3000](http://localhost:3000)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run this app on Docker

First, build the app in the SAME DIRECTORY on CONSOLE:

```bash
docker build -t rick-and-morty .
```

Run the image:

```bash
docker run -p 3000:3000 rick-and-morty
```
