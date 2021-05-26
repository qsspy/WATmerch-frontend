import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    static emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    static spaceOrDigitPattern = /^(\d|\s)+$/

    static email(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value
        const isNotValid = value.match(CustomValidators.emailPattern) == null
        return isNotValid ? { email: { value: control.value } } : null
    }

    static spacesOrDigits(control: AbstractControl): ValidationErrors | null {
        const value: string = control.value
        const isNotValid = value.match(CustomValidators.spaceOrDigitPattern) == null
        return isNotValid ? { spacesOrDigits: { value: control.value } } : null
    }
}
