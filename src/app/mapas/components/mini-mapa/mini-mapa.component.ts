import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [`
    div{
      width : 100%;
      height: 150px;
      margin: 0px
    }
  `]
})
export class MiniMapaComponent implements AfterViewInit {

  @Input() lngLat: [number,number] = [0,0];
  @ViewChild('mapa') divMapa!: ElementRef;          //! Forma de hacer referencia al div

  constructor() { }

  //? Forma general de construir un mapa
  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.divMapa.nativeElement,        //! Indicar donde estará el mapa
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
                .setLngLat(this.lngLat)
                .addTo(map);
  }



}
