import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatelistPage } from './updatelist.page';

describe('UpdatelistPage', () => {
  let component: UpdatelistPage;
  let fixture: ComponentFixture<UpdatelistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatelistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatelistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
