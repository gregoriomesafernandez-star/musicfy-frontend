import { Routes } from '@angular/router';
import { UserEdit } from './components/user-edit/user-edit';
import { ArtistList } from './components/artist-list/artist-list';
import { ArtistCreate } from './components/artist-create/artist-create';
import { Home } from './components/home/home';
import { ArtistEdit } from './components/artist-edit/artist-edit';
import { ArtistDetail } from './components/artist-detail/artist-detail';
import { AlbumCreate } from './components/album-create/album-create';
import { AlbumEdit } from './components/album-edit/album-edit';
import { AlbumDetail } from './components/album-detail/album-detail';
import { SongList } from './components/song-list/song-list';
import { SongCreate } from './components/song-create/song-create';
import { SongEdit } from './components/song-edit/song-edit';
import { AlbumList } from './components/album-list/album-list';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: Home
    },
    {
        path: 'user-edit',
        component: UserEdit
    },
    {
        path: 'artist/create',
        component: ArtistCreate
    },
    {
        path: 'artists/:page',
        component: ArtistList
    },
    {
        path: 'artist/edit/:id',
        component: ArtistEdit
    },
    {
        path: 'artist/detail/:id',
        component: ArtistDetail
    },
    {
        path: 'album/list',
        component: AlbumList
    },
    {
        path: 'album/create/:artistId',
        component: AlbumCreate
    },
    {
        path: 'album/edit/:id',
        component: AlbumEdit
    },
    {
        path: 'album/detail/:id',
        component: AlbumDetail
    },
    {
        path: 'song/list',
        component: SongList
    },
    {
        path: 'song/create/:albumId',
        component: SongCreate
    },
    {
        path: 'song/edit/:id',
        component: SongEdit
    }
];
