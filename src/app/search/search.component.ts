import { Component, OnInit } from '@angular/core';
import { SearchService, Person } from '../shared/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  searchResults: Array<Person>;

  sub: Subscription;

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      if (params['term']) {
        this.query = decodeURIComponent(params['term']);
        this.search();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  search(): void {
    this.searchService.search(this.query).subscribe(
      data => {
        this.searchResults = data;
      },
      error => console.log(error)
    );
  }

  ngOnInit() {
  }

  onSelect(person: Person) {
    this.router.navigate(['/edit', person.id]);
  }

}
