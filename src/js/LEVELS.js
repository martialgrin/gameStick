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
    ],
  },
  {
    errorMargin: 0.1,
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
];

export default LEVELS;
