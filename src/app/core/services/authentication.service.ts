import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const credentialsKey = 'credentials';

interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

interface User {
  _id: string;
  name: string;
  user_level: number;
  user_email: string;
}

interface Credentials {
  user: User;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private _credentials: Credentials | null | undefined;
  public credentials$ = new EventEmitter<Credentials>();

  constructor(private httpClient: HttpClient) {
    const savedCredentials = this.getItem(credentialsKey);
    if (savedCredentials) {
      this._credentials = JSON.parse(savedCredentials);
    }
  }

  apiCall(method: string, url: string, payload?: any, params?: any) {
    let apiData: any;
    if (method === 'put' || method === 'post') {
      apiData = this.httpClient[method](url, payload, { params });
    } else if (method === 'get') {
      apiData = this.httpClient[method](url, { params });
    } else if (method === 'delete') {
      apiData = this.httpClient[method](url, { params });
    }
    return apiData.pipe(
      map((body: any) => {
        return body;
      })
    );
  }

  public setItem(key: string, value: any) {
    return window.localStorage.setItem(key, value);
  }
  public getItem(key: string) {
    return window.localStorage.getItem(key);
  }
  public clearItem(key: string) {
    return window.localStorage.removeItem(key);
  }
  public clearAll() {
    return window.localStorage.clear();
  }

  /**
   * Checks is the user is authenticated.
   * @return {boolean} True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return {Credentials} The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null | undefined {
    return this._credentials;
  }

  /**
   * Get the auth token.
   * @return {string} The auth token is null if user is not authenticated.
   */
  get accessToken(): string | null {
    return this.credentials ? this.credentials.accessToken : null;
  }

  login(
    payload: LoginPayload
  ): Observable<Credentials> {
    return this.httpClient.post('/auth/login', payload).pipe(
      map((body:any) => {
        this.setCredentials(body);
        return body;
      })
    );
  }

  /**
   * Sets the user credentials.
   * @param {Credentials=} Credentials The user credentials.
   */
  private setCredentials(credentials?: Credentials) {
    this._credentials = credentials || null || undefined;
    if (credentials) {
      this.setItem(credentialsKey, JSON.stringify(credentials));
      this.credentials$.emit(this._credentials);
    } else {
      this.clearItem(credentialsKey);
    }
  }

  /**
   * Logs out the user and clear credentials.
   * @return {Observable<boolean>} True if the user was logged out successfully.
   */
  logout() {
    this.setCredentials();
  }
}
