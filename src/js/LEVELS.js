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

const LEVELS = [
  {
    errorMargin: 0.1,
    id: 1,
    targetsAngle: [-1.57, -1.2],
    body: [
      {
        name: "FromLeftAnkleToHip",
        start: 15,
        end: [11, 12],
      },
      {
        name: "FromHipToNose",
        start: [11, 12],
        end: 0,
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

export default LEVELS;
