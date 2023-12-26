/*
 * @Author: ChuandongHuang chuandong_huang@human-horizons.com
 * @Date: 2023-12-22 11:09:43
 * @LastEditors: ChuandongHuang chuandong_huang@human-horizons.com
 * @LastEditTime: 2023-12-26 14:16:28
 * @Description:
 */
import { useEffect, useState } from "react";
import {
  Button,
  Radio,
  Form,
  Input,
  Select,
  message,
  Upload,
  Modal,
  Card,
} from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { createArticleAPI,getArticleDetailAPI, updateArticleAPI } from "@/apis/article";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import type { RadioChangeEvent } from "antd";
import { useChannel } from "@/hooks/useChannel";
import { useSearchParams } from "react-router-dom";
import {PublishFieldType} from '@/types/article'

type ChannelType = {
  id: number;
  name: string;
};
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const Publish = () => {
  const {channels} = useChannel()
  const [currentRadio, setCurrentRadio] = useState(0);
  // 处理单选按钮
  const onRadioChange = (e: RadioChangeEvent) => {
    setCurrentRadio(e.target.value);
    setFileList([]);
  };
  //  创建文章
  const onFinish = (values: PublishFieldType) => {
    const { channel_id, title, content } = values;
    if(fileList.length !== currentRadio)return message.warning('请上传相匹配的图片数量')
    const params = {
      channel_id,
      title,
      content,
      cover: {
        type: currentRadio,
        images: fileList.map(item=>{
          return item.url ? item.url : item.response.data.url
        }),
      },
    };
    if(articleId){
      console.log(params)
      updateArticleAPI({...params,id:articleId}).then((res) => {
        if ((res.message = "OK")) {
          message.success("修改成功");
        }
      });
    }else{
      createArticleAPI(params).then((res) => {
        if ((res.message = "OK")) {
          message.success("创建成功");
        }
      });
    }
    
  };

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  // 查看大图
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  // 获取上传成功的url
  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id') as string
  const [form] = Form.useForm()
  // 数据回填
  useEffect(()=>{
    const getArticleDetail = async(id:string)=>{
      const res = await getArticleDetailAPI(id)
      const {cover} = res.data
      // 回填form数据
      form.setFieldsValue({
        ...res.data,
        type:cover.type,
      })
      // 回填封面radio选项
      setCurrentRadio(cover.type)
      // 回填图片
      setFileList(cover.images.map((url:string)=>{return{url}}))
    }
    if(articleId){
      getArticleDetail(articleId)
    }
  },[articleId,form])
  
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Card title={articleId ? '编辑' : '创建'}>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 800 }}
      onFinish={onFinish}
      autoComplete="off"
      form={form}
    >
      <Form.Item<PublishFieldType>
        label="标题"
        name="title"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "请输入文章标题" }]}
      >
        <Input />
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
      <Form.Item label="封面" name="cover">
        <Form.Item name="type">
          <Radio.Group onChange={onRadioChange} value={currentRadio}>
            <Radio value={1}>单图 </Radio>
            <Radio value={3}>三图</Radio>
            <Radio value={0}>无图</Radio>
          </Radio.Group>
        </Form.Item>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Upload
          name="image"
          action="http://geek.itheima.net/v1_0/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= currentRadio ? null : uploadButton}
        </Upload>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </Form.Item>
      <Form.Item<PublishFieldType>
        label="内容"
        name="content"
        validateTrigger="onBlur"
        rules={[{ required: true, message: "请输入文章内容" }]}
      >
        <ReactQuill
          className="ql-editor"
          theme="snow"
          placeholder="请输入文章内容"
        ></ReactQuill>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {articleId ? '修改文章' : '发布文章'}
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export default Publish;
