///<reference path='../shared/search/mocks/search.service.ts'/>
/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { MockSearchService } from '../shared/search/mocks/search.service';
import { MockActivatedRoute, MockRouter } from '../shared/search/mocks/routes';
import { TestBed } from '@angular/core/testing/test_bed';
import { SearchService } from '../shared/search/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

describe('Component: Search', () => {
  let mockSearchService: MockSearchService;
  let mockActivatedRoute: MockActivatedRoute;
  let mockRouter: MockRouter;

  beforeEach(() => {
    mockSearchService = new MockSearchService();
    mockActivatedRoute = new MockActivatedRoute({'term': 'peyton'});
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      providers: [
        {provide: SearchService, useValue: mockSearchService},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Router, useValue: mockRouter}
      ],
      imports: [FormsModule]
    });

    it('should search when a term is set and search() is called', () => {
      let fixture = TestBed.createComponent(SearchComponent);
      let searchComponent = fixture.debugElement.componentInstance;
      searchComponent.query = 'M';
      searchComponent.search();
      expect(mockSearchService.searchSpy).toHaveBeenCalledWith('M');
    });

    it('should search automatically when a term is on the URL', () => {
      let fixture = TestBed.createComponent(SearchComponent);
      fixture.detectChanges();
      expect(mockSearchService.searchSpy).toHaveBeenCalledWith('peyton');
    });
  });
});
