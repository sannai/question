import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'

import ProblemType from './ProblemType'
import Option from './Option'

const OptionWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`
const ItemCommon = styled.div`
    height: 1;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(7, 41, 121, 1);
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    border-right: 1px solid #f5f5f5;
`

const AnswerItem = styled.div`
    flex: 1;
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(42, 71, 139, 0.2);
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
`
const AnswerWrap = styled.div`
    display: flex;
    margin-top: 20px;
`

const ItemName = styled(ItemCommon)`
    text-align: center;
    font-size: 16px;
`

const AnswerRichText = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
    margin: 0 10px;
`

interface ILoreList {
    id: number
    name: string
}
interface Iprops {
    data: {
        index?: number | 0
        id?: number | 0
        topic: any
        answer: any
        fraction?: number
        option?: any
        type: number
        loreList: ILoreList[]
        importanceTagList: ILoreList[]
        solution: any
        showEditPick?: { status: number; text: string }
    }
    onClickSelect?(data: any): void
}

const myMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

const ChoiceProblem: FC<Iprops> = props => {
    return (
        <ProblemType
            data={props.data}
            onClickSelect={props.onClickSelect}
            optionPackage={
                <OptionWrap>
                    {props.data.option.map((v: { value: Value }, i: number) => (
                        <Option key={i} data={{ index: myMap[i], value: v.value }}></Option>
                    ))}
                </OptionWrap>
            }
            answerPackage={
                <AnswerWrap>
                    <AnswerItem>
                        <ItemName>答案</ItemName>
                        <AnswerRichText>{props.data.answer}</AnswerRichText>
                    </AnswerItem>
                </AnswerWrap>
            }
        ></ProblemType>
    )
}

export default ChoiceProblem
