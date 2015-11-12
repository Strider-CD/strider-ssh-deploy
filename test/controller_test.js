var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('sinon-chai'));

describe("controller", function() {
  var controller = require('../controller.js');
  var scope = null;
  var config = null;

  beforeEach(function() {
    config = {
      hosts: []
    };
    scope = {
      $parent: { $parent: { project: { name: "test" } } },
      $watch: sinon.stub().yields(config),
      pluginConfig: sinon.stub().yields()
    };
    controller[1](scope)
  });
  
  describe("addHost()", function() {
    function add (str) {
      scope.new_host = str;
      scope.addHost();
    };
    
    it("allows adding likely valid hosts", function() {
      add('testUser@staging.example.org');
      add('testUser@staging2.example.org:22');
      add('testUser@staging3.example.org:2202');
      expect(config.hosts).to.have.length(3);
    });

    it("won't add a host with missing user", function() {
      add('staging.example.org');
      add('staging2.example.org:22');
      add('staging3.example.org:2202');
      expect(config.hosts).to.have.length(0);
    });

    it("won't add a host with more than one colon", function() {
      add('staging3.example.org:2202:22');
      expect(config.hosts).to.have.length(0);
    });

    it("won't add a host with a port outside the valid port range", function() {
      add('staging3.example.org:0');
      add('staging3.example.org:70000');
      add('staging3.example.org:abc');
      expect(config.hosts).to.have.length(0);
    });

    it("converts implicit port to explicit port when adding", function() {
      add('testUser@staging.example.org');
      expect(config.hosts[0]).to.eq('testUser@staging.example.org:22');
    });
  });
});
