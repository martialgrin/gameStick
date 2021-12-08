const NEWLEVELS = [
  {
    id: 1,
    body: [
      {
        name: "FromNoseToHip",
        start: 0,
        end: [11, 12],
      },
      {
        name: "FromHipToAnkle",
        start: [11, 12],
        end: [15, 16],
      },
    ],
  },
  {
    id: 2,
    body: [
      {
        name: "nose",
        difference: false,
        parts: 0,
      },
      {
        name: "leftShoulder",
        difference: false,
        parts: 5,
      },
      {
        name: "leftWrist",
        difference: false,
        parts: 10,
      },
    ],
  },
  {
    id: 3,
    body: [
      {
        name: "nose",
        difference: false,
        parts: 0,
      },
      {
        name: "shoulder",
        difference: true,
        parts: [6, 5],
      },
      {
        name: "hip",
        difference: true,
        parts: [11, 12],
      },
    ],
  },
];

export default NEWLEVELS;
