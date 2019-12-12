import { userStore, IUserStore } from './user'
import { exerciseStore, IExerciseStore } from './exercise'
import { pointStore, IPointStore } from './point'

export interface IStore {
    userStore: IUserStore
    exerciseStore: IExerciseStore
    pointStore: IPointStore
}

export const store: IStore = {
    userStore,
    exerciseStore,
    pointStore,
}
