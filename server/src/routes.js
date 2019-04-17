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
       * '/api/points' endpoint 
       * 
       * request body (json):
       *    {
	     *      "lat": x,
	     *      "lng": y,
	     *      "height": z,
	     *      "index": w
       *    }
       */
      app.post('/api/points', (req, res) => {

        try {
          // Reading the variables from the request body 
          const { lat } = req.body;
          const { lng } = req.body;
          const { height } = req.body;
          const { index } = req.body;
          const point = new NavigationPoint(lat, lng, height);
  
          // Adding in the new point and sending the points back
          points.splice(index, 0, point);
          res.status(201).send(points);

        } catch (err) {
          res.status(404).send('Body missing required field');
        }
      });

      /**
       * Sends back all points
       */
      app.get('/api/points', (req, res) => {
        res.send(points);
      });
      
      /**
       * Returns the array of points that are currently stored.
       * If a query variable named index is included, the point
       * at that index is returned
       * 
       */
      app.get('/api/points/:id', (req, res) => {

        const { id } = req.param;

        // write function to return item with given id 

        res.send('Not yet implemented, but you wanted id: ' + id);
      });

      /**
       * Attempts to delete the point at the given index. Fails if the index is out of bounds or if
       * the point of type Waypoint (cannot be deleted)
       */
      app.delete('/api/points/:index', (req, res) => {

        const { index } = req.params;

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
       *        {"lat": x1, "lng": y1, "height": z1},
       *        {"lat": x2, "lng": y2, "height": z2},
       *        {"lat": x3, "lng": y3, "height": z3},
       *        {"lat": x4, "lng": y4, "height": z4}
       *      ]
       *    }
       */
      app.post('/api/points/load', (req, res) => {

        const {latLongs} = req.body;

          for (i in latLongs) {

            const lat = latLongs[i].lat;
            const lng = latLongs[i].lng;
            const height = latLongs[i].height;

            let wp = new Waypoint(lat, lng, height);
            points.push(wp);
          }

          res.status(201).send(points);
      });
}