import React, { useRef, FC } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'

const ConfirmWrap = styled.div`
    width: 120px;
    height: 30px;
    background-color: #fff;
    position: absolute;
    z-index: 10;
    /* bottom: -50px; */
    left: -44px;
    display: flex;
    padding: 8px 3px;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    cursor: initial;
`
const Button = styled.span`
    height: 16px;
    line-height: 16px;
    padding: 6px 12px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    color: #979797;
    border-radius: 4px;
    border: 1px solid #979797;
    cursor: pointer;
    &:hover {
        border-color: #979796;
        color: #979786;
    }
`
const RedButton = styled(Button)`
    border-color: #fee25a;
    color: #fee25a;
    &:hover {
        background-color: #fee25a;
        color: #fff;
        border-color: #fee25a;
    }
`

interface IConfirmProps {
    close(): void
    confirm(): void
}

const Popconfirm: FC<IConfirmProps> = props => {
    const ref = useRef(null)
    useOnClickOutside(ref, props.close)

    return (
        <ConfirmWrap ref={ref}>
            <RedButton onClick={() => props.confirm()} title='提交'>
                提交
            </RedButton>
            <Button onClick={() => props.close()} title='取消'>
                取消
            </Button>
        </ConfirmWrap>
    )
}

export default Popconfirm
