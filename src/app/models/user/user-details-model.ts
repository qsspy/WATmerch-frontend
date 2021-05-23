import { Byte } from "@angular/compiler/src/util"

export class UserDetailsModel {

    firstName = ''
    lastName = ''
    phoneNumber = ''
    birthDate? : Date
    company?: string 
    nip?: string
    avatar?: Byte[]
}
