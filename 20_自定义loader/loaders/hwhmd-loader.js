const { marked } = require('marked');
const hljs = require('highlight.js');

module.exports = function (content) {
  const html = marked(content)
  return html

}