import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongCreate } from './song-create';

describe('SongCreate', () => {
  let component: SongCreate;
  let fixture: ComponentFixture<SongCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(SongCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
