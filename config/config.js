(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
app.controller('SshDeployController', require('../controller'));

},{"../controller":2}],2:[function(require,module,exports){
var parseHostString = require('./parse_host_string');

module.exports = ['$scope', function ($scope) {
  var projectName = $scope.$parent.$parent.project.name;
  $scope.paths = require('./remote_paths')(projectName.replace('/','_'));
  $scope.$watch('configs[branch.name].ssh_deploy.config', function (value) {
    $scope.config = value;
  });
  $scope.saving = false;
  $scope.error = false;
  $scope.save = function () {
    $scope.saving = true;
    $scope.pluginConfig('ssh_deploy', $scope.config, function() {
      $scope.saving = false;
    });
  };
  $scope.removeHost = function (index) {
    $scope.config.hosts.splice(index, 1);
    $scope.save();
  };
  $scope.addHost = function () {
    if (!$scope.config.hosts) $scope.config.hosts = [];
    var host = parseHostString($scope.new_host);
    if (host) {
      $scope.config.hosts.push(host.string);
      $scope.new_host = '';
      $scope.save();
    }else{
      $scope.error = true;
      $timeout(function(){
        $scope.error = false;
      },3000);
    }
  };
}];

},{"./parse_host_string":3,"./remote_paths":4}],3:[function(require,module,exports){
module.exports = function (str) {
  var min = 1;
  var max = 65535;
  var parts1 = str.split('@');
  var port = null;
  var user = null;
  if (parts1.length != 2){
    return null;
  }
  var hostString = "";
  if (parts1.length == 2){
    user = parts1[0];
    hostString = parts1[1];
  } else {
    hostString = parts1[0];
  }
  var parts2 = hostString.split(':');
  if (parts2.length > 2){
    return null;
  }
  var host = parts2[0];
  if (parts2[1]) {
    port = parseInt(parts2[1]);
    var validPort = port >= min && port <= max;
    if (!validPort) {
      return null;
    }
  } else {
    port = 22;
  }
  return {
    string: user+'@'+host+':'+port,
    user: user,
    host: host,
    port: port
  }
};

},{}],4:[function(require,module,exports){
module.exports = function(name) {
  var remote = '$HOME/'+name;
  return {
    name: name,
    remote: remote,
    old: remote+'.old',
    bundle: "/tmp/package.tar.gz",
  }
}

},{}]},{},[1])