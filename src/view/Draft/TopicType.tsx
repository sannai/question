import React, { FC } from 'react'
import styled from '@emotion/styled'

interface IOptions {
    color: string
    bColor: string
    cursor: string
    Hcolor: string
    HbColor: string
}
const Li = styled.li`
    width: 60px;
    height: 100%;
    margin-right: 20px;
`
const Span = styled.span<{ setStyle: IOptions }>`
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    background-color: ${props => props.setStyle.bColor};
    color: ${props => props.setStyle.color};
    box-shadow: 0px 1px 4px 0px rgba(78, 117, 200, 0.15);
    border-radius: 4px;
    cursor: ${props => props.setStyle.cursor};
    :hover {
        background-color: ${props => props.setStyle.HbColor};
        color: ${props => props.setStyle.Hcolor};
    }
`
interface ITopicTypeArr {
    id: number
    name: string
}
interface ITopicTypeArr1 {
    id: number
    name: string
    type: number
}
interface Iprops {
    data: {
        type: number
        typeArr: ITopicTypeArr[]
        currentType: number
        disabled: boolean
    }
    onClickType(data: ITopicTypeArr1): void
}
const TopicType: FC<Iprops> = props => {
    const setColor = (status: number) => {
        let data = {
            color: '#329EF5',
            bColor: '#fff',
            cursor: 'pointer',
            Hcolor: '#fff',
            HbColor: '#329EF5',
        }
        if (props.data.disabled) {
            data.bColor = '#f5f5f5'
            data.color = 'rgba(0,0,0,0.25)'
            data.cursor = 'not-allowed'
            data.Hcolor = '#f5f5f5'
            data.HbColor = 'rgba(0,0,0,0.25)'
        }
        if (props.data.currentType === status) {
            data.bColor = '#329EF5'
            data.color = '#fff'
            data.Hcolor = '#fff'
            data.HbColor = '#329EF5'
        }

        return data
    }
    const handleClickType = (data: ITopicTypeArr) => {
        if (props.data.disabled) {
            return
        }
        props.onClickType({ ...data, type: props.data.type })
    }
    return (
        <>
            {props.data.typeArr.map(item => (
                <Li key={item.id}>
                    <Span onClick={() => handleClickType(item)} setStyle={setColor(item.id)}>
                        {item.name.slice(0, 2)}
                    </Span>
                </Li>
            ))}
        </>
    )
}

export default TopicType
