import { Component, OnInit, numberAttribute } from '@angular/core';
import { Contact } from '../../contact';
import { ContactsService } from '../../services/contacts.service';
import { FormBuilder, FormGroup, NonNullableFormBuilder } from '@angular/forms';


@Component({
  selector: 'app-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit{

  //listas de valores
  contacts: Contact[] = []; //armazena todos os contatos vindos da função carregarContatos
  filtred_contacts: Contact[] = []; //armazena os contatos filtrados
  editing: { [id: number]: boolean } = {};   //armazena a situação de um contato especifico, pra ver se ele está sendo editado ou não
  viewing_details: {[id: number]:boolean} = {} //armazena a situação de contatos especificos, pra ver se estão vendo seus detalhes ou não (map)


  formEditingContact: FormGroup;
  formFilterContact!: FormGroup; //necessário o !, pois é preciso dizer pro typescript que ele nunca será nulo ou indefinido
  //assim evita erros do typescript pedindo para ele ser inicializado no construtor
  
  constructor(private contactService: ContactsService, private formBuilder: FormBuilder){
    this.formEditingContact = formBuilder.group({
      id: [''],
      name: [''],
      nick_name: [''],
      phone_number: [''], 
      email: [''],
      created_at: [''],
      date_birth: [''],
      address: [''],
      group_name: [''],
      blocked: [''],
      favorite: ['']
    })
   
  }

  ngOnInit(): void {

    this.formFilterContact = this.formBuilder.group({
      campo: [''], 
      valor_pesquisado: ['']      
    });

    this.carregarContatos();
    

   
  }

  carregarContatos(){
    this.contactService.getAllContacts().subscribe({
      next: json => {
           this.contacts = json;
           this.filtred_contacts = [...this.contacts];
           //o map apenas aplica que para cada contato que veio do serviço, a mesma posição dele no viewing_details será false
           //ex: contato id 1 -> viewing_details[0] -> false
           this.contacts.forEach(c=>{
              this.viewing_details[c.id] = false;
              this.editing[c.id] = false;
           })
        }
    })
  }


  MostrarMais(contato: Contact, editando: boolean){
    

    //evita que tenha mais de um aberto

     //troca, ou seja, clicou 1 vez está vendo detalhes, clicou de novo inverte para falso
     this.viewing_details[contato.id] = !this.viewing_details[contato.id];

    //pega o valor do editando e assimila pra posição do array
    if(this.editing[contato.id]==true){
      this.editing[contato.id]=false;
    }
    else{
      this.editing[contato.id] = editando;
    }
    
    if(this.editing[contato.id]){
      this.formEditingContact.patchValue({
        id: contato.id,
        name: contato.name,
        nick_name: contato.nick_name,
        phone_number: contato.phone_number,
        email: contato.email,
        date_birth: contato.date_birth,
        group_name: contato.group_name,
        created_at: contato.created_at,
        address: contato.address,
        favorite: contato.favorite,
        blocked: contato.blocked
      });
    }
  }

  favoritarContato(contato: Contact){
    const favoritado: Contact =  {
      ...contato, //serve pra evitar ter que escrever todos os atributos do contato que pegamos
      favorite: !contato.favorite
    };

    if(favoritado.blocked==true){
      alert("O contato está bloqueado, desbloqueie primeiro para favoritar");
      return;
    }
    else{
      this.contactService.editContact(favoritado).subscribe({
        next: () => {
          this.carregarContatos();
        }
      })
    }

 

  }

  bloquearContato(contato: Contact){
    const bloqueado: Contact =  {
      ...contato, //serve pra evitar ter que escrever todos os atributos do contato que pegamos
      blocked: !contato.blocked //inverte o valor que está atualmente no JSON
    };

    if(bloqueado.favorite==true){
      alert("Não é possível bloquear um contato favoritado");
      return;
    }
    else{
      this.contactService.editContact(bloqueado).subscribe({
        next: () => {
          this.carregarContatos();
        }
      })
    }


  }

  editarContato(){
      this.contactService.editContact(this.formEditingContact.value).subscribe(
        {
          next: () => {
            this.carregarContatos();
            this.formEditingContact.reset();
          }
        }
      )
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


  filtrarContatos(){
    //usa-se o ? (optional chaining) para evitar que o que foi coletado com o get seja nulo ou indefinido
    const campo = this.formFilterContact.get('campo')?.value;
    const valor = this.formFilterContact.get('valor_pesquisado')?.value.toLowerCase().trim()
    //trim() -> remove espaços em branco e toLowerCase() transforma em minusculo

    if(!valor || !campo){
      //se o valor for nulo entra aqui, pois será tratado como !null -> true

      this.filtred_contacts = this.contacts.filter(c=> !c.blocked).sort((a,b)=>Number(b.favorite) - Number(a.favorite));
      return;
    }

    this.filtred_contacts = this.contacts.filter(contato => {

      /*aqui vai adicionar na lista "filtred_contacts" todos os contatos na lista "contacts" que passarem por:
      1ª filtra cada contato, passando por um cast do tipo any e pegando o atributo [campo], seria o mesmo que:
      contato.nome -> pega esse atributo

      2º transforma o valor desse atributo em uma string com todas as letras minusculas
      3º retorna pra lista filtred_contacts se esse dado incluir o valor (digitado no valor_pesquisado) e ao mesmo tempo
      o contato.blocked for false (pois aqui entra a negação !false -> true)
      
      4º ordena essa lista de filtrados, para que apareça primeiro os favoritos, depois os não favoritos
      */
      const dado = (contato as any)[campo]?.toString().toLowerCase();
      return dado?.includes(valor) && !contato.blocked;
    }).sort((a,b) => Number(b.favorite) - Number(a.favorite));
  }
  //a lógica do sort é sempre fazer uma conta, de tal maneira que o resultado ordena:
  // resultado <0 (negativo) -> A vem antes de B
  // resultado >0 (positivo) -> B vem antes de A
  // resultado = 0 (nulo) -> Mantem a ordem que está 
  //na logica fizemos um sort alterado, de maneira que se for true (o valor será 1), se for false (valor será 0)
  //b.favorite(true) - a.favorite(false) -> 1-0 -> 1 Aqui o resultado foi positivo, logo o B vem antes de A
}
