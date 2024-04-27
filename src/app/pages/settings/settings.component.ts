import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  //  private subjectScope: Subject<any>;
  // settingsData: Subscription;
  //  settingsDataSubject: Subscription;
  //  private subjectUnsubscribe: Subscription;
  private subjectForUnsubscribe =  new Subject();

  constructor( private testing: ObservableExampleService,
               private settingsService: SettingsService) { }

  ngOnInit(): void {
    // this.subjectScope = this.testing.getSubject();

    // const myObservable = this.testing.getObservable();

    // const unsubscribe = myObservable.subscribe((data: string) => {
    //   console.log('observer data', data)
    // })
    // unsubscribe.unsubscribe();

    // this.subjectUnsubscribe = this.subjectScope.subscribe((data:string) => {
    //   console.log('data', data)
    // });

    // this.subjectScope.next('Отправленные данные');

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log("settings data", data)
    });

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
    (data) => {
      console.log("settings data from subject", data)
    })


  }

  changePsw(): void {
    console.log('huyak');
  }

  ngOnDestroy(): void {
    // this.subjectUnsubscribe.unsubscribe();
    // this.settingsData.unsubscribe();
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

}
