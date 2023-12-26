/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-22 11:01:58
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 14:18:53
 * @Description:
 */
import {
  Button,
  Radio,
  Form,
  Space,
  Select,
  DatePicker,
  Tag,
  Image,
  Table,
  Card,
  Popconfirm
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import defaultImg from "@/assets/error.png";
import { useEffect, useState } from "react";
import type { RadioChangeEvent } from "antd";
import { getArticlesAPI,deleteArticleAPI } from "@/apis/article";
import { useChannel } from "@/hooks/useChannel";
import { ChannelType } from "@/types/article";
import locale from "antd/es/date-picker/locale/zh_CN";
import type { ColumnsType } from "antd/es/table";
import { DataType, FieldType,ArticleList } from "@/types/article";
import "dayjs/locale/zh-cn";
import { useNavigate } from "react-router-dom";
const { RangePicker } = DatePicker;
//   参数名称	是否必须	示例	备注
//   status	否		文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部
//   channel_id	是		不传为全部
//   begin_pubdate	否		起始时间
//   end_pubdate	否		截止时间
//   page	否		页码 默认为1页
//   per_page否		每页数量 不传为默认10

const Article = () => {
  const statusLabel = [
    { text: "草稿", color: "default" },
    { text: "待审核", color: "blue" },
    { text: "审核通过", color: "green" },
    { text: "审核拒绝", color: "red" },
  ];
  const columns: ColumnsType<DataType> = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: () => "自定义封面",
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
      render: (data) => (
        <Tag color={statusLabel[data].color}>{statusLabel[data].text}</Tag>
      ),
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
      render: (data:ArticleList) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={()=>navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
            placement="bottomRight"
            title="删除文章"
            description="您确认删除该条数据吗？"
            okText="确认"
            cancelText="取消"
            onConfirm={()=>{onDeleteChange(data.id)}}
          >
          <Button type="link" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const navigate = useNavigate()
  const dateFormat = "YYYY/MM/DD";
  const { channels } = useChannel();
  const [currentRadio, setCurrentRadio] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);
  const [reqData, setReqData] = useState<FieldType>({
    page: 1,
    per_page: 2,
  });
  const fetchArticles = (values?: FieldType) => {
    getArticlesAPI(values).then((res) => {
      setCount(res.data.total_count);
      setArticleList(res.data.results);
    });
    
  };
  const onPaginationChange = (page:number)=>{
    setReqData({
      ...reqData,
      page 
    })
  }
  useEffect(() => {
    fetchArticles(reqData);
  }, [reqData]);
  // 获取表单数据
  const onFinish = (value: FieldType) => {
    setReqData({
      ...reqData,
      channel_id: value.channel_id,
      status: value.status,
      begin_pubdate: value.datepicker[0].format("YYYY-MM-DD") || "",
      end_pubdate: value.datepicker[1].format("YYYY-MM-DD") || "",
    });
  };
  // 选着状态
  const onRadioChange = (e: RadioChangeEvent) => {
    setCurrentRadio(e.target.value);
  };
  // 删除数据
  const onDeleteChange = async (id:string)=>{
    await deleteArticleAPI(id)
    setReqData({...reqData})
  }
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
          <RangePicker locale={locale} format={dateFormat} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button size="small" type="primary" htmlType="submit">
            Search
          </Button>
          <Button size="small" htmlType="reset">
            clear
          </Button>
        </Form.Item>
      </Form>
      <Card title={`查询到${count}条结果`}>
        <Table rowKey="id" columns={columns} dataSource={articleList} pagination={{total:count,pageSize:reqData.per_page,onChange:onPaginationChange}} />;
      </Card>
    </div>
  );
};


export default Article
