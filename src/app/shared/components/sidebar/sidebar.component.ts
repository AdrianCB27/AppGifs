import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
constructor(private gifService: GifsService) {}


mostrarListado(){
  return this.gifService.tagHistory;
}
ponerGifsDeNuevo(titulo:string){
  this.gifService.searchTag(titulo)
}


}
