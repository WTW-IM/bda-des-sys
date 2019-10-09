## Development

```
$ git clone https://github.com/WTW-IM/bda-des-sys.git
$ cd bda-des-sys
$ npm install
```

Run development page on **http://localhost:3200/**

```
$ npm run dev
```

## Build

Build for production.

```
$ npm run build
```

## Deploy

Deploy to `gh-pages` branch on GitHub.
You will need to have ssh tokens set up for git terminal commands.

```
$ npm run deploy
```

If you run into errors you can clear the npm cache which should help.

```
$ rm -rf node_modules/gh-pages/.cache
```