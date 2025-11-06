import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBadges } from "../../redux/action/badgeAction";


const AllBadges = () => {

    const dispatch = useDispatch;
    const badges = useSelector((state) => state.badgeState.allBadges)



    useEffect(() => {
        dispatch(getAllBadges)
    }, [dispatch])

    console.log("esto llega B:", badges)

    return (

        <div>
            <h1>BADGES</h1>
        </div>
    )

}


export default AllBadges;