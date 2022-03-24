# ts-modules-done-right-2022


developers please scroll down [here](#for-developers)

## for DEVELOPERS

### Install history

```
    npm init                        # create a package.json
    npm i typescript --save-dev
    npx tsc --init                  # create a tsconfig.json
    npm i run-all
```

### build and use the npm package locally

[Publish a npm package locally for testing](https://medium.com/@debshish.pal/publish-a-npm-package-locally-for-testing-9a00015eb9fd)
```
    package.json
        add

            "thinglish": "file:../thinglish/thinglish-0.0.1.tgz",
```