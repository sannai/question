import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { FiEdit } from 'react-icons/fi'

import { IStore } from '../../store'
import Knowledge from '../Knowledge'
import Button from '../Button'
import Popconfirm from '../Popconfirm'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const KnowledgeWrap = styled.div`
    display: flex;
    align-items: center;
`
const TypeNumber = styled.span`
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Light, PingFang SC, sans-serif;
    font-weight: 300;
    color: rgba(237, 73, 126, 1);
    height: 36px;
    line-height: 34px;
    background-color: rgba(255, 246, 244, 1);
    border-radius: 4px;
    border: 1px solid rgba(237, 73, 126, 1);
    padding: 0 10px;
    margin-right: 30px;
    margin-bottom: 6px;
`
const ButtonWrap = styled.div`
    display: flex;
    align-items: center;
`
const FunctWrap = styled.div`
    position: relative;
`

const FontWrap = styled.div`
    margin-left: 20px;
    svg {
        font-size: 20px;
        color: rgba(11, 190, 181, 1);
        cursor: pointer;
    }
`

interface ILoreList {
    id: number
    name: string
}
interface IProps {
    data: {
        id?: number | 0
        type: number
        loreList: ILoreList[]
        showEditPick?: { status: number; text: string }
        importanceTagList: ILoreList[]
    }
    onClickSelect(): void
}

const HeaderType: FC<IProps> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState(['单选题', '多选题', '判断题', '填空题', '解答题'])
    const [isSubmit, setIsSubmit] = useState(false)

    //去编辑
    const handleClickLink = () => {
        navigate(`/question/${props.data.id}`)
    }

    const handleClickFunct = () => {
        setIsSubmit(true)
    }
    //确定提交
    const handleClickSubject = () => {
        setIsSubmit(false)
        exerciseStore.putApplyAudit(props.data.id!)
    }
    //取消提交
    const handleClickClose = () => {
        setIsSubmit(false)
    }

    const optionButton = {
        height: '32px',
        bgColor: '#F6DD5F',
        color: '#333',
        HbgColor: '#e6d05f',
    }
    return (
        <Container>
            <KnowledgeWrap>
                <TypeNumber>
                    {typeArr[props.data.type - 1].slice(0, 2)}#{props.data.id}
                </TypeNumber>
                {props.data.importanceTagList.map(item => (
                    <Knowledge key={item.id} data={item} setStyle={1} />
                ))}
                {props.data.loreList.map(item => (
                    <Knowledge key={item.id} data={item}></Knowledge>
                ))}
            </KnowledgeWrap>
            {props.data.showEditPick && props.data.showEditPick.status === 1 ? (
                <ButtonWrap>
                    <FunctWrap>
                        <Button options={optionButton} onClick={handleClickFunct}>
                            {props.data.showEditPick.text}
                        </Button>
                        {isSubmit && <Popconfirm close={handleClickClose} confirm={handleClickSubject}></Popconfirm>}
                    </FunctWrap>
                    <FontWrap title='点击编辑' onClick={handleClickLink}>
                        <FiEdit />
                    </FontWrap>
                </ButtonWrap>
            ) : null}
        </Container>
    )
}

export default HeaderType
