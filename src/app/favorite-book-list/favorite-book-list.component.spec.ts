import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBookListComponent } from './favorite-book-list.component';

describe('FavoriteBookListComponent', () => {
  let component: FavoriteBookListComponent;
  let fixture: ComponentFixture<FavoriteBookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteBookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteBookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
