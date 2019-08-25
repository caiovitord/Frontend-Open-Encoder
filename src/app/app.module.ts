import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { Interceptor } from './interceptor.module';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { UserStepsComponent } from './user-steps/user-steps.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { EncodingListComponent } from './encoding-list/encoding-list.component';
import { MatDialogModule } from '@angular/material';
import { DeleteDialogComponent } from './encoding-list/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    VideoPlayerComponent,
    FooterComponent,
    HomeComponent,
    UserStepsComponent,
    EncodingListComponent,
    DeleteDialogComponent
  ],
  imports: [
    AppRoutingModule,
    MatDialogModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatProgressBarModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  entryComponents: [DeleteDialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
    