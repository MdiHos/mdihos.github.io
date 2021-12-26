import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedBookListComponent } from './recommended-book-list.component';

describe('RecommendedBookListComponent', () => {
  let component: RecommendedBookListComponent;
  let fixture: ComponentFixture<RecommendedBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
