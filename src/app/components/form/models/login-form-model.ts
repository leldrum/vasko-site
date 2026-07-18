import { FormControl, FormGroup } from "@angular/forms";

export type LoginForm = FormGroup<{
    mail: FormControl<string>,
    password: FormControl<string>
}>