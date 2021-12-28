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
  gistCount: number;
  followers: number;
  contributions: number;

  reputation: number;
  goldBadge: number;
  silverBadge: number;
  bronzeBadge: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://api.github.com/users/mahozad')
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(this.handleError) // Then handle the error
      )
      .subscribe((data: any) => {
        this.repoCount = data.public_repos;
        this.gistCount = data.public_gists;
        this.followers = data.followers;
      });

    this
      .getGitHubContributions()
      .then(result =>
        this.contributions = result
          .data
          .viewer
          .contributionsCollection
          .contributionCalendar
          .totalContributions
      );

    this.http
      .get('https://api.stackexchange.com/2.3/users/8583692?site=stackoverflow')
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(this.handleError) // Then handle the error
      )
      .subscribe((data: any) => {
          console.log(data);
          this.reputation = data.items[0].reputation;
          this.goldBadge = data.items[0].badge_counts.gold;
          this.silverBadge = data.items[0].badge_counts.silver;
          this.bronzeBadge = data.items[0].badge_counts.bronze;
        }
      );
  }

  async getGitHubContributions() {
    const headers = {
      Authorization: `bearer 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`
    };
    const body = {
      'query': 'query {viewer {contributionsCollection {contributionCalendar {totalContributions}}}}'
    };
    const response = await fetch(
      'https://api.github.com/graphql',
      {method: 'POST', body: JSON.stringify(body), headers: headers}
    );
    return await response.json();
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
