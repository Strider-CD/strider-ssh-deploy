var sinon = require('sinon');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('sinon-chai'));

var Client = require('ssh2').Client;

var deploy = require('../deploy');
var bundler = require('../bundler');
var keys = require('../keys');

describe("deploy", function() {
  var config = null, context = null;

  beforeEach(function() {
    sinon.stub(keys, 'getPrivateKey').yields(null, 'your private key');
    sinon.stub(bundler, 'bundleProject').callsArg(3);
  });

  afterEach(function() {
    keys.getPrivateKey.restore();
    bundler.bundleProject.restore();
  });

  describe("connect", function() {
    describe("when three hosts configured", function() {
      beforeEach(function() {
        config = { hosts: [
          'testUser@example.org',
          'testUser@example2.org:2022',
          'testUser@127.0.0.1:22'
        ], script: "./deploy.sh <%= ref.branch %>"};
        context = {
          comment:sinon.stub(),
          job: { project: { name: "foo", branches: [] }, ref: { branch: 'master' } }
        };
        sinon.stub(Client.prototype, 'connect');
        deploy.configure(config)(context);
      });
      afterEach(function() {
        Client.prototype.connect.restore();
      });

      it("connects thrice", function() {
        expect(Client.prototype.connect).to.have.been.calledThrice;
      });

      it("defaults to port 22", function() {
        expect(Client.prototype.connect.getCall(0).args[0])
        .to.deep.eq({ host: 'example.org',
                    port: 22,
                    username: 'testUser',
                    privateKey: 'your private key' })
      });

      it("connects on the correct port", function() {
        expect(Client.prototype.connect.getCall(1).args[0])
        .to.deep.eq({ host: 'example2.org',
                    port: 2022,
                    username: 'testUser',
                    privateKey: 'your private key' })
      });

      it("connects on 22 ok when manually specified", function() {
        expect(Client.prototype.connect.getCall(2).args[0])
        .to.deep.eq({ host: '127.0.0.1',
                    port: 22,
                    username: 'testUser',
                    privateKey: 'your private key' })
      });
    });
  });
});
