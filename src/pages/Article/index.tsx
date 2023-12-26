/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-22 11:01:58
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 10:46:05
 * @Description:
 */
import { Button, Radio, Form, Space, Select,DatePicker,Tag, Image,Table, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import defaultImg from "@/assets/error.png";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { getArticles } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";
import { ChannelType } from "@/types/article";
import locale from 'antd/es/date-picker/locale/zh_CN';
import 'dayjs/locale/zh-cn';
const { RangePicker } = DatePicker;
//   参数名称	是否必须	示例	备注
//   status	否		文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部
//   channel_id	是		不传为全部
//   begin_pubdate	否		起始时间
//   end_pubdate	否		截止时间
//   page	否		页码 默认为1页
//   per_page否		每页数量 不传为默认10

type FieldType = {
  status?: number;
  channel_id: number;
  begin_pubdate?: string;
  end_pubdate?: string;
  page?: number;
  per_page?: number;
  datepicker?:any
};
export const Article = () => {
  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => (
        <Image
          src={cover?.images?.[0] || defaultImg}
          style={{ objectFit: "cover" }}
          width={200}
          height={120}
        />
      ),
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const info = statusLabel[status];
        return <Tag color={info.color}>{info.text}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  const dateFormat = 'YYYY/MM/DD';
  const { channels } = useChannel();
  const [currentRadio, setCurrentRadio] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [count,setCount] = useState(0)
  const fetchArticles = (values?:FieldType)=>{
    getArticles(values).then((res) => {
      setCount(res.data.total_count)
      setArticleList(res.data.results);
    });
  }
  useEffect(()=>{
    fetchArticles()
  },[])
  const onFinish = (value: FieldType) => {
    const {channel_id,datepicker,status} = value
    const params = {
      channel_id,
      status:status || 0
    }
    fetchArticles(params)
  };
  const onRadioChange = (e: RadioChangeEvent) => {
    setCurrentRadio(e.target.value);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="状态" name="status">
            <Radio.Group onChange={onRadioChange} value={currentRadio}>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select>
              {channels?.map((item: ChannelType) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="datepicker">
            <RangePicker locale={locale} format={dateFormat}/>
          </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="reset">reset</Button>
        </Form.Item>
      </Form>
      <Card title={`查询到${count}条结果`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} />;
      </Card>
    </div>
  );
};
