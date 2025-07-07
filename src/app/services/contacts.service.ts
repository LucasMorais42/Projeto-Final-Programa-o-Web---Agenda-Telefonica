import { Contact } from './../contact';
import { FavoritesComponent } from './../components/favorites/favorites.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { }
 
  private apiUrl = "https://lucasmorais.duckdns.org/contacts";

  getAllContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.apiUrl);
  }

  saveContact(contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  editContact(contact:Contact):Observable<Contact>{
      return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  deleteContact(contact: Contact):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${contact.id}`);
    
  }
}
