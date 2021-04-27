import React,{useState} from 'react';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
const editor = () => {
  const [editorState,seteditorState] = useState({
    editorState:'',
    outHtml:'<p></p>'
  })

  componentDidMounted () {
    
  }
  return (
    <div>
      
    </div>
  );
}

export default editor;