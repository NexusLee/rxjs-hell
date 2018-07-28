import * as echarts from 'echarts';

export class LineChart {
    private ec: echarts.ECharts;

    constructor(el: HTMLDivElement) {
        this.ec = echarts.init(el);
    }

    setOptions(options) {
        this.ec.setOption(options);
    }

    showLoading() {
        this.ec.showLoading();
    }

    hideLoading() {
        this.ec.hideLoading();
    }
}