import React, { FC, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { Router, RouteComponentProps } from '@reach/router'

import { IStore } from '../store'

import Header from '../components/Header'
import Draft from '../view/Draft'
import ReviewBy from '../view/ReviewBy'
import ReviewFail from '../view/ReviewFail'
import ReviewIn from '../view/ReviewIn'
import AddQuestion from '../view/AddQuestion'

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 80px;
    background-color: #fff;
    position: relative;
`
const Content = styled(Router)`
    width: 100%;
    height: 100%;
`

const MainRouter: FC<RouteComponentProps> = () => {
    const { userStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        userStore.getUserInfo()
    })
    return (
        <Container>
            <Header />
            <Content>
                <Draft path='/'></Draft>
                <ReviewBy path='/review-by'></ReviewBy>
                <ReviewFail path='/review-fail'></ReviewFail>
                <ReviewIn path='/review-in'></ReviewIn>
                <AddQuestion path='/add-question'></AddQuestion>
            </Content>
        </Container>
    )
}

export default MainRouter
