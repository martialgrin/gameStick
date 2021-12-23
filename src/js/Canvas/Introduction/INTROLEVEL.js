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
  path: [0, 1, 1, 0, 1, 0],
  body: [
    {
      name: "FromNoseToShoulder",
      start: 0,
      end: [5, 6],
    },
    {
      name: "LeftShoulderLeftWrist",
      start: 5,
      end: 9,
    },
    {
      name: "RightShoulderRightWrist",
      start: 6,
      end: 10,
    },
    {
      name: "FromShoulderToHip",
      start: [5, 6],
      end: [11, 12],
    },
    {
      name: "FromHipToLeftAnkle",
      start: [11, 12],
      end: 15,
    },
    {
      name: "FromHipToRightAnkle",
      start: [11, 12],
      end: 16,
    },
  ],
};

export default INTROLEVEL;
