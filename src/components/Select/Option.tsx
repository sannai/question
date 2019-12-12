import React, { useRef, FC } from 'react'
import styled from '@emotion/styled'
import useOnClickOutside from 'use-onclickoutside'

const ConfirmWrap = styled.ul`
    width: 100%;
    color: rgba(0, 0, 0, 0.65);
    font-variant: tabular-nums;
    list-style: none;
    font-feature-settings: 'tnum';
    position: absolute;
    top: 42px;
    z-index: 1050;
    box-sizing: border-box;
    font-size: 14px;
    font-variant: initial;
    background-color: #fff;
    border-radius: 4px;
    outline: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    li:first-of-type {
        border-radius: 4px 4px 0 0;
    }
    li:last-of-type {
        border-radius: 0 0 4px 4px;
    }
`
const Li = styled.li<{ setStyle: boolean }>`
    padding: 5px 12px;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    white-space: nowrap;
    cursor: pointer;
    transition: background 0.3s ease;
    background-color: ${props => (props.setStyle ? 'rgba(230, 247, 255, 1)' : '#fff')};
    font-weight: ${props => (props.setStyle ? '600' : '400')};
    :hover {
        background-color: rgba(230, 247, 255, 1);
    }
`
const Name = styled.span``

interface IConfirmProps {
    value: string
    data: { id: number; name: string }[]
    onChange(data: { id: number; name: string }): void
    onClick(): void
}

const Option: FC<IConfirmProps> = props => {
    const ref = useRef(null)
    useOnClickOutside(ref, props.onClick)

    return (
        <ConfirmWrap ref={ref}>
            {props.data.map(item => (
                <Li key={item.id} onClick={() => props.onChange(item)} setStyle={props.value === item.name}>
                    <Name>{item.name}</Name>
                </Li>
            ))}
        </ConfirmWrap>
    )
}

export default Option
