export type ChannelType = {
    id: number,
    name: string
}
export type FieldType = {
    status?: number;
    channel_id?: number | string;
    begin_pubdate?: string;
    end_pubdate?: string;
    page: number;
    per_page: number;
    datepicker?: any
};
export type DataType = {
    id: string,
    title: string,
    status: string
}
export interface ArticleList {
    id: string;
    title: string;
    status: number;
    comment_count: number;
    pubdate: string;
    cover: Cover;
    like_count: number;
    read_count: number;
  }
  
  interface Cover {
    type: number;
    images: any[];
  }
export type PublishFieldType = {
    id:string
    title: string;
    content: string;
    cover?: {
      type: number;
      images: Array<unknown>;
    };
    channel_id: number;
  };