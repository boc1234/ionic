import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseaddPage } from './chooseadd.page';

describe('ChooseaddPage', () => {
  let component: ChooseaddPage;
  let fixture: ComponentFixture<ChooseaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseaddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
