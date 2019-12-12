import React, { FC, useState, ReactChild } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa'

import Editor from '../EditorX'
import HeaderType from './HeaderType'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`
const Package = styled.div`
    padding: 20px;
    border: 1px solid rgba(42, 71, 139, 0.2);
    border-radius: 4px;
`

const TopicWrap = styled.div`
    display: flex;
`
const TagWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    opacity: 0.8178;
    margin: 14px 10px 14px 0;
`
const Index = styled.div`
    color: #072979;
    font-size: 20px;
`
const Fraction = styled.div`
    border-top: 1px solid #e2eef4;
    font-size: 12px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const Topic = styled.div`
    display: flex;
    align-items: center;
    margin: 14px 0;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`

const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const Expand = styled.div`
    margin-top: 20px;
    text-align: center;
    svg {
        cursor: pointer;
        color: #444;
        font-size: 18px;
    }
`

const AngleDouble = styled.span`
    :hover svg {
        color: #3a93df;
    }
`

const SolutionWrap = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-top: 20px;
`
const Analysis = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 20px;
`
const AuditFailMark = styled.div`
    display: flex;
    align-items: center;
    min-height: 36px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    padding: 0 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(58, 72, 96, 1);
    ::before {
        content: '';
        display: inline-block;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: rgba(237, 73, 126, 1);
        margin-right: 6px;
    }
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
        auditFailMark?: string
        fraction?: number
        option?: any
        type: number
        loreList: ILoreList[]
        importanceTagList: ILoreList[]
        solution: any
        showEditPick?: { status: number; text: string }
    }
    optionPackage?: ReactChild
    answerPackage: ReactChild
    onClickSelect?(data: any): void
}

const ProblemType: FC<Iprops> = props => {
    const [currentExpand, setCurrentExpand] = useState(0)
    const [expandArr] = useState([
        {
            name: '展开',
            icon: <FaAngleDoubleDown />,
        },
        {
            name: '收起',
            icon: <FaAngleDoubleUp />,
        },
    ])

    //展开/收起
    const handleClickExpand = () => {
        if (currentExpand === 0) {
            setCurrentExpand(1)
        } else {
            setCurrentExpand(0)
        }
    }

    //选择
    const haneleClickSelect = () => {
        if (props.onClickSelect) {
            props.onClickSelect(props.data)
        }
    }

    return (
        <Container>
            {props.data.auditFailMark && <AuditFailMark>{props.data.auditFailMark}</AuditFailMark>}

            <Package>
                <HeaderType
                    data={{
                        id: props.data.id,
                        type: props.data.type,
                        loreList: props.data.loreList,
                        importanceTagList: props.data.importanceTagList,
                        showEditPick: props.data.showEditPick,
                    }}
                    onClickSelect={haneleClickSelect}
                />
                <TopicWrap>
                    {(props.data.fraction || props.data.fraction === 0) && (
                        <TagWrap>
                            <Index>{props.data.index! + 1}</Index>
                            <Fraction>{props.data.fraction}</Fraction>
                        </TagWrap>
                    )}
                    <Topic>
                        <Editor value={Value.fromJSON(props.data.topic)} readonly />
                    </Topic>
                </TopicWrap>
                {props.optionPackage}
            </Package>
            {currentExpand === 1 ? (
                <>
                    {props.answerPackage}
                    <SolutionWrap>
                        <Analysis>解析</Analysis>
                        <RichTextWrap>
                            <Editor value={Value.fromJSON(props.data.solution)} readonly />
                        </RichTextWrap>
                    </SolutionWrap>
                </>
            ) : null}
            <Expand onClick={handleClickExpand}>
                <AngleDouble title={expandArr[currentExpand].name + '答案&解析'}>
                    {expandArr[currentExpand].icon}
                </AngleDouble>
            </Expand>
        </Container>
    )
}

export default ProblemType
