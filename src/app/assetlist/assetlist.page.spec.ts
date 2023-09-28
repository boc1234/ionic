import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssetlistPage } from './assetlist.page';

describe('AssetlistPage', () => {
  let component: AssetlistPage;
  let fixture: ComponentFixture<AssetlistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetlistPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssetlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
