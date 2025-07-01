import { Component, OnInit } from '@angular/core';
import { Contact } from '../../contact';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{

  contacts: Contact[] = [];
  editing: boolean[] = [];
  viewing_details: boolean[] = [];

  constructor(private contactService: ContactsService){

   
  }

  ngOnInit(): void {
    this.carregarContatos();
  }

  carregarContatos(){
    this.contactService.getAllContacts().subscribe({
      next: json => {
           this.contacts = json
           this.viewing_details = this.contacts.map(() => false);
        }
    })
  }

  MostrarMais(index: number, editando: boolean){
    this.viewing_details[index] =!this.viewing_details[index];
    this.editing[index] = editando;
  }

  favoritarContato(contato: any){

  }
  editarContato(contato: any){

  }

  deletarContato(contato: Contact){

    const confirmar_delecao = window.confirm("Tem certeza que deseja remover esse contato?")
    if(confirmar_delecao){
      this.contactService.deleteContact(contato).subscribe({
        next: () => this.carregarContatos()
      })
      alert("Exclusão realizada com sucesso.")
    }
    else{
      return;
    }
  }

}
