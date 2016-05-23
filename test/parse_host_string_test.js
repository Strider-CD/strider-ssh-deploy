var sinon = require("sinon");
var chai = require("chai");
var expect = chai.expect;
chai.use(require("sinon-chai"));

describe("host string parsing", function(){
  var parseHostString = require("../parse_host_string");

  it("should parse accepted host string", function() {
    var input = "user@host:1234";

    var result = parseHostString(input);
    expect(result).to.have.property("user");
    expect(result.user).to.equal("user");

    expect(result).to.have.property("host");
    expect(result.host).to.equal("host");

    expect(result).to.have.property("port");
    expect(result.port).to.equal(1234);

    expect(result.string).to.equal(input);
  });

  it("should not parse old host string", function() {
    var result = parseHostString("host:1234");
    expect(result).to.equal(null);
  });
});
