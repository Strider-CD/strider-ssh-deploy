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
