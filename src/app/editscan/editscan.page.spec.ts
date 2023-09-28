import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditscanPage } from './editscan.page';

describe('EditscanPage', () => {
  let component: EditscanPage;
  let fixture: ComponentFixture<EditscanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditscanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditscanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
