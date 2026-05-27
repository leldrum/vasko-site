import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { concertType } from "../../../models/enum/concertType";

export type ConcertForm = FormGroup<{
    title: FormControl<string>,
    description: FormArray<FormControl<string>>,
    date: FormControl<string>,
    city: FormControl<string>,
    address: FormControl<string>,
    link_maps: FormControl<string>,
    time: FormControl<string>,
    type: FormControl<concertType>
}>