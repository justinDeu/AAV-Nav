
// Bringing in the points
const {NavigationPoint} = require('./Points');
const {Waypoint} = require('./Points');

/**
 * The array of points used to tracks the aircraft's path
 */
let points = [];

module.exports = function(app) {

  /**
   * Provides a basic message back when a request is made against the '/api' endpoint
   */
    app.get('/api', (req, res) => {
        res.set('Content-Type', 'application/json');
        let data = {
          message: 'Hello Justin!!!'
        };
        res.send(JSON.stringify(data, null, 2));
      });
      
      /**
       * Adds a Navigation point to the array when a post request is sent to the 
       * '/api/arr' endpoint 
       * 
       * request body (json):
       *    {
	     *      "lat": x,
	     *      "long": y,
	     *      "height": z,
	     *      "index": w
       *    }
       */
      app.post('/api/arr', (req, res) => {

        // Reading the variables from the request body 
        const { lat } = req.body;
        const { long } = req.body;
        const { height } = req.body;
        const { index } = req.body;

        const point = new NavigationPoint(lat, long, height);

        points.splice(index, 0, point);
        res.status(201).send(points);
      });
      
      /**
       * Returns the array of points that are currently stored.
       * If a query variable named index is included, the point
       * at that index is returned
       * 
       */
      app.get('/api/arr/', (req, res) => {

        const { index } = req.query;

        if (index) {
            if (index < points.length && index >= 0) {
                res.send(points[index]);
            } else {
                res.send('invalid index, too big');
            }
        } else {
            res.send(points);
        }
      });

      app.delete('/api/arr/:pointLocaiton', (req, res) => {

      });
}