import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Dash from "../../components/dashboard/Dash";
import ViewVehicles from "../../components/ViewVehicles/viewVehicles";
const CarsView = () => {
    return (
        <div>
            <div><Navbar /> </div>

                <div><Dash /></div>
            <div>
                <div><ViewVehicles /></div>
            </div>

            <div><Footer /></div>
        </div>
    )

}
export default CarsView