// @ts-nocheck

import React, { FC } from 'react'
import { Router } from '@reach/router'
import styled from '@emotion/styled'

import MainRouter from './MainRouter'
import AddQuestion from '../view/AddQuestion'

const MyRouter = styled(Router)`
    width: 100%;
    height: 100%;
`

const App: FC = () => {
    return (
        <MyRouter>
            <MainRouter path='/*' />
            <AddQuestion path='add-question'></AddQuestion>
            <AddQuestion path='question/:id'></AddQuestion>
        </MyRouter>
    )
}

export default App
