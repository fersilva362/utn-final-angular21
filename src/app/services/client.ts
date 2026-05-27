import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostModel } from '../models/Post';
import { MyContactModel } from '../models/Contact';
import { myContactsData } from '../utils/data_source';

@Injectable({
  providedIn: 'root',
})
export class Client {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}
  getPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(this.apiUrl);
  }
  private myContacts: MyContactModel[] = myContactsData;
  getContacts(): MyContactModel[] {
    return this.myContacts;
  }
}

/* [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
}] */
