import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { includes } from 'ramda'
import { FaPlus } from 'react-icons/fa'

import { IStore } from '../../store'
import Button from '../../components/Button'
import PointSelector from '../../components/PointSelector'
import Label from './Label'

const ButtonWrap = styled.div`
    display: flex;
    margin-right: 8px;
    margin-bottom: 6px;

    svg {
        font-size: 14px;
    }
`
const Span = styled.span`
    margin-left: 8px;
`

const SubjectWrap = styled.div`
    position: relative;
    margin-left: 10px;
`

const LabelSpan = styled.span<{ setType: boolean }>`
    width: 50px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    padding: 6px 12px;
    margin-left: 5px;
    margin-right: 5px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #979797;
    color: ${props => (props.setType ? '#fff' : '#979797')};
    background-color: ${props => (props.setType ? '#979797' : '#fff')};
    cursor: pointer;
    &:hover {
        background-color: #979796;
        border-color: #979796;
        color: #fff;
    }
`

interface IPoint {
    id: number
    name: string
}

const PlusKnowledge: FC = () => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [isShowKnowledge, setIsShowKnowledge] = useState(false)
    const [isShowLabel, setIsShowLabel] = useState(false)
    const [labelArr] = useState([
        { id: 1, name: '高考真题' },
        { id: 2, name: '联考模拟' },
        { id: 3, name: '奥赛' },
        { id: 4, name: '名校' },
    ])

    //打开弹窗
    const handleClickKnowledge = (type: number) => {
        if (type === 1) {
            setIsShowKnowledge(true)
        } else if (type === 2) {
            setIsShowLabel(true)
        }
    }

    //关闭弹窗
    const handleClickClose = () => {
        setIsShowKnowledge(false)
    }

    const handleSelectPoint = (point: IPoint) => {
        exerciseStore.selectPoint(point)
    }

    //关闭标签
    const handleClickCloseLabel = () => {
        setIsShowLabel(false)
    }

    //标签
    const handleClickPushLabel = (data: { id: number; name: string }) => {
        if (includes(data, exerciseStore.problemData.importanceTagList)) {
            exerciseStore.problemData.importanceTagList = exerciseStore.problemData.importanceTagList.filter(
                item => item.id !== data.id
            )
        } else {
            exerciseStore.problemData.importanceTagList = [...exerciseStore.problemData.importanceTagList, data]
        }
    }

    const optionButton = {
        height: '36px',
        bgColor: 'rgba(50,158,245,1)',
        shadow: '0px 2px 4px 0px rgba(50,158,245,0.54)',
    }

    const optionButton1 = {
        height: '36px',
        bgColor: '#ED497E',
        HbgColor: '#e75f8b',
        shadow: '0px 2px 4px 0px rgba(237,73,126,0.57)',
    }

    return useObserver(() => {
        return (
            <ButtonWrap>
                <Button options={optionButton} onClick={() => handleClickKnowledge(1)}>
                    <FaPlus />
                    <Span>添加知识点</Span>
                </Button>
                <SubjectWrap>
                    <Button options={optionButton1} onClick={() => handleClickKnowledge(2)}>
                        <FaPlus />
                        <Span>添加标签</Span>
                    </Button>
                    {isShowLabel && (
                        <Label close={handleClickCloseLabel}>
                            {labelArr.map(item => (
                                <LabelSpan
                                    key={item.id}
                                    setType={includes(item, exerciseStore.problemData.importanceTagList)}
                                    onClick={() => handleClickPushLabel(item)}
                                >
                                    {item.name}
                                </LabelSpan>
                            ))}
                        </Label>
                    )}
                </SubjectWrap>

                {isShowKnowledge && (
                    <PointSelector
                        selectedPoints={exerciseStore.selectedPoints}
                        onClose={handleClickClose}
                        selectPoint={handleSelectPoint}
                        selectedPointsId={exerciseStore.selectedPointsId}
                    />
                )}
            </ButtonWrap>
        )
    })
}
export default PlusKnowledge
