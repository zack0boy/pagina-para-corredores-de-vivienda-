import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Auth - Login con email y password
  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  // Auth - Google Login
  googleLogin(token: string) {
    return this.http.post(`${this.apiUrl}/auth/google`, { token });
  }

  // Users - Traer todos los usuarios
  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Users - Traer usuario por ID
  getUserById(id: number) {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  // Users - Traer usuario por email
  getUserByEmail(email: string) {
    return this.http.get(`${this.apiUrl}/users/email/${email}`);
  }

  // Users - Crear usuario
  createUser(userData: any) {
    return this.http.post(`${this.apiUrl}/users`, userData);
  }

  // Users - Eliminar usuario
  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
