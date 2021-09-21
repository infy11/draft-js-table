import React from 'react';
import './App.css';
import { Editor } from 'react-draft-wysiwyg';
import {EditorState, NestedUtils, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import * as table from 'draft-js-table';

const blockRenderMap = table.DefaultBlockRenderMap;
const extendedBlockRenderMap = NestedUtils.DefaultBlockRenderMap.merge(blockRenderMap);
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState =>{ 
      console.log('editor state', editorState);
      

      this.setState({editorState: editorState})
    };

    console.log('draft js table', NestedUtils);
  }

  onInsertTable = () => {
    const {editorState} = this.state;
    const tableState = table.insertTable(editorState);

    this.setState({
      editorState:tableState
    })


  }


  handleKeyCommand= (command) => {
    const {editorState} = this.state
    var newState = (table.handleKeyCommand(editorState, command)
        || RichUtils.handleKeyCommand(editorState, command));

    if (newState) {
        this.onChange(newState);
        return true;
    }
    return false;
}

  render() {
    return (
      <>
      <div> react app</div>
      <Editor editorState={this.state.editorState} blockRenderMap={extendedBlockRenderMap} onEditorStateChange={this.onChange} handleKeyCommand={this.handleKeyCommand} />
      <button onClick={this.onInsertTable}>create table </button>
      </>
    );
  }
}

export default App;
