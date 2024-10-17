import { Component } from '@angular/core';
import { FotoServiceService } from '../../services/foto-service.service';
import { iFoto } from '../../interfaces/i-foto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  fotoArrComplete: string[] = [];
  fotoArr: string[] = [];
  likesArray: string[] = [];
  errMess: string = '';
  isLoading: boolean = true;
  constructor(private fotoServ: FotoServiceService) {}

  ngOnInit() {
    this.getAll();

    //mi iscrivo a this.fotoServ.likes$
    this.fotoServ.likes$.subscribe(
      (foto) => (this.likesArray = this.fotoServ.likesArray)
    );
  }

  getAll() {
    this.fotoServ.getAll().subscribe({
      next: (res) => {
        if (typeof res === 'string') {
          this.errMess = res;
          this.fotoArr = [];
          this.isLoading = false;
        } else {
          this.fotoArrComplete = res;
          this.fotoArr = this.fotoArrComplete.slice(0, 9);
          this.errMess = '';
          this.isLoading = false;
        }
        console.log(this.fotoArr);
      },
      error: (error) => {
        console.log(error);
        this.errMess = this.fotoServ.errMess;
        this.fotoArr = [];
      },
      complete: () => {
        console.log('status 200');
      },
    });
  }

  addLikes(foto: string) {
    this.fotoServ.addLikes(foto);
    console.log(this.fotoServ.likesArray);
  }
}
