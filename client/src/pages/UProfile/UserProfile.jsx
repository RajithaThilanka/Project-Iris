import React from 'react'

import Bar from '../../components/Appbar/MainAppbar'
import Buttonbar from '../../components/Profile/NavButtons/NavButtons'
import Content from '../../components/Profile/Content/ProfileContent'
import {Stack, Typography, Grid } from '@mui/material'
import ProfilHeader from '../../components/Profile/Header/ProfileHeader'
import './profilestyle.css'
import ContentTab from './ContentTab'


function UserProfile() {
  return (
    <div className="profilePage">
          <Grid container container direction="row" justifyContent="center" alignItems="left" spacing={2}>
              <Grid item xs={12}>
              <ProfilHeader />
              </Grid>
              <Grid item xs={12}>
              <ContentTab />
              </Grid>

          </Grid>
    </div>
  )
}

export default UserProfile
