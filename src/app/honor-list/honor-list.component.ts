import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-honor-list',
  templateUrl: './honor-list.component.html',
  styleUrls: ['./honor-list.component.scss']
})
export class HonorListComponent implements OnInit {

  repoCount: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://api.github.com/users/mahozad')
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(this.handleError) // Then handle the error
      )
      .subscribe((data: Array<any>) => this.repoCount = data.public_repos);
    /* OR
      .get('https://api.github.com/users/mahozad/repos')
      .subscribe((data: Array<any>) => this.repoCount = data.length);
    */
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Could not get repository count.');
  }
}
