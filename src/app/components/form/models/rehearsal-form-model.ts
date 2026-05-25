import { FormControl, FormGroup } from "@angular/forms";

export type RehearsalForm = FormGroup<{
    date: FormControl<string>,
    description: FormControl<string>
}>;