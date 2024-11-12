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
searchTag(tag:string):void{
  this.gifService.searchTag(tag);
  console.log(tag);
}


}
