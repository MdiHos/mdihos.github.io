import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

interface Github {
  repos: string;
  gists: string;
  followers: string;
  contributions: string;
}

interface Stackoverflow {
  reputation: string;
  goldBadges: string;
  silverBadges: string;
  bronzeBadges: string;
}

@Component({
  selector: 'app-honor-list',
  templateUrl: './honor-list.component.html',
  styleUrls: ['./honor-list.component.scss']
})
export class HonorListComponent implements OnInit {

  github: Github = {contributions: '', followers: '', gists: '', repos: ''};
  stackoverflow: Stackoverflow = {bronzeBadges: '', goldBadges: '', reputation: '', silverBadges: ''};
  isLoadingSO = true;
  isLoadingGHRest = true;
  isLoadingGHGraphQL = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get('https://api.github.com/users/mahozad')
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(HonorListComponent.handleError) // Then handle the error
      )
      .subscribe((data: any) => {
        this.isLoadingGHRest = false;
        this.github.repos = data.public_repos;
        this.github.gists = data.public_gists;
        this.github.followers = data.followers;
      });

    this
      .getGitHubContributions()
      .then(result => {
          this.isLoadingGHGraphQL = false;
          this.github.contributions = result
            .data
            .viewer
            .contributionsCollection
            .contributionCalendar
            .totalContributions;
        }
      );

    this.http
      .get('https://api.stackexchange.com/2.3/users/8583692?site=stackoverflow')
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(HonorListComponent.handleError) // Then handle the error
      )
      .subscribe((data: any) => {
          this.isLoadingSO = false;
          this.stackoverflow.reputation = data.items[0].reputation;
          this.stackoverflow.goldBadges = data.items[0].badge_counts.gold;
          this.stackoverflow.silverBadges = data.items[0].badge_counts.silver;
          this.stackoverflow.bronzeBadges = data.items[0].badge_counts.bronze;
        }
      );
  }

  async getGitHubContributions() {
    const headers = { Authorization: 'bearer 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' };
    const body = {
      'query': 'query {viewer {contributionsCollection {contributionCalendar {totalContributions}}}}'
    };
    const response = await fetch(
      'https://api.github.com/graphql',
      {method: 'POST', body: JSON.stringify(body), headers: headers}
    );
    return await response.json();
  }

  private static handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred: ', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => 'Could not get repository count.');
  }
}
