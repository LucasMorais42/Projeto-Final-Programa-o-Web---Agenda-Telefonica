import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { GroupsComponent } from './components/groups/groups.component';

const routes: Routes = [
  {path: 'contacts', component: ContactsComponent},
  {path: 'favorites', component: FavoritesComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'contact_info', component: ContactInfoComponent} //acessado apenas via component ContactsComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
