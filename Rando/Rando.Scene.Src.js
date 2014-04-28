
/*******************************************************************************
 * Rando.Dem.Src.js
 * 
 * Dem class : sources file
 * Contains all functions relative to the Dem class
 * 
 * 
 * /!\ Need to be included in html file in this order
 *      <script src="Rando/Rando.Dem.Src.js"></script>
 *      <script src="Rando/Rando.Dem.Hdr.js"></script>
 * 
 ******************************************************************************/


function buildAndRun (b_dem, b_trek) {
    var that = this;
    if (typeof(b_dem) === 'undefined')  b_dem  = true;
    if (typeof(b_trek) === 'undefined') b_trek = true;

    $.getJSON(RANDO.SETTINGS.DEM_URL)
     .done(function (data) {
        that._parseDemJson(data);
     })
     .then(function () {
        return $.getJSON(RANDO.SETTINGS.PROFILE_URL);
     })
     .done(function (data) {
        that._parseTrekJson(data);
     })
     
     // Tiled DEM mesh building
     .then(function () {
        if (b_dem) {
            that.dem = new RANDO.Dem(
                that._dem_data,
                that._offsets,
                that._scene
            );
            
            that._scene.render();
        }
     })
     
     // Trek building
     .then(function () {
        if (b_trek) {
            RANDO.Builds.Trek(
                that._trek_data,
                that._offsets,
                that._scene
            );
        }
     })
     .then(function () {
        that._scene.activeCamera.attachControl(that._canvas);
        
        that._scene.executeWhenReady(function () {
            that._executeWhenReady ();
        });
     });
};

function _executeWhenReady () {
    var scene = this._scene;
    
    console.log("Scene is ready ! " + (Date.now() - RANDO.START_TIME) );
    var dem = scene.getMeshByName("Digital Elevation Model");
    var trek_length = scene.getMeshByName("Spheres").getChildren().length;
    
    console.log("Trek adjustments ..." + (Date.now() - RANDO.START_TIME) );
    
    var index = 0;
    var chunk = 100; // By chunks of 100 points
    drape();

    // Drape vertices (spheres) over the DEM
    function drape(){
        var cnt = chunk;
        while (cnt-- && index < trek_length) {
            RANDO.Utils.drapePoint(scene.getMeshByName("Sphere " + (index+1)).position, dem);
            ++index;
        }
        if (index < trek_length){
            setTimeout(drape, 1);
        }else {
            // At the end of draping we place cylinders
            setTimeout(place, 1); 
        }
    };

    // Place all cylinders between each pairs of spheres 
    function place() {
        for (var i = 0; i < trek_length-1; i++) {
            RANDO.Utils.placeCylinder(
                scene.getMeshByName("Cylinder " + (i+1)), 
                scene.getMeshByName("Sphere "   + (i+1)).position, 
                scene.getMeshByName("Sphere "   + (i+2)).position
            );
        }
        console.log("Trek adjusted ! " + (Date.now() - RANDO.START_TIME) );
        
        // At the end, run the render loop 
        scene.getEngine().runRenderLoop(function() {
            scene.render();
        });
    };
};



function _parseDemJson (data) {
    var dem_data = this._dem_data,
        offsets = this._offsets;
        
        
    var m_center = RANDO.Utils.toMeters(data.center);
    var m_extent = RANDO.Utils.extent2meters (data.extent);
    
    // Record DEM data
    dem_data.o_extent = _.clone(m_extent);
    dem_data.extent = m_extent;
    dem_data.altitudes = data.altitudes; // altitudes already in meters
    dem_data.resolution = data.resolution; // do not need conversion
    dem_data.o_center = {
        x: m_center.x,
        y: data.center.z,// altitude of center already in meters
        z: m_center.y
    }
    dem_data.center = {
        x: m_center.x,
        y: data.center.z,// altitude of center already in meters
        z: m_center.y
    };

    // Control if altitudes data coincide with resolution data
    console.assert(dem_data.altitudes.length == dem_data.resolution.y);
    console.assert(dem_data.altitudes[0].length == dem_data.resolution.x);
    
    // Records offsets
    offsets.x = -dem_data.center.x;
    offsets.y = dem_data.extent.altitudes.min;
    offsets.z = -dem_data.center.z;
};



function _parseTrekJson (data) {
    var profile = data.profile;
    var trek_data = this._trek_data;
    
    for (it in profile){
        var tmp = {
            'lat' : profile[it][2][1],
            'lng' : profile[it][2][0]
        };

        tmp = RANDO.Utils.toMeters(tmp);
        tmp.z = tmp.y;
        tmp.y = 0;

        trek_data.push(_.clone(tmp));
    }
};







