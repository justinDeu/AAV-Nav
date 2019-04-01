const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();   
const expect = chai.expect;

chai.use(chaiHttp);

const API_BASE = 'http://api:8080'
console.log('Using API_BASE: ' + API_BASE);

const get = (url) => chai.request(API_BASE).get(`${url}`);

describe('/api', () => {

    describe('GET /api/arr', () => {

        it('should get empty array when nothing exists', async() => {
            const res = await get('/api/arr');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            expect(res).to.have.header('content-type', /application\/json/);
        });

    });

});