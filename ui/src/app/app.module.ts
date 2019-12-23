import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { HTTP_INTERCEPTORS,HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { AuthGuardService } from './auth-guard.service'
import { AuthService } from './auth.service'
import { CallbackComponent } from './callback/callback.component'
import { TodoComponent } from './todo/todo.component'
import { TodoService } from './todo.service'

import { FormsModule } from '@angular/forms'
import { TokenInterceptor } from './token.interceptor';
import { KanjiComponent } from './kanji/kanji.component'
import { KanjiService } from './kanji.service';
import { NodesComponent } from './nodes/nodes.component';
import { D3Service, D3_DIRECTIVES } from './d3';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TodoComponent,
    CallbackComponent,
    KanjiComponent,
    NodesComponent,
    SHARED_VISUALS,
    D3_DIRECTIVES,
    GraphComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [D3Service, NodesComponent, AuthGuardService,AuthService,TodoService,KanjiService,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
