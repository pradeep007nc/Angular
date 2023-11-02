import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { Observable, from, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { DataSkeleton } from '../Entities/data-skeleton';

@Injectable({
  providedIn: 'root'
})
export class DataPublisherService {

  constructor() {
    axios.defaults.baseURL = environment.baseUrl;
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  private baseUrl: string = environment.baseUrl;

  fetchAllData(): Observable<_embedded> {
    return from(axios({
      method: 'GET',
      url: '/fetch-data'
    })).pipe(
      map((response: AxiosResponse<_embedded>) => response.data)
    );
  }

}

interface _embedded {
    result: DataSkeleton[];
}
