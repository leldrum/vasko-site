import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";
import { MediaCreate, Media } from "../models/media-model";

@Injectable({ providedIn: 'root' })

export class MediaService {

    private apiUrl = `${environment.apiUrl}/medias`;

    public constructor(private http: HttpClient) {}

    public getAll(): Observable<Media[]> {
        return this.http.get<Media[]>(this.apiUrl);
    }

    public get(id: number): Observable<Media> {
        return this.http.get<Media>(`${this.apiUrl}/${id}`);
    }

    public create(media: MediaCreate, file: File): Observable<Media> {
        const formData = new FormData();
    
        const mediaBlob = new Blob([JSON.stringify(media)], { type: 'application/json' });
        formData.append('media', mediaBlob, 'media.json');

        formData.append('file', file, file.name);
        return this.http.post<Media>(this.apiUrl, formData);
    }

    public delete(id: number): Observable<Media> {
        return this.http.delete<Media>(`${this.apiUrl}/${id}`);
    }

    public update(id: number, media: Media){
        return this.http.put<Media>(`${this.apiUrl}/${id}`, media)
    }

}