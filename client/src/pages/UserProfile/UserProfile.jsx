import React from 'react'

import Bar from '../../components/Appbar/MainAppbar'
import ProfHeader from '../../components/Profile/Header/ProfileHeader'
import Buttonbar from '../../components/Profile/NavButtons/NavButtons'
import Content from '../../components/Profile/Content/ProfileContent'
import { Grid } from '@mui/material'
import ProfilHeader from '../../components/Profile/Header/ProfileHeader'

function UserProfile() {
    return (
        <div>
            <Bar />
            <ProfilHeader />
            <Buttonbar />
            <Content />
        </div>
    )
}

export default UserProfile
