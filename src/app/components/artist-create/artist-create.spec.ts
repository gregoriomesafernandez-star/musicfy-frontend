import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistCreate } from './artist-create';

describe('ArtistCreate', () => {
  let component: ArtistCreate;
  let fixture: ComponentFixture<ArtistCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
