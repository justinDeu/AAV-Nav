const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();   
const expect = chai.expect;

chai.use(chaiHttp);

const API_BASE = 'http://api:8080'
console.log('Using API_BASE: ' + API_BASE);

const get = (url) => chai.request(API_BASE).get(`${url}`);
const post = (url, data) => chai.request(API_BASE).post(`${url}`).send(data);
const query = (url, data) => chai.request(API_BASE).get(`${url}`).query(data);

describe('/api', () => {

    describe('GET /api/arr', () => {

        it('should get empty array when nothing exists', async() => {
            const res = await get('/api/arr');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            expect(res).to.have.header('content-type', /application\/json/);
        });

        it('should return 404 when requesting index out of range', async() => {
            const res = await query('/api/arr', {index: 3});
            res.should.have.status(404);
        });

        it('should return object at index', async() => {
            // Adding two objects to the list 
            let res = await addPoint({
                lat: 1,
                long: 11,
                height: 111,
                index: 0
            });
            res.body.length.should.be.eql(1);

            res = await addPoint({
                lat: 2,
                long: 22,
                height: 222,
                index: 1
            });
            res.body.length.should.be.eql(2);

            res = await query('/api/arr', {index: 0});
            res.body.should.be.a('object');
        
            const body = res.body;
            expect(body.lat, 'should have a latitude').to.equal(1);
            expect(body.long, 'should have a longitude').to.equal(11);
            expect(body.height, 'should have a height').to.equal(111);

        });
    });

    describe('POST /api/arr', () => {
        // no testing implemented yet
    });


    describe('DELETE /api/arr', () => {
        // no testing implemented yet
    });
});

async function addPoint(data) {
    const res = await post('/api/arr', data);
    res.should.have.status(201);
    res.body.should.be.a('array');
    return res;
}