import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'

import Editor from '../EditorX'
import ProblemType from './ProblemType'

const ItemCommon = styled.span`
    height: 1;
    box-sizing: border-box;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

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
    border-radius: 4px;
`

const ItemName = styled(ItemCommon)`
    text-align: center;
    font-size: 16px;
`

const AnswerRichText = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
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
        studentAnswer?: any
        fraction?: number
        type: number
        loreList: ILoreList[]
        importanceTagList: ILoreList[]
        solution: any
        showEditPick?: { status: number; text: string }
    }
    onClickSelect?(data: any): void
}

const ShortAnswerProblem: FC<Iprops> = props => {
    return (
        <ProblemType
            data={props.data}
            onClickSelect={props.onClickSelect}
            answerPackage={
                <AnswerWrap>
                    <AnswerItem>
                        <ItemName>答案</ItemName>
                        <AnswerRichText>
                            <Editor value={Value.fromJSON(props.data.answer)} readonly />
                        </AnswerRichText>
                    </AnswerItem>
                </AnswerWrap>
            }
        ></ProblemType>
    )
}

export default ShortAnswerProblem
