import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{
  contact: Contact[] = [];
  formGroupContacts: FormGroup;

  constructor(private formBuilder: FormBuilder){
    this.formGroupContacts = formBuilder.group({
      id: [''],
      name: [''],
      phone_number: [''], //mostrar no formato (XX) XXXXX-XXXX
      email: [''],
      photo: [''],
      date_birth: [''],
      social_media: [''],
      created_at: [''],
      category: [''],
      favorite: [''],

    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
