import { DistancesService } from './distances.service';
import { Component        } from '@angular/core'      ;
import { Chart            } from 'chart.js'           ;

// Chart General Config Options

Chart.defaults.global.defaultFontColor  = 'rgba(23, 22, 66,0.7)';
Chart.defaults.global.defaultFontFamily = "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif";
Chart.defaults.global.defaultFontSize   = 12;
Chart.defaults.global.defaultStyle      = 'bold';


const ChartOptions = {
                        responsive  : true,
                        legend      : {
                                        position  : 'top' ,
                                        display   : true  ,
                                        labels    : {
                                                      fontColor: 'black'  ,
                                          
                                                    }
                                      },
                        title       : {
                                        display : true,
                                        text    : 'Distance Traveled Per Day of Week'
                                      },
                        tooltips    : {mode:'point'}

                      };


@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.css']
})

export class AppComponent {
  
  // Properties

  title     = 'app';
  chart     = [];
  Quote     = " 'You can never understand everything. But, you should push yourself to understand the system.' #Ryan Dahl"
  type      : string;
  Types     = ['bar','horizontalBar','pie','line','radar','polarArea'];
  Drivers   = ['Driver 1'];
  Data      = [{  label           : 'Driver 1'            ,
                  data            : []                    ,   // To be filled later when subscribing to the response of the API Service
                  backgroundColor : 'rgba(23, 22, 66,0.7)',
                  borderColor     : 'rgb(50, 193, 209)'   
              }];
  

  // Methods

  constructor(private _DistancesService : DistancesService)
  {
    this.type='bar'
  }

  ngOnInit()
  {
    this._DistancesService.getDistances().subscribe(res =>
    {

      let VDistancesA = [];
      let Labels      = [];
      
      for (let i=0;i<7;i++)
      {
          VDistancesA .push(res[i].distance)
          Labels      .push(res[i].date)
      }

      this.Data[0].data=VDistancesA;

      let dataset = { labels    : Labels,
                      datasets  : this.Data
                    };

      this.chart = this.newChart(dataset,this.type);
      console.log(this.chart);
    });
  }

  newChart(dataset, type)
  {
    return new Chart('canvas', {
      // The type of the chart we want to create

      type    : type,

      //The data for our dataset

      data    : dataset,

      // Configuration options go here

      options : ChartOptions

    });
  }

  onChange(newType)
  {
    const dataset = this.chart.data;
    this.chart.destroy();
    this.chart = this.newChart(dataset,newType);
  }

  addDriver(NewDriver)
  {

    //this.chart.addData(this.chart.data.labels,[1,2,3,4,5,6,7]);
    console.log(this.chart.data.labels);
    
    this._DistancesService.getDistances().subscribe(res =>
    {

      let temp = [];
      for (let i=0;i<7;i++)
        {
            temp.push(res[i].distance*Math.random()*1.8);
            
        }
      this.Drivers.push('Driver '+(this.Drivers.length+2).toString());
      this.Data.push({label           : 'Driver '+(this.Drivers.length).toString(),
      data            :        temp   ,   // To be filled later when subscribing to the response of the API Service
      backgroundColor : "#"+((1<<24)*Math.random()|0).toString(16),
      borderColor     : 'rgb(50, 193, 209)'   
      });
      this.chart.update();
    });
  }
  
  popDriver()
  {
    this.Data.pop();
    this.Drivers.pop();
    this.chart.update();

  }

}
