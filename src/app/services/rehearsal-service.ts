import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Rehearsal, RehearsalCreate } from "../models/rehearsal-model";

@Injectable({ providedIn: 'root' })

export class RehearsalService {

    private apiUrl = `${environment.apiUrl}/rehearsals`;

    public constructor(private http: HttpClient) {}

    public getAll(): Observable<Rehearsal[]> {
        return this.http.get<Rehearsal[]>(this.apiUrl);
    }

    public get(id: number): Observable<Rehearsal> {
        return this.http.get<Rehearsal>(`${this.apiUrl}/${id}`);
    }

    public create(rehearsal: RehearsalCreate): Observable<Rehearsal> {
        return this.http.post<Rehearsal>(this.apiUrl, rehearsal);
    }

    public delete(id: number): Observable<Rehearsal> {
        return this.http.delete<Rehearsal>(`${this.apiUrl}/${id}`);
    }

    public update(id: number, rehearsal: Rehearsal): Observable<Rehearsal> {
        return this.http.put<Rehearsal>(`${this.apiUrl}/${id}`, rehearsal);
    }
}