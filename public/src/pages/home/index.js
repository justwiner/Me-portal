import React, { Component } from 'react'
import Content from './content/Content'
import Header from './header/Header'
import { Icon, notification } from 'antd'
import {Service} from '../../lib'
import './index.scss'

class Home extends Component {
    constructor (props) {
        super (props)
        this.state = {
            musicIcon: 'loading',
            currMusicSrc: '',
            musicList: []
        }
    }
    componentDidMount () {
        this.loadMusic()
        this.refs.music.addEventListener('ended', () => {
            const {musicList} = this.state
            this.selectAMusic(musicList)
        }, false)
    }
    loadMusic () {
        notification.open({
            message: '获取乐库歌曲...',
            description: '正在获取乐库歌曲，请稍等',
            icon: <Icon type="loading"/>
          });
        Service.getMusic(2246594296).then(res => {
            this.setState({
                musicIcon: 'play-circle-o',
                musicList: res.data
            })
        }).catch(err => console.log(err))
    }
    music (currMusicIcon) {
        if (currMusicIcon === 'play-circle-o') {
            const {musicList} = this.state
            if(musicList.length !== 0){
                this.selectAMusic(musicList)
            }
            else {
                this.loadMusic()
                const {musicList} = this.state
                this.selectAMusic(musicList)
            }
        } else {
            this.setState({
                musicIcon:  'play-circle-o',
                currMusicSrc: ''
            })
        }
    }
    selectAMusic (musicList) {
        const index = Math.floor(Math.random() * musicList.length)
        this.setState({
            musicIcon:  'pause-circle-o',
            currMusicSrc: `http://music.163.com/song/media/outer/url?id=${musicList[index].id}.mp3`
        })
        notification.open({
            message: '播放音乐',
            description: `当前播放歌曲：${musicList[index].name}`,
            icon: <Icon type="smile-circle" style={{ color: '#0b8235' }} />,
        });
    }
    render () {
        const {musicIcon, currMusicSrc} = this.state
        return (
            <content className="container">
                <div className="bg-animate" />
                <div className="overlay" />
                <div ref="line" className="line" />
                <Header />
                <Content />
                <Icon onClick={this.music.bind(this, musicIcon)} className="music" type={musicIcon} />
                <audio ref='music' src={currMusicSrc} autoPlay />
            </content>
        )
    }
}

export default Home