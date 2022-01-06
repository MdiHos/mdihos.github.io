import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {formatDate} from '@angular/common';

// TODO: These code are mostly duplicate as the one in honor-list component.
//  Create a service and refactor duplicate code to it.

const githubRestURL: string = 'https://api.github.com/repos/mahozad/mahozad.github.io/commits?per_page=1';
const notAvailable: string = 'N/A';
// const options: DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const dateLocale = 'en';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mahozad-angular';
  isLoadingGHRest = true;
  lastUpdate = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(githubRestURL)
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(err => { // Then handle the error
            return AppComponent.handleError(err, () => {
              this.isLoadingGHRest = false;
              this.lastUpdate = notAvailable;
            });
          }
        )
      )
      .subscribe((data: any) => {
        this.isLoadingGHRest = false;
        let date = new Date(Date.parse(data[0].commit.committer.date));
        this.lastUpdate = formatDate(date, 'yyyy-MM-dd', dateLocale);
      });
  }

  private static handleError(error: HttpErrorResponse, callback: () => void) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Request returned ${error.status}; body was: `, error.error);
    }

    callback();

    // Return an observable with a user-facing error message.
    return throwError(() => 'Could not fetch the resource.');
  }
}
