
export class AuthEndpoints {
    Login(token) {
        return `auth/login?token=${token}`;
      }
}