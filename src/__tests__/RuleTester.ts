import path from 'path';

export const getFixturesRootDir = (): string => {
  return path.join(__dirname, 'fixtures');
}

export { RuleTester } from '@typescript-eslint/rule-tester';
