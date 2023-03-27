import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})



export class ServicioApiService {
  private readonly baseUrl = 'https://prueba-tecnica-idecide.azurewebsites.net/api';
  private readonly token = this.cookies.get("x_token")
  private readonly headers = new HttpHeaders().set('x-token', this.token);

  constructor(private http: HttpClient, private cookies:CookieService) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${url}`, {headers:this.headers});
  }

  post<T>(url: string, body: any): Observable<T> {
    console.log("🚀 ~ file: servicio-api.service.ts:17 ~ ServicioApiService ~ token:", this.token)

    return this.http.post<T>(`${this.baseUrl}/${url}`, body, {headers:this.headers})
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${url}`, body, {headers:this.headers});
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${url}`, {headers:this.headers});
  }
}
