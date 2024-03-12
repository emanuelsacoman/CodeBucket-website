import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './view/index/index.component';
import { LoginComponent } from './view/login/login.component';
import { ItemlistComponent } from './view/itens/itemlist/itemlist.component';
import { ItemeditComponent } from './view/itens/itemedit/itemedit.component';
import { ItemcreateComponent } from './view/itens/itemcreate/itemcreate.component';
import { AuthGuard } from './shared/auth.guard';
import { WebManagerComponent } from './view/screenManager/web-manager/web-manager.component';
import { FooterEditComponent } from './view/screenManager/footer-edit/footer-edit.component';
import { HeaderEditComponent } from './view/screenManager/header-edit/header-edit.component';
import { HomeEditComponent } from './view/screenManager/home-edit/home-edit.component';
import { OutroEditComponent } from './view/screenManager/outro-edit/outro-edit.component';
import { CommandsComponent } from './view/commands/commands.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'commands',
    component: CommandsComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'itemlist',
    component: ItemlistComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemedit',
    component: ItemeditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'itemcreate',
    component: ItemcreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'webmanager',
    component: WebManagerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'footeredit',
    component: FooterEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'headeredit',
    component: HeaderEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'homeedit',
    component: HomeEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'outro',
    component: OutroEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'footer',
    component: FooterEditComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
