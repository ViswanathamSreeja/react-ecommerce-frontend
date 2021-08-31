import React from "react"
import StarRating from "react-star-ratings"
const Star = ({ starClick, numberOfStars }) => {
    return (
        <>
            <StarRating
                changeRating={() => starClick(numberOfStars)}
                numberOfStars={numberOfStars}
                starDimension="20px"
                starSpacing="10px"
                starHoverColor="red"
                starEmptyColor="red" />
            <br />
        </>

    )
}
export default Star