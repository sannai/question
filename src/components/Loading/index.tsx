import React, { FC } from 'react'
import styled from '@emotion/styled'
import { FaSpinner } from 'react-icons/fa'
import { keyframes } from '@emotion/core'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: #999;
    flex-direction: column;
`
const Text = styled.div`
    font-size: 14px;
    margin-top: 30px;
    color: #00a6f3;
`
const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(359deg);
    }
`

const Spinner = styled.div`
    height: 40px;
    width: 40px;
    animation: ${spin} 2s infinite linear;
    font-size: 40px;
    color: #00a6f3;
`

const Loading: FC = () => {
    return (
        <Container>
            <Spinner>
                <FaSpinner></FaSpinner>
            </Spinner>
            <Text>loading ...</Text>
        </Container>
    )
}

export default Loading
