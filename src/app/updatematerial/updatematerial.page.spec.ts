import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatematerialPage } from './updatematerial.page';

describe('UpdatematerialPage', () => {
  let component: UpdatematerialPage;
  let fixture: ComponentFixture<UpdatematerialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatematerialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatematerialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
