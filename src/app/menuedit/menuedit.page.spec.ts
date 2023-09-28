import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenueditPage } from './menuedit.page';

describe('MenueditPage', () => {
  let component: MenueditPage;
  let fixture: ComponentFixture<MenueditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenueditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenueditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
