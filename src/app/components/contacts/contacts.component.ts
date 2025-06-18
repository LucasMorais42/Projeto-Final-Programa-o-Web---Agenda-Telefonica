import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{

  contacts: Contact[] = [];
  formGroupContacts: FormGroup;

  constructor(private contactService: ContactsService,private formBuilder: FormBuilder){

    this.formGroupContacts = formBuilder.group({
      id: [''],
      name: [''],
      phone_number: [''], //mostrar no formato (XX) XXXXX-XXXX
      email: [''],
      photo: [''],
      date_birth: [''],
      social_media: [''],
      created_at: [''],
      group: [''],
      favorite: [''],

    })
  }

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(){
    this.contactService.getAllContacts().subscribe({
      next: json => this.contacts = json
    })
  }

  favoritarContato(contato: any){

  }
  editarContato(contato: any){

  }
  deletarContato(contato: any){

  }

}
