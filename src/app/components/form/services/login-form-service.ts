import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { LoginForm } from "../models/login-form-model";
import { Userlogin } from "../../../models/user-model";

@Injectable({ providedIn: 'root' })
export class LoginFormService {
    public constructor(private fb: FormBuilder){}

     public createForm(initial: Partial<Userlogin>): LoginForm{

        return this.fb.nonNullable.group({
            mail: [initial.mail ?? '', [Validators.required, Validators.email]],
            password: [initial.password ?? '', [Validators.required]]
        });

     }
}