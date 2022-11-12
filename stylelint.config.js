module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier'
  ],
  'overrides': [
    {
      'files': ['**/*.(scss|css|html|vue)'],
      'customSyntax': 'postcss-scss'
    },
    {
      'files': ['**/*.(html|vue)'],
      'customSyntax': 'postcss-html'
    }
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {}
}
