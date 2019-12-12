import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../store'
import Editor from '../../components/EditorX'
import OptionC from './OptionC'

const Package = styled.div`
    background-color: #fff;
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-top: 20px;
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
const OptionWrap = styled.div`
    min-height: 60px;
    padding-left: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    font-size: 16px;
    font-family: PingFangSC-Regular, sans-serif;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`
const SolutionWrap = styled.div`
    min-height: 60px;
    padding-left: 20px;
    font-size: 14px;
    font-family: PingFangSC, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const Nodata = styled.div`
    height: 60px;
    line-height: 60px;
    color: #ccc;
    font-size: 14px;
    cursor: not-allowed;
`

interface IAnswer {
    id: number
    value: Value
}

const FillingProblem: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)

    //题干/插入空位
    const handleChangeTopic = (value: Value) => {
        exerciseStore.problemData.topic = value
        let data: any = {
            value: value.toJS().document,
        }
        let answer: any = []

        let newData = data.value.nodes.map((item: any) => {
            return item.nodes.filter((t: any) => t.type === 'space').length
        })
        if (newData) {
            let total = newData.reduce((total: number, num: number) => {
                return total + num
            })

            for (let i = 0; i < total; i++) {
                if (i < exerciseStore.problemData.answer.length) {
                    answer[i] = {
                        id: i + 1,
                        value: exerciseStore.problemData.answer[i].value,
                    }
                } else {
                    answer[i] = {
                        id: i + 1,
                        value: Value.fromJSON({
                            document: {
                                nodes: [
                                    {
                                        object: 'block',
                                        type: 'paragraph',
                                        nodes: [
                                            {
                                                object: 'text',
                                                text: '',
                                            },
                                        ],
                                    },
                                ],
                            },
                        }),
                    }
                }
            }
            exerciseStore.problemData.answer = answer
        }
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
                        <Editor
                            value={Value.fromJSON(exerciseStore.problemData.topic)}
                            onChange={handleChangeTopic}
                            showVacancy={true}
                        />
                    </TopicWrap>
                </Package>
                <Package>
                    <ProblemText>答案</ProblemText>
                    <OptionWrap>
                        {exerciseStore.problemData.answer.length > 0 ? (
                            exerciseStore.problemData.answer.map((item: IAnswer, index: number) => (
                                <OptionC key={item.id} data={{ value: Value.fromJSON(item.value), index }} />
                            ))
                        ) : (
                            <Nodata>先插入填空</Nodata>
                        )}
                    </OptionWrap>
                </Package>
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
