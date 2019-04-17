const uuidv4 = require('uuid/v4');

class Point {
    constructor(lat, lng, height, type) {
        this.lat = lat;
        this.lng = lng;
        this.height = height;
        this.type = type;
        this.uuid = uuidv4();
    }

    toString() {
        return ("[" + this.type + "] lat: " + this.lat + " lng: "
            + this.lng + "  height: " + this.height);
    }
}

class Waypoint extends Point {
    constructor(lat, lng, height) {
        super(lat, lng, height, "Waypoint");
    }
}

class NavigationPoint extends Point {
    constructor(lat, lng, height) {
        super(lat, lng, height, "Navigation");
    }
}

module.exports = {
    Waypoint: Waypoint,
    NavigationPoint: NavigationPoint
}