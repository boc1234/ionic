import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetgeneralPage } from './assetgeneral.page';

describe('AssetgeneralPage', () => {
  let component: AssetgeneralPage;
  let fixture: ComponentFixture<AssetgeneralPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetgeneralPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetgeneralPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
