# eslint-plugin-naming-convention

ESLint plugin for enforcing naming conventions on variables and function names.

## Installation

You'll first need to install [ESLint](https://eslint.org/) and [@typescript-eslint/parser](https://typescript-eslint.io/packages/parser/):

```sh
npm i -D eslint @typescript-eslint/parser
```

Next, install `eslint-plugin-naming-convention`:

```sh
npm i -D eslint-plugin-naming-convention
```

## Configuration

Add `eslint-plugin-naming-convention` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["naming-convention"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "naming-convention/boolean-var-naming-convention": [
      "error",
      {
        "prefixes": ["is", "has"]
      }
    ]
  }
}
```

Because the rules internally requires the generation of `parseServices`, it is necessary to set `parserOptions.project` for `@typescript-eslint/parser`.

```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                                         | Description                                                          | 🔧  | 💡  |
| :--------------------------------------------------------------------------- | :------------------------------------------------------------------- | :-- | :-- |
| [boolean-var-naming-convention](docs/rules/boolean-var-naming-convention.md) | Enforce the addition of a specified prefix to boolean variable names | 🔧  | 💡  |

<!-- end auto-generated rules list -->

## License

`eslint-plugin-naming-convention` is licensed under the [MIT License](https://opensource.org/license/mit/).
