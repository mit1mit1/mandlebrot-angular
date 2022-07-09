import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandlerrainComponent } from './mandlerrain.component';

describe('MandlerrainComponent', () => {
  let component: MandlerrainComponent;
  let fixture: ComponentFixture<MandlerrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandlerrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MandlerrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
