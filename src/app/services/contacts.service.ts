import { FavoritesComponent } from './../components/favorites/favorites.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }
 
  private apiUrl = "http://localhost:3000/contacts";

  getAllContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl);
  }

  editContact(){

  }
  favoriteContact(){

  }
  deleteContact(){
    
  }


}
