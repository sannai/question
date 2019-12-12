//添加题库
import React, { FC, useEffect, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps, navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { TiArrowBackOutline, TiEye } from 'react-icons/ti'
import { MdSave } from 'react-icons/md'

import { IStore } from '../../store'
import TopicType from '../Draft/TopicType'
import ChoiceProblem from './ChoiceProblem'
import JudgeProblem from './JudgeProblem'
import FillingProblem from './FillingProblem'
import ShortAnswerProblem from './ShortAnswerProblem'
import PlusKnowledge from './PlusKnowledge'
import Dialog from '../../components/Dialog'
import QuestionType from '../../components/QuestionType'
import Toast from '../../components/Toast'
import Loading from '../../components/Loading'
import Button from '../../components/Button'
import Popconfirm from '../../components/Popconfirm'
import Knowledge from '../../components/Knowledge'
import Select from '../../components/Select'

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    position: relative;
    overflow: auto;
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

const Wrap = styled.div`
    width: 1260px;
    height: 100%;
    margin: 0px auto;
`
const FunctWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    padding-top: 20px;
    & button {
        margin-left: 10px;
        svg {
            font-size: 20px;
        }
    }
`

const PackageWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 20px;
`
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
const Span = styled.span`
    margin-left: 10px;
`
const SubjectWrap = styled.div`
    position: relative;
`

const TypeWrap = styled.ul`
    display: flex;
    height: 32px;
    margin: 10px;
`

const PreviewWrap = styled.div``

const KnowledgeWrap = styled.div`
    padding-left: 40px;
    min-height: 60px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
`

const SelectWrap = styled.div`
    display: flex;
    width: 300px;
`

interface Iprops {
    id: string
}

interface ITopicTypeArr {
    id: number
    name: string
    type: number
}

let DIFFICULTY = {
    1: 'VERY_EASY',
    2: 'RELATIVELY_EASY',
    3: 'COMMON',
    4: 'RELATIVELY_DIFFICULTY',
    5: 'VERY_DIFFICULTY',
}
const NetExercise: FC<RouteComponentProps<Iprops>> = props => {
    const { exerciseStore, pointStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState([
        { id: 1, name: '单选题' },
        { id: 2, name: '多选题' },
        { id: 3, name: '判断题' },
        { id: 4, name: '填空题' },
        { id: 5, name: '简答题' },
    ])
    const [subjectArr] = useState([
        { id: 1, name: '数学' },
        { id: 2, name: '物理' },
        { id: 3, name: '化学' },
        { id: 4, name: '生物' },
    ])
    const [difficultyArr] = useState([
        { id: 1, name: '容易' },
        { id: 2, name: '较易' },
        { id: 3, name: '中等' },
        { id: 4, name: '较难' },
        { id: 5, name: '困难' },
    ])
    const [segment] = useState([
        { id: 1, name: '小学' },
        { id: 2, name: '中学' },
        { id: 3, name: '高中' },
    ])
    const [isPreview, setIsPreview] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    useEffect(() => {
        if (props.id) {
            exerciseStore.getProblem(Number(props.id))
        } else {
            let value = sessionStorage.getItem('currentType')
            if (value && value !== '0') {
                exerciseStore.currentType = [
                    { name: '题型', id: Number(value) },
                    { id: 1, name: '数学' },
                    { id: 1, name: '难度' },
                    { id: 3, name: '高中' },
                ]
                exerciseStore.setProblem(Number(value))
            } else {
                exerciseStore.currentType = [
                    { id: 1, name: '题型' },
                    { id: 1, name: '数学' },
                    { id: 1, name: '难度' },
                    { id: 3, name: '高中' },
                ]
                exerciseStore.setProblem(1)
            }
        }
        // eslint-disable-next-line
    }, [props.uri])

    //输入验证
    const checkForm = (data: any) => {
        let noData = JSON.stringify({
            object: 'value',
            document: {
                object: 'document',
                data: {},
                nodes: [
                    { object: 'block', type: 'paragraph', data: {}, nodes: [{ object: 'text', text: '', marks: [] }] },
                ],
            },
        })
        let type = [1, 2, 3]
        let type1 = [4, 5]
        let isOk = true
        if (data.topic === noData) {
            Toast.warning('题目不能为空')
            isOk = false
        } else if (data.loreListId.length < 1) {
            Toast.warning('知识点不能为空')
            isOk = false
        } else if (type.includes(data.type) && !data.answer) {
            Toast.warning('答案不能为空')
            isOk = false
        } else if (type1.includes(data.type) && data.answer === noData) {
            Toast.warning('答案不能为空')
            isOk = false
        } else if (data.type === 5 && data.answerCount === 0) {
            Toast.warning('小题数量不能为空')
            isOk = false
        } else if (data.type === 4 && data.answerCount === 0) {
            Toast.warning('填空不能为空')
            isOk = false
        } else if (type.includes(data.type) && data.option === '[]') {
            Toast.warning('选项不能为空')
            isOk = false
        }
        return isOk
    }

    //预览、返回题目列表、保存
    const handleClickFunct = (text: string, sub?: string) => {
        let option: any = []
        if (text === '1' || text === '3') {
            let type = [1, 2]
            if (type.includes(exerciseStore.problemData.type)) {
                let answer = ''
                exerciseStore.problemData.option.map((item: any, index: number) => {
                    if (item.statu) {
                        answer += answerOption[index] + ','
                    }
                    if (item.value.size) {
                        item.value = item.value.toJS()
                    }
                    option.push({
                        id: item.id,
                        value: item.value,
                    })
                    return item
                })
                exerciseStore.problemData.answer = answer.substr(0, answer.length - 1)
            }
        }
        if (text === '1') {
            exerciseStore.problemData.loreList = exerciseStore.selectedPoints
            setIsPreview(true)
        } else if (text === '2') {
            navigate('/')
        } else if (text === '3') {
            let data = {
                subjectId: exerciseStore.currentType[1].id,
                id: exerciseStore.problemData.id,
                topic: JSON.stringify(exerciseStore.problemData.topic),
                option: '',
                answer: exerciseStore.problemData.answer,
                answerCount: exerciseStore.problemData.answerCount,
                solution: JSON.stringify(exerciseStore.problemData.solution),
                type: exerciseStore.problemData.type,
                level: (DIFFICULTY as any)[exerciseStore.currentType[2].id],
                loreListId: exerciseStore.selectedPointsId,
                segment: exerciseStore.currentType[3].id,
                importanceTagListId: exerciseStore.problemData.importanceTagList.map(item => item.id),
            }
            let type1 = [4, 5]
            if (exerciseStore.problemData.type === 4) {
                data.answerCount = exerciseStore.problemData.answer.length
            }

            if (type1.includes(exerciseStore.problemData.type)) {
                data.answer = JSON.stringify(data.answer)
            } else if (exerciseStore.problemData.type === 3) {
                data.answer = exerciseStore.problemData.answer
                delete data.answerCount
            } else {
                data.option = JSON.stringify(option)
                delete data.answerCount
            }
            if (props.id) {
                if (checkForm(data)) {
                    exerciseStore.editProblem(data)
                }
            } else {
                if (checkForm(data)) {
                    exerciseStore.addProblem(data, sub)
                }
            }
        } else if (text === '4') {
            setIsSubmit(!isSubmit)
        }
    }

    //点击类型
    const handleClickTypeLink = (data: any) => {
        exerciseStore.currentType.map((item, index) => {
            if (data.type === 0) {
                exerciseStore.setProblem(Number(data.id))
            }
            if (index === data.type) {
                item.id = data.id
            }
            return item
        })
    }

    //预览
    const handlePreview = () => {
        setIsPreview(!isPreview)
    }

    //确定提交
    const handleClickSubject = () => {
        setIsSubmit(false)
        handleClickFunct('3', '提交')
    }
    //取消提交
    const handleClickClose = () => {
        setIsSubmit(false)
    }

    const handleSelectPoint = (data: { id: number; name: string }) => {
        exerciseStore.selectPoint(data)
    }

    //标签
    const handleClickPushLabel = (data: { id: number; name: string }) => {
        exerciseStore.problemData.importanceTagList = exerciseStore.problemData.importanceTagList.filter(
            item => item.id !== data.id
        )
    }

    const handleCelect = (data: { id: number; name: string }) => {
        pointStore.tagReady = false
        exerciseStore.currentType[1] = { id: data.id, name: data.name }
    }
    const handleCelectSegment = (data: { id: number; name: string }) => {
        exerciseStore.currentType[3] = { id: data.id, name: data.name }
    }

    const optionDialog = {
        width: '70%',
    }

    const optionButton = {
        bgColor: '#FFE259',
        color: '#333',
        HbgColor: '#f4dd73',
    }

    return useObserver(() => {
        if (exerciseStore.gettingProblem) {
            return <Loading />
        }
        return (
            <Container>
                <Wrap>
                    <FunctWrap>
                        <Button onClick={() => handleClickFunct('2')}>
                            <TiArrowBackOutline />
                            <Span>返回首页</Span>
                        </Button>
                        <Button onClick={() => handleClickFunct('1')}>
                            <TiEye />
                            <Span>预览</Span>
                        </Button>
                        <Button onClick={() => handleClickFunct('3')}>
                            <MdSave />
                            <Span>保存</Span>
                        </Button>
                        <SubjectWrap>
                            <Button onClick={() => handleClickFunct('4')} options={optionButton}>
                                <MdSave />
                                <Span>提交审核</Span>
                            </Button>
                            {isSubmit && (
                                <Popconfirm close={handleClickClose} confirm={handleClickSubject}></Popconfirm>
                            )}
                        </SubjectWrap>
                    </FunctWrap>
                    <SelectWrap>
                        <Select
                            data={subjectArr}
                            value={exerciseStore.currentType[1].name}
                            onChange={handleCelect}
                        ></Select>
                        <Select
                            data={segment}
                            value={exerciseStore.currentType[3].name}
                            onChange={handleCelectSegment}
                        ></Select>
                    </SelectWrap>
                    <PackageWrap>
                        <Package>
                            <ProblemText>题型</ProblemText>
                            <TypeWrap>
                                <TopicType
                                    data={{
                                        type: 0,
                                        typeArr,
                                        currentType: exerciseStore.currentType[0].id,
                                        disabled: props.id ? true : false,
                                    }}
                                    onClickType={handleClickTypeLink}
                                />
                            </TypeWrap>
                        </Package>
                        <Package>
                            <ProblemText>难度</ProblemText>
                            <TypeWrap>
                                <TopicType
                                    data={{
                                        type: 2,
                                        typeArr: difficultyArr,
                                        currentType: exerciseStore.currentType[2].id,
                                        disabled: false,
                                    }}
                                    onClickType={handleClickTypeLink}
                                />
                            </TypeWrap>
                        </Package>
                    </PackageWrap>
                    <Package>
                        <ProblemText>知识点</ProblemText>
                        <KnowledgeWrap>
                            <PlusKnowledge />
                            {exerciseStore.problemData.importanceTagList.map(item => (
                                <Knowledge
                                    key={item.id}
                                    data={item}
                                    setStyle={1}
                                    closable={true}
                                    onClickDeleted={handleClickPushLabel}
                                />
                            ))}
                            {exerciseStore.selectedPoints.map(item => (
                                <Knowledge
                                    key={item.id}
                                    data={item}
                                    closable={true}
                                    onClickDeleted={handleSelectPoint}
                                />
                            ))}
                        </KnowledgeWrap>
                    </Package>
                    {exerciseStore.problemData.type === 1 && <ChoiceProblem />}
                    {exerciseStore.problemData.type === 2 && <ChoiceProblem />}
                    {exerciseStore.problemData.type === 3 && <JudgeProblem />}
                    {exerciseStore.problemData.type === 4 && <FillingProblem />}
                    {exerciseStore.problemData.type === 5 && <ShortAnswerProblem />}
                    {isPreview && (
                        <Dialog title='题目预览' options={optionDialog} onClickClose={handlePreview}>
                            <PreviewWrap>
                                <QuestionType data={exerciseStore.problemData} />
                            </PreviewWrap>
                        </Dialog>
                    )}
                </Wrap>
            </Container>
        )
    })
}

export default NetExercise
