
window.onload = function onload(){
    var pk = 903280;
    RANDO.SETTINGS.DEM_URL      = "json/trek/" + pk + "/dem.json";
    RANDO.SETTINGS.PROFILE_URL  = "json/trek/" + pk + "/profile.json";
    RANDO.SETTINGS.POI_URL      = "json/trek/" + pk + "/pois.geojson";
    RANDO.SETTINGS.TILE_TEX_URL = "https://a.tiles.mapbox.com/v3/makina-corpus.i3p1001l/{z}/{x}/{y}.png"
    RANDO.SETTINGS.SIDE_TEX_URL = "img/side.jpg";
    RANDO.SETTINGS.FAKE_TEX_URL = "img/white.png";
    RANDO.SETTINGS.CAM_SPEED_F  = 100;
    RANDO.SETTINGS.PICTO_PREFIX = "";

    RANDO.START_TIME = Date.now();

    var canvas = document.getElementById('canvas_renderer');
    var cameraID = "examine_camera";
    var scene = new RANDO.Scene(canvas, cameraID, "1.2" );
    scene.init();
};


