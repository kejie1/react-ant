/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 11:05:06
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 11:11:53
 * @Description: 
 */
// 柱状图组件

import * as echarts from "echarts";
import { useEffect, useRef } from "react";

export const BarCharts = ({title,width,height}) => {
  type EChartsOption = echarts.EChartsOption;
  const charRef = useRef(null)
  useEffect(() => {
    const chartDom = charRef.current
    let myChart = echarts.init(chartDom);
    let option: EChartsOption;

    option = {
      title: {
        text:title,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    };

    option && myChart.setOption(option);
  }, []);
  return (
      <div ref={charRef}  style={{ width: `${width}px`, height: `${height}px` }}></div>
  );
};

export default BarCharts