import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {axe, toHaveNoViolations} from 'jasmine-axe';

import {TranslateInputButtonComponent} from './button.component';
import {NgxsModule, Store} from '@ngxs/store';
import {ngxsConfig} from '../../../../core/modules/ngxs/ngxs.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {TranslateState} from '../../../../modules/translate/translate.state';
import {AppTranslocoTestingModule} from '../../../../core/modules/transloco/transloco-testing.module';
import {HttpClientModule} from '@angular/common/http';
import {SettingsState} from '../../../../modules/settings/settings.state';
import {SetInputMode, SetSpokenLanguageText} from '../../../../modules/translate/translate.actions';

describe('TranslateInputButtonComponent', () => {
  let store: Store;
  let component: TranslateInputButtonComponent;
  let fixture: ComponentFixture<TranslateInputButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslateInputButtonComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        AppTranslocoTestingModule,
        NgxsModule.forRoot([SettingsState, TranslateState], ngxsConfig),
        HttpClientModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateInputButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass accessibility test', async () => {
    jasmine.addMatchers(toHaveNoViolations);
    const a11y = await axe(fixture.nativeElement);
    expect(a11y).toHaveNoViolations();
  });

  it('button click should dispatch set mode action', fakeAsync(() => {
    component.mode = 'test' as any;
    const spy = spyOn(store, 'dispatch');
    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalledWith(new SetInputMode('test' as any));
    expect(spy).toHaveBeenCalledTimes(1);
  }));
});
