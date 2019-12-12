import React, { FC } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'

import ProblemType from './ProblemType'
import OptionB from './OptionB'

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

const OptionWrap = styled.div`
    padding-left: 40px;
`

const JudgeProblem: FC = () => {
    return useObserver(() => {
        return (
            <ProblemType>
                <Package>
                    <ProblemText>选项</ProblemText>
                    <OptionWrap>
                        <OptionB />
                    </OptionWrap>
                </Package>
            </ProblemType>
        )
    })
}

export default JudgeProblem
