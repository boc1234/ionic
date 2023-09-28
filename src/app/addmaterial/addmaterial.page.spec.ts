import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmaterialPage } from './addmaterial.page';

describe('AddmaterialPage', () => {
  let component: AddmaterialPage;
  let fixture: ComponentFixture<AddmaterialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmaterialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmaterialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
