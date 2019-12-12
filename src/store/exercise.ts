import { observable, action } from 'mobx'
import { Value } from 'slate'
import { append } from 'ramda'

import Toast from '../components/Toast'

import api from '../api'
interface ILoreList {
    id: number
    name: string
}

interface IProblemList {
    answer: any
    auditFailMark?: string
    id?: number
    option?: any
    answerCount?: any
    type: number
    loreList: ILoreList[]
    solution: any
    topic: any
    importanceTagList: ILoreList[]
}
interface IProblemListPage {
    limit: number
    offset: number
    page: number
    total: number
}
interface IGetProblemList {
    limit: number
    page: number
    status: number
    keyword?: string
}

interface ICurrentAnswer {
    statu: boolean
    name: string
}

interface ISetOption {
    id: number
    value: Value
}

interface IEditProblem {
    subjectId: number
    id?: number
    topic: string
    option: string
    answer: string
    solution: string
    loreListId: number[]
    answerCount: number
    type: number
    level: string
    importanceTagListId: number[]
}

interface ILore {
    id: number
    name: string
}

let values = Value.fromJSON({
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
})

export interface IExerciseStore {
    currentAnswer: ICurrentAnswer[]
    labelArr: ILore[]
    currentType: ILore[]

    problemListReady: boolean
    gettingProblemList: boolean
    problemList: IProblemList[]
    problemListPage: IProblemListPage
    getProblemList(data: IGetProblemList): Promise<void>

    problemReady: boolean
    gettingProblem: boolean
    problemData: IProblemList
    getProblem(id: number): Promise<void>
    setProblem(type: number): Promise<void>
    setOption(data: ISetOption): Promise<void>
    editProblem(data: IEditProblem): Promise<void>
    addProblem(data: IEditProblem, sub?: string): Promise<void>
    putApplyAudit(id: number): Promise<void>

    selectedPoints: ILore[]
    selectedPointsId: number[]
    selectPoint(point: ILore): void
}

class ExerciseStore implements IExerciseStore {
    @observable labelArr: ILore[] = [
        { id: 1, name: '高考真题' },
        { id: 2, name: '联考模拟' },
        { id: 3, name: '奥赛' },
        { id: 4, name: '名校' },
    ]
    @observable currentType: ILore[] = [
        { id: 1, name: '题型' },
        { id: 1, name: '数学' },
        { id: 1, name: '难度' },
        { id: 3, name: '高中' },
    ]
    @observable selectedPoints: ILore[] = []
    @observable selectedPointsId: number[] = []

    @observable currentAnswer: ICurrentAnswer[] = []

    @observable problemListReady = false
    @observable gettingProblemList = false
    @observable problemList: IProblemList[] = []
    @observable problemListPage: IProblemListPage = {
        limit: 0,
        offset: 0,
        page: 0,
        total: 0,
    }

    @observable problemReady = false
    @observable gettingProblem = false
    @observable problemData: IProblemList = {
        auditFailMark: '',
        answer: '',
        option: [],
        answerCount: 0,
        type: 0,
        loreList: [],
        solution: values,
        topic: values,
        importanceTagList: [],
    }

    @action selectPoint = (point: ILore) => {
        if (this.selectedPointsId.includes(point.id)) {
            this.selectedPointsId = this.selectedPointsId.filter(x => x !== point.id)
            this.selectedPoints = this.selectedPoints.filter(x => x.id !== point.id)
            // this.problemData.importanceTagList = this.problemData.importanceTagList.filter(x => x.id !== point.id)
        } else {
            this.selectedPointsId = append(point.id, this.selectedPointsId)
            this.selectedPoints = append(point, this.selectedPoints)
        }
    }

    //题库列表
    @action async getProblemList(data: IGetProblemList) {
        this.gettingProblemList = true
        try {
            const res = await api.exercise.getProblemList(data)
            if (res.success) {
                this.problemList = res.data
                this.problemListPage = res.page
                this.gettingProblemList = false
                this.problemListReady = true
            }
        } catch (error) {}
    }

    //题库单题查看
    @action async getProblem(id: number) {
        this.gettingProblem = true
        this.selectedPoints = []
        this.selectedPointsId = []
        let DIFFICULTY = {
            VERY_EASY: 1,
            RELATIVELY_EASY: 2,
            COMMON: 3,
            RELATIVELY_DIFFICULTY: 4,
            VERY_DIFFICULTY: 5,
        }
        const res = await api.exercise.getProblem(id)
        if (res.success) {
            let answerOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            let subjectArr = [
                { id: 1, name: '数学' },
                { id: 2, name: '物理' },
                { id: 3, name: '化学' },
                { id: 4, name: '生物' },
            ]
            let segment = [
                { id: 1, name: '小学' },
                { id: 2, name: '中学' },
                { id: 3, name: '高中' },
            ]
            let data: any = []
            this.selectedPoints = res.data.loreList
            this.selectedPointsId = res.data.loreList.map((v: any) => v.id)
            this.currentType = [
                { name: '题型', id: res.data.type },
                { name: subjectArr[res.data.subjectId - 1].name || '科目', id: res.data.subjectId },
                { name: '难度', id: (DIFFICULTY as any)[res.data.level] },
                { name: segment[res.data.segment - 1].name || '学段', id: res.data.segment },
            ]
            if (res.data.type === 1) {
                let answer = res.data.answer
                res.data.option = JSON.parse(res.data.option)
                res.data.option.map((item: any, index: number) => {
                    item.statu = false
                    if (answer === answerOption[index]) {
                        item.statu = true
                    }
                    return item
                })
                this.currentAnswer = data
            } else if (res.data.type === 2) {
                res.data.option = JSON.parse(res.data.option)
                let answer = res.data.answer.split(',')
                res.data.option.map((item: ICurrentAnswer, index: number) => {
                    item.statu = false
                    answer.map((t: string) => {
                        if (answerOption[index] === t) {
                            item.statu = true
                        }
                        return t
                    })
                    return item
                })
                this.currentAnswer = data
            } else if (res.data.type === 4 || res.data.type === 5) {
                res.data.answer = JSON.parse(res.data.answer)
                res.data.answerCount = Number(res.data.answerCount)
            }

            this.problemData = {
                ...res.data,
                topic: JSON.parse(res.data.topic),
                solution: JSON.parse(res.data.solution),
            }

            this.gettingProblem = false
            this.problemReady = true
        }
    }

    //题库单题清空
    @action async setProblem(type: number) {
        this.problemData = {
            answer: '',
            option: [],
            answerCount: 0,
            type,
            loreList: [],
            solution: values,
            topic: values,
            importanceTagList: [],
        }
        this.currentAnswer = []
        this.selectedPoints = []
        this.selectedPointsId = []
        if (type === 4) {
            this.problemData.answer = []
        } else if (type === 5) {
            this.problemData.answer = values
        }
    }

    //题库类型
    @action async setOption(data: ISetOption) {
        this.problemData.option.push(data)
    }

    //题库编辑
    @action async editProblem(data: IEditProblem) {
        try {
            let type1 = [3, 4, 5]
            if (type1.includes(data.type)) {
                delete data.option
            }
            const res = await api.exercise.editProblem(data)
            if (res.success) {
                Toast.success('保存成功')
            }
        } catch (error) {
            Toast.error('保存失败')
        }
    }

    //题目新增
    @action async addProblem(data: IEditProblem, sub?: string) {
        try {
            let type1 = [3, 4, 5]
            delete data.id
            if (type1.includes(data.type)) {
                delete data.option
            }
            const res = await api.exercise.addProblem(data)
            if (res.success) {
                this.setProblem(data.type)
                if (sub) {
                    this.putApplyAudit(res.data)
                } else {
                    Toast.success('新增成功')
                }
            }
        } catch (error) {
            Toast.error('新增失败')
        }
    }

    //题目申请审核
    @action async putApplyAudit(id: number) {
        try {
            const res = await api.exercise.putApplyAudit(id)
            if (res.success) {
                this.problemList = this.problemList.filter(item => item.id !== id)
                Toast.success('提交完成')
            }
        } catch (error) {
            Toast.error('提交失败')
        }
    }
}

export const exerciseStore = new ExerciseStore()
