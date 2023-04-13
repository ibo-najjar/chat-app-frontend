import "next-auth";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    id: string;
    username: string;
    longitude: number;
    latitude: number;
    imageUrl?: string;
  }
}
