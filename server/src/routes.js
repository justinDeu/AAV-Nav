
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

        try {
          // Reading the variables from the request body 
          const { lat } = req.body;
          const { long } = req.body;
          const { height } = req.body;
          const { index } = req.body;
          const point = new NavigationPoint(lat, long, height);
  
          // Adding in the new point and sending the points back
          points.splice(index, 0, point);
          res.status(201).send(points);

        } catch (err) {
          res.status(404).send('Body missing required field');
        }
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
              res.status(404).send('Given index out of range: ' + index);
            }
        } else {
            res.send(points);
        }
      });

      /**
       * Attempts to delete the point at the given index. Fails if the index is out of bounds or if
       * the point of type Waypoint (cannot be deleted)
       */
      app.delete('/api/arr/:index', (req, res) => {

        const {index} = req.params;
        if (index < points.length && index >= 0 && !(points[index] instanceof Waypoint)) {
          const removed = points.splice(index, 1);
          res.status(202).send(removed);
        } else {
          res.status(412).send('Error occurred');
        }
      });

      /**
       * Loads the given json array as Waypoints into the array. Should be called when the 
       * file is provided to create the points that are necessary to visit.
       * 
       * req.body (json):
       *    {
       *      "latLongs": [
       *        {"lat": x1, "long": y1, "height": z1},
       *        {"lat": x2, "long": y2, "height": z2},
       *        {"lat": x3, "long": y3, "height": z3},
       *        {"lat": x4, "long": y4, "height": z4}
       *      ]
       *    }
       */
      app.post('/api/arr/load', (req, res) => {

        const {latLongs} = req.body;

          for (i in latLongs) {

            const lat = latLongs[i].lat;
            const long = latLongs[i].long;
            const height = latLongs[i].height;

            let wp = new Waypoint(lat, long, height);
            points.push(wp);
          }

          res.status(201).send(points);
      });
}