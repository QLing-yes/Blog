import * as echarts from 'echarts/core';
// 图表，图表后缀都为 Chart
import { PieChart } from 'echarts/charts';
// 提示框，标题，直角坐标系，数据集，...，组件后缀都为 Component
import {
    LegendComponent,
    TooltipComponent,
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';

// 按需引入
echarts.use([
    LegendComponent,
    TooltipComponent,

    PieChart,

    LabelLayout,
    UniversalTransition
]);
export default echarts;