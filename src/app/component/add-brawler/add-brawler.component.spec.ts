import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrawlerComponent } from './add-brawler.component';

describe('AddBrawlerComponent', () => {
  let component: AddBrawlerComponent;
  let fixture: ComponentFixture<AddBrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBrawlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
