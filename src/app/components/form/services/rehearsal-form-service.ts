import { FormBuilder, Validators } from "@angular/forms";
import { RehearsalForm } from "../models/rehearsal-form-model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class RehearsalFormService {
    constructor(private fb: FormBuilder){}

    createForm(initial: Partial<RehearsalCreate>): RehearsalForm {
        return this.fb.nonNullable.group({
            date: [initial.date ?? '', [Validators.required]],
            description: [initial.description ?? '', [Validators.required, Validators.maxLength(255)]]
        });
    }
}