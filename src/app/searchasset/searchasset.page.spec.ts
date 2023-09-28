import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchassetPage } from './searchasset.page';

describe('SearchassetPage', () => {
  let component: SearchassetPage;
  let fixture: ComponentFixture<SearchassetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchassetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchassetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
