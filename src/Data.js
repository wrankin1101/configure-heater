export const defaultLimits = {
  minWidth: 1,
  maxWidth: 38,
  minLength: 1,
  maxLength: 98,
  minDiam: 1,
  maxDiam: 37,
  minLeadLength: 1,
  maxLeadLength: 240,
  minVolt: 12,
  maxVolt: 480,
  minWatts: 10,
  maxWatts: 10,
  maxWattDensity: 10,
  maxAmps: 15,
};
export const tstatLimits = {
  minWidth: 2.5,
  minLength: 6,
  minDiam: 6,
  minVolt: 100,
  maxVolt: 250,
  maxAmps: 12,
};

export const btnVals = {
  shapeVals: ["Rectangle", "Circle", "Other"],
  leadsVals: ["PTFE", "Silicone Rubber", "SJO"],
  sjoVals: ["No Plug", "2-Prong", "3-Prong"],
  closureVals: ["None", "Velcro", "Spring", "Adhesive"],
  tstatVals: ["None", "Preset", "Adjustable"],
  tcoupleVals: ["None", "Type J", "Type K"],
};

//array for different options. images and descriptions
export const btnInfo = {
  Velcro: {
    title: "Velcro Closure",
    img: "/images/velcro.jpeg",
    desc: "Velcro straps are used to secure the heater to a surface. Used when flexible heaters must be detachable from cylindrical parts.",
    note: "",
  },
  Spring: {
    title: "Spring Closure",
    img: "/images/spring.jpeg",
    desc: "When a silicone rubber heater is wrapped around an application, the ends of the heater can be fastened by metallic fasteners with springs.",
    note: "",
  },
  Adhesive: {
    title: "Pressure Sensitive Adhesive (PSA)",
    img: "/images/adhesive.jpeg",
    desc: "Pressure Sensitive Adhesive (PSA). Peel off the protective liner and apply. It will adhere to most clean, smooth surfaces. ",
    note: "Selecting PSA will limit the watt density of the heater to 5 W/in\xB2.",
  },
  PTFE: {
    title: "PTFE Leads",
    img: "/images/ptfe-leads.jpeg",
    desc: "PTFE-insulated, flexible, stranded, plated copper wire. Lead connections are insulated with vulcanized silicone rubber, which also acts as a strain relief.",
    note: "",
  },
  "Silicone Rubber": {
    title: "Silicon Rubber Leads",
    img: "/images/siliconerubber.jpeg",
    desc: "Ensures a moisture seal on the heater. Silicone rubber leads are more flexible, but are not as abrasion-resistant as PTFE leads.",
    note: "",
  },
  SJO: {
    title: "SJO Leads",
    img: "/images/sjo.jpeg",
    desc: "An SJO heavy-duty power cord and plug set can be attached to the heaters.",
    note: "Including a plug will limit voltage to 120V.",
  },
  Preset: {
    title: "Preset Thermostat",
    img: "/images/preset-tstat.jpeg",
    desc: "The preset thermostats automatically reset at preset temperature. An electrically isolated bimetallic disc is used to either open or close the circuit current.",
    note: "Selecting any thermostat will limit the size, voltage, and wattage of the heater.",
    options: [
      {value:"OA50", name: "OA-50", low: 32, pmlow: 10, high: 50, pmhigh: 5 },
      {value:"OA60", name: "OA-60", low: 40, pmlow: 7, high: 60, pmhigh: 5 },
      {value:"OA85", name: "OA-85", low: 67, pmlow: 9, high: 85, pmhigh: 5 },
      {value:"OA110", name: "OA-110", low: 80, pmlow: 10, high: 110, pmhigh: 5 },
      {value:"OA120", name: "OA-120", low: 90, pmlow: 10, high: 120, pmhigh: 5 },
      {value:"OA140", name: "OA-140", low: 110, pmlow: 10, high: 140, pmhigh: 5 },
      {value:"OA150", name: "OA-150", low: 120, pmlow: 10, high: 150, pmhigh: 5 },
      {value:"OA190", name: "OA-190", low: 160, pmlow: 10, high: 190, pmhigh: 5 },
      {value:"OA200", name: "OA-200", low: 170, pmlow: 10, high: 200, pmhigh: 5 },
      {value:"OA250", name: "OA-250", low: 220, pmlow: 10, high: 250, pmhigh: 7 },
      {value:"OA300", name: "OA-300", low: 240, pmlow: 10, high: 300, pmhigh: 7 },
    ]
  },
  Adjustable: {
    title: "Adjustable Thermostat",
    img: "/images/adjustable-tstat.jpeg",
    desc: "Adjustable thermostats allow the user to dial in a specific temperature. The thermostat is enclosed in a molded silicone rubber housing and permanently attached to the heater.",
    note: "Selecting any thermostat will limit the size, voltage, and wattage of the heater.",
    options: [
      {value:"A4059", name: "A-4059", low: 100, pmlow: 10, high: 165, pmhigh: 10 },
      {value:"A4051", name: "A-4051", low: "Room Temp", pmlow: 0, high: 205, pmhigh: 7 },
      {value:"A4081", name: "A-4081", low: "Room Temp", pmlow: 0, high: 375, pmhigh: 15 },
    ]
  },
  None: {
    title: "",
    img: "",
    desc: "",
    note: "",
    options: []
  },
};
