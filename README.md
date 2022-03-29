# ts-modules-done-right-2022

contributors please scroll down [here](#for-contributors)



This is a systematic module test on the current typescript version.
Its intension is to demystify the hundrets od stackoverflow hints and blog posts on this topic.

You can always see each of the tsconfig.jsons for each target and module "style" and see the progress being made and how its done right.
It also shows how much effor is attached to each of the module styles and its boilerplates.

Maybe you will also realize the many inconsistencys of the non systemic development aporach of the diffrent competing ES-teams.

## getting started
```
pm-tools ts.init
```


## Matrix for cases

| Config                |  ES6 CommonJS         | ES6 UMD               | ES6 ESM               | ESNext ESM            |                       |
|:----------------------|:----------------------|:----------------------|:----------------------|:----------------------|:----------------------|
| tsconfig.json| |
| tsconfig.es6.cjs.json| needs other package.json|
|                        | out: es6/cjs | out: es6/umd | out: es6/esm | out: esnext/esnext |
|                        | node out/es6/esm/index.js |
|                        |  [error: exports is not defined in ES module scope](#es6-commonjs-1)  |
|                        | node out/es6/esm/index.cjs |
|                        |  [error: ERR_REQUIRE_ESM](#es6-commonjs-2)  |
|                        | node out/es6/esm/index.js |
| tsconfig.es6.umd.json| | does not work with esm |
|                        | | out: es6/umd |
|                        | | node out/es6/umd/index.js |
|                        | |   error: no output since no module condition applies |
| tsconfig.esm.json      | | | out: es6/esm |
|                        | | | node out/es6/esm/index.js |
|                        | | | works  on this code ./ts/index.wrong.but.working.ts |
| tsconfig.esnext.esnext.json| | | | out: esnext/esm |
|                            | | | | node out/esnext/esm/index.js |
|                            | | | | works  on this code ./ts/index.wrong.but.working.ts |
|                            | | | | node out/esnext/esm/index.right.but.NOT.working.js |
|                            | | | | [error: ERR_MODULE_NOT_FOUND](#esnext-esnext) | 




# Error Messages

## ES6 CommonJS 1
```
> node out/es6/esm/index.js

file:///Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/index.js:5
Object.defineProperty(exports, "__esModule", { value: true });
                      ^

ReferenceError: exports is not defined in ES module scope
This file is being treated as an ES module because it has a '.js' file extension and '/Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/package.json' contains "type": "module". To treat it as a CommonJS script, rename it to use the '.cjs' file extension.
    at file:///Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/index.js:5:23
    at ModuleJob.run (node:internal/modules/esm/module_job:197:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:341:24)
    at async loadESM (node:internal/process/esm_loader:88:5)
    at async handleMainPromise (node:internal/modules/run_main:61:12)

Node.js v17.6.0
```

## ES6 CommonJS 2
```
> node out/es6/cjs/index.cjs

/Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/index.cjs:6
const MyCustomClass_class_js_1 = __importDefault(require("./MyCustomClass.class.js"));
                                                 ^

Error [ERR_REQUIRE_ESM]: require() of ES Module /Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/MyCustomClass.class.js from /Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/index.cjs not supported.
MyCustomClass.class.js is treated as an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which declares all .js files in that package scope as ES modules.
Instead rename MyCustomClass.class.js to end in .cjs, change the requiring code to use dynamic import() which is available in all CommonJS modules, or change "type": "module" to "type": "commonjs" in /Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).

    at Object.<anonymous> (/Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/es6/cjs/index.cjs:6:50) {
  code: 'ERR_REQUIRE_ESM'
}

Node.js v17.6.0
```

## ESNext ESNext
```
> node out/esnext/esm/index.right.but.NOT.working.js
node:internal/errors:465
    ErrorCaptureStackTrace(err);
    ^

Error [ERR_MODULE_NOT_FOUND]: Cannot find module '/Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/esnext/esm/MyCustomClass.class' imported from /Users/Shared/dev/Workspaces/Donges.IT/ts-modules-done-right-2022/out/esnext/esm/index.right.but.NOT.working.js
    at new NodeError (node:internal/errors:372:5)
    at finalizeResolution (node:internal/modules/esm/resolve:398:11)
    at moduleResolve (node:internal/modules/esm/resolve:957:10)
    at defaultResolve (node:internal/modules/esm/resolve:1166:11)
    at ESMLoader.resolve (node:internal/modules/esm/loader:536:30)
    at ESMLoader.getModuleJob (node:internal/modules/esm/loader:250:18)
    at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:79:40)
    at link (node:internal/modules/esm/module_job:78:36) {
  code: 'ERR_MODULE_NOT_FOUND'
}

Node.js v17.6.0
```
Reason: 
```
import MyCustomClass from "./MyCustomClass.class";
                                                ^^^ no ".js" as made clear by the TS team
```

## for CONTRIBUTORS

### Install history

```
    npm init                        # create a package.json
    npm i typescript --save-dev
    npx tsc --init                  # create a tsconfig.json
    npm i run-all
```


### To-Do
 * add the cjs package.json (only remove type: module)

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


```
    snowpack...
```