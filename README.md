# ts-modules-done-right-2022


developers please scroll down [here](#for-developers)

```
pm-tools ts.init
```


## for DEVELOPERS

### Install history

```
    npm init                        # create a package.json
    npm i typescript --save-dev
    npx tsc --init                  # create a tsconfig.json
    npm i run-all
```

### Troubleshooting

```
package.json
    scripts
        "build:fix:out": "mv out/ts out/js",                                        Will break sourcemap
        "prepublishOnly:esm": "npx tsc index.ts -t ES2015 --types node",            "node" types not found    

        "compile:esm:index":"npx tsc index.js --target es6 --modules es2015 && npm run buid:dist:rename:esm",

        "prepublishOnly:cjs": "npx tsc index.ts --esModuleInterop --removeComments",
        "prepublishOnly:esm": "npx tsc src/index.ts -t ES2015",

```