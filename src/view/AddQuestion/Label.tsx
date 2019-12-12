import React, { useRef, FC } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'

const ConfirmWrap = styled.div`
    display: flex;
    height: 30px;
    background-color: #fff;
    position: absolute;
    left: -44px;
    z-index: 10;
    padding: 8px 3px;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    cursor: initial;
`

interface IConfirmProps {
    close(): void
}

const Label: FC<IConfirmProps> = props => {
    const ref = useRef(null)
    useOnClickOutside(ref, props.close)

    return <ConfirmWrap ref={ref}>{props.children}</ConfirmWrap>
}

export default Label
