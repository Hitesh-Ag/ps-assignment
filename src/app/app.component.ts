import { Component, OnInit } from '@angular/core';
import { LaunchService } from 'src/app/services/launch.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  launchData = [];
  url = 'https://api.spaceXdata.com/v3/launches?limit=100';
  year_query_param = '';
  launch_query_param = '';
  land_query_param = '';
  noData = false;
  loader = false;

  constructor(
    private launchService: LaunchService
  ) {}


  /**
   * @description call on page load
   */
  ngOnInit() {
    this.allLaunchData(this.url);
  }


  /**
   * @description for applying filters
   * @param ev event details
   * @param filterType type of filter
   */
  filter(ev, filterType) {
    let value = '';
    let url = this.url;
    const element = document.getElementById(filterType);
    Array.from(element.children as HTMLCollectionOf<HTMLElement>).forEach((el) => {
      if (el !== ev.currentTarget) {
        el.classList.remove('active');
      }
    });

    if (ev.currentTarget.classList.contains('active')) {
      ev.currentTarget.classList.remove('active');
      value = '';
    } else {
      ev.currentTarget.classList.add('active');
      value = ev.currentTarget.innerText;
    }

    if (filterType === 'year') {
      this.year_query_param = value;
    } else if (filterType === 'launch') {
      this.launch_query_param = value;
    } else {
      this.land_query_param = value;
    }

    if (this.launch_query_param !== '') {
      url = url + '&launch_success=' + this.launch_query_param.toLowerCase();
    }

    if (this.land_query_param !== '') {
      url = url + '&land_success=' + this.land_query_param.toLowerCase();
    }

    if (this.year_query_param !== '') {
      url = url + '&launch_year=' + this.year_query_param.toLowerCase();
    }

    this.allLaunchData(url);
  }


  /**
   * @description for getting launch data
   * @param url url for getting launch data according to condition
   */
  allLaunchData(url) {
    this.loader = true;
    this.noData = false;
    this.launchService.allLaunchAPI(url).subscribe(
      (res: any) => allLaunchAPIDone(res),
      (err: any) => {
        console.log(err);
        this.loader = false;
      }
    );

    const allLaunchAPIDone = (res) => {
      this.loader = false;
      this.launchData = res;
      if (!res.length) {
        this.noData = true;
      }
    }
  }

}
