<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="24">
                <figure>
                    <div id="chartColumn" class="chart"></div>
                </figure>
            </el-col>
            <el-col :span="24">
                <figure>
                    <div id="chartTrend" class="chart"></div>
                </figure>
            </el-col>
        </el-row>
    </section>
</template>

<script>
    import echarts from 'echarts'
    import utils from 'common/js/util.js'
    export default {
        data() {
            return {
                chartColumn: null,
                chartTrend: null,
            }
        },
        mounted: function () {
            var _this = this;
            //基于准备好的dom，初始化echarts实例
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));
            this.chartTrend = echarts.init(document.getElementById('chartTrend'));

            let option1 = {
                color: utils.getEchartColors(),
                title: {
                    text: '趋势分析'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['pv统计', 'ip统计', 'uv统计']
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {show: true},
                        dataView: {show: true, readOnly: false},
                        magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                        restore: {show: true},
                        saveAsImage: {show: true}
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        splitLine: {
                            show: false
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        splitLine: {
                            show: false
                        }
                    }
                ],
                series: [
                    {
                        name: 'pv统计',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name: 'ip统计',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name: 'uv统计',
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: [1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]
            };
            this.chartColumn.setOption(option1);
            this.chartTrend.setOption(option1);

        }

    }

</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    figure {
        /*display: inline-block;*/
        margin: 1em;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 8px;
        box-shadow: 0 0 45px rgba(0, 0, 0, .2);
        padding: 1em 1em
    }

    .chart {
        width: 100%;
        height: 280px;
    }

    .titlePanel {
        width: 100%;
        height: 10px;
    }

</style>