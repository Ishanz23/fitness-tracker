export interface State {
    isLoading: boolean;
}
const initialState = {
    isloading: false
};
export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'START_LOADING':
            return {
                isLoading: true
            };
        case 'STOP_LOADING':
            return {
                isloading: false
            };
        default:
            return state;
    }
}
