/**
 * @since 20180917 13:42
 * @author vivaxy
 */

(function() {
  const path = require('path');
  const amdLoader = require('./node_modules/monaco-editor/min/vs/loader.js');
  const amdRequire = amdLoader.require;
  const amdDefine = amdLoader.require.define;

  function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
      pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
  }

  amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, './node_modules/monaco-editor/min')),
  });
  // workaround monaco-css not understanding the environment
  self.module = undefined;
  amdRequire(['vs/editor/editor.main'], function() {
    var editor = monaco.editor.create(document.getElementById('container'), {
      value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}',
      ].join('\n'),
      language: 'javascript',
    });
  });
})();
