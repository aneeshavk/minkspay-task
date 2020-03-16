import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { LoginData, TokenModel } from "../models/login.model";
import { Router } from "@angular/router";
import { ListData, User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl = environment.apiUrl;

  private loggedInUser: TokenModel;

  constructor(private http: HttpClient, private router: Router) {}

  public login(data: LoginData) {
    return this.http.post<TokenModel>(`${this.baseUrl}login`, data);
  }

  public setLogin(token: TokenModel) {
    this.loggedInUser = token;
    console.log("Logging in user... ", token);
    this.router.navigate(["/users"]);
  }

  public isLoggedIn(): boolean {
    return this.loggedInUser ? true : false;
  }

  public register(data: LoginData) {
    return this.http.post<TokenModel>(`${this.baseUrl}register`, data);
  }

  public list(page: number) {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("per_page", "12");
    return this.http.get<ListData<User>>(`${this.baseUrl}users`, { params });
  }

  public save(id: number, user: User) {
    return this.http.put<User>(`${this.baseUrl}users/${id}`, user);
  }

  public delete(user: User) {
    return this.http.delete(`${this.baseUrl}users/${user.id}`);
  }
}
