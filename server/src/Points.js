class Point {
    constructor(lat, long, height) {
        this.lat = lat;
        this.long = long;
        this.height = height;
    }
/* 
    get lat() {
        return this._lat;
    }

    set lat(value) {
        this._lat = value;
    }

    get long() {
        return this._long;
    }

    set long(value) {
        this._long = value;
    }

    get height() {
        return this._height;
    }

    set height(value) {
        this._height = value;
    } */

    dataString() {
        return ("lat: " + this.lat + " long: " + this.long + " height: " + this.height);
    }
}

class Waypoint extends Point {

    constructor(lat, long, height) {
        super(lat, long, height);
        this.lat = lat;
        this.long = long;
        this.height = height;
    }

    toString() {
        return ("[Waypoint] " + super.dataString());
    }

}

class NavigationPoint extends Point {
    constructor(lat, long, height) {
        super(lat, long, height);
    }

    toString() {
        return ("[NavigationPoint] " + super.dataString());
    }
}

module.exports = {
    Waypoint: Waypoint,
    NavigationPoint: NavigationPoint
}