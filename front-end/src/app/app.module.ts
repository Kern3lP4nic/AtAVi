import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { GuestComponent } from './pages/guest/guest.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/admin/components/login/login.component';
import { EmailValidator} from './pages/admin/models/formValidator/email.validator';
import { PasswordValidator} from './pages/admin/models/formValidator/password.validator';
import { LogoutComponent } from './pages/admin/components/logout/logout.component';
import { ManageAdministratorsComponent } from './pages/admin/components/manage-administrators/manage-administrators.component';
import { ManageProfileComponent} from './pages/admin/components/manage-profile/manage-profile.component';
import { ManageSlackComponent } from './pages/admin/components/manage-slack/manage-slack.component';
import { ManageQuestionsComponent } from './pages/admin/components/manage-questions/manage-questions.component';
import { ManageFirmsComponent } from './pages/admin/components/manage-firms/manage-firms.component';
import { EqualValidator} from './pages/admin/models/formValidator/equalvalidator';
import { DataDisplayComponent } from './pages/guest/components/data-display/data-display.component';
import { LandingComponent } from './pages/landing/landing.component';
import {ErrorComponent} from './pages/error/error.component';
import {ManageConversationComponent} from './pages/guest/components/manage-conversation/manage-conversation';
import {ListViewComponent} from './pages/admin/components/list-view/listview.component';
import { RecoveryPswComponent } from './pages/admin/components/recovery-psw/recovery-psw.component';

const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'recovery', component: RecoveryPswComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, children: [
        { path: 'manage-profile', component: ManageProfileComponent, outlet: 'admin'},
        { path: 'manage-administrators', component: ManageAdministratorsComponent, outlet: 'admin'},
        { path: 'manage-slack', component: ManageSlackComponent, outlet: 'admin'},
        { path: 'manage-questions', component: ManageQuestionsComponent, outlet: 'admin'},
        { path: 'manage-firms', component: ManageFirmsComponent, outlet: 'admin'}
    ]},
    { path: 'guest', component: GuestComponent },
    { path: '**', component: ErrorComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        AdminComponent,
        GuestComponent,
        ErrorComponent,
        ManageConversationComponent,
        LoginComponent,
        EmailValidator,
        PasswordValidator,
        LogoutComponent,
        ManageAdministratorsComponent,
        ManageProfileComponent,
        ManageSlackComponent,
        ManageQuestionsComponent,
        ManageFirmsComponent,
        ListViewComponent,
        EqualValidator,
        DataDisplayComponent,
        LandingComponent,
        RecoveryPswComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
