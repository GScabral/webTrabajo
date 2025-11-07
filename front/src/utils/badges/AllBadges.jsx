import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBadges } from "../../redux/action/badgeAction";

const AllBadges = () => {
    const dispatch = useDispatch();
    const badges = useSelector((state) => state.badgeState.allBadges);

    useEffect(() => {
        dispatch(getAllBadges());
    }, [dispatch]);

    console.log("esto llega B:", badges);

    return (
        <div>
            <h1>BADGES</h1>
            {/* Opcional: muestra los badges */}
            {badges && badges.length > 0 ? (
                badges.map((b) => <p key={b.id}>{b.name}</p>)
            ) : (
                <p>No hay badges</p>
            )}
        </div>
    );
};

export default AllBadges;
