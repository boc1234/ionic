import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HistoryupdatePage } from './historyupdate.page';

describe('HistoryupdatePage', () => {
  let component: HistoryupdatePage;
  let fixture: ComponentFixture<HistoryupdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryupdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryupdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
