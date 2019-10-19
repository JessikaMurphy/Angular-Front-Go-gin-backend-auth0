import { HomeComponent } from './home/home.component'
import { RouterModule, Routes } from "@angular/router"
import { NgModule } from '@angular/core'
import { AuthGuardService } from './auth-guard.service'
import { CallbackComponent } from './callback/callback.component'
import { TodoComponent } from './todo/todo.component'
import { KanjiComponent } from './kanji/kanji.component'

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'todo', component: TodoComponent,  canActivate: [AuthGuardService] },
    { path: 'callback', component: CallbackComponent },
    { path: 'kanji', component: KanjiComponent }
  ]

  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })

  export class AppRoutingModule { }