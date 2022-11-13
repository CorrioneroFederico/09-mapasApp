import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
    .mapa-container {
      width:100%;
      height: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 16;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-63.76571692817591,-35.66644878392045],
      zoom: this.zoomLevel
    });

    this.map.on('zoom' , (ev) => this.zoomLevel = this.map.getZoom());
  }

  zoomIn(){
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  zoomOut(){
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

}
