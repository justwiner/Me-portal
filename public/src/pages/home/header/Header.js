import React, { Component } from 'react'
import {Icon} from 'antd'
import {Service} from '../../../lib'
import './index.scss'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      menuType: 'appstore',
      menuClass: 'menuOff',
      menuOverlay: 'menu-overlay',
      menuItem: [
        {
          icon: 'home',
          tip: '主页',
          mouseEnter: false,
          link: 'home'
        },
        {},
        {
          icon: 'user',
          tip: '关于我',
          mouseEnter: false,
          link: 'about'
        },
        {},
        {
          icon: 'heart-o',
          tip: '喜欢吗？喜欢就赞一下吧！',
          mouseEnter: false,
          link: 'like'
        },
        {},
        {
          icon: 'github',
          tip: '我的GitHub',
          mouseEnter: false,
          link: 'https://github.com/justwiner'
        },
        {},
        {
          icon: 'form',
          tip: '我的博客',
          mouseEnter: false,
          link: 'https://segmentfault.com/u/winer_5ad36a96049db/articles'
        }
      ],
      currentIp: ''
    }
  }
  componentDidMount () {
    this.ifAddLike()
  }
  ifAddLike () {
    Service.getIP().then(res => {
      this.setState({
        currentIp: res.data.onlineip
      })
    }).catch(err => {
      console.log(err)
    })
  }
  menuOnClick (currMenu, currentOverlay) {
    if (currMenu === 'menuOff' &&  (currentOverlay === 'menu-overlayOff' || currentOverlay === 'menu-overlay')) {
      this.refs.header.style.zIndex = 5
      this.setState({
        menuClass: 'menuOn',
        menuOverlay: 'menu-overlayOn'
      })
    } else {
      this.refs.header.style.zIndex = 2
      this.setState({
        menuClass: 'menuOff',
        menuOverlay: 'menu-overlayOff'
      })
    }
  }
  close () {
    this.refs.header.style.zIndex = 2
    this.setState({
      menuClass: 'menuOff',
      menuOverlay: 'menu-overlayOff'
    })
  }
  menuItemEnter (index, menuItem) {
    menuItem[index].mouseEnter = true
    this.setState({
      menuItem
    })
  }
  menuItemLeave (index, menuItem) {
    menuItem[index].mouseEnter = false
    this.setState({
      menuItem
    })
  }
  menuItemLink (link) {
    if ( link.indexOf('http') >= 0 ) {
      window.open(link)
    } else {
      switch ( link ) {
        case 'home': this.close(); break;
        case 'about': console.log('about me'); break;
        case 'like': console.log('I like !'); break;
        default: console.log('未定义的操作'); break;
      }
    }
  }
  render () {
    const { menuType, menuClass, menuOverlay, mouseEnter, tipText, menuItem } = this.state
    return (
      <header ref="header" className="header">
        <div className={menuOverlay}>
          <div className="closeIcon"><Icon type="close" onClick={this.close.bind(this)} className="menuClose"/></div>
          <div className="menu-container">
            <div className="menu-content">
              {
                menuItem.map((item, index) => {
                  if (item.icon === undefined) {
                    return <div key={index}/>
                  } else {
                    return item.mouseEnter 
                    ? <div 
                      key={index}
                      onMouseLeave={this.menuItemLeave.bind(this, index, menuItem)}
                      onMouseEnter={this.menuItemEnter.bind(this, index, menuItem)}
                      onClick={this.menuItemLink.bind(this,item.link)}
                      className="menuItem-tip"><span>{item.tip}</span></div> 
                    : <div  
                      key={index}
                      onMouseLeave={this.menuItemLeave.bind(this, index, menuItem)}
                      onMouseEnter={this.menuItemEnter.bind(this, index, menuItem)}
                      className="menuItem-icon">
                        <Icon type={item.icon} /></div>
                  }
                })
              }
            </div>
          </div>
        </div>
        <Icon onClick={this.menuOnClick.bind(this, menuClass, menuOverlay)} type={menuType} className={menuClass}/>
      </header>
    )
  }
}

export default Header