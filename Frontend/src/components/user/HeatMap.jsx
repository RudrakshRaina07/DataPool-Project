import React, { useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import axios from "axios";

const getPanelColors = (maxCount) => {
  if(maxCount === 0){
    return {
      0: "#161b22",
    }
  }

  const colors = {
    0: "#161b22",
  };
    
  const levels = [
    "#0e4429",
    "#006d32",
    "#26a641",
    "#39d353",
  ];

  for (let i = 1; i <= maxCount; i++) {
    const level = Math.min(
      Math.ceil((i/maxCount) * levels.length),
      levels.length
    )

    colors[i] = levels[level-1];
  }

  return colors;
};

const HeatMapProfile = ({userId}) => {
  const currentYear = new Date().getFullYear()
  
  const [activityData, setActivityData] = useState([])

  const maxCount = activityData.length > 0 ? Math.max(...activityData.map((d) => d.count)) : 0;

  useEffect(() => {
    const fetchData = async () => {
      if(!userId){
        console.log("No",userId);
        
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/contributions/${userId}`)
        const contributions = response.data;        

        const data = contributions.map((contribution) => ({
          date: new Date(contribution.date)
                .toISOString()
                .split("T")[0],
          count: contribution.count
        }))
        
        setActivityData(data)

      } catch (error) {
        console.error("Error fetching contribution data: ", error.message)
      }
    }
    fetchData()
  }, [userId]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-xl font-semibold">Recent Contributions</h4>
          <p className="text-sm text-gray-300 mt-1">
            {activityData.reduce((total, item) => total + item.count, 0)} contribution this year
          </p>
        </div>
      </div>
      <div className="w-full overflow-hidden pb-3">
        <div className="min-w-300">
          <HeatMap 
            style={{
              width: "100%",
              height: "200px",
              color: "white" }}
            value={activityData}
            weekLabels={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
            monthLabels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            startDate={new Date(`${currentYear}-01-01`)}
            endDate={new Date(`${currentYear}-12-31`)} 

            rectSize={14}
            space={4}

            legendCellSize={14}

            rectProps={{
              rx: 3,
            }}
            panelColors={getPanelColors(maxCount)}

            rectRender={(props, data) =>  {
              const count = data?.count || 0
              const date = data?.date 
              return(
                <rect 
                  {...props}
                  style={{
                    cursor: "pointer"
                  }}
                >
                <title>
                  {count} {count === 1 ? "contribution" : "contribution"} on {date}
                </title>
                </rect>
              )
            }}
          />
        </div>

      </div>
      <div className="flex justify-end items-center gap-2 mt-2 text-xs text-gray-300">

        <span>Less</span>

        <div className="w-3 h-3 rounded-sm bg-[#161b22]" />
        <div className="w-3 h-3 rounded-sm bg-[#0e4429]" />
        <div className="w-3 h-3 rounded-sm bg-[#006d32]" />
        <div className="w-3 h-3 rounded-sm bg-[#26a641]" />
        <div className="w-3 h-3 rounded-sm bg-[#39d353]" />

        <span>More</span>

      </div>
    </div>
  );
};

export default HeatMapProfile;