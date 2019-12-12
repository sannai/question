import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'
import ProblemType from './ProblemType'
import OptionA from './OptionA'
import OptionListA from './OptionListA'

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
    padding-left: 40px;
`

const ChoiceProblem: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    return useObserver(() => {
        return (
            <ProblemType>
                <Package>
                    <ProblemText>选项</ProblemText>
                    <OptionWrap>
                        <OptionA />
                    </OptionWrap>
                </Package>
                {exerciseStore.problemData.option.map((item: any, index: number) => (
                    <Package key={index}>
                        <ProblemText>{answerOption[index]}</ProblemText>
                        <OptionListA key={index + 'a'} data={{ value: item.value, index }} />
                    </Package>
                ))}
            </ProblemType>
        )
    })
}

export default ChoiceProblem
