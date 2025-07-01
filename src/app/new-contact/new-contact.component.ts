import { ContactsService } from './../services/contacts.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: false,
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {

  formGroupContacts : FormGroup;
 

  constructor(private contactService:ContactsService, private formBuilder: FormBuilder){
  
    this.formGroupContacts = formBuilder.group({
      id: [''],
      name: [''],
      nickname: [''],
      phone_number: [''], 
      email: [''],
      created_at: [''],
      date_birth: [''],
      address: [''],
      blocked: [''],
      favorite: ['']
    })

  }

  novoContato(){

    //patchValue permite modificar os valores do form diretamente
    this.formGroupContacts.patchValue({
      created_at: new Date().toISOString(),
      blocked: false,
      //no caso do formgroup.value apenas pega um cópia, funciona para leitura, mas não pra editar
      favorite: this.formGroupContacts.value.favorite=='yes'? true : false
    })



    this.contactService.saveContact(this.formGroupContacts.value).subscribe({

      next: json =>{
        this.formGroupContacts.reset();
      }

    })

  }
}
