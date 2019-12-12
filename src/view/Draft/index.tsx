//草稿
import React, { FC, useEffect, useContext, useState, ChangeEventHandler, KeyboardEventHandler } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FiSearch } from 'react-icons/fi'

import { IStore } from '../../store'
import Section from './Section'
import NoData from '../../components/QuestionType/NoData'
import Loading from '../../components/Loading'

const Container = styled.div`
    box-sizing: border-box;
    width: 1260px;
    height: 100%;
    margin: 0 auto;
    padding-right: 10px;
`

const Header = styled.header`
    box-sizing: border-box;
    display: flex;
    height: 80px;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
`
const SearchWrap = styled.div`
    margin-right: 10px;
    position: relative;
`

const FontWrap = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    left: 10px;
    svg {
        color: #979797;
        font-size: 20px;
    }
`

const Input = styled.input`
    width: 300px;
    height: 40px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 6px 0px rgba(88, 96, 247, 0.1);
    border-radius: 10px;
    outline: none;
    border: 1px solid #fff;
    padding-left: 40px;
`

const ReviewBy: FC<RouteComponentProps> = props => {
    const { exerciseStore } = useContext<IStore>(MobXProviderContext)
    const [keyWord, setKeyWord] = useState('')

    useEffect(() => {
        let data = {
            limit: 10,
            status: 0,
            page: 1,
        }
        exerciseStore.getProblemList(data)
        // eslint-disable-next-line
    }, [])

    const handleKeyDownEdit: KeyboardEventHandler = event => {
        if (event.which === 13) {
            let datas = {
                limit: 10,
                status: 0,
                page: 1,
                keyword: keyWord,
            }
            exerciseStore.getProblemList(datas)
        }
    }

    const handleChangeKeyWord: ChangeEventHandler<HTMLInputElement> = event => {
        setKeyWord(event.target.value)
    }

    return useObserver(() => {
        if (exerciseStore.gettingProblemList) {
            return <Loading />
        }
        return (
            <Container>
                <Header>
                    <SearchWrap>
                        <FontWrap>
                            <FiSearch></FiSearch>
                        </FontWrap>
                        <Input
                            value={keyWord}
                            placeholder='搜索知识点'
                            onChange={handleChangeKeyWord}
                            onKeyDown={handleKeyDownEdit}
                        ></Input>
                    </SearchWrap>
                </Header>
                {exerciseStore.problemList.length < 1 ? (
                    <NoData></NoData>
                ) : (
                    <Section showEditPick={{ status: 1, text: '提交审核' }} status={0}></Section>
                )}
            </Container>
        )
    })
}

export default ReviewBy
