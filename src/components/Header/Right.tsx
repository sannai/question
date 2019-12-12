import React, { useState, useRef, FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { FaUserTie } from 'react-icons/fa'

import Menu from './Menu'

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    padding-right: 20px;
`

const Avatar = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 50%;
    color: #777;
    font-size: 20px;
`

const Right: FC = () => {
    const [isInfoMenu, setIsInfoMenu] = useState(false)
    const handleClickInfoMenu = () => {
        setIsInfoMenu(!isInfoMenu)
    }
    const handleCloseMenu = () => {
        setIsInfoMenu(false)
    }
    const tagRef = useRef(null)
    return useObserver(() => (
        <Container>
            <Avatar onMouseDown={handleClickInfoMenu} ref={tagRef}>
                <FaUserTie />
            </Avatar>
            {isInfoMenu && <Menu close={handleCloseMenu} />}
        </Container>
    ))
}

export default Right
