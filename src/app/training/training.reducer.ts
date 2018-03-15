import {
    TrainingActions,
    SET_AVAILABLE_EXERCISES,
    SET_COMPLETED_EXERCISES,
    START_TRAINING,
    STOP_TRAINING
} from './training.actions';
import { Exercise } from './exercise.model';
import * as fromRoot from '../app.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface TrainingState {
    availableExercises: Exercise[];
    completedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    completedExercises: [],
    activeTraining: null,
};

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLE_EXERCISES:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_COMPLETED_EXERCISES:
            return {
                ...state,
                completedExercises: action.payload
            };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            };
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getCompletedExercises = createSelector(getTrainingState, (state: TrainingState) => state.completedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);
