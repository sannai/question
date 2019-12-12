//网络题库
import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../store'
import QuestionType from '../../components/QuestionType'
import Paging from '../../components/Paging'

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 80px);
    overflow-y: auto;
    padding: 0 20px;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Container = styled.ul`
    width: 100%;
`
const Li = styled.li`
    box-sizing: border-box;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 1);
    margin-top: 20px;
    padding: 20px;
`
const PagingWrap = styled.div`
    margin-bottom: 20px;
`
interface IProps {
    showEditPick?: { status: number; text: string }
    status: number
}
interface ILoreList {
    id: number
    name: string
}
interface IProblemList {
    index: number
    id?: number | 0
    topic: string | Value
    answer: any
    fraction?: number
    option?: any
    type: number
    loreList: ILoreList[]
    importanceTagList: ILoreList[]
    solution: any
    showEditPick?: { status: number; text: string }
}

const Section: FC<IProps> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    //分页
    const handleChangePaging = (value: number) => {
        let data = {
            page: value,
            limit: 10,
            status: props.status,
        }
        exerciseStore.problemListPage.page = value
        exerciseStore.getProblemList(data)
    }

    //处理数据
    const problemList = (data: IProblemList) => {
        let type1 = [4, 5]
        if (typeof data.topic === 'string') {
            data.topic = JSON.parse(data.topic)
        }
        if (typeof data.solution === 'string') {
            data.solution = JSON.parse(data.solution)
        }
        if (data.type === 1) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
            data.option.map((item: any, index: number) => {
                item.statu = false
                if (data.answer === answerOption[index]) {
                    item.statu = true
                }
                return item
            })
        } else if (data.type === 2) {
            if (typeof data.option === 'string') {
                data.option = JSON.parse(data.option)
            }
            let answer = data.answer.split(',')
            data.option.map((item: any, index: number) => {
                item.statu = false
                answer.map((t: string) => {
                    if (answerOption[index] === t) {
                        item.statu = true
                    }
                    return t
                })
                return item
            })
        } else if (type1.includes(data.type) && typeof data.answer === 'string') {
            data.answer = JSON.parse(data.answer)
        }

        return data
    }

    return useObserver(() => {
        return (
            <ScrollbarWrap>
                <Container>
                    {exerciseStore.problemList.map((item, index) => (
                        <Li key={item.id}>
                            <QuestionType
                                data={problemList({ ...item, index, showEditPick: props.showEditPick })}
                            ></QuestionType>
                        </Li>
                    ))}
                </Container>
                {exerciseStore.problemListPage.total > 10 && (
                    <PagingWrap>
                        <Paging
                            onChange={handleChangePaging}
                            current={exerciseStore.problemListPage.page}
                            total={Math.ceil(exerciseStore.problemListPage.total / exerciseStore.problemListPage.limit)}
                        ></Paging>
                    </PagingWrap>
                )}
            </ScrollbarWrap>
        )
    })
}

export default Section
