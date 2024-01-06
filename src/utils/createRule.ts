import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  name =>
    `https://github.com/takagimeow/eslint-plugin-naming-convention/blob/main/docs/rules/${name}.md`,
);

export { createRule };
