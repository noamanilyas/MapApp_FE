import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { } from 'googlemaps';
import { MapService } from './blank-page.service';
// import { ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

interface IGeometry {
    type: string;
    coordinates: [number, number];
}

interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    $key?: string;
}

declare var google
@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    providers: [MapService]
})

export class BlankPageComponent implements OnInit {
	map: mapboxgl.Map;
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 37.75;
	lng = -122.41;

	geojson:IGeoJson[] = [{
	    type: 'Feature',
	    geometry: {
	      type: 'Point',
	      coordinates: [-77.032, 38.913]
	    },
	    properties: {
	      title: 'Mapbox1',
	      description: 'Washington, D.C.'
	    }
	  },
	  {
	    type: 'Feature',
	    geometry: {
	      type: 'Point',
	      coordinates: [-122.414, 37.776]
	    },
	    properties: {
	      title: 'Mapbox2',
	      description: 'San Francisco, California'
	    }
	  }];

    constructor(private mapService: MapService) {
    	(mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
    }

    ngOnInit() {
    	
	    this.map = new mapboxgl.Map({
	        container: 'map',
	        style: this.style,
	        zoom: 13,
	        center: [this.lng, this.lat]
	    });    
	    // Add map controls
	    this.map.addControl(new mapboxgl.NavigationControl())
	    this.init(this.map);
	    this.mapService.getMarkers();

	}

	init(map) {
		// add markers to map
		this.geojson.forEach(function(marker) {

		  // make a marker for each feature and add to the map
		  new mapboxgl.Marker()
		    .setLngLat(marker.geometry.coordinates)
		    .setPopup(new mapboxgl.Popup({maxWidth: '525px'}) // add popups
    		.setHTML(`
    				<div>
    					<embed src="http://www.americasrf.com/public_html/NNTRC/Part2Single/TWA2-1.pdf#toolbar=1" width="500" height="375">
    				</div>
    			`))
		    .addTo(map);
		});
	}


	// const coords=[];
	// const coordsturf=[];
	// someFeatures = [{
	// 	"type": "Feature",
	// 	"properties": {
	// 		"name": "Coors Field",
	// 		"show_on_map": true
	// 	},
	// 	"geometry": {
	// 		"type": "Point",
	// 		"coordinates": [-111.630286111111 , 36.69755 ]
	// 	}
	// }];


	// function onEachFeature(feature, layer) {
	// 	// does this feature have a property named popupContent?
	// //coordsturf.push(turf.point(feature.geometry.coordinates));
	// var div= $('<div id="yassin" style="width:500px; height:500px;"><svg/></div>')[0];  
	//  var div0= $('<div><object data="test.pdf" type="application/pdf" width="100%" height="100%">alt: <a href="test.pdf"> test.pdf</a></div>')[0];  
	// div0.appendChild(div);

	//  		layer.bindPopup(div0);
	// layer.openPopup();
	// //var svg=d3.select("div svg").attr("width",400).attr("height",400);
	// console.log(div0);



	// }
	// customlayer=L.geoJSON(someFeatures, {	onEachFeature: onEachFeature});

	// customlayer.addTo(map);
	// map.fitBounds(customlayer.getBounds());

}
