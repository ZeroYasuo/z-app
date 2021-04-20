import React,{useRef} from 'react'
import { Space, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { add } from './../../api/banner'


function Index() {

  const history = useHistory()

  const urlRef = useRef()
  const altRef = useRef()
  const imgRef = useRef()
  const img1Ref = useRef()
  const prevRef = useRef()

  const prevImg = (e) => {
    const reader = new FileReader()
    const file = imgRef.current.files[0]
    reader.readAsDataURL(file)
    reader.onload = function () {
      img1Ref.current.value = this.result
      prevRef.current.src = this.result
    }
  }

  const upload = (e) => {
    const link = urlRef.current.value
    const alt = altRef.current.value
    const img = imgRef.current.value

    add({
      link,alt,img
    }).then(res=>{
      console.log(res)
      history.push('/banner/list')
    }
    )
  }
  return (
    <div>
      <Space direction="vertical">
        <input type="text" placeholder='图片跳转地址' ref={urlRef}/>
        <input type="text" placeholder='图片alt' ref={altRef}/>
        <input type="file" ref={imgRef} onChange={ prevImg }/>
        <input type="text" ref={img1Ref} hidden />
        <Button type="primary" shape="round" onClick={upload}>
          上传
        </Button>
        <img src="" alt="" ref={ prevRef }/>
      </Space>
    </div>
  )
}

export default Index
