import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page?, itemsPerPage?, userParamas?, likesParam?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null)
    {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParamas != null)
    {
      params = params.append('minAge', userParamas.minAge);
      params = params.append('maxAge', userParamas.maxAge);
      params = params.append('gender', userParamas.gender);
      params = params.append('orderBy', userParamas.orderBy);
    }

    if (likesParam === 'Likers')
    {
      params = params.append('likers', 'true');
    }

    if (likesParam === 'Likees')
    {
      params = params.append('likees', 'true');
    }


    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
                      .pipe(
                        map(response => {
                          paginatedResult.result = response.body;
                          if (response.headers.get('Pagination') != null)
                          {
                            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                          }
                          return paginatedResult;
                        })
                      );
  }

  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User)
  {
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number)
  {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number)
  {
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number)
  {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }
}
