import React from 'react'

import Bar from '../../components/Appbar/MainAppbar'
import ProfHeader from '../../components/Profile/Header/ProfileHeader'
import Buttonbar from '../../components/Profile/NavButtons/NavButtons'
import Content from '../../components/Profile/Content/ProfileContent'
import { Grid } from '@mui/material'
import ProfilHeader from '../../components/Profile/Header/ProfileHeader'
import './profilestyle.css'

function UserProfile() {
    return (
        <div className="profilePage">
            <Bar />
            <ProfilHeader />
            <Buttonbar />
            <Content />
        </div>
    )
}

export default UserProfile
