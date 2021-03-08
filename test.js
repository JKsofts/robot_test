import SimulatedRobot from "./simulatedRobot.js";
import missionController from "./missionController.js";

const runNormalOperation = async () => {
  //instantiate the robot at a given initial point
  const robot = new SimulatedRobot([2, 1]);
  const controller = new missionController(robot);

  let initial_trajectory = [
    [4, 3],
    [5, 3],
  ];
  let updated_trajectory = [
    [3, 3],
    [5, 4],
  ];

  controller.setTrajetory(initial_trajectory);

  //change trajectory after 1 seconds (before the robot reaches to the current destination)
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  controller.setTrajetory(updated_trajectory);
};

runNormalOperation();
