import React, { Component } from 'react'
import './index.scss'

class Content extends Component {
  render () {
    return (
      <content ref="content" className="content">
        <div className="content-img"></div>
        <div className="content-con">
          <p>You know some birds are not meant to be caged, their feathers are just too bright. </p>
          <p>你知道，有些鸟儿是注定不会被关在牢笼里的，它们的每一片羽毛都闪耀着自由的光辉。</p>
        </div>
      </content>
    )
  }
}

export default Content