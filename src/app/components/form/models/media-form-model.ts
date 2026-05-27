import { FormControl, FormGroup } from "@angular/forms";
import { mediaType } from "../../../models/enum/mediaType";
import { Concert } from "../../../models/concert-model";
import { User } from "../../../models/user-model";
import { Rehearsal } from "../../../models/rehearsal-model";


export type mediaForm = FormGroup<{
    rehearsal_id: FormControl<Rehearsal | null>,
    concert_id: FormControl<Concert | null>
    user_id: FormControl<User>,
    type: FormControl<mediaType>,
    description: FormControl<string>
}>;

