import { Component } from '@angular/core';
import { FotoServiceService } from '../../services/foto-service.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrl: './likes.component.scss',
})
export class LikesComponent {
  likesArr: string[] = [];

  constructor(private fotoServ: FotoServiceService) {}

  ngOnInit() {
    this.fotoServ.likesArray = this.likesArr;
    console.log(this.fotoServ.likesArray);
  }
}
