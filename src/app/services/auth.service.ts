import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

import {RESPONSE_STATUSES, TOKEN_AUTH_PASSWORD, TOKEN_AUTH_USERNAME} from './auth.const';
import {CheckResponseStatusService} from './check-resp-status.service';

@Injectable()
export class AuthenticationService {
  static AUTH_TOKEN = '/oauth/token';

  constructor(private http: Http, private checkResponse: CheckResponseStatusService) {
  }

  auth(username: string, password: string): Promise<any> {
    const body = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(TOKEN_AUTH_USERNAME + ':' + TOKEN_AUTH_PASSWORD));

    return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
      .toPromise()
      .then(response => response.json())
      .then((result: any) => {
        if (result.access_token) {
          return result.access_token;
        }
        return null;
      })
      .catch(err => this.checkResponse.handleError(err));

    // return this.http.post(AuthenticationService.AUTH_TOKEN, body, {headers})
    //   .map(res => res.json())
    //   .map((res: any) => {
    //     if (res.access_token) {
    //       return res.access_token;
    //     }
    //     return null;
    //   });
  }

  onError(err) {
    const status: number = err.status;
    if (status === RESPONSE_STATUSES.badRequest) {
      const errBody = this.parseJsonBody(err);
      return errBody;
    }
  }

  private parseJsonBody(response): any {
    return JSON.parse(response.text());
  }
}
