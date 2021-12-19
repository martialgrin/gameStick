//Two number: left -right value

// 0: Nose
// 1-2:Eye
// 3-4: Ear
// 5-6: Shoulder
// 7-8: Elbow
// 9-10: Wrist
// 11-12: Hip
// 13-14: Knee
// 15-16: Ankle

const INTROLEVEL = {
  errorMargin: 0.2,
  id: 1,
  targetsAngle: [-1.57, -1.2],
  body: [
    {
      name: "Nose",
      start: 0,
      end: 0,
    },
    {
      name: "FromNoseToShoulder",
      start: 0,
      end: [5, 6],
    },
    {
      name: "FromLeftAnkleToHip",
      start: 5,
      end: [11, 12],
    },
    {
      name: "FromHipToNose",
      start: [11, 12],
      end: 0,
    },
  ],
};

const LEVELS = [
  {
    errorMargin: 0.2,
    id: 1,
    targetsAngle: [-1.57, -1.2],
    body: [
      {
        name: "FromLeftAnkleToHip",
        start: [15, 16],
        end: [11, 12],
      },
      {
        name: "FromHipToNose",
        start: [11, 12],
        end: 0,
      },
    ],
  },
  {
    errorMargin: 0.3,
    id: 2,
    targetsAngle: [-1.57, -1.2, 0],
    body: [
      {
        name: "FromAnkleToHip",
        start: [15, 16],
        end: [11, 12],
      },
      {
        name: "FromHipToNose",
        start: [11, 12],
        end: 0,
      },
      {
        name: "FromLeftElblowToLeftWrist",
        start: 7,
        end: 9,
      },
    ],
  },
  {
    errorMargin: 0.3,
    id: 3,
    targetsAngle: [-1.57, -1.2, 0, -3],
    path: [0, 1, 1, 0],
    body: [
      {
        name: "FromAnkleToHip",
        start: [15, 16],
        end: [11, 12],
      },
      {
        name: "FromHipToNose",
        start: [11, 12],
        end: 0,
      },
      {
        name: "FromLeftElblowToLeftWrist",
        start: 7,
        end: 9,
      },
      {
        name: "FromLeftShoulderToRightShoulder",
        start: 5,
        end: 6,
      },
    ],
  },
  {
    errorMargin: 0.3,
    id: 4,
    targetsAngle: [-1.57, -1.2, 0, -3, 0],
    path: [0, 1, 0, 1, 0],
    body: [
      {
        name: "FromAnkleToHip",
        start: [15, 16],
        end: [11, 12],
      },
      {
        name: "FromHipToNose",
        start: [11, 12],
        end: 0,
      },
      {
        name: "FromLeftElblowToLeftWrist",
        start: 7,
        end: 9,
      },
      {
        name: "FromLeftShoulderToRightShoulder",
        start: 5,
        end: 6,
      },
      {
        name: "FromLeftShoulderToRightShoulder",
        start: 11,
        end: 13,
      },
    ],
  },
];

export default LEVELS;
