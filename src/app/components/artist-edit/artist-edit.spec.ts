import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistEdit } from './artist-edit';

describe('ArtistEdit', () => {
  let component: ArtistEdit;
  let fixture: ComponentFixture<ArtistEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
