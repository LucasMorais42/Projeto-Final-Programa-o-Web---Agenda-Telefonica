import { ContactsService } from '../../services/contacts.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      name: ['', Validators.required],
      nick_name: ['', Validators.required],
      phone_number: ['', Validators.required], 
      email: ['', Validators.required],
      created_at: ['', Validators.required],
      date_birth: ['', Validators.required],
      address: ['', Validators.required],
      group_name: ['', Validators.required],
      blocked: [''],
      favorite: ['', Validators.required]
    })

  }

  novoContato(){

    //patchValue permite modificar os valores do form diretamente
    const contatoParaSalvar= {
      ...this.formGroupContacts.value,
      created_at: new Date().toISOString().split('T')[0],
      blocked: false,
      //no caso do formgroup.value apenas pega um cópia, funciona para leitura, mas não pra editar
      favorite: this.formGroupContacts.value.favorite== 'true' ? true : false
    };



    this.contactService.saveContact(contatoParaSalvar).subscribe({

      next: json =>{
        this.formGroupContacts.reset();
      }

    })
  }


}
