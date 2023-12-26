/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-25 09:57:05
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-25 11:13:01
 * @Description:
 */
import BarCharts from './components/BarCharts'

const Home = () => {
  return (
    <div>
      <BarCharts title={'三大框架满意度'} width={500} height={400}/>
      <BarCharts title={'三大框架普及度'} width={600} height={500}/>
    </div>
  );
};
export default Home
