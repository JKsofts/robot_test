export default class MissionController {
  constructor(robot) {
    console.log("Creating MissionController!");
    this.robot = robot;
    this.currentWaypointIndex = 0;
    this.updater = this.#pollPosition();
  }

  setTrajetory = (trajectory) => {
    if (this.#isValidTrajectory(trajectory)) {
      this.trajectory = trajectory;
      this.currentWaypointIndex = 0;
    } else console.log("invalid trajectory");
  };

  //validates trajectory to be an array of integer arrays
  #isValidTrajectory = (trajectory) => {
    return (
      Array.isArray(trajectory) &&
      trajectory.every((_waypoint) => {
        return (
          Array.isArray(_waypoint) &&
          _waypoint.every((point) => Number.isInteger(point))
        );
      })
    );
  };

  #pollPosition = () => {
    return setInterval(() => {
      let position = this.robot.getPosition();
      let hasRobotReached = position.every((value, index) => {
        let currentWayPoint = this.trajectory[this.currentWaypointIndex - 1];
        if (currentWayPoint) return value === currentWayPoint[index];
      });

      if (this.currentWaypointIndex === 0 || hasRobotReached) {
        this.sendNavigationCommand();
        this.currentWaypointIndex++;
      } else if (this.currentWaypointIndex === this.trajectory.length + 1) {
        clearInterval(this.updater);
      }
    }, 100);
  };

  sendNavigationCommand = async () => {
    let currentWaypoint = this.trajectory[this.currentWaypointIndex];
    if (currentWaypoint) {
      console.log(`Sending waypoint ${this.currentWaypointIndex}`);
      await this.robot.setNavigationCommand(currentWaypoint);
    } else {
      console.log("done");
    }
  };
}
