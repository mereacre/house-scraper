module.exports = {
    // So parent files don't get applied
    root: true,
    env: {
      es6: true,
      browser: true,
      node: true,
    },
    extends: 'eslint:recommended',
    parser: 'babel-eslint',
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
        experimentalObjectRestSpread: true,
      }
    },
    plugins: [
      'babel',
      'react'
    ],
    rules: {
      'array-bracket-spacing': ['error', 'never'],
      'arrow-spacing': 'error',
      'arrow-parens': 'error',
      'block-spacing': ['error', 'always'],
      'brace-style': 'error',
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', {before: false, after: true}],
      'comma-style': ['error', 'last'],
      'computed-property-spacing': ['error', 'never'],
      'consistent-this': ['error', 'self'],
      'consistent-return': 'off',
      'dot-notation': 'error',
      'dot-location': ['error', 'property'],
      'eqeqeq': ['error', 'smart'],
      'eol-last': 'error',
      'indent': ['error', 2, {SwitchCase: 1}],
      'id-blacklist': ['error', 'e'],
      'jsx-quotes': ['error', 'prefer-double'],
      'keyword-spacing': 'error',
      'key-spacing': 'error',
      'max-len': ['error', 120, 4],
      'new-cap': ['off', {capIsNew: true, newIsCap: true}],
      'no-unused-expressions': 'error',
      'no-unused-vars': 'error',
      'no-shadow': 'off',
      'no-spaced-func': 'error',
      'no-multiple-empty-lines': 'error',
      'no-multi-spaces': 'error',
      'no-undef': 'error',
      'no-empty-pattern': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-cond-assign': 'error',
      'no-extra-semi': 'error',
      'no-extra-boolean-cast': 'error',
      'no-trailing-spaces': 'error',
      'no-underscore-dangle': 'error',
      'no-unneeded-ternary': 'error',
      'no-unreachable': 'error',
      'no-var': 'error',
      'one-var': ['error', 'never'],
      'operator-linebreak': ['error', 'after'],
      'padded-blocks': ['error', 'never'],
      'prefer-arrow-callback': 'off',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'quotes': ['error', 'double', 'avoid-escape'],
      'semi': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],
      'space-before-function-paren': ['error', 'never'],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { words: true, nonwords: false }],
      'spaced-comment': 'error',
      'yoda': 'error',
      'babel/object-curly-spacing': ['error', 'never'],
      'babel/generator-star-spacing': 'error',
      'babel/array-bracket-spacing': 'error',
      'babel/arrow-parens': 'error',
      'babel/no-await-in-loop': 'error',
      'babel/func-params-comma-dangle': 'error',
      'babel/flow-object-type': 'error',
      'react/display-name': 'error',
      'react/jsx-boolean-value': ['error', 'always'],
      'react/jsx-closing-bracket-location': 'error',
      'react/jsx-curly-spacing': 'error',
      'react/jsx-equals-spacing': 'error',
      'react/jsx-filename-extension': ['error', {extensions: ['.js']}],
      'react/jsx-first-prop-new-line': ['error', 'multiline'],
      'react/jsx-handler-names': 'error',
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', {maximum: 3}],
      'react/jsx-no-comment-textnodes': 'error',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
      'react/jsx-space-before-closing': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-wrap-multilines': 'error',
      'react/no-danger': 'error',
      'react/no-deprecated': 'error',
      'react/no-did-mount-set-state': 'error',
      'react/no-did-update-set-state': 'error',
      'react/no-direct-mutation-state': 'error',
      'react/no-multi-comp': 'off',
      'react/no-render-return-value': 'error',
      'react/no-is-mounted': 'error',
      'react/no-unknown-property': 'error',
      'react/prefer-arrow-callback': 'off',
      'react/prefer-es6-class': 'error',
      'react/prop-types': 'error',
      'react/react-in-jsx-scope': 'error',
      'react/require-render-return': 'error',
      'react/self-closing-comp': 'error',
      'react/sort-comp': 'error',
      'react/sort-prop-types': 'error',
      'react/no-string-refs': 'warn',
      'strict': 'off',
      'no-case-declarations': 'off',
      'react/jsx-key': 'off',
      'react/jsx-no-bind': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-no-target-blank': 'off',
      'react/jsx-sort-props': 'off',
      'react/no-set-state': 'off',
      'react/forbid-prop-types': 'off',
      'react/prefer-stateless-function': 'off',
      'react/require-optimization': 'off',
      'babel/object-shorthand': 'off',
      'babel/new-cap': 'off',
    },
  };