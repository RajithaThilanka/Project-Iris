import React from 'react'

import Bar from '../../components/Appbar/MainAppbar'
import Buttonbar from '../../components/Profile/NavButtons/NavButtons'
import Content from '../../components/Profile/Content/ProfileContent'
import {Stack } from '@mui/material'
import ProfilHeader from '../../components/Profile/Header/ProfileHeader'
import './profilestyle.css'


function UserProfile() {


    return (
        <div className="profilePage">
            
           <Stack direction='column'>
                <Bar />
                <ProfilHeader />
                <Buttonbar />
                <Content />
            </Stack> 
        </div>
    )
}

export default UserProfile
