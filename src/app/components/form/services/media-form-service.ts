import { FormBuilder, Validators } from "@angular/forms";
import { mediaForm } from "../models/media-form-model";
import { MediaCreate } from "../../../models/media-model";
import { mediaType } from "../../../models/enum/mediaType";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class MediaFormService {

    public constructor(private fb: FormBuilder){}
    public createForm(initial: Partial<MediaCreate>): mediaForm{
        return this.fb.nonNullable.group({
            rehearsal_id: [initial.rehearsal_id ?? null, []],
            concert_id: [initial.concert_id ?? null, []],
            user_id: [initial.user_id ?? Object.create, [Validators.required]],
            type: [initial.type ?? mediaType.PICTURE, [Validators.required]],
            description: [initial.description ?? '', [Validators.required]],
        })
    }
}