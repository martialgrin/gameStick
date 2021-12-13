const NEWLEVELS = [
  {
    id: 4,
    target: [
      { x: 0.5, y: 0.8 },
      { x: 0.4, y: 0.5 },
      { x: 0.4, y: 0.2 },
    ],
    body: [
      {
        name: "FromHipToAnkle",
        start: 0,
        end: [11, 12],
      },
      {
        name: "FromLeftElbowToWrist",
        start: 7,
        end: 9,
      },

      // {
      //   name: "FromNoseToHip",
      //   start: 0,
      //   end: [11, 12],
      // },
      // {
      //   name: "FromHipToAnkle",
      //   start: 11,
      //   end: 16,
      // },
    ],
  },
  {
    id: 1,
    body: [
      {
        name: "FromHipToAnkle",
        end: [11, 12],
        start: [15, 16],
      },
      {
        name: "FromNoseToHip",
        end: 0,
        start: [11, 12],
      },
    ],
  },
  {
    id: 2,
    body: [
      {
        name: "FromHipToAnkle",
        end: [11, 12],
        start: [15, 16],
      },
      {
        name: "FromNoseToHip",
        end: 0,
        start: [11, 12],
      },
      {
        name: "FromLeftElbowToWrist",
        start: 7,
        end: 8,
      },
    ],
  },
  {
    id: 3,
    body: [
      {
        name: "FromLeftElblowToShoulder",
        start: 5,
        end: 7,
      },
      {
        name: "FromLeftElbowToWrist",
        end: 9,
        start: 7,
      },
    ],
  },
];

export default NEWLEVELS;
