var expect = require('chai').expect;
import utils from './../src/utils';


describe('utils.getRandomIntInclusive', function() {

  it('will return an int, not a float', function() {
    var result = utils.getRandomIntInclusive(0, Math.random()*1000);
    expect(Number.isInteger(result)).to.be.true;
  });

  it('will return an int between 0 and 5', function() {
    var result = utils.getRandomIntInclusive(0, 5);
    expect(result).to.be.at.least(0);
    expect(result).to.be.at.most(6);
  });

  it('will work with negative numbers', function() {
    var result = utils.getRandomIntInclusive(-100, -50);
    expect(result).to.be.at.least(-100);
    expect(result).to.be.at.most(-50);
  });

  it('will throw an error if min or max are not numbers', function() {
    var result = utils.getRandomIntInclusive;
    expect(result.bind(this, 'I am a string', 5)).to.throw(Error);
  })

});
