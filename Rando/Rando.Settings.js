// Rando.Settings.js 
// General settings  

var RANDO = RANDO || {};
RANDO.SETTINGS = {};

// Links
RANDO.SETTINGS.DEM_URL; // Url of the DEM json
RANDO.SETTINGS.PROFILE_URL; // Url of the trek's profile json
RANDO.SETTINGS.TILE_TEX_URL; // Url of a tile texture
RANDO.SETTINGS.SIDE_TEX_URL; // Url of the side texture
RANDO.SETTINGS.FAKE_TEX_URL; // Url of the fake texture
////////////////////////////////////////////////////////////////////////////////


// Camera 
RANDO.SETTINGS.CAM_OFFSET = 50; // Camera's altitude offset (in meters)

RANDO.SETTINGS.CAM_SPEED_T = 1.8; // Camera speed in Trek following mode (from 0 to 2)
RANDO.SETTINGS.CAM_SPEED_F = 50;  // Camera speed in Flying mode(from 0 to infinity !) 
////////////////////////////////////////////////////////////////////////////////


// Geometry
RANDO.SETTINGS.LIMIT_VERT_BY_MESH = 65536;
RANDO.SETTINGS.TREK_TESSEL = 5;
RANDO.SETTINGS.MIN_THICKNESS = 200; // Minimum thickness of the DEM
RANDO.SETTINGS.TREK_OFFSET = 2; // Trek's altitude offset (in meters)

RANDO.SETTINGS.TREK_COLOR = new BABYLON.Color3(0.1,0.6,0.2); // Trek color (green)
                 // new BABYLON.Color3(0.1,0.6,0.2); // green 
                 // new BABYLON.Color3(0.8,0,0.2); // fuschia
                 // new BABYLON.Color3(0.9,0.5,0); // orange
                 
RANDO.SETTINGS.TREK_WIDTH = 10; // Trek width (in meters)

RANDO.SETTINGS.TILE_ZOOM = 17;

RANDO.SETTINGS.POI_OFFSET = 100;
RANDO.SETTINGS.POI_FORM1 = {
    objectName :    "" ,
    folder:         "blender/",
    fileName:       "poi.babylon"
};
RANDO.SETTINGS.POI_SIZE = 20;
RANDO.SETTINGS.PICTO_SIZE = 80;
RANDO.SETTINGS.PICTO_PREFIX = "";


////////////////////////////////////////////////////////////////////////////////

RANDO.SETTINGS.parse = function (settings) {
    if ('test' in settings) {
    }
    
};

