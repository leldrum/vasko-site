import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ConcertForm } from "../models/concert-form-model";
import { ConcertCreate } from "../../../models/concert-model";
import { concertType } from "../../../models/enum/concertType";

@Injectable({ providedIn: 'root' })
export class ConcertFormService {

    public constructor(private fb: FormBuilder){}

    public createForm(initial: Partial<ConcertCreate>): ConcertForm{
        return this.fb.nonNullable.group({
            title: [initial.title ?? '', [Validators.required]],
            description: this.fb.array(
                initial.description?.map(d => this.createDescriptionControl(d)) 
                ?? [this.createDescriptionControl()],
                [Validators.required]
            ),            
            date: [initial.date ?? '', [Validators.required]],
            city: [initial.city ?? '', [Validators.required]],
            address: [initial.address ?? '', [Validators.required]],
            link_maps: [initial.link_maps ?? '', [Validators.required]],
            time: [initial.time ?? '', [Validators.required]],
            type: [initial.type ?? concertType.SOIREE, [Validators.required]]
        })
    }

   public createDescriptionControl(value = ''): FormControl<string> {
        return this.fb.nonNullable.control(value, [
            Validators.required,
            Validators.maxLength(255)
        ]);
    }
}