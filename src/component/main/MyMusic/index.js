


import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Tooltip } from 'antd';
import { BsThreeDots } from 'react-icons/bs'
import './mymusic.css'
import FavoritePlaylists from './FavoritePlaylists';
import FavoriteSongs from './FavoriteSongs';
import FavoriteArtists from './FavoriteArtists';
import FavoriteVideos from './FavoriteVideos';
import { userContext } from '../../context/UserProvider';
import axios from 'axios';
import BoxEmty from '../hook/BoxEmty';


const MyMusic = () => {
    const{loginSt,user}=React.useContext(userContext)
    const [favoriteSongs,setFavoriteSongs]=React.useState()
    const [colectionPlaylist,setColectionPlaylist]=React.useState()
    const [favoriteArtists,setAavoriteArtists]=React.useState()
    const [favoriteMv,setfavoriteMv]=React.useState()

    const [selectCategory,setSelectCategory]=React.useState('all')
    React.useEffect(()=>{
        if(user){
            const songsId=user.favoriteSongs
            const playlistId=[...user.myPlayList,...user.favoriteAlbums]
            const config={headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                }}
            axios.post('songs/many',{data:songsId})
                  .then(res=>{
                      setFavoriteSongs(res.data)
                  })
            axios.post('albums/many',{data:playlistId})
                  .then(res=>{
                      setColectionPlaylist(res.data)
                  })
        }
    },[user])
    const handelRendelCategory=(fill)=>{
        switch (fill) {
            case 'all':
                return (
                    <>
                      {favoriteSongs?<FavoriteSongs songs={favoriteSongs}/>:''}
                      {colectionPlaylist&&<FavoritePlaylists all={false} playlists={colectionPlaylist}/> }
                    </>); break;
            case 'songs':
                return (
                    <>
                      {favoriteSongs&&<FavoriteSongs songs={favoriteSongs} />}
                    </>);break;
            case 'playlists':
                return (
                    <>
                      {colectionPlaylist&&<FavoritePlaylists playlists={colectionPlaylist}/> }
                    </>);break;
            case 'artists':
                return (
                    <>
                      {favoriteArtists?<FavoriteArtists/>:<BoxEmty title='Danh s??ch ngh??? s?? y??u th??ch tr???ng'/>}
                    </>);break;
            case 'musicvideos':
                return (
                    <>
                      {favoriteMv?<FavoriteVideos/>:<BoxEmty title='Ch??a c?? album trong th?? vi???n c?? nh??n'/>}
                    </>);break;
            default:
                break;
        }
    }
    const { category} = useParams('category')
    return (
        <div className='mymusic'>
            <div className='user-profile'>
                <div className='user-profile__actions'>
                    <button className='btn btn-primary vip-btn'>N??NG C???P VIP</button>
                    <button className='btn btn-primary vip-code-btn'>NH???P M?? CODE</button>
                    <Tooltip title='kh??c'>
                        <BsThreeDots />
                    </Tooltip>
                </div>
                <div className='user-profile__container'>
                    <div className='avatar'>
                        <img src={user?.avatar??""} alt="" />
                    </div>
                    <h3 className='title'>{user?.userName??""}</h3>
                </div>
                <div className='mymusic__navbar'>
                    <div className='mymusic__navbar-menu'>
                        <div >
                            <li  className={selectCategory=='all'?'active':''}
                                 onClick={()=>setSelectCategory('all')} 
                            >T???NG QUAN</li>
                        </div>
                        <div >
                            <li className={selectCategory=='songs'?'active':''}
                                onClick={()=>setSelectCategory('songs')}
                             >B??I H??T</li>
                        </div>
                        <div >
                            <li className={selectCategory=='playlists'?'active':''}
                                onClick={()=>setSelectCategory('playlists')}
                            >PLAYLIST</li>
                        </div>
                        <div >
                            <li className={selectCategory=='artists'?'active':''}
                                onClick={()=>setSelectCategory('artists')}
                            >NGH??? S??</li>
                        </div>
                        <div >
                            <li className={selectCategory=='musicvideos'?'active':''}
                                onClick={()=>setSelectCategory('musicvideos')}
                            >MV</li>
                        </div>
                    </div>
                </div>
            </div>  

            {
              handelRendelCategory(selectCategory)
            }
            {/* BOX HI???N TH??? TR???NG R???NG  */}
        </div>
    );
}

export default MyMusic;
