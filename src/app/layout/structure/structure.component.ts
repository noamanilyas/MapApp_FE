import { Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MapService } from './structure.service';
// import { ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import Swal from 'sweetalert2';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

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

@Component({
	selector: 'app-structure',
	templateUrl: './structure.component.html',
	styleUrls: ['./structure.component.scss'],
	providers: [MapService]
})

export class StructuresComponent implements OnInit {
	map: mapboxgl.Map;
	// @ViewChild('mapElement', {static: false}) mapElement: ElementRef;
	noPDF: any = ['RTB2-1', 'RTB2-2', 'RTB3-1', 'RTB3-10', 'RTB3-11', 'RTB3-12', 'RTB3-13', 'RTB3-14', 'RTB3-15', 'RTB3-16', 'RTB3-17', 'RTB3-2', 'RTB3-3', 'RTB3-4', 'RTB3-5', 'RTB3-6', 'RTB3-7', 'RTB3-8', 'RTB3-9', 'RTB4-1', 'RTB4-3', 'RTB4-4', 'RTB4-5', 'RTB4-6', 'RTB4-2', 'RTB5-1', 'RTB5-2', 'RTB5-3', 'RTB5-4', 'RTB5-5', 'RTC1-1', 'RTC1-2', 'RTC2-1', 'RTC2-2', 'RTC2-3', 'RTC2-4', 'RTC2-5', 'RTC2-6', 'RTC3-1', 'RTC3-2', 'RTC3-3', 'RTC5-1', 'RTC5-2', 'RTD1-1', 'RTD1-2', 'RTD2-1', 'RTD2-2', 'RTD3-1', 'RTD3-2', 'RTD3-3', 'RTD3-4', 'RTE3-1', 'RTE3-2', 'RTE3-3', 'RTE3-4', 'RTE3-5', 'RTE3-6', 'RTF1-1', 'RTF1-2', 'RTF1-3', 'RTF3-1', 'RTF3-2', 'RTF4-2', 'RTG2-3', 'RTG3-1', 'RTG3-2', 'RTG3-3', 'RTG3-4', 'RTG3-5', 'RTG4-1', 'RTG4-2', 'RTH2-1', 'RTH2-2', 'RTH2-3', 'TWA3-2', 'TWB2-13', 'TWB2-15', 'TWB3-29', 'TWB3-4', 'TWB4-12', 'TWB4-9', 'TWB5-12', 'TWB5-5', 'TWB5-6', 'TWC2-1', 'TWC3-5', 'TWC3-6', 'TWC5-4', 'TWC5-10', 'TWC5-9', 'TWD1-1', 'TWD2-1', 'TWD2-10', 'TWD2-11', 'TWD2-2', 'TWD2-5', 'TWD3-11', 'TWD3-3', 'TWD3-5', 'TWE1-4', 'TWE2-1', 'TWE2-2', 'TWE2-6', 'TWE3-2', 'TWF1-10', 'TWF1-11', 'TWF1-12', 'TWF1-15', 'TWF1-17', 'TWF1-21', 'TWF1-6', 'TWF1-8', 'TWF1-9', 'TWG2-16', 'WTA2-1', 'WTA2-2', 'WTA2-3', 'WTA2-4', 'WTA3-1', 'WTA3-2', 'WTA3-3', 'WTB2-1', 'WTB2-11', 'WTB2-12', 'WTB2-13', 'WTB2-14', 'WTB2-15', 'WTB2-16', 'WTB2-17', 'WTB2-18', 'WTB2-19', 'WTB2-2', 'WTB2-3', 'WTB2-4', 'WTB2-5', 'WTB2-6', 'WTB2-7', 'WTB2-8', 'WTB2-9', 'WTB3-1', 'WTB3-10', 'WTB3-11', 'WTB3-12', 'WTB3-13', 'WTB3-14', 'WTB3-15', 'WTB3-16', 'WTB3-17', 'WTB3-18', 'WTB3-19', 'WTB3-2', 'WTB3-20', 'WTB3-21', 'WTB3-3', 'WTB3-4', 'WTB3-5', 'WTB3-6', 'WTB3-7', 'WTB3-8', 'WTB3-9', 'WTB4-1', 'WTB4-2', 'WTB4-3', 'WTB4-5', 'WTB4-6', 'WTB4-7', 'WTB5-1', 'WTB5-10', 'WTB5-11', 'WTB5-2', 'WTB5-3', 'WTB5-4', 'WTB5-5', 'WTB5-6', 'WTB5-7', 'WTB5-8', 'WTB5-9', 'WTB5-1', 'WTC1-1', 'WTC2-01', 'WTC2-10', 'WTC2-11', 'WTC2-12', 'WTC2-13', 'WTC2-15', 'WTC2-16', 'WTC2-2', 'WTC2-3', 'WTC2-4', 'WTC2-5', 'WTC2-6', 'WTC2-7', 'WTC2-8', 'WTC2-9', 'WTC3-1', 'WTC3-10', 'WTC3-11', 'WTC3-12', 'WTC3-13', 'WTC3-14', 'WTC3-15', 'WTC3-2', 'WTC3-3', 'WTC3-4', 'WTC3-5', 'WTC3-6', 'WTC3-7', 'WTC3-8', 'WTC3-9', 'WTC5-1', 'WTC5-1', 'WTC5-2', 'WTC5-2', 'WTC5-3', 'WTC5-3', 'WTC5-4', 'WTC5-4', 'WTC5-5', 'WTC5-6', 'WTC5-9', 'WTC5-9', 'WTC5-9', 'WTD1-1', 'WTD1-2', 'WTD1-3', 'WTD1-4', 'WTD1-5', 'WTD1-6', 'WTD1-7', 'WTD1-8', 'WTD2-1', 'WTD2-10', 'WTD2-11', 'WTD2-12', 'WTD2-13', 'WTD2-14', 'WTD2-15', 'WTD2-16', 'WTD2-17', 'WTD2-18', 'WTD2-19', 'WTD2-2', 'WTD2-20', 'WTD2-21', 'WTD2-22', 'WTD2-23', 'WTD2-24', 'WTD2-25', 'WTD2-26', 'WTD2-27', 'WTD2-3', 'WTD2-4', 'WTD2-5', 'WTD2-6', 'WTD2-7', 'WTD2-8', 'WTD2-9', 'WTD3-1', 'WTD3-10', 'WTD3-11', 'WTD3-12', 'WTD3-13', 'WTD3-14', 'WTD3-15', 'WTD3-16', 'WTD3-17', 'WTD3-18', 'WTD3-19', 'WTD3-2', 'WTD3-20', 'WTD3-3', 'WTD3-4', 'WTD3-5', 'WTD3-6', 'WTD3-7', 'WTD3-8', 'WTD3-9', 'WTD4-4', 'WTD4-5', 'WTD4-1', 'WTD4-2', 'WTD4-3', 'WTD5-1', 'WTD5-2', 'WTD5-3', 'WTD5-4', 'WTD5-5', 'WTD5-6', 'WTD5-7', 'WTD5-8', 'WTE1-1', 'WTE1-1', 'WTE1-2', 'WTE1-3', 'WTE1-4', 'WTE1-5', 'WTE1-6', 'WTE1-7', 'WTE1-8', 'WTE1-9', 'WTE2-1', 'WTE2-10', 'WTE2-2', 'WTE2-3', 'WTE2-4', 'WTE2-5', 'WTE2-6', 'WTE2-7', 'WTE2-8', 'WTE2-9', 'WTE3-1', 'WTE3-10', 'WTE3-11', 'WTE3-12', 'WTE3-13', 'WTE3-14', 'WTE3-15', 'WTE3-15', 'WTE3-16', 'WTE3-16', 'WTE3-17', 'WTE3-2', 'WTE3-20', 'WTE3-21', 'WTE3-22', 'WTE3-23', 'WTE3-24', 'WTE3-25', 'WTE3-26', 'WTE3-27', 'WTE3-28', 'WTE3-29', 'WTE3-3', 'WTE3-30', 'WTE3-31', 'WTE3-4', 'WTE3-5', 'WTE3-6', 'WTE3-7', 'WTE3-8', 'WTE3-9', 'WTE4-1', 'WTE4-1', 'WTE4-11', 'WTE4-11', 'WTE4-12', 'WTE4-13', 'WTE4-14', 'WTE4-15', 'WTE4-16', 'WTE4-17', 'WTE4-2', 'WTE4-2', 'WTE4-4', 'WTE4-5', 'WTE4-6', 'WTE4-7', 'WTE4-9', 'WTE5-1', 'WTE6-1', 'WTF1-1', 'WTF1-10', 'WTF1-11', 'WTF1-12', 'WTF1-13', 'WTF1-14', 'WTF1-15', 'WTF1-16', 'WTF1-17', 'WTF1-18', 'WTF1-19', 'WTF1-2', 'WTF1-20', 'WTF1-3', 'WTF1-4', 'WTF1-5', 'WTF1-6', 'WTF1-7', 'WTF1-8', 'WTF1-9', 'WTF2-10', 'WTF2-11', 'WTF3-1', 'WTF3-10', 'WTF3-11', 'WTF3-12', 'WTF3-2', 'WTF3-2', 'WTF3-3', 'WTF3-4', 'WTF3-5', 'WTF3-6', 'WTF3-7', 'WTF3-8', 'WTF3-9', 'WTF4-1', 'WTF4-11', 'WTF4-13', 'WTF4-14', 'WTF4-15', 'WTF4-15', 'WTF4-15', 'WTF4-17', 'WTF4-18', 'WTF4-18', 'WTF4-19', 'WTF4-2B', 'WTF4-20', 'WTF4-20', 'WTF4-21', 'WTF4-22', 'WTF4-23', 'WTF4-23', 'WTF4-24', 'WTF4-25', 'WTF4-25', 'WTF4-26', 'WTF4-26', 'WTF4-27', 'WTF4-3', 'WTF4-4', 'WTF4-5', 'WTF4-5', 'WTF4-6', 'WTF4-7', 'WTF4-8', 'WTF4-9', 'WTF5-1', 'WTF5-10', 'WTF5-10', 'WTF5-10', 'WTF5-11', 'WTF5-13A', 'WTF5-13B', 'WTF5-14', 'WTF5-15', 'WTF5-16', 'WTF5-16', 'WTF5-17', 'WTF5-17', 'WTF5-18', 'WTF5-19', 'WTF5-2', 'WTF5-2', 'WTF5-20', 'WTF5-20', 'WTF5-3', 'WTF5-4', 'WTF5-5', 'WTF5-6', 'WTF5-7', 'WTF5-8', 'WTF5-9', 'WTF5-9', 'WTF6-1', 'WTF6-2', 'WTF6-3', 'WTF6-4', 'WTG2-12', 'WTG2-13', 'WTG2-14', 'WTG2-15', 'WTG3-1', 'WTG3-10', 'WTG3-11', 'WTG3-12', 'WTG3-2', 'WTG3-3', 'WTG3-4', 'WTG3-5', 'WTG3-6', 'WTG3-7', 'WTG3-8', 'WTG3-9', 'WTG3-13', 'WTG3-14', 'WTG3-15', 'WTG3-16', 'WTG3-17', 'WTG3-18', 'WTG3-19', 'WTG3-20', 'WTG3-20', 'WTG3-21', 'WTG3-21', 'WTG3-22', 'WTG3-23', 'WTG3-23', 'WTG4-1', 'WTG4-10', 'WTG4-11', 'WTG4-12', 'WTG4-13', 'WTG4-13', 'WTG4-14', 'WTG4-14', 'WTG4-15', 'WTG4-15', 'WTG4-16', 'WTG4-17', 'WTG4-18', 'WTG4-19', 'WTG4-19', 'WTG4-2', 'WTG4-2', 'WTG4-20', 'WTG4-4', 'WTG4-4', 'WTG4-5', 'WTG4-6', 'WTG4-7', 'WTG4-8', 'WTG4-8', 'WTG4-9', 'WTH2-1', 'WTH2-10', 'WTH2-11', 'WTH2-12', 'WTH2-13', 'WTH2-2', 'WTH2-3', 'WTH2-4', 'WTH2-5', 'WTH2-6', 'WTH2-7', 'WTH2-8', 'WTH2-9', 'WTH3-1', 'WTH3-10', 'WTH3-2', 'WTH3-3', 'WTH3-4', 'WTH3-4', 'WTH3-5', 'WTH3-6', 'WTH3-7', 'WTH3-8', 'WTH3-9', 'WTH4-1', 'WTH4-10', 'WTH4-11', 'WTH4-12', 'WTH4-13', 'WTH4-14', 'WTH4-15', 'WTH4-15', 'WTH4-16', 'WTH4-17', 'WTH4-18', 'WTH4-18', 'WTH4-2', 'WTH4-2', 'WTH4-3', 'WTH4-4', 'WTH4-4', 'WTH4-5', 'WTH4-5', 'WTH4-6', 'WTH4-7', 'WTH4-8', 'WTH4-9-A', 'WTH4-9-B', 'WTI2-1', 'TWE2-9', 'WTE2-13', 'WTE2-14', 'WTF2-1', 'WTE2-15', 'WTF2-3', 'WTF2-9', 'WTF2-6', 'WTF2-2', 'WTF2-7', 'WTF2-5', 'WTF2-4', 'WTF2-8', 'WTG2-8', 'WTF2-29', 'WTF2-17', 'WTG2-5', 'TWG2-19', 'WTF2-18', 'WTG2-10', 'WTF2-26', 'WTF2-16', 'WTF2-27', 'WTF2-30', 'WTF2-24', 'RTE2-2', 'WTF2-28', 'WTF2-19', 'WTG2-3', 'WTF2-25', 'RTF2-5', 'WTF2-23', 'WTF2-31', 'TWG2-1', 'WTG2-1', 'RTE2-1', 'WTG2-6', 'RTF2-4', 'RTG2-1', 'RTG2-2', 'TWF2-9', 'TWG2-2', 'WTG2-2', 'TWF2-8', 'WTF2-21', 'WTF2-22', 'WTG2-11', 'WTF2-12', 'WTF2-14', 'TWF2-7', 'RTF2-3', 'WTF2-20', 'WTE2-12', 'TWG2-4', 'WTG2-9', 'WTE2-11', 'WTG2-4', 'RTC2-7'];

	private mapElement: ElementRef;
	@ViewChild('mapElement', { static: false }) set content(content: ElementRef) {
		this.mapElement = content;
	}
	style = 'mapbox://styles/mapbox/streets-v11';
	lat = 36.149278;
	lng = -109.6824607;
	csvData = [];
	mapView: boolean = true;

	constructor(private mapService: MapService, private changeDetector: ChangeDetectorRef) {
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
			if (this.mapView) {
				this.initMap();
			}
		});
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
			if (!isNaN(marker.lat) && !isNaN(marker.long) && this.noPDF.indexOf(marker.code) === -1) {

				// console.log(marker)
				new mapboxgl.Marker()
					.setLngLat([marker.long, marker.lat])
					.setPopup(new mapboxgl.Popup({ maxWidth: '525px' }) // add popups
						.setHTML(`
	    				<div>
	    					<h3>${marker.code} - ${marker.owner}</h3>
	    					<embed src="http://www.americasrf.com/public_html/NNTRC/Part2Single/`+ marker.code + `.pdf#toolbar=1" width="500" height="375">
	    				</div>
	    			`))
					.addTo(map);
			}
			if (index === this.csvData.length - 1)
				Swal.close();
		});
	}

	changeView(view) {
		if (view === 'map') {
			this.mapView = true;
			this.changeDetector.detectChanges();
			this.initMap()
		} else if (view === 'list') {
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
