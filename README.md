# Assertate

> TypeScript 3.7 assertion helper library which debugging helpers

This is Evan Louie's most excellent [assertate](https://www.npmjs.com/package/assertate) library repacked with tiny debugging helpers.

Assertate is a minimal library exposing basic
[TypeScript 3.7 assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions) helpers with the goal of providing a combination of compile time type assertions and run time assertions.

In the `assertate-debug` variant you will be thrown into a debugger if an assentation fails. In most Javascript Implementation this will only happen if the code is actually executed in a debugger. If not, the assert will fail as usual.

This works very nice with The VScode debugger and a "run Jest" configuration. [Add a debugger Configuration](http://f.foxel.org/Screen-Shot-2021-12-24-15-08-31.png) like this:

```js
{
  "version": "0.2.0",
  "configurations": [
        {
      "type": "node",
      "request": "launch",
      "name": "Jest All",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileBasenameNoExtension}",
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      }
    }
  ]
}
```

For further information check the [original documentation](https://www.npmjs.com/package/assertate).

## API

Swing by the [docs](https://evanlouie.github.io/assertate/) to get a full look
at the available functions.
