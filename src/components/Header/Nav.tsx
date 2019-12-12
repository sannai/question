import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'

const Container = styled.div`
    height: 100%;
    display: flex;
`
const Line = styled.span<{ isActive: boolean }>`
    height: 8px;
    width: 40px;
    border-radius: 8px;
    position: absolute;
    bottom: 6px;
    transition: background-color 0.1s linear;
    background-color: ${props => (props.isActive ? '#00a6f3' : '#fff')};
`
const Text = styled.div<{ isActive: boolean }>`
    font-size: 22px;
    font-family: PingFangSC, sans-serif;
    font-weight: 400;
    transition: color 0.1s linear;
    color: ${props => (props.isActive ? '#00a6f3' : '#3a4760')};
`
const Item = styled(Link)`
    height: 80px;
    cursor: pointer;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Nav: FC = () => {
    const [current, setCurrent] = useState(1)

    const checkActive = (text: string, index: number) => {
        let pathname = window.location.pathname.split('/')
        if (text === pathname[1]) {
            setCurrent(index)
        }
        return {}
    }

    return (
        <Container>
            <Item to='/' getProps={() => checkActive('', 1)}>
                <Text isActive={current === 1}>草稿箱</Text>
                <Line isActive={current === 1} />
            </Item>
            <Item to='review-in' getProps={() => checkActive('review-in', 2)}>
                <Text isActive={current === 2}>审核中</Text>
                <Line isActive={current === 2} />
            </Item>
            <Item to='review-fail' getProps={() => checkActive('review-fail', 3)}>
                <Text isActive={current === 3}>审核未通过</Text>
                <Line isActive={current === 3} />
            </Item>
            <Item to='review-by' getProps={() => checkActive('review-by', 4)}>
                <Text isActive={current === 4}>审核通过</Text>
                <Line isActive={current === 4} />
            </Item>
            <Item to='add-question' getProps={() => checkActive('add-question', 5)}>
                <Text isActive={current === 5}>添加题目</Text>
                <Line isActive={current === 5} />
            </Item>
        </Container>
    )
}

export default Nav
