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
	     *      "before": w
       *    }
       */
      app.post('/api/points', (req, res) => {

        try {
          // Reading the variables from the request body 
          const { lat } = req.body;
          const { lng } = req.body;
          const { height } = req.body;
          const { before } = req.body;
          const point = new NavigationPoint(lat, lng, height);

          const loc = locateID(before);
          
          if (loc == -1 ) {
              res.status(404).send("Could not find point to insert after with UUID: " + after);
          } else {
            // Adding in the new point and sending the points back
            points.splice(loc, 0, point);
            res.status(201).send(point);
          }
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
       * Returns the point with the given UUID or a 404 not found
       */
      app.get('/api/points/:uuid', (req, res) => {

        const loc = locateID(req.params.uuid);

        if (loc == -1) {
            res.status(404).send ("No point containing UUID: " + req.params.uuid);
        } else {
            res.send(points[loc]);
        }

      });

      /**
       * Attempts to delete the point at the given index. Fails if the index is out of bounds or if
       * the point of type Waypoint (cannot be deleted)
       */
      app.delete('/api/points/:uuid', (req, res) => {

        const { uuid } = req.params;
        const loc = locateID(uuid);

        if (loc == -1) {
            res.status(404).send ("No point containing UUID: " + req.params.uuid);
        } else {
            const point = points[loc];

            if (point.type == "Waypoint") {
                res.status(403).send("Deleting Waypoints is not allowed");
            } else {
                const removed = points.splice(loc, 1);
                res.status(202).send(removed);
            }
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
        points = [];

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


/**
 * linearly searches the list of points for the given uuid
 * 
 * @param   id  the uuid to search for 
 * @return      the index of the matching uuid or -1
 * 
 */
function locateID(uuid) {

    for (i = 0; i < points.length; i++) {
        if (points[i].uuid == uuid) {
            return i;
        }
    }

    return -1;
}