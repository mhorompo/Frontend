export interface SignupUser {
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    oldPass?: string;
    roleEnum?: string;
}