export interface ContactFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
}

export const initialContactFormValues: ContactFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  agree: false,
};
