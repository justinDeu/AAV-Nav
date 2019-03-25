
// Bringing in the points
const {NavigationPoint} = require('./Points');
const {Waypoint} = require('./Points');

let points = [];

module.exports = function(app) {
    app.get('/api', (req, res) => {
        res.set('Content-Type', 'application/json');
        let data = {
          message: 'Hello Justin!!!'
        };
        res.send(JSON.stringify(data, null, 2));
      });
      
      app.post('/api/arr', (req, res) => {
        const lat = req.body.lat;
        const long = req.body.long;
        const height = req.body.height;
        const index = req.body.index

        const point = new NavigationPoint(lat, long, height);

        points.splice(index, 0, point);
        res.status(201).send(points);
      });
      
      app.get('/api/arr/', (req, res) => {
        if (req.query.point) {
            if (req.query.point < points.length && req.query.point >= 0) {
                res.send(points[req.query.point]);
            } else {
                res.send('invalid point, too big');
            }
        } else {
            res.send(points);
        }
      });

      app.delete('/api/arr/:pointLocaiton', (req, res) => {

      });
}