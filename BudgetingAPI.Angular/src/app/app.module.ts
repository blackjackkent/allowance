import { TotalRowComponent } from './budget/totalRow.component';
import { NavComponent } from './nav/nav.component';
import { BudgetDetailDisplayComponent } from './budget/budgetDetailDisplay.component';
import { BudgetDateDisplayPipe } from './_pipes/budgetDateDisplay.pipe';
import { ErrorHandlerService } from './_services/errorHandler.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from 'app/app.routing';
import { LoginComponent } from 'app/login/login.component';
import { HomeComponent } from 'app/home/home.component';
import { AuthGuard } from 'app/_guards/auth.guard';
import { AuthenticationService } from 'app/_services/authentication.service';
import { BudgetService } from 'app/_services/budget.service';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent,
		BudgetDetailDisplayComponent,
		BudgetDateDisplayPipe,
		NavComponent,
		TotalRowComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],
	providers: [AuthGuard, AuthenticationService, BudgetService, ErrorHandlerService],
	bootstrap: [AppComponent]
})
export class AppModule { }
