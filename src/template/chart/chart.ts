import { Mock } from './mock';
import { LineChart } from './lineChart';
import { Observable, Observer } from 'rxjs';

const now = new Date().getTime();
const span = 2 * 1000;
const bufferSize = 12;
const startBufferEvery = 1;

const line = new LineChart(document.getElementById('showAge') as HTMLDivElement);

let option = {
  title: {
      left: 'center',
      text: '动态数据(年龄)'
  },
  xAxis: {
    type: 'time',
      splitLine: {
          show: false
      }
  },
  yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      splitLine: {
          show: false
      }
  },
  series: [{
      type: 'line',
      data: []
  }]
};

const print = x => console.log('x: ', x);

const intervalEmit$ = Observable.interval(span);

const fetch$ = intervalEmit$.switchMap(e => Observable.fromPromise(Mock.fetch()));

let counter = 0;

line.showLoading();

const app$ = fetch$.bufferCount(bufferSize, startBufferEvery).map(
    buffer => {
      line.hideLoading();
      const points = buffer.map((item, index) => {
          const point = [];
          point[0] = now + index * span + span * counter;
          point[1] = item;
          return point;
      });
      counter++;
      return points;
    }).
    do(data => {
        option.series[0].data = data;
        line.setOptions(option);
    });

app$.subscribe(print);