import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobilehomePage } from './mobilehome.page';

describe('MobilehomePage', () => {
  let component: MobilehomePage;
  let fixture: ComponentFixture<MobilehomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobilehomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobilehomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
