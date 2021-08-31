
export function couponReducer(state = false, action) {
    switch (action.type) {
        case "APPLIED_COUPON":
            return action.payload
        default:
            return state

    }
}