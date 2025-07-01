import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';



const routes: Routes = [
  {path: 'contacts', component: ContactsComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path:'newcontact', component: NewContactComponent},
  {path:'contact-info', component: ContactInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
