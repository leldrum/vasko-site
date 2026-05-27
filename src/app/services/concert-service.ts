import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Concert, ConcertCreate } from "../models/concert-model";

@Injectable({ providedIn: 'root' })

export class ConcertService {

    private apiUrl = `${environment.apiUrl}/concerts`;

    public constructor(private http: HttpClient) {}

    public getAll(): Observable<Concert[]> {
        return this.http.get<Concert[]>(this.apiUrl);
    }

    public get(id: number): Observable<Concert> {
        return this.http.get<Concert>(`${this.apiUrl}/${id}`);
    }

    public create(concert: ConcertCreate): Observable<Concert> {
        return this.http.post<Concert>(this.apiUrl, concert);
    }

    public delete(id: number): Observable<Concert> {
        return this.http.delete<Concert>(`${this.apiUrl}/${id}`);
    }

    public update(id: number, concert: Concert){
        return this.http.put<Concert>(`${this.apiUrl}/${id}`, concert)
    }

}