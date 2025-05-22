import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheArticlesComponent } from './recherche-articles.component';

describe('RechercheArticlesComponent', () => {
  let component: RechercheArticlesComponent;
  let fixture: ComponentFixture<RechercheArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechercheArticlesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
