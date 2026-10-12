import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumEdit } from './album-edit';

describe('AlbumEdit', () => {
  let component: AlbumEdit;
  let fixture: ComponentFixture<AlbumEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(AlbumEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
