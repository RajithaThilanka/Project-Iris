import React from 'react'
import Bar from '../../../components/Appbar/MainAppbar';
import ProfilHeader from '../../../components/Profile/Header/ProfileHeader';
import Buttonbar from '../../../components/Profile/NavButtons/NavButtons';
import ProSettings from '../../../components/Profile/ProfileSettings/ProfileSettings'
import { Grid,Stack } from '@mui/material'

export default function ProfileSettings() {
    return (
        <div>
            <Stack direction='column'>
                <Bar />
                <ProfilHeader />
                <Buttonbar />
                <ProSettings />
                
            </Stack> 
            
        </div>
    )
} 
