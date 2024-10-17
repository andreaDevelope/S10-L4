import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iFoto } from '../interfaces/i-foto';
import { catchError, map, of, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FotoServiceService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  fotoArr: string[] = [];
  errMess: string = '';
  likesArray: string[] = [];
  likes$ = new Subject<string>();

  constructor(private http: HttpClient) {}
  getAll() {
    return this.http.get<iFoto[]>(this.apiUrl).pipe(
      map((res) => res.map((foto) => foto.thumbnailUrl)),
      catchError((error) => {
        console.error('Errore nella richiesta:', error);
        this.errMess =
          'abbiamo un piccolo problema perfavore riprova più tardi';
        return of(this.errMess);
      })
    );
  }

  addLikes(foto: string) {
    this.likes$.next(foto);
    this.likesArray.push(foto);
  }
}

// foto-service.service.ts:18 Errore nella richiesta:
// HttpErrorResponse {headers: _HttpHeaders, status: 404, statusText: 'OK', url: 'https://jsonplaceholder.typicode.com/photo', ok: false, …}
// error
// :
// {}
// headers
// :
// _HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
// message
// :
// "Http failure response for https://jsonplaceholder.typicode.com/photo: 404 OK"
// name
// :
// "HttpErrorResponse"
// ok
// :
// false
// status
// :
// 404
// statusText
// :
// "OK"
// url
// :
// "https://jsonplaceholder.typicode.com/photo"
// [[Prototype]]
// :
// HttpResponseBase
