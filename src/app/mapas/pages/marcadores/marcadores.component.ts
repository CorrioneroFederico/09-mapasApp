import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface Marcadores{
  color : string;
  marker: mapboxgl.Marker;
}
@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      width:100%;
      height: 100%;
    }
    .list-group{
      position:fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor:pointer;
    }
  `]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 16;
  coordenadas: [number,number] = [-63.76571692817591,-35.66644878392045];

  marcadores: Marcadores[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.coordenadas,
      zoom: this.zoomLevel
    });

    // new mapboxgl.Marker().setLngLat(this.coordenadas).addTo(this.map);
  }

  agregar(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.coordenadas)
      .addTo(this.map);
    this.marcadores.push({
      color, marker: nuevoMarcador
    });
  }

  ir(){

  }

}
