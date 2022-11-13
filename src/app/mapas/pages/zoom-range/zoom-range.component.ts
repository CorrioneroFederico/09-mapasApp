import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
      width: 400px;
      z-index: 999;
    }
  `]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{

  @ViewChild('mapa') divMapa!: ElementRef;

  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  coordenadas: [number,number] = [-63.76571692817591,-35.66644878392045];

  constructor() { }
  ngOnDestroy(): void {
    this.map.off('move',()=>{});
    this.map.off('zoom',()=>{});
    this.map.off('zoomend',()=>{});
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });

    this.map.on('zoom' , (ev) => this.zoomLevel = this.map.getZoom());

    this.map.on('zoomend' , (ev) => {
      if( this.map.getZoom()>18) this.map.zoomTo(18)
      else if(this.map.getZoom()<6) this.map.zoomTo(6);
    });

    this.map.on('move' , (event) => {
      const target = event.target;
      const {lng,lat} = target.getCenter();
      this.coordenadas = [lng,lat]
    });
  }

  zoomIn(){
    this.map.zoomIn();
    this.zoomLevel = this.map.getZoom();
  }

  zoomOut(){
    this.map.zoomOut();
    this.zoomLevel = this.map.getZoom();
  }

  cambioZoom(valor:string){
    this.map.zoomTo( Number(valor) );
  }
}
