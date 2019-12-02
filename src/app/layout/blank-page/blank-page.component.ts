import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { } from 'googlemaps';
import { MapService } from './blank-page.service';
// import { ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

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
	// @ViewChild('mapElement', {static: false}) mapElement: ElementRef;

	private mapElement: ElementRef;
	@ViewChild('mapElement', {static: false}) set content(content: ElementRef) {
	  this.mapElement = content;
	}
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 36.149278;
	lng = -109.6824607;
	csvData = [];
	mapView: boolean = true;

  constructor(private mapService: MapService, private changeDetector : ChangeDetectorRef) {
  	(mapboxgl as typeof mapboxgl).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() { 

  	Swal.fire({
		  title: 'Loading data!',
		  text: 'Markers are loading, Please wait...',
		  onOpen: () => {
	      Swal.showLoading();
	    }
		})

  	this.mapService.getCSVData(data => {
    	data.shift();
    	this.csvData = data;
    	// this.initMap();
    	// this.addMarkers(this.map);
    	if(this.mapView) {
				this.initMap();
			}
    });
  }

	ngAfterViewInit(){
		
	}

	initMap() {

		Swal.fire({
		  title: 'Loading data!',
		  text: 'Markers are loading, Please wait...',
		  onOpen: () => {
	      Swal.showLoading();
	    }
		})
		
		this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: this.style,
      zoom: 8,
      center: [this.lng, this.lat]
  	});  

  	// Add map controls
  	this.map.addControl(new mapboxgl.NavigationControl())
    this.addMarkers(this.map);
  	
	}

	addMarkers(map) {
		// add markers to map
		this.csvData.forEach((marker, index) => {
			// make a marker for each feature and add to the map
			if(!isNaN(marker.lat) && !isNaN(marker.long)) {

				// console.log(marker)
			  new mapboxgl.Marker()
			    .setLngLat([marker.long, marker.lat])
			    .setPopup(new mapboxgl.Popup({maxWidth: '525px'}) // add popups
	    		.setHTML(`
	    				<div>
	    					<h3>${marker.code} - ${marker.owner}</h3>
	    					<embed src="http://www.americasrf.com/public_html/NNTRC/Part2Single/`+ marker.code +`.pdf#toolbar=1" width="500" height="375">
	    				</div>
	    			`))
			    .addTo(map);
			}
			if(index === this.csvData.length -1)
				Swal.close();
		});
	}

	changeView(view) {
		if(view === 'map') {
			this.mapView = true;
			this.changeDetector.detectChanges();
			this.initMap()
		} else if(view === 'list') {
			this.mapView = false;
		}
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
