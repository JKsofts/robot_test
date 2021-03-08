export default class SimulatedRobot {
  constructor(intialPosition) {
    console.log("Creating SimulatedRobot!");
    this.position = intialPosition;
    this.isNavigating = false;
  }
  getPosition = () => {
    return this.position;
  };

  setPosition = (postion) => {
    this.position = postion;
  };

  setNavigationCommand = (waypoint) => {
    // random eta between 2 and 3 secs
    let randomETA = Math.floor(Math.random() * 1000 + 2000);

    if (this.isNavigating) {
      clearTimeout(this.isNavigating);
      console.log("Cancel current trip...");
    }

    console.log(`Commanding robot to move to ${waypoint}`);

    this.isNavigating = setTimeout(() => {
      this.setPosition(waypoint);
      console.log(`********** Robot arrived to ${waypoint} **********`);

      this.isNavigating = false;
    }, randomETA);
  };
}
