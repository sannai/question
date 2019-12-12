import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'

import ProblemType from './ProblemType'
import Option from './Option'

const AnswerItem = styled.div`
    flex: 1;
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    font-size: 14px;
`
const AnswerWrap = styled.div`
    display: flex;
    margin-top: 20px;
    padding: 20px;
    border: 1px solid rgba(42, 71, 139, 0.2);
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
`

const ItemName = styled(ItemCommon)`
    font-size: 16px;
    justify-content: right;
`

const OptionWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`

interface ILoreList {
    id: number
    name: string
}
interface IProps {
    data: {
        index?: number | 0
        id?: number | 0
        topic: any
        answer: any
        fraction?: number
        type: number
        loreList: ILoreList[]
        importanceTagList: ILoreList[]
        solution: any
        showEditPick?: { status: number; text: string }
    }
    onClickSelect?(data: any): void
}

const FillingProblem: FC<IProps> = props => {
    return (
        <ProblemType
            data={props.data}
            onClickSelect={props.onClickSelect}
            answerPackage={
                <AnswerWrap>
                    <AnswerItem>
                        <ItemName>答案</ItemName>
                        <OptionWrap>
                            {props.data.answer.map((v: { value: Value }, i: number) => (
                                <Option key={i} data={{ index: i + 1, value: v.value }}></Option>
                            ))}
                        </OptionWrap>
                    </AnswerItem>
                </AnswerWrap>
            }
        ></ProblemType>
    )
}

export default FillingProblem
