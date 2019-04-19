import React from "react";

import { Chart } from "react-google-charts";

export default class ChartDiagram extends React.Component {
    render() {
        return (
            <div className={"my-pretty-chart-container"}>
                <Chart
                    chartType="ScatterChart"
                    rows={[[8, 12], [4, 5.5], [11, 14], [4, 5], [3, 3.5], [6.5, 7]]}
                    columns={[
                        {
                            type: "number",
                            label: "Age"
                        },
                        {
                            type: "number",
                            label: "Weight"
                        }
                    ]}
                    options={
                        // Chart options
                        {
                            title: "Age vs. Weight comparison",
                            hAxis: {
                                title: "Age",
                                viewWindow: { min: 0, max: 15 }
                            },
                            vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
                            legend: "none"
                        }
                    }
                    width={"100%"}
                    height={"400px"}
                    legendToggle
                />
            </div>
        );
    }
}