import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import './App.css';

function App() {
  const [dateLabels, setDateLabels] = useState(['']);
  const [infectedData, setInfectedData] = useState(['']);
  const [mortData, setMortData] = useState(['']);

  const dateHolder: string[] = [];
  const infectedHolder: string[] = [];
  const mortHolder: string[] = [];

  let raw = `2020-02-26		15(+7.1%)	0
    2020-02-27		15(=)	0
    2020-02-28		19(+27%)	0
    2020-02-29		24(+26%)	1(n.a.)
    2020-03-01   42(+75%) 2(+100%)
    2020-03-02   57(+36%) 6(+200%)
    2020-03-03   85(+49%)	9(+50%)
    2020-03-04	​	111(+31%)	11(+22%)
    2020-03-05	​	175(+58%)	11(=)
    2020-03-06	​	252(+44%)	14(+27%)
    2020-03-07	​	353(+40%)	19(+36%)
    2020-03-08	​	497(+41%)	21(+11%)
    2020-03-09	​​	645(+30%)	26(+24%)
    2020-03-10	​​	936(+45%)	31(+19%)
    2020-03-11	​​	1,205(+29%)	37(+19%)
    2020-03-12	​​	1,598(+33%)	41(+11%)
    2020-03-13	​​	2,163(+35%)	49(+20%)
    2020-03-14	​​​	2,825(+31%)	56(+14%)
    2020-03-15	​​​	3,501(+24%)	62(+11%)
    2020-03-16	​​​	4,373(+25%)	76(+23%)
    2020-03-17	​​​	5,664(+30%)	97(+28%)
    2020-03-18	​​​	8,074(+43%)	123(+27%)
    2020-03-19	​​​	12,022(+49%)	175(+42%)
    2020-03-20	​​​	17,439(+45%)	230(+31%)
    2020-03-21	​​​	23,710(+36%)	298(+30%)
    2020-03-22	​​​	32,341(+36%)	408(+37%)
    2020-03-23	​​​	42,751(+32%)	519(+27%)
    2020-03-24	​​​	52,690(+23%)	681(+31%)
    2020-03-25	​​​	64,916(+23%)	906(+33%)
    2020-03-26	​​​	81,966(+26%)	1,159(+28%)
    2020-03-27	​​​	101,012(+23%)	1,592(+37%)
    2020-03-28	​​​	121,105(+20%)	2,039(+28%)
    2020-03-29	​​​	140,223(+16%)	2,431(+19%)
    2020-03-30	​​​	160,686(+15%)	2,985(+23%)
    2020-03-31	​​​	186,082(+16%)	3,806(+28%)
    2020-04-01	​​​	212,814(+14%)	4,746(+25%)
    2020-04-02	​​​	241,626(+14%)	5,821(+23%)
    2020-04-03	​​​	273,808(+13%)	7,007(+20%)
    2020-04-04	​​​	307,876(+12%)	8,359(+19%)
    2020-04-05	​​​	333,593(+8.4%)	9,534(+14%)
    2020-04-06	​​​	362,955(+8.8%)	10,748(+13%)
    2020-04-07	​​​	393,602(+8.4%)	12,675(+18%)
    2020-04-08	​​​	425,746(+8%)	14,610(+15%)`

    const processRaw = (rawInput:string) : string[] => {
      let newRaw: string = rawInput.replace(/[^\x00-\x7F]/g, "");
      newRaw = newRaw.replace(/ *\([^)]*\) */g, ' ');
      newRaw = newRaw.replace(/\t/g, ' ');
      newRaw = newRaw.replace(/,/g, '');
      let arr: string[] = newRaw.split(/\s+/g);
      arr = arr.filter(Boolean);
      return arr;
    }

    const handleData = (inputArr: string[]) => {
      for (let i = 0; i < inputArr.length; i += 3) {
        dateHolder.push(inputArr[i]);
        infectedHolder.push(inputArr[i + 1]);
        mortHolder.push(inputArr[i + 2]);
      }
      
      setDateLabels([...dateHolder]);
      setInfectedData([...infectedHolder]);
      setMortData([...mortHolder]);
    }

  useEffect(() => {
    handleData(processRaw(raw));
  }, [])

  const data = {
    labels: dateLabels,
    datasets:[{
      label: 'Confirmed Coronavirus cases in the U.S.',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: infectedData
    }
    // {
    //   label: 'Coronavirus mortality in the U.S.',
    //   backgroundColor: 'rgb(0, 22, 100)',
    //   borderColor: 'rgb(0, 22, 100)',
    //   data: mortData
    ]
  }
  const options = {
    scales: {
      yAxes: [{
        type: 'logarithmic'
      }]
    }
  }
  return (
    <div className="App">
      <Bar data={data} options={options} />
    </div>
  );
}

export default App;
