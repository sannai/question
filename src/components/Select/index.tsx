import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { FaChevronDown } from 'react-icons/fa'

import Option from './Option'

const Container = styled.div`
    position: relative;
    width: 100%;
    margin: 0 8px 10px 0;
`

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 40px;
    cursor: pointer;
`

const Input = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    color: #606266;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
`
const FontWrap = styled.div<{ isRotate: boolean }>`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    svg {
        color: #c0c4cc;
        font-size: 14px;
        transition: transform 0.3s;
        transform: ${props => (props.isRotate ? 'rotate(0deg)' : 'rotate(180deg)')};
    }
`
interface IData {
    id: number
    name: string
}
interface IConfirmProps {
    data: IData[]
    value: string
    placeholder?: string
    onChange(data: IData): void
}

const Select: FC<IConfirmProps> = props => {
    const [isClickSelect, setIsClickSelect] = useState(false)

    const handleClick = () => {
        setIsClickSelect(!isClickSelect)
    }

    const handleClickSelect = (data: IData) => {
        props.onChange(data)
        setIsClickSelect(!isClickSelect)
    }
    return (
        <Container>
            <Wrap onMouseDown={handleClick}>
                <Input>{props.value ? props.value : props.placeholder || '请选择'}</Input>
                <FontWrap isRotate={isClickSelect}>
                    <FaChevronDown></FaChevronDown>
                </FontWrap>
            </Wrap>
            {isClickSelect && (
                <Option
                    value={props.value}
                    data={props.data}
                    onChange={handleClickSelect}
                    onClick={handleClick}
                ></Option>
            )}
        </Container>
    )
}

export default Select
