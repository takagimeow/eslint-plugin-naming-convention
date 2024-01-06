import { RuleTester, getFixturesRootDir } from '../RuleTester';
import rule from '../../rules/boolean-var-naming-convention';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: getFixturesRootDir(),
    sourceType: 'module',
  },
});

const options = {
  prefixes: ['is', 'has'],
}

ruleTester.run('boolean-var-naming-convention', rule, {
  valid: [
    {
      code: `
        const isBoolean = true;
      `,
      options: [options],
    },
    {
      code: `
        const hasBoolean = true;
      `,
      options: [options],
    },
    {
      code: `
        const boolean = "true";
      `,
      options: [options],
    },
    {
      code: `
        const isBoolean = getTrue();
        function getTrue(): boolean {
          return true;
        }
      `,
      options: [options],
    }],
  invalid: [
    {
      code: `
        const boolean = true;
      `,
      output: `
        const boolean = true;
      `,
      errors: [
        {
          messageId: 'usePrefix',
          data: {
            prefixes: options.prefixes.join(', '),
          },
          line: 2,
          suggestions: [
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'isBoolean',
              },
              output: `
        const isBoolean = true;
      `,
            },
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'hasBoolean',
              },
              output: `
        const hasBoolean = true;
      `,
            },
          ],
        },
      ],
      options: [options],
    },
    {
      code: `
        const shouldBoolean = true;
      `,
      errors: [
        {
          messageId: 'usePrefix',
          data: {
            prefixes: options.prefixes.join(', '),
          },
          line: 2,
          suggestions: [
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'isShouldBoolean',
              },
              output: `
        const isShouldBoolean = true;
      `,
            },
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'hasShouldBoolean',
              },
              output: `
        const hasShouldBoolean = true;
      `,
            },
          ],
        },
      ],
      options: [options],
    },
    {
      code: `
        function getTrue(): boolean {
          return true;
        }
        const boolean = getTrue();
      `,
      errors: [
        {
          messageId: 'usePrefix',
          data: {
            prefixes: options.prefixes.join(', '),
          },
          line: 5,
          suggestions: [
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'isBoolean',
              },
              output: `
        function getTrue(): boolean {
          return true;
        }
        const isBoolean = getTrue();
      `,
            },
            {
              messageId: 'suggestedFix',
              data: {
                fixWith: 'hasBoolean',
              },
              output: `
        function getTrue(): boolean {
          return true;
        }
        const hasBoolean = getTrue();
      `,
            },
          ],
        },
      ],
      options: [options],
    },
  ],
});