import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import * as data from "./Data.js";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function App() {
  const [limits, setLimits] = useState(data.defaultLimits);

  //buttons
  const [shape, setShape] = useState(data.btnVals.shapeVals[0]);
  const [leads, setLeads] = useState(data.btnVals.leadsVals[0]);
  const [sjoType, setSjoType] = useState(data.btnVals.sjoVals[0]);
  const [closure, setClosure] = useState(data.btnVals.closureVals[0]);
  const [tstat, setTstat] = useState(data.btnVals.tstatVals[0]);
  const [tcouple, setTcouple] = useState(data.btnVals.tcoupleVals[0]);

  const handleShapeChange = (val) => {
    setShape(val);
  };
  const leadsChange = (val) => {
    setLeads(val);
  };
  const sjoTypeChange = (val) => {
    setSjoType(val);
  };
  const closureChange = (val) => {
    setClosure(val);
  };
  const tstatChange = (val) => {
    setTstat(val);
  };
  const tcoupleChange = (val) => {
    setTcouple(val);
  };

  //tstat type change
  const [tstatType, setTstatType] = useState("default");
  const [tstatLow, setTstatLow] = useState(0);
  const [tstatHigh, setTstatHigh] = useState(100);

  const tstatTypeChange = (val) => {
    setTstatType(val);
  };
  useEffect(() => {
    if (tstat !== "None") {
      let typeData = data.btnInfo[tstat].options.find(
        (option) => option.value === tstatType
      );
      if (typeData) {
        setTstatLow(typeData.low);
        setTstatHigh(typeData.high);
      }
    }
  }, [tstatType, tstat]);

  //spinners
  const [length, setLength] = useState(limits.minLength);
  const [width, setWidth] = useState(limits.minWidth);
  const [diameter, setDiameter] = useState(limits.minDiam);
  const [area, setArea] = useState(length * width);
  const [leadLength, setLeadLength] = useState(limits.minLeadLength);
  const [voltage, setVoltage] = useState(limits.minVolt);
  const [power, setPower] = useState(limits.minWatts);

  const lengthChange = (event) => {
    setLength(event.target.value);
  };
  const widthChange = (event) => {
    setWidth(event.target.value);
  };
  const diamChange = (event) => {
    setDiameter(event.target.value);
  };
  const leadLengthChange = (event) => {
    setLeadLength(event.target.value);
  };
  const voltageChange = (event) => {
    setVoltage(event.target.value);
  };
  const powerChange = (event) => {
    setPower(event.target.value);
  };

  //limits and watts calculations
  useEffect(() => {
    if (shape === "Rectangle") {
      setArea(length * width);
    } else if (shape === "Circle") {
      setArea(Math.PI * Math.pow(diameter / 2, 2));
    }
  }, [shape, length, width, diameter]);

  //update limits based on state
  useEffect(() => {
    let newLimits = {...data.defaultLimits};

    if (tstat !== "None") {
      newLimits = { ...newLimits, ...data.tstatLimits };
      newLimits.maxAmps = (voltage < 200) ? 12 : 8;
    } 
    if (closure === "Adhesive") {
      newLimits.maxWattDensity = 5;
    }
    if (leads === "SJO" && sjoType !== "No Plug") {
      newLimits.minVolt = 120;
      newLimits.maxVolt = 120;
    }
    let maxWatts = Math.round(Math.min(area * newLimits.maxWattDensity, newLimits.maxAmps * voltage));
    let currentMinWatts = (newLimits.minWatts > maxWatts) ? maxWatts : newLimits.minWatts;
    
    newLimits.maxWatts = maxWatts;
    newLimits.minWatts = currentMinWatts;

    setLimits(newLimits);
  }, [closure,leads,sjoType,tstat,voltage,area]);

  //update vals if higher/lower than limits
  useEffect(() => {
    setPower(prev => {
      return Math.min(Math.max(limits.minWatts,prev),limits.maxWatts); 
    })
  }, [limits.minWatts,limits.maxWatts]);

  useEffect(() => {
    setVoltage(prev => {
      return Math.min(Math.max(limits.minVolt,prev),limits.maxVolt); 
    })
  }, [limits.minVolt,limits.maxVolt]);

  useEffect(() => {
    setLength(prev => {
      return Math.min(Math.max(limits.minLength,prev),limits.maxLength); 
    })
  }, [limits.minLength,limits.maxLength]);

  useEffect(() => {
    setWidth(prev => {
      return Math.min(Math.max(limits.minWidth,prev),limits.maxWidth); 
    })
  }, [limits.minWidth,limits.maxWidth]);

  useEffect(() => {
    setDiameter(prev => {
      return Math.min(Math.max(limits.minDiam,prev),limits.maxDiam); 
    })
  }, [limits.minDiam,limits.maxDiam]);

  return (
    <div id="configWrapper" className="container py-4 App">
      <div className="row">
        <div className="col-12">
          <div id="dimen" className="box" role="tablist">
            <h3>
              <i className="fa-solid fa-caret-down pe-2 fa-xs"></i>
              <b>Silicone Rubber Heater Configuration</b>
            </h3>
            <div className="boxInfo p-3">
              <ButtonGroup
                stateVar={shape}
                callback={handleShapeChange}
                title={"Shape"}
                values={data.btnVals.shapeVals}
              />
                <div id="rectInfo" className={`hidden ${shape === data.btnVals.shapeVals[0] ? 'show' : ''}`}>
                  <Spinner
                    stateVar={length}
                    callback={lengthChange}
                    min={limits.minLength}
                    max={limits.maxLength}
                    title={"Length"}
                    units={"in."}
                  />
                  <Spinner
                    stateVar={width}
                    callback={widthChange}
                    min={limits.minWidth}
                    max={limits.maxWidth}
                    title={"Width"}
                    units={"in."}
                  />
                  <div className="row my-3">
                    <div className="col-9 offset-3">
                      <div className="row">
                        <div className="col-11 g-0 offset-1">
                          <input
                            type="range"
                            className="form-range"
                            step=".25"
                            min={limits.minLength}
                            max={limits.maxLength}
                            value={length}
                            id="lengthRange"
                            onChange={lengthChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-1 g-0" id="verticalCol">
                          <input
                            type="range"
                            className="form-range pb-4"
                            step=".25"
                            min={limits.minWidth}
                            max={limits.maxWidth}
                            value={width}
                            id="verticalRange"
                            onChange={widthChange}
                          />
                        </div>
                        <div className="col-11 g-0" id="heaterIllustration">
                          <div
                            id="dimDiv"
                            style={{
                              width: (length / limits.maxLength) * 100 + "%",
                              height: (width / limits.maxWidth) * 100 + "%",
                              borderRadius: "0%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="circleInfo" className={`hidden ${shape === data.btnVals.shapeVals[1] ? 'show' : ''}`}>
                  <Spinner
                    stateVar={diameter}
                    callback={diamChange}
                    min={limits.minDiam}
                    max={limits.maxDiam}
                    title={"Diameter"}
                    units={"in."}
                  />
                  <div className="row my-3">
                    <div className="col-9 offset-3">
                      <div className="row">
                        <div className="col-12 g-0">
                          <input
                            type="range"
                            className="form-range"
                            min={limits.minDiam}
                            max={limits.maxDiam}
                            value={diameter}
                            onChange={diamChange}
                            id="diamRange"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 g-0" id="diamIllustration">
                          <div
                            id="diamDiv"
                            style={{
                              height: (diameter / limits.maxDiam) * 100 + "%",
                              width: (diameter / limits.maxDiam) * 100 + "%",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="otherInfo" className={`hidden ${shape === data.btnVals.shapeVals[2] ? 'show' : ''}`}>
                  <div className="row my-3">
                    <div className="col-9 offset-3">
                      <input className="form-control" type="file" id="otherShapeUpload"/>
                      <br />
                      Please upload a file
                      <InfoBubble message="Accepted file extensions are: .gif, .png, .jpeg, .jpg, and .pdf" />
                      &nbsp; that clearly shows the dimensions of your desired
                      silicone rubber heater, along with any additional holes or
                      cutouts you may require.
                      <br />
                      <br />
                      We will not be able to instantly quote you a price for
                      this heater, and instead will respond with an email quote
                      in approximately one business day.
                    </div>
                  </div>
                </div>
            </div>
          </div>
          <div id="closeLeadsTstat" className="box" role="tablist">
            <h3>
              <i className="fa-solid fa-caret-down pe-2 fa-xs"></i>
              <b>Leads, Closures, and Thermostats</b>
            </h3>
            <div className="boxInfo p-3">
              <ButtonGroup
                stateVar={leads}
                callback={leadsChange}
                title={"Leads"}
                values={data.btnVals.leadsVals}
              />
              <div className={`hidden ${leads === data.btnVals.leadsVals[2] ? 'show' : ''}`}>
              <ButtonGroup 
                  stateVar={sjoType}
                  callback={sjoTypeChange}
                  title={"SJO Type"}
                  values={data.btnVals.sjoVals}
                  showTitle={false}
                />
              </div>
                
              <div className="row my-3 ">
                <div className="col-9 offset-3">
                  <div className="row">
                    <div className="col-6">
                      <img
                        className="infoPic"
                        src={data.btnInfo[leads].img}
                        alt="Leads Pic"
                      />
                    </div>
                    <div className="col-6">
                      {data.btnInfo[leads].desc}
                      {data.btnInfo[leads].note !== "" && (
                      <InfoBubble message={data.btnInfo[leads].note} />
                      )}
                    </div>
                    
                  </div>
                  <Spinner
                    stateVar={leadLength}
                    callback={leadLengthChange}
                    min={limits.minLeadLength}
                    max={limits.maxLeadLength}
                    title={"Lead Length"}
                    units={"in."}
                    colWidth={6}
                  />
                  <hr />
                </div>
              </div>

              <ButtonGroup
                stateVar={closure}
                callback={closureChange}
                title={"Closure"}
                values={data.btnVals.closureVals}
              />
              
                <div className={`row my-3 hidden ${closure !== "None" ? 'show' : ''}`}>
                  <div className="col-9 offset-3">
                    <div className="row">
                      <div className="col-6">
                        <img
                          className="infoPic"
                          src={data.btnInfo[closure].img}
                          alt="Closure Pic"
                        />
                      </div>
                      <div className="col-6">
                        {data.btnInfo[closure].desc}
                        {data.btnInfo[closure].note !== "" && (
                      <InfoBubble message={data.btnInfo[closure].note} />
                      )}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              <ButtonGroup
                stateVar={tstat}
                callback={tstatChange}
                title={"Thermostat"}
                values={data.btnVals.tstatVals}
              />
                <div className={`row my-3 hidden ${tstat !== "None" ? 'show' : ''}`}>
                  <div className="col-9 offset-3">
                    <div className="row my-3">
                      <div className="col-6 configTitle">
                        <h5 >
                          Thermostat Type:
                        </h5>
                       </div>
                       <div className="col-6"> 
                        <TstatTypes
                          callback={tstatTypeChange}
                          options={data.btnInfo[tstat].options}
                        />
                      </div>
                    </div>
                    <div className="row center infoRow my-3">
                      <div className="col-6">
                        Low Temp (Heater On):
                        <hr />
                        <h5 className="me-1">{tstatLow}</h5>
                        {tstatLow !== "Room Temp" && (
                          <span>
                            F<sup>o</sup>
                          </span>
                        )}
                      </div>
                      <div className="col-6">
                        High Temp (Heater Off):
                        <hr />
                        <h5 className="me-1">{tstatHigh}</h5>F<sup>o</sup>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <img
                          className="infoPic"
                          src={data.btnInfo[tstat].img}
                          alt="Closure Pic"
                        />
                      </div>
                      <div className="col-6">
                        {data.btnInfo[tstat].desc}
                        {data.btnInfo[tstat].note !== "" && (
                      <InfoBubble message={data.btnInfo[tstat].note} />
                      )}
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
              <ButtonGroup
                stateVar={tcouple}
                callback={tcoupleChange}
                title={"Thermocouple"}
                values={data.btnVals.tcoupleVals}
              />
            </div>
          </div>
          <div id="powerVoltage" className="box" role="tablist">
            <h3>
              <i className="fa-solid fa-caret-down pe-2 fa-xs"></i>
              <b>Power, Voltage, and Submit</b>
            </h3>
            <div className="boxInfo p-3">
              <div className="row infoRow center">
                <div className="col-6">
                  Max Watt Density
                  <InfoBubble message="The durability and performance of a heater depends on selecting the appropriate wattage. Exceeding the maximum allowable watt density for the specified heater size will result in premature heater failure." />
                  <hr />
                  <h5>{limits.maxWattDensity}</h5>W/in<sup>2</sup>
                </div>
                <div className="col-6">
                  Max Amperage
                  <InfoBubble message="Amps = Watts / Volts. Silicone rubber heaters have a limit of 15 amps for a single circuit. More circuits are available on request. Thermostats are also limited in the amperage they can tolerate at any particular voltage." />
                  <hr />
                  <h5>{limits.maxAmps}</h5>Amps
                </div>
              </div>
              <Spinner
                stateVar={voltage}
                callback={voltageChange}
                min={limits.minVolt}
                max={limits.maxVolt}
                title={"Voltage"}
                units={"volts"}
              />
              <div className="row my-3">
                <div className="col-9 offset-3">
                  <div className="row">
                    <div className="col-9">
                      <input
                        type="range"
                        className="form-range"
                        min={limits.minVolt}
                        max={limits.maxVolt}
                        disabled={limits.minVolt >= limits.maxVolt}
                        value={voltage}
                        onChange={voltageChange}
                        id="voltRange"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">{limits.minVolt}V</div>
                    <div className="col-2 offset-5 right">
                      {limits.maxVolt}V
                    </div>
                  </div>
                </div>
              </div>
              <Spinner
                stateVar={power}
                callback={powerChange}
                min={limits.minWatts}
                max={limits.maxWatts}
                title={"Power"}
                units={"watts"}
              />
              <div className="row my-3">
                <div className="col-9 offset-3">
                  <div className="row">
                    <div className="col-9">
                      <input
                        type="range"
                        className="form-range"
                        min={limits.minWatts}
                        max={limits.maxWatts}
                        disabled={limits.minWatts >= limits.maxWatts}
                        value={power}
                        onChange={powerChange}
                        id="powerRange"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">{limits.minWatts}W</div>
                    <div className="col-2 offset-5 right">
                      {limits.maxWatts}W
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBubble({ message }) {
  return (
    <OverlayTrigger overlay={<Tooltip>{message}</Tooltip>}>
      <i className="fa fa-circle-info ms-1"></i>
    </OverlayTrigger>
  );
}

function ButtonGroup(props) {
  const { stateVar, callback, title, values, showTitle = true } = props;

  return (
    <div className={`row my-3 buttonRow`}>
      <div className="col-3 configTitle align-items-center">{showTitle && <h5>{title}:</h5>}</div>
      <div className="col-9">
        <div className="btn-group" role="group" aria-label="Leads Buttons">
          {values.map((value, index) => (
            <Fragment key={title + index}>
              <input
                type="radio"
                className="btn-check"
                id={title + index}
                checked={stateVar === value}
                onChange={(event) => callback(event.target.value)}
                value={value}
              />
              <label
                key={title + index}
                className="btn btn-outline-dark"
                htmlFor={title + index}
              >
                {value}
              </label>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function Spinner(props) {
  const {
    stateVar,
    callback,
    min,
    max,
    title,
    units,
    showTitle = true,
    colWidth = 3,
  } = props;

  return (
    <div className="row my-3">
      <div className={"configTitle col-" + colWidth}>
        {showTitle && <h5>{title}:</h5>}
      </div>
      <div className={"col-" + (12 - colWidth)}>
        <div className="form-outline spinner">
          <input
            min={min}
            max={max}
            disabled={min >= max}
            value={stateVar}
            type="number"
            id={title + "spinner"}
            className="form-control"
            onChange={callback}
          />
        </div>
        <span className="ps-2">{units}</span>
      </div>
    </div>
  );
}

function TstatTypes(props) {
  const { callback, options } = props;

  useEffect(() => {
    if (options.length) callback(options[0].value);
  }, [options]);

  return (
    <select className="form-select" onChange={(event) => callback(event.target.value)}>
      {options.map((option, index) => (
        <option key={option.value + index} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}

export default App;
