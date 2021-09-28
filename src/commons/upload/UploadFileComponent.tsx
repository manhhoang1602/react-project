import React, { Component } from 'react';
import { Modal, Upload } from 'antd';
import { Notification } from '../notification/Notification';

export interface IFile {
  uid: any;
  name: string;
  status: 'done' | 'error';
  url?: string;
}

interface IState {
  fileList: IFile[];
  previewImage: string;
  previewVisible: boolean;
}

interface IProps {
  type: 'picture' | 'text' | 'picture-card' | undefined;
  limit: number;
  name: string;
  path: string;
  size: number;
  placeholder?: string;
  accept?: '.jpg, .png' | '.mp4';
  defaultData?: IFile[];
  logger: (data: any[]) => any;
  minSecondDuration?: number;
  maxSecondDuration?: number;
  isDisplayImgError?: boolean;
}

class UploadFileComponent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      fileList: [],
      previewImage: '',
      previewVisible: false,
    };
    this.uploadButton = this.uploadButton.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.beforeUploadFile = this.beforeUploadFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div className={'upload-file-component'}>
        <Upload
          accept={this.props.accept ? this.props.accept : '.png, .jpg'}
          action={this.props.path}
          name={this.props.name}
          listType={this.props.type}
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          beforeUpload={this.beforeUploadFile}
          onChange={this.handleChange}
          iconRender={() => <div>Đang tải...</div>}
        >
          {this.props.limit > this.state.fileList.length ? this.uploadButton() : null}
        </Upload>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={() => this.setState({ previewVisible: false })}
        >
          <img alt={'img'} style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }

  private async handlePreview(file: any) {
    const getBase64 = (file: any): Promise<any> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({ previewImage: file.url ? file.url : file.preview, previewVisible: true });
  }

  private beforeUploadFile = (file: any): any => {
    let fileSize: number = this.props.size;
    if (this.props.type === undefined) {
      const isMP4: boolean = file.type === 'video/mp4';
      const validateFileSize: boolean = file.size / 1024 / 1024 > fileSize;
      let minDuration: number = this.props.minSecondDuration || 0;
      let maxDuration: number = this.props.maxSecondDuration || 0;
      let isDurationInvalid: boolean = minDuration || maxDuration ? false : true;

      let promise = new Promise((resolve) => {
        let vid = document.createElement('video');
        let fileURL = URL.createObjectURL(file);
        vid.src = fileURL;
        let duration: number = 0;
        vid.ondurationchange = function () {
          duration = vid.duration;
          isDurationInvalid = duration > minDuration && duration < maxDuration;
          resolve(isDurationInvalid && isMP4 && !validateFileSize);
        };
      });

      promise.then((value) => {
        if (!isMP4) {
          Notification.PushMassage('ERROR', 'Video không đúng định dạng.');
        } else if (validateFileSize) {
          Notification.PushMassage('ERROR', `Dung lượng video tối đa là ${fileSize} MB`);
        } else if (!isDurationInvalid) {
          Notification.PushMassage('ERROR', `Độ dài video giới hạn ${minDuration} - ${maxDuration} giây.`);
        }
      });

      return promise;
    } else {
      const isJpgOrPng: boolean = file.type === 'image/jpeg' || file.type === 'image/png';
      const fileSizeIvalid: boolean = file.size / 1024 / 1024 > fileSize;

      if (!isJpgOrPng) {
        Notification.PushMassage('ERROR', 'ảnh không đúng định dạng.');
      }
      if (fileSizeIvalid) {
        Notification.PushMassage('ERROR', `Dung lượng ảnh tối đa là ${fileSize} MB.`);
      }

      return isJpgOrPng && !fileSizeIvalid;
    }
  };

  private handleChange(value: any) {
    value.fileList.forEach((file: any, index: number) => {
      if (!file.status) {
        this.props.isDisplayImgError ? (value.fileList[index].status = 'error') : value.fileList.splice(index, 1);
      }
      if (file.response && file.response.status === 0) {
        Notification.PushMassage('ERROR', file.response.message);
      }
    });

    this.setState({ fileList: value.fileList });
    this.props.logger(value.fileList);
  }

  private uploadButton = (): React.ReactNode => {
    return (
      <div className={'btn-upload'}>
        <i className={'fal fa-plus-circle'} />
        <div className={'ant-upload-text'}>{this.props.placeholder ? this.props.placeholder : 'Tải ảnh'}</div>
      </div>
    );
  };
}

export default UploadFileComponent;
