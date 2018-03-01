import {Injectable} from '@angular/core';

@Injectable()
export class CheckResponseStatusService {

  parseBody(response: any): any {
    const text: any = response.text();
    return JSON.parse(text);
  }

  check(response: any): any {
    if (response.status === 200) {

      const body: any = this.parseBody(response);
      return Promise.resolve(body);
    } else {
      Promise.reject(response);
    }
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }


}
