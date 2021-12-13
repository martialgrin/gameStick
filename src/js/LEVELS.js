const LEVELS = [
  {
    id: 1,
    body: [
      {
        name: "nose",
        difference: false,
        parts: 0,
      },
      {
        name: "Hip",
        difference: true,
        parts: [11, 12],
      },
      {
        name: "Ankle",
        difference: true,
        parts: [15, 16],
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
        name: "Hip",
        difference: true,
        parts: [11, 12],
      },
      {
        name: "LeftWrist",
        difference: false,
        parts: 9,
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

export default LEVELS;
