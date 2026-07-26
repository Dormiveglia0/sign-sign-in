import { useEffect, useState } from "react";
import {
  App,
  Button,
  Card,
  Empty,
  Image,
  Skeleton,
  Upload,
  type UploadProps,
} from "antd";
import { ImagePlus, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { api, formatBytes, formatDateTime, uploadImage } from "../api";
import { PageHeader, SectionHeading } from "../components";
import type { ImageItem } from "../types";

const { Dragger } = Upload;

export default function ImagesPage() {
  const { message, modal } = App.useApp();
  const [items, setItems] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const result = await api<{ items: ImageItem[] }>("/api/images");
      setItems(result.items);
    } catch (error) {
      message.error(error instanceof Error ? error.message : "图片加载失败");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const uploadProps: UploadProps = {
    accept: ".png,.jpg,.jpeg,.webp",
    multiple: true,
    showUploadList: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      setUploading(true);
      try {
        await uploadImage(file as File);
        onSuccess?.({});
        message.success(`${(file as File).name} 已上传`);
        await load();
      } catch (error) {
        onError?.(error as Error);
        message.error(error instanceof Error ? error.message : "上传失败");
      } finally {
        setUploading(false);
      }
    },
  };

  function remove(item: ImageItem) {
    modal.confirm({
      title: `删除 ${item.name}？`,
      content: "引用这张图片的拍照定时任务将在下次保存时提示缺失。",
      okText: "删除图片",
      okButtonProps: { danger: true },
      cancelText: "取消",
      onOk: async () => {
        try {
          await api(`/api/images/${encodeURIComponent(item.name)}`, {
            method: "DELETE",
          });
          setItems((current) => current.filter((value) => value.name !== item.name));
          message.success("图片已删除");
        } catch (error) {
          message.error(error instanceof Error ? error.message : "删除失败");
        }
      },
    });
  }

  return (
    <div className="page-container">
      <PageHeader
        eyebrow="ASSETS / IMAGES"
        title="图片资产"
        description="上传并统一管理拍照签到、接龙表单使用的服务器图片。"
        actions={
          <Button icon={<RefreshCw size={16} />} onClick={() => void load()}>
            刷新
          </Button>
        }
      />

      <Card className="upload-card">
        <Dragger {...uploadProps} disabled={uploading}>
          <div className="upload-illustration">
            <UploadCloud size={26} />
          </div>
          <p className="ant-upload-text">
            {uploading ? "正在验证并上传图片" : "拖放图片到这里，或点击选择文件"}
          </p>
          <p className="ant-upload-hint">
            支持 PNG、JPG、JPEG、WEBP；单张最大 10 MB。服务端会验证真实图片内容。
          </p>
        </Dragger>
      </Card>

      <section className="image-library">
        <SectionHeading
          title="资产库"
          description={`${items.length} 张可用图片`}
          extra={<ImagePlus size={18} />}
        />
        {loading ? (
          <div className="image-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index}>
                <Skeleton.Image active />
                <Skeleton active paragraph={{ rows: 1 }} />
              </Card>
            ))}
          </div>
        ) : items.length ? (
          <Image.PreviewGroup>
            <div className="image-grid">
              {items.map((item) => (
                <article key={item.name} className="image-tile">
                  <div className="image-preview">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fallback=""
                      loading="lazy"
                    />
                  </div>
                  <div className="image-info">
                    <strong title={item.name}>{item.name}</strong>
                    <span>
                      {formatBytes(item.size)} · {formatDateTime(item.updatedAt)}
                    </span>
                  </div>
                  <Button
                    className="image-delete"
                    type="text"
                    danger
                    icon={<Trash2 size={15} />}
                    aria-label={`删除 ${item.name}`}
                    onClick={() => remove(item)}
                  />
                </article>
              ))}
            </div>
          </Image.PreviewGroup>
        ) : (
          <Card>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="还没有服务器图片"
            >
              <span className="muted">从上方上传后即可用于拍照签到与接龙表单。</span>
            </Empty>
          </Card>
        )}
      </section>
    </div>
  );
}
