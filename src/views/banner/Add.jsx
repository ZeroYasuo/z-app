// import React,{useRef} from 'react'
// import { Space, Button } from 'antd'
// import { useHistory } from 'react-router-dom'
// import { add } from './../../api/banner'


// function Index() {

//   const history = useHistory()

//   const urlRef = useRef()
//   const altRef = useRef()
//   const imgRef = useRef()
//   const img1Ref = useRef()
//   const prevRef = useRef()

//   const prevImg = (e) => {
//     const reader = new FileReader()
//     const file = imgRef.current.files[0]
//     reader.readAsDataURL(file)
//     reader.onload = function () {
//       img1Ref.current.value = this.result
//       prevRef.current.src = this.result
//     }
//   }

//   const upload = (e) => {
//     const link = urlRef.current.value
//     const alt = altRef.current.value
//     const img = imgRef.current.value

//     add({
//       link,alt,img
//     }).then(res=>{
//       console.log(res)
//       history.push('/banner/list')
//     }
//     )
//   }
//   return (
//     <div>
//       <Space direction="vertical">
//         <input type="text" placeholder='图片跳转地址' ref={urlRef}/>
//         <input type="text" placeholder='图片alt' ref={altRef}/>
//         <input type="file" ref={imgRef} onChange={ prevImg }/>
//         <input type="text" ref={img1Ref} hidden />
//         <Button type="primary" shape="round" onClick={upload}>
//           上传
//         </Button>
//         <img src="" alt="" ref={ prevRef }/>
//       </Space>
//     </div>
//   )
// }

// export default Index

//受控组件
import React,{useRef,useState} from 'react'
import { Space, Button,Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { add } from './../../api/banner'


function Index() {

  const history = useHistory()
  const fileRef = useRef()

  //状态
  const [link,setLink] = useState('')
  const [alt,setAlt] = useState('')
  const [img,setImg] = useState('')

  //输入更改状态
  const changeLink = (e) => {
    setLink(e.target.value)
  }
  //输入更改
  const changeAlt = (e) => {
    setAlt(e.target.value)
  }

  const prevImg = (e) =>{
    const file = fileRef.current.input.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      setImg(this.result)
    }
  }

  const chooseImg = (e) => {
    fileRef.current.input.click()
  }

  const upload = (e) => {
    console.log(666)
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
        <Input type="text" placeholder='图片跳转地址' onChange={changeLink} value={link}/>
        <Input type="text" placeholder='图片alt' onChange={changeAlt} value={alt}/>
        <Input type="file" ref={fileRef} onChange={ prevImg }/>
        <Button type="primary" shape="round" onClick={chooseImg}>选择图片</Button>
        <Input value={img} hidden />
        <Button type="primary" shape="round" disabled={img === ''} onClick={upload}>
          上传
        </Button>
        <img src={img} alt="" style={{height:200,width:400}}/>
      </Space>
    </div>
  )
}

export default Index
