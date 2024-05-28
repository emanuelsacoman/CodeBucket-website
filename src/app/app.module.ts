import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './view/index/index.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule, } from '@angular/fire/compat/storage';
import { environments } from 'src/environments/environments';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './view/login/login.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { ItemlistComponent } from './view/itens/itemlist/itemlist.component';
import { ItemeditComponent } from './view/itens/itemedit/itemedit.component';
import { ItemcreateComponent } from './view/itens/itemcreate/itemcreate.component';
import { HeadComponent } from './view/head/head.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AuthService } from './model/services/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { WebManagerComponent } from './view/screenManager/web-manager/web-manager.component';
import { FooterEditComponent } from './view/screenManager/footer-edit/footer-edit.component';
import { HomeEditComponent } from './view/screenManager/home-edit/home-edit.component';
import { OutroEditComponent } from './view/screenManager/outro-edit/outro-edit.component';
import { FooterComponent } from './view/footer/footer.component';
import { CommandsComponent } from './view/commands/commands.component';
import { ComandosEditComponent } from './view/screenManager/comandos-edit/comandos-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    ItemlistComponent,
    ItemeditComponent,
    ItemcreateComponent,
    HeadComponent,
    WebManagerComponent,
    FooterEditComponent,
    HomeEditComponent,
    OutroEditComponent,
    FooterComponent,
    CommandsComponent,
    ComandosEditComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environments.firebase)),
    provideFirestore(() => getFirestore()),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    NgToastModule,
    

  ],
  providers: [AuthService, Title, AuthGuard, { provide: FIREBASE_OPTIONS, useValue: environments.firebase}],
  bootstrap: [AppComponent]
})
export class AppModule { }
