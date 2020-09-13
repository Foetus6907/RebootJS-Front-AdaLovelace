import {IFormField} from "./types";

export function validateRequiredField(value: string): boolean {
  return !!value;
}

export function validateEmailField (email: IFormField) {
  email.isValid = (/^[a-z0-9-_.]+@+[a-z0-9-_.]+\.+[a-z{2,}]+$/i).test(email.value)
  if(!email.isValid) { email.error = "Le format de l'adresse mail est invalide"; }
  else { delete email.error }
}