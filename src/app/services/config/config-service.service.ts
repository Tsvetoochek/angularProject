import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConfig } from 'src/app/models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {
  static config: IConfig;
  constructor(private http: HttpClient) { }
  
  configLoad (): void {
    const jsonFile = `assets/config/config.json`;
    this.http.get<IConfig>(jsonFile).subscribe((data) => {
      if (data && typeof(data) === 'object') {
        ConfigServiceService.config = data;

      }
    })
}

  loadPromise(): Promise<any> {
    const jsonFile = `assets/config/config.json`;
    const configPromise = new Promise<IConfig>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response: any) => {
        if (response && typeof(response) === 'object') {
          ConfigServiceService.config = response;
          const config = ConfigServiceService.config;
          if (config) {
            // set origin host
            resolve(config);
          } else {
            reject('Ошибка при инициализации конфига - неверный формат ' + config);
          }
        } else {
          reject('Ошибка при инициализации конфига - неверный формат ответа ' + response);
        }
      }).catch((response: any) => {
        reject(`Ошибка при загрузке файла '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });

  const promiseArr = [configPromise];
  return Promise.all(promiseArr);

   }
}



