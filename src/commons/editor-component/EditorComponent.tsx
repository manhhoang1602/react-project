import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import htmlToDraft from "html-to-draftjs";


interface IProps {
  logData: (data: string) => any;
  defaultValue?: string;
}

class EditorComponent extends Component<IProps, any> {

  constructor(props: any) {
    super(props);
    const html = this.props.defaultValue? this.props.defaultValue : "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState: editorState,
      };
    }
  }

  componentDidMount() {
    const html = this.props.defaultValue? this.props.defaultValue : "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState: editorState,
      })
    }
  }

  componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<any>, snapshot?: any) {
    if (prevProps.defaultValue !== this.props.defaultValue && prevProps.defaultValue === "") {
      const html = this.props.defaultValue? this.props.defaultValue : "";
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          editorState: editorState,
        })
      }
    }
  }

  onEditorStateChange: Function = (editorState: any) => {
    this.props.logData(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.setState({
      editorState: editorState,
    });
  };

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onEditorStateChange={(value) => this.onEditorStateChange(value)}
          toolbar={
            { options: ["inline", "blockType", "fontSize", "fontFamily", "list", "textAlign", "colorPicker", "link", "embedded", "remove", "history"] }
          }
          editorStyle={{
            height: 200,
            width: "100%"
          }}
        />
      </div>
    );
  }
}

export default EditorComponent;