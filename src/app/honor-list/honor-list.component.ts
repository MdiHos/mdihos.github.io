import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

/*
* See [this post](https://stackoverflow.com/q/18262288)
* and [this post](https://stackoverflow.com/q/44579877).
* and [this post](https://stackoverflow.com/q/20714593)
* to learn how to use GitHub GraphQL API for getting my contributions.
*
* For GraphQL queries we could also use [Apollo library](https://apollo-angular.com/).
*
* See [this](https://zoaibkhan.com/blog/how-to-add-loading-spinner-in-angular-with-rxjs/)
* for how to add loading image when doing something in background.
*/

const notAvailable: string = '-';
const githubToken: string = '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';
const githubRestURL: string = 'https://api.github.com/users/mahozad';
const githubGraphQLURL: string = 'https://api.github.com/graphql';
const stackoverflowRestURL: string = 'https://api.stackexchange.com/2.3/users/8583692?site=stackoverflow';

@Component({
  selector: 'app-honor-list',
  templateUrl: './honor-list.component.html',
  styleUrls: ['./honor-list.component.scss']
})
export class HonorListComponent implements OnInit {

  github = {contributions: '', repos: '', gists: '', followers: ''};
  stackoverflow = {reputation: '', goldBadges: '', silverBadges: '', bronzeBadges: ''};
  isLoadingSO = true;
  isLoadingGHRest = true;
  isLoadingGHGraphQL = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get(githubRestURL)
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(err => { // Then handle the error
            return HonorListComponent.handleError(err, () => {
              this.isLoadingGHRest = false;
              this.github.repos = notAvailable;
              this.github.gists = notAvailable;
              this.github.followers = notAvailable;
            });
          }
        )
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
      )
      .catch(() => this.github.contributions = notAvailable);

    this.http
      .get(stackoverflowRestURL)
      .pipe(
        retry(5), // Retry a failed request up to 5 times
        catchError(err => { // Then handle the error
            return HonorListComponent.handleError(err, () => {
              this.isLoadingSO = false;
              this.stackoverflow.reputation = notAvailable;
              this.stackoverflow.goldBadges = notAvailable;
              this.stackoverflow.silverBadges = notAvailable;
              this.stackoverflow.bronzeBadges = notAvailable;
            });
          }
        )
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
    const headers = {'Authorization': `bearer ${githubToken}`};
    const body = {
      'query': 'query {viewer {contributionsCollection {contributionCalendar {totalContributions}}}}'
    };
    const response = await fetch(
      githubGraphQLURL,
      {method: 'POST', body: JSON.stringify(body), headers: headers}
    );
    return await response.json();
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
