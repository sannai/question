import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../store'
import Editor from '../../components/EditorX'

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

const TopicWrap = styled.div`
    min-height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    padding-left: 22px;
    flex-grow: 1;
`

const SolutionWrap = styled.div`
    min-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const FillingProblem: FC = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    //题干
    const handleChangeTopic = (value: Value) => {
        exerciseStore.problemData.topic = value
    }

    //解析
    const handleChangeSolution = (value: Value) => {
        exerciseStore.problemData.solution = value
    }

    return useObserver(() => {
        return (
            <>
                <Package>
                    <ProblemText>题目</ProblemText>
                    <TopicWrap>
                        <Editor value={Value.fromJSON(exerciseStore.problemData.topic)} onChange={handleChangeTopic} />
                    </TopicWrap>
                </Package>
                {props.children}
                <Package>
                    <ProblemText>解析</ProblemText>
                    <SolutionWrap>
                        <Editor
                            value={Value.fromJSON(exerciseStore.problemData.solution)}
                            onChange={handleChangeSolution}
                        />
                    </SolutionWrap>
                </Package>
            </>
        )
    })
}

export default FillingProblem
