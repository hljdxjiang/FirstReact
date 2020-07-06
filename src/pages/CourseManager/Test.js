import React from "react";
import { Select } from "antd";

const { Option } = Select;
var prov;
const provinceData = ["Zhejiang", "Jiangsu"];
const cityData = {
  Zhejiang: ["Hangzhou", "Ningbo", "Wenzhou"],
  Jiangsu: ["Nanjing", "Suzhou", "Zhenjiang"],
};

class Test extends React.Component {
  constructor(props) {

    super(props);
    this.state = { prov1: "", city1: "" };
  }
  componentWillMount() {
    prov = [
      {
        id: "010",
        name: "beijing",
        sub: [
          { id: "0101", name: "haidian" },
          { id: "0102", name: "xicheng" },
          { id: "0103", name: "dongchebg" },
        ],
      },
      {
        id: "021",
        name: "天津",
        sub: [
          { id: "0211", name: "hebei" },
          { id: "0212", name: "hexi" },
          { id: "0213", name: "hongqiao" },
        ],
      },
    ];
  }

  handleProvinceChange = (value, key) => {
    this.setState({
      prov1: value,
      city1: prov.find((dt) => dt.id === value).sub[0].id,
    });
  };

  onSecondCityChange = (value, key) => {
    this.setState({
      city1: value,
    });
  };

  render() {
    const s = prov.find((dt) => dt.id === this.state.prov1);
    var sub = [];
    if (s != undefined) {
      sub = s.sub;
    }
    return (
        <Select style={{ width: 120 }} onChange={this.handleProvinceChange}>
          {prov.map((province, idx) => (
            <Option key={province.id} value={province.id}>
              {province.name}
            </Option>
          ))}
        </Select>
        <Select
          style={{ width: 120 }}
          value={this.state.city1}
          onChange={this.onSecondCityChange}
        >
          {Array.from(sub).map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}
            </Option>
          ))}
        </Select>
    );
  }
}
export default Test;
