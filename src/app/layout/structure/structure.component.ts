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

  private mapElement: ElementRef;
  @ViewChild('mapElement', { static: false }) set content(content: ElementRef) {
    this.mapElement = content;
  }
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 36.149278;
  lng = -109.6824607;
  csvData = [];
  mapView = true;

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
    });

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
    });

    this.map = new mapboxgl.Map({
      container: this.mapElement.nativeElement,
      style: this.style,
      zoom: 10,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.addMarkers(this.map);

  }

  switchLayer(mapStye) {
    this.map.setStyle('mapbox://styles/mapbox/' + mapStye);
  }

  // tslint:disable-next-line:indent
  addMarkers(map) {
    // add markers to map
    this.csvData.forEach((marker, index) => {
      // make a marker for each feature and add to the map
      if (!isNaN(marker.lat) && !isNaN(marker.long)) {

        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage = 'url(assets/images/button.png)';
        el.style.width = '16px';
        el.style.height = '16px';

        // console.log(marker)
        new mapboxgl.Marker(el)
          .setLngLat([marker.long, marker.lat])
          .setPopup(new mapboxgl.Popup({ maxWidth: '525px' }) // add popups
            .setHTML(`
              <div>
                <h3>${marker.code} - ${marker.owner}</h3>
                <embed src="http://www.americasrf.com/public_html/NNTRC/Part2Single/` + marker.code + `.pdf#toolbar=1" width="500" height="375">
              </div>
            `))
          .addTo(map);
      }
      if (index === this.csvData.length - 1) {
        Swal.close();
      }
    });
  }

  changeView(view) {
    if (view === 'map') {
      this.mapView = true;
      this.changeDetector.detectChanges();
      this.initMap();
    } else if (view === 'list') {
      this.mapView = false;
    }
  }

  // clusterInit() {
  //   this.map = new mapboxgl.Map({
  //     container: this.mapElement.nativeElement,
  //     style: this.style,
  //     zoom: 10,
  //     center: [this.lng, this.lat]
  //   });

  //   this.map.on('load', function () {
  //     // Add a new source from our GeoJSON data and set the
  //     // 'cluster' option to true. GL-JS will add the point_count property to your source data.
  //     this.map.addSource('earthquakes', {
  //       type: 'geojson',
  //       // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
  //       // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
  //       data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
  //       cluster: true,
  //       clusterMaxZoom: 14, // Max zoom to cluster points on
  //       clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  //     });

  //     this.map.addLayer({
  //       id: 'clusters',
  //       type: 'circle',
  //       source: 'earthquakes',
  //       filter: ['has', 'point_count'],
  //       paint: {
  //         // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
  //         // with three steps to implement three types of circles:
  //         //   * Blue, 20px circles when point count is less than 100
  //         //   * Yellow, 30px circles when point count is between 100 and 750
  //         //   * Pink, 40px circles when point count is greater than or equal to 750
  //         'circle-color': [
  //           'step',
  //           ['get', 'point_count'],
  //           '#51bbd6',
  //           100,
  //           '#f1f075',
  //           750,
  //           '#f28cb1'
  //         ],
  //         'circle-radius': [
  //           'step',
  //           ['get', 'point_count'],
  //           20,
  //           100,
  //           30,
  //           750,
  //           40
  //         ]
  //       }
  //     });

  //     this.map.addLayer({
  //       id: 'cluster-count',
  //       type: 'symbol',
  //       source: 'earthquakes',
  //       filter: ['has', 'point_count'],
  //       layout: {
  //         'text-field': '{point_count_abbreviated}',
  //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //         'text-size': 12
  //       }
  //     });

  //     this.map.addLayer({
  //       id: 'unclustered-point',
  //       type: 'circle',
  //       source: 'earthquakes',
  //       filter: ['!', ['has', 'point_count']],
  //       paint: {
  //         'circle-color': '#11b4da',
  //         'circle-radius': 4,
  //         'circle-stroke-width': 1,
  //         'circle-stroke-color': '#fff'
  //       }
  //     });

  //     // inspect a cluster on click
  //     this.map.on('click', 'clusters', function (e) {
  //       const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
  //       const clusterId = features[0].properties.cluster_id;
  //       this.map.getSource('earthquakes').getClusterExpansionZoom(clusterId, function (err, zoom) {
  //         if (err) {
  //           return;
  //         }

  //         this.map.easeTo({
  //           center: features[0].geometry.coordinates,
  //           zoom: zoom
  //         });
  //       });
  //     });

  //     this.map.on('mouseenter', 'clusters', function () {
  //       this.map.getCanvas().style.cursor = 'pointer';
  //     });
  //     this.map.on('mouseleave', 'clusters', function () {
  //       this.map.getCanvas().style.cursor = '';
  //     });

  //   });
  // }
}
