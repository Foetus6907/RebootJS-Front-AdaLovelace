import {IFormField, IFormPasswordField} from "./types";

export function validateRequiredField(value: string): boolean {
  return !!value;
}

export function validateEmailField(email: IFormField) {
  email.isValid = (/^[a-z0-9-_.]+@[a-z0-9-_.]+\.[a-z]{2,}$/gi).test(email.value)
  if (!email.isValid) {
    email.error = "Le format de l'adresse mail est invalide";
  } else {
    delete email.error
  }
}

export function validateNameField(field: IFormField) {
  field.isValid = /^[a-z- ]{1,20}$/i.test(field.value);
  if (!field.isValid) {
    field.error = "Le nom doit faire entre 1 et 20 caractères";
  } else {
    delete field.error
  }
}

export function validatePasswordField(password: IFormPasswordField, confirmation: IFormField, isOptional?: boolean) {
  confirmation.isValid = password.value === confirmation.value;
  if (!confirmation.isValid) {
    confirmation.error = 'La confirmation et le mot de passe ne sont pas identique';
  } else {
    delete confirmation.error
  }

  password.hasLower = /[a-z]+/.test(password.value);
  password.hasUpper = /[A-Z]+/.test(password.value);
  password.hasNumber = /[0-9]+/.test(password.value);
  password.hasSymbol = /[^a-zA-Z0-9]+/.test(password.value);
  password.hasValidLength = /^.{8,20}$/.test(password.value);

  const {hasLower, hasUpper, hasSymbol, hasNumber, hasValidLength} = password;

  password.isValid = (isOptional && !password.value) || [hasLower, hasUpper, hasSymbol, hasNumber, hasValidLength].every(Boolean);
  if (!password.isValid) {
    password.error = 'Le mot de passe ne respecte pas une des règles de sécurité'
  } else {
    delete password.error
  }

}