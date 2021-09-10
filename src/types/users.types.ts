export interface generalUsers{
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}
export interface Email {
    email: string
  }

  export interface forgotform{
    code: string,
    userId: number,
    codeExpired: string,
}