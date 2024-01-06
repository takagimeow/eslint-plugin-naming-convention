import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils/createRule";
import * as tsutils from "ts-api-utils";

type MessageIds = 'usePrefix' | 'suggestedFix';
type Options = [
  {
    prefixes?: string[];
  }
];

const defaultPrefixes = ['is', 'has', 'should'];

export default createRule<Options, MessageIds>({
  name: 'boolean-var-naming-convention',
  meta: {
    type: 'problem',
    docs: {
      description: "Enforce the addition of a specified prefix to boolean variable names",
    },
    fixable: 'code',
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        properties: {
          prefixes: {
            description: 'A list of prefixes to enforce for boolean variables.',
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        // eslint-disable-next-line local-rules/boolean-var-naming-convention
        additionalProperties: false,
      },
    ],
    messages: {
      usePrefix: "Use {{ prefixes }} as the starting point when naming boolean variables.",
      suggestedFix: "Use {{ fixWith }} instead.",
    },
  },
  defaultOptions: [
    {
      prefixes: defaultPrefixes,
    },
  ],
  create(context, options) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();
    const prefixes = options[0].prefixes || defaultPrefixes;
    return {
      Identifier(node) {
        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const type = checker.getTypeAtLocation(tsNode);
        if (tsutils.isBooleanLiteralType(type) ||
          tsutils.isIntrinsicBooleanType(type)) {
          if (!new RegExp(`^(${prefixes.join("|")})`).test(node.name)) {
            context.report({
              node,
              messageId: "usePrefix",
              data: {
                prefixes: prefixes.join(", "),
              },
              suggest: prefixes.map(prefix => {
                const suggestedName = `${prefix}${node.name.charAt(0).toUpperCase() + node.name.slice(1)}`;
                return {
                  messageId: "suggestedFix",
                  data: {
                    fixWith: suggestedName,
                  },
                  fix: (fixer) => {
                    return fixer.replaceTextRange([node.range[0], node.range[1]], suggestedName);
                  },
                };
              }),
            });
          }
        }
      },
    };
  },
});