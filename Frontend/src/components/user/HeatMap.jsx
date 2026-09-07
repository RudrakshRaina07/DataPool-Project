import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import axios from "axios";

const getPanelColors = (maxCount) => {
  const colors = {};
  for (let i = 0; i <= maxCount; i++) {
    const greenValue = maxCount === 0 ? 0 : Math.floor((i / maxCount) * 255);
    colors[i] = `rgb(0, ${greenValue}, 0)`;
  }

  return colors;
};

const HeatMapProfile = ({userId}) => {
  console.log(userId);
  
  const currentYear = new Date().getFullYear()
  
  const [activityData, setActivityData] = useState([])
  const [panelColors, setPanelColors] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching contributions for:", userId);
      if(!userId){
        console.log("No",userId);
        
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/contributions/${userId}`)
        const contributions = response.data;
        console.log("API response",response.data);
        

        const data = contributions.map((contribution) => ({
          date: new Date(contribution.date)
                .toISOString()
                .split("T")[0],
          count: contribution.count
        }))

        console.log("Heatmap data:", data);
        
        setActivityData(data)

        const maxCount = data.length > 0 ? Math.max(...data.map((d) => d.count)) : 0;

        setPanelColors(getPanelColors(maxCount))

      } catch (error) {
        console.error("Error fetching contribution data: ", error.message)
      }
    }
    fetchData()
  }, [userId])

  return (
    <div>
      <h4>Recent Contributions</h4>
      <HeatMap
        className=""
        style={{ minWidth: "1200px" , height: "200px", color: "white" }}
        value={activityData}
        weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
        startDate={new Date(`${currentYear}-01-01`)}
        endDate={new Date(`${currentYear}-12-31`)} 
        rectSize={15}
        space={3}
        rectProps={{
          rx: 2.5,
        }}
        panelColors={panelColors}
      />
    </div>
  );
};

export default HeatMapProfile;