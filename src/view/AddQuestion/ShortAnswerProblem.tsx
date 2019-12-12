import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../store'
import ProblemType from './ProblemType'
import Editor from '../../components/EditorX'
import OptionD from './OptionD'

const Package = styled.div`
    background-color: #fff;
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-bottom: 20px;
`
const ProblemText = styled.div`
    box-sizing: border-box;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid #c4def5;
    padding-left: 10px;
    font-size: 16px;
    font-family: PingFangSC, sans-serif;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
`

const OptionWrap = styled.div`
    display: flex;
    align-items: center;
    min-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const AnswerWrap = styled.div`
    min-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const ShortAnswerProblem: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    //答案
    const handleChangeAnswer = (value: Value) => {
        exerciseStore.problemData.answer = value
    }

    return useObserver(() => {
        return (
            <ProblemType>
                <Package>
                    <ProblemText>数量</ProblemText>
                    <OptionWrap>
                        <OptionD />
                    </OptionWrap>
                </Package>
                <Package>
                    <ProblemText>答案</ProblemText>
                    <AnswerWrap>
                        <Editor
                            value={Value.fromJSON(exerciseStore.problemData.answer)}
                            onChange={handleChangeAnswer}
                        />
                    </AnswerWrap>
                </Package>
            </ProblemType>
        )
    })
}

export default ShortAnswerProblem
