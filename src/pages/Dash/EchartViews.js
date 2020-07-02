import React from "react";
import ReactEcharts from "echarts-for-react";
import echarts from "echarts";
class EchartViews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      day: this.props.day,
      rdm: this.props.rdm,
      xdata: [],
    };
  }
  componentWillMount() {
    const day = this.props.day;
    this.getData(day);
  }
  componentWillReceiveProps(nexProps) {
    this.setState({ day: nexProps.day });
    this.setState({ rdm: nexProps.rdm });
    this.getData(this.state.day);
  }
  doHandleMonth = (month) => {
    var m = month;
    if (month.toString().length === 1) {
      m = "0" + month;
    }
    return m;
  };
  getData = (day) => {
    //这个地方需要去后台获取数据去了
    console.log("getData day is ", day);
  };
  render() {
    const xdata = [];
    for (var i = parseInt(this.state.day) - 1; i >= 0; i--) {
      var today = new Date();
      var targetday_milliseconds = today.getTime() - 1000 * 60 * 60 * 24 * i;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      xdata.push(tYear + "-" + tMonth + "-" + tDate);
    }
    const options = {
      title: {
        text: "title",
        left: "50%",
        show: false,
        textAlign: "center",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          lineStyle: {
            color: "#ddd",
          },
        },
        backgroundColor: "rgba(255,255,255,1)",
        padding: [5, 10],
        textStyle: {
          color: "#7588E4",
        },
        extraCssText: "box-shadow: 0 0 5px rgba(0,0,0,0.3)",
      },
      legend: {
        right: 20,
        orient: "vertical",
      },
      xAxis: {
        type: "category",
        data: xdata,
        boundaryGap: false,
        splitLine: {
          show: true,
          interval: "auto",
          lineStyle: {
            color: ["#D4DFF5"],
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#609ee9",
          },
        },
        axisLabel: {
          margin: 10,
          textStyle: {
            fontSize: 10,
          },
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          lineStyle: {
            color: ["#D4DFF5"],
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#609ee9",
          },
        },
        axisLabel: {
          margin: 0,
          textStyle: {
            fontSize: 8,
          },
        },
      },
      series: [
        {
          name: "新增",
          type: "line",
          smooth: true,
          showSymbol: false,
          symbol: "circle",
          symbolSize: 6,
          data: [
            "1200",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
            "1400",
            "808",
            "811",
            "626",
            "488",
            "1600",
          ],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(216, 244, 247,1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(216, 244, 247,1)",
                  },
                ],
                false
              ),
            },
          },
          itemStyle: {
            normal: {
              color: "#58c8da",
            },
          },
          lineStyle: {
            normal: {
              width: 3,
            },
          },
        },
      ],
    };
    return (
      <div>
        <ReactEcharts
          option={options}
          style={{
            height: this.props.etype === 1 ? "200px" : "260px",
            width: "100%",
          }}
          className={"react_for_echarts"}
        />
      </div>
    );
  }
}
export default EchartViews;
