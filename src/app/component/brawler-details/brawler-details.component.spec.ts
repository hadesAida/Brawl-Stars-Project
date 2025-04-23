import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrawlerDetailsComponent } from './brawler-details.component';

describe('BrawlerDetailsComponent', () => {
  let component: BrawlerDetailsComponent;
  let fixture: ComponentFixture<BrawlerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrawlerDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrawlerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
