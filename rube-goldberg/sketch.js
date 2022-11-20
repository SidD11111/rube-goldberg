var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Collision = Matter.Collision,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Vector = Matter.Vector
    Events = Matter.Events
    Bounds = Matter.Bounds
    World = Matter.World;


var ball, ball2, ball3, ball4, ball5;
var funnelPart1, funnelPart2;
var ballInFunnel;
var bouncyStep1, bouncyStep2, bouncyStep3;
var current
var stack;
var hasHitStack = false;
var noGravityBodies = [];

var wreckingBallStarted;

var firstBallPositionReset = false;

var circ2 = null;

var finalDomino;

var toMoveX =4500;
var toMoveY = 3700;

var rectLeft,
  rectRight,
  testCircle,
  cam,
  plinkos = [],
  whichT = [],
  circles = [],
  tunnel = [],
  cars = [],
  ground = [],
  rows = 10,
  cols = 11,
  noGravity = true;
    
function setup(){
    createCanvas(0, 0);

  // camera code
  cam = Bodies.circle(1000, 630, 13, {
    collisionFilter: 1,
    frictionAir: 0,
    render: { visible: false },
  });

    engine = Engine.create();

    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1420,
            height: 800,
            showAngleIndicator: false,
            showCollisions: false,
            showVelocity: false,
            wireframes: false,
            hasBounds : true
        }
    });

    sidPart();

    //siya's part
    createPlinko();
    createTunnels();
    createCars();
  
    anshuPart();
  
    initialized = true;
  
    //method 1 of no gravity
    Events.on(engine, "beforeUpdate", function () {
      var gravity = engine.world.gravity;
  
      if (noGravity) {
        Body.applyForce(cam, cam.position, {
          x: -gravity.x * gravity.scale * cam.mass,
          y: -gravity.y * gravity.scale * cam.mass,
        });
      }
    });

    sidPart2();

    constructWalls();
    gears();
    constructDominoes();
    transitionToGears();
    gearsPt2();
    downRamp();

    sidPart3();

    Matter.Runner.run(engine);
    Render.run(render);
}


var pseudoForceBoolean = true;
var car3;
var xShift = 1950;
var yShift = 3600;
//render: { fillStyle: "White" },
function anshuPart() {
  world = engine.world;

  var widthScaleFactor = 3.5;

  var path = Bodies.rectangle(710 + xShift, 300 + yShift, 310, 20, {
    friction: 0.01,
    restitution: 0,
    isStatic: true,
    angle: radians(15),
    render: { fillStyle: "White" },
  });
  var path1 = Bodies.rectangle(350 + xShift, 350 + yShift, 260, 20, {
    friction: 0.01,
    restitution: 0,
    isStatic: true,
    angle: radians(15),
    render: { fillStyle: "White" },
  });
  var pathStopper = Bodies.rectangle(590 + xShift, 250 + yShift, 5, 5, {
    friction: 0.2,
    restitution: 0,
    isStatic: true,
    angle: radians(15),
    render: { fillStyle: "White" },
  });
  var path1Stopper = Bodies.rectangle(253 + xShift, 306 + yShift, 5, 5, {
    friction: 0.2,
    restitution: 0,
    isStatic: true,
    angle: radians(15),
    render: { fillStyle: "White" },
  });
  Composite.add(world, [path, path1, pathStopper, path1Stopper]);
  console.log(path);

  //Creating final cart bounds
  var ground = Bodies.rectangle(250 + xShift, 590 + yShift, 680, 20, {
    isStatic: true,
    angle: radians(10),
    friction: 0,
    render: { fillStyle: "White" },
  });
  var box1L = Bodies.rectangle(600 + xShift, 670 + yShift, 20, 60, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var box1B = Bodies.rectangle(680 + xShift, 690 + yShift, 80, 20, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var box1R = Bodies.rectangle(760 + xShift, 670 + yShift, 20, 60, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var car3Stopper = Bodies.rectangle(-53 + xShift, 518 + yShift, 5, 5, {
    isStatic: true,
    angle: radians(0),
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var boxConnection = Bodies.rectangle(820 + xShift, 650 + yShift, 100, 20, {
    isStatic: true,
    friction: 0.01,
    render: { fillStyle: "White" },
  });
  var box2L = Bodies.rectangle(875 + xShift, 670 + yShift, 20, 60, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var box2B = Bodies.rectangle(957 + xShift, 690 + yShift, 80, 20, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  var box2R = Bodies.rectangle(1040 + xShift, 670 + yShift, 20, 60, {
    isStatic: true,
    friction: 0.2,
    render: { fillStyle: "White" },
  });
  Composite.add(world, [
    ground,
    box1L,
    box1B,
    box1R,
    car3Stopper,
    boxConnection,
    box2L,
    box2B,
    box2R,
  ]);

  //===============================================================================
  // Adding revolute constraint to a rectangular bar.
  var x = 337;
  var y = 200;
  var spinningThing1 = Bodies.rectangle(x + xShift, y + yShift, 450, 10, {
    angle: radians(15),
  });
  var constraint = Constraint.create({
    pointA: { x: x + xShift, y: y + yShift },
    bodyB: spinningThing1,
    length: 0,
  });
  Composite.add(world, [spinningThing1, constraint]);
  //---------------------------------------------------
  x = 60;
  y = 275;
  var spinningThing2 = Bodies.rectangle(x + xShift, y + yShift, 325, 10, {
    angle: radians(15),
  });
  constraint = Constraint.create({
    pointA: { x: x + xShift, y: y + yShift },
    bodyB: spinningThing2,
    length: 0,
  });
  Composite.add(world, [spinningThing2, constraint]);
  //---------------------------------------------------
  x = -190;
  y = 510;
  var spinningThing3 = Bodies.rectangle(x + xShift, y + yShift, 220, 10, {
    angle: radians(10),
  });
  constraint = Constraint.create({
    pointA: { x: x + xShift, y: y + yShift },
    bodyB: spinningThing3,
    length: 0,
  });
  Composite.add(world, [spinningThing3, constraint]);

  //===============================================================================
  // Creating a car
  var scale = 0.9;
  Composite.add(
    world,
    car(615 + xShift, 210 + yShift, 150 * scale, 30 * scale, 25 * scale, 0.1)
  );
  Composite.add(
    world,
    car(285 + xShift, 258 + yShift, 150 * scale, 30 * scale, 25 * scale, 0.1)
  );
  car3 = car(
    -30 + xShift,
    470 + yShift,
    150 * scale,
    20 * scale,
    30 * scale,
    0.05
  );
  Composite.add(world, car3);
  console.log(car3);
  console.log(car3.bodies[0].position.x);

  //===============================================================================

  var divider1 = Bodies.rectangle(710 + xShift, 80 + yShift, 310, 20, {
    friction: 0.2,
    restitution: 0,
    isStatic: true,
    angle: radians(-45),
    render: { fillStyle: "White" },
  });
  var divider2 = Bodies.rectangle(350 + xShift, 250 + yShift, 140, 20, {
    friction: 0.2,
    restitution: 0,
    isStatic: true,
    angle: radians(0),
    render: { fillStyle: "White" },
  });
  var divider3 = Bodies.rectangle(10 + xShift, 380 + yShift, 250, 20, {
    friction: 0.2,
    restitution: 0,
    isStatic: true,
    angle: radians(-30),
    render: { fillStyle: "White" },
  });

  Composite.add(world, [divider1, divider2, divider3]);

  //===============================================================================

  var dominoGround = Bodies.rectangle(1500 + xShift, 655 + yShift, 800, 20, {
    isStatic: true,
    render: { fillStyle: "White" },
  });
  Composite.add(world, [dominoGround]);

  for (let i = 0; i < 25; i++) {
    var domino = Bodies.rectangle(
      1150 + xShift + 30 * i,
      620 + yShift,
      10,
      50,
      {
        friction: 0.01,
        restitution: 0.7,
      }
    );
    if(i == 24) {
        finalDomino = domino;
    }
    Composite.add(world, domino);
  }

  var shouldSetCarCam = true;
  Events.on(engine, "collisionStart", function (event) {
    for (let i = 0; i < plinkos.length; i++) {
      if (
       (Matter.Collision.collides(plinkos[i], spinningThing1) ||
        Matter.Collision.collides(plinkos[i], spinningThing2) ||
        Matter.Collision.collides(plinkos[i], spinningThing3)) && !wreckingBallStarted
      ) {
        console.log("ball collides spinningthing");
        World.remove(engine.world, plinkos[i]);
        if(shouldSetCarCam) {
            current = car3.bodies[0];
            shouldSetCarCam = false;
        }
      }
    }
  });
}

function car(xx, yy, width, height, wheelSize, wheelFriction) {
  var group = Body.nextGroup(true),
    wheelBase = 20,
    wheelAOffset = -width * 0.5 + wheelBase,
    wheelBOffset = width * 0.5 - wheelBase,
    wheelYOffset = 0;

  var car = Composite.create({ label: "Car" }),
    body = Bodies.rectangle(xx, yy, width, height, {
      collisionFilter: {
        group: group,
      },
      chamfer: {
        radius: height * 0.5,
      },
      density: 0.0001,
      render: { fillStyle: "Orange" },
    });

  var wheelA = Bodies.circle(xx + wheelAOffset, yy + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: wheelFriction,
    render: { fillStyle: "Orange" },
  });

  var wheelB = Bodies.circle(xx + wheelBOffset, yy + wheelYOffset, wheelSize, {
    collisionFilter: {
      group: group,
    },
    friction: wheelFriction,
    render: { fillStyle: "Orange" },
  });

  var axelA = Constraint.create({
    bodyB: body,
    pointB: { x: wheelAOffset, y: wheelYOffset },
    bodyA: wheelA,
    stiffness: 1,
    length: 0,
  });

  var axelB = Constraint.create({
    bodyB: body,
    pointB: { x: wheelBOffset, y: wheelYOffset },
    bodyA: wheelB,
    stiffness: 1,
    length: 0,
  });

  Composite.addBody(car, body);
  Composite.addBody(car, wheelA);
  Composite.addBody(car, wheelB);
  Composite.addConstraint(car, axelA);
  Composite.addConstraint(car, axelB);

  return car;
}

var catapult,
  weight,
  holder,
  target,
  circ,
  toFling,
  boxSide1,
  boxSide2,
  boxSide3,
  boxSide4,
  ramp1,
  ramp2,
  ramp3;
function sidPart() {
  //Ball Escape From Box
  circ = Bodies.circle(100, 70, 20, {
    density: 1.25,
    frictionAir: 0.00000000000000001,
  });

  Matter.Body.setMass(circ, 1000);
  current = circ;

  boxSide1 = Bodies.rectangle(100, 20, 100, 5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide3 = Bodies.rectangle(51, 70, 5, 104, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide4 = Bodies.rectangle(149, 70, 5, 104, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide5 = Bodies.rectangle(40, 120, 20, 5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide6 = Bodies.rectangle(32, 129, 5, 20, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide7 = Bodies.rectangle(160, 120, 20, 5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide8 = Bodies.rectangle(39.5, 140, 20, 5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });
  boxSide9 = Bodies.rectangle(160, 140, 20, 5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });

  boxSlideablePart = Bodies.rectangle(100, 120, 135, 5, {
    render: { fillStyle: "white" },
  });
  Matter.Body.setMass(boxSlideablePart, 200);

  document.addEventListener(
    "keydown",
    (event) => {
      if (boxSlideablePart.position.x < 120) {
        Body.applyForce(
          boxSlideablePart,
          { x: boxSlideablePart.position.x, y: boxSlideablePart.position.y },
          { x: 15, y: 0 }
        );
      }
    },
    false
  );

  World.add(engine.world, [
    boxSide1,
    boxSlideablePart,
    boxSide3,
    boxSide4,
    boxSide5,
    boxSide6,
    boxSide7,
    boxSide8,
    boxSide9,
  ]);

  //Ramps Series
  ramp1 = Bodies.rectangle(250, 250, 700, 20, {
    isStatic: true,
    angle: 0.1,
    render: { fillStyle: "white" },
  });

  ramp2 = Bodies.rectangle(500, 500, 700, 20, {
    isStatic: true,
    angle: -0.4,
    render: { fillStyle: "white" },
  });

  ramp3 = Bodies.rectangle(250, 800, 700, 20, {
    isStatic: true,
    angle: 0.3,
    render: { fillStyle: "white" },
  });

  World.add(engine.world, [ramp1, ramp2, ramp3]);

  //Catapult
  var group = Body.nextGroup(true);

  toFling = Bodies.rectangle(575, 1100, 35, 35, {
    frictionAir: 0.001,
    friction: 1,
    render: { fillStyle: "white" },
  });
  Matter.Body.setMass(toFling, 0.001);

  seesawBoard = Bodies.rectangle(700, 1120, 320, 20, {
    collisionFilter: { group: group },
    friction: 1,
    render: { fillStyle: "black" },
  });
  Matter.Body.setMass(seesawBoard, 30);

  ground = Bodies.rectangle(400, 1200, 1000, 50.5, {
    isStatic: true,
    render: { fillStyle: "white" },
  });

  holder = Bodies.rectangle(700, 1135, 20, 80, {
    isStatic: true,
    collisionFilter: { group: group },
  });
  target = Bodies.circle(1200, 700, 120, { isStatic: true });

  Composite.add(engine.world, [
    target,
    toFling,
    seesawBoard,
    ground,
    holder,
    circ,
    Constraint.create({
      bodyA: seesawBoard,
      pointB: Vector.clone(seesawBoard.position),
      stiffness: 1,
      length: 0,
    }),
  ]);

  var explodebool = false;
  Events.on(engine, "collisionStart", function (event) {
    if (Matter.Collision.collides(toFling, target) && !explodebool) {
        Matter.World.remove(engine.world, target);
        Matter.World.remove(engine.world, toFling);
      explodebool = true;
      console.log("collided");
      explode();
    }
     if(circ2 != null && Matter.Collision.collides(circ2, seesawBoard)) {
         current = toFling;
     }
  });
}

//siya part start
var run = true;
function explode() {
  if (run) {
    run = false;
    console.log("hellooooo");

    // if(run){
    var rep = 3;
    var row = 1;

    for (var i = 0; i < 9; i++) {
      var x = 1200 - 25 * Math.floor(rep / 2);
      var y = 700 + (row - 5) * 25;
      for (var k = 0; k < rep; k++) {
        plinkos.push(Bodies.circle(x, y, 11, { restitution: 0.7 }));
        x += 25;
        whichT.push(0);
      }
      current = plinkos[15];
      row += 1;
      if (row == 2 || row == 7) {
        rep = 7;
      } else if (row == 4) {
        rep = 9;
      } else if (row == 9) {
        rep = 3;
      }
    }

    World.add(engine.world, [...plinkos]);
  }
}

function createPlinko() {
  rectLeft = Bodies.rectangle(983, 1200, 500, 20, {
    isStatic: true,
    angle: Math.PI * 0.37,
    render: { fillStyle: "white" },
  });
  rectRight = Bodies.rectangle(1413, 1205, 535, 20, {
    isStatic: true,
    angle: Math.PI * 0.665,
    render: { fillStyle: "white" },
  });

  var x = 898;
  var rep = 10;
  var y = 985;

  for (var i = 0; i < 7; i++) {
    for (var k = 0; k < rep; k++) {
      circles.push(
        Bodies.circle(x, y, 13, {
          isStatic: true,
          render: { fillStyle: "white" },
        })
      );
      x += 70;
    }
    x -= 70 * rep;
    x += 30;
    rep--;
    y += 70;
  }

  Composite.add(engine.world, [rectLeft, rectRight, ...circles]);
}

function createTunnels() {
  //section 1: left to right
  tunnel.push(
    Bodies.rectangle(1080, 1835, 833, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1148, 1793, 774, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1218, 1755, 703, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1283, 1730, 595, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  //section 2: top to bottom
  tunnel.push(
    Bodies.rectangle(1472.5, 2037, 400, 21, {
      isStatic: true,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1472.5, 2103, 529.5, 21, {
      isStatic: true,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1482.5, 2170, 680, 21, {
      isStatic: true,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1489, 2240, 822, 21, {
      isStatic: true,
      render: { fillStyle: "white" },
    })
  );

  //section 3: left to right
  tunnel.push(
    Bodies.rectangle(1662, 1645, 800, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1738, 1696, 834, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1813, 1748, 862, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1889, 1803, 895, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  //section 4: bottom to top
  tunnel.push(
    Bodies.rectangle(2015, 1269, 320, 21, {
      isStatic: true,
      angle: Math.PI * 0.8,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1978, 1205, 420, 21, {
      isStatic: true,
      angle: Math.PI * 0.8,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1942, 1137, 510, 21, {
      isStatic: true,
      angle: Math.PI * 0.8,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1903, 1077, 600, 21, {
      isStatic: true,
      angle: Math.PI * 0.8,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );

  //section 5: bottom to top
  tunnel.push(
    Bodies.rectangle(2261, 1269, 320, 21, {
      isStatic: true,
      angle: Math.PI * 0.2,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2304, 1205, 420, 21, {
      isStatic: true,
      angle: Math.PI * 0.2,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2343, 1137, 510, 21, {
      isStatic: true,
      angle: Math.PI * 0.2,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2378, 1077, 600, 21, {
      isStatic: true,
      angle: Math.PI * 0.2,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );

  //section 5: left to right
  tunnel.push(
    Bodies.rectangle(2388, 1954, 1197, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2468, 1949, 1262, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2547, 1944, 1330, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2618, 1945, 1400, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  //section 6: bottom to top
  tunnel.push(
    Bodies.rectangle(2366, 2892, 720, 21, {
      isStatic: true,
      angle: Math.PI * 0.75,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2231, 2921, 900, 21, {
      isStatic: true,
      angle: Math.PI * 0.75,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2090, 2955, 1080, 21, {
      isStatic: true,
      angle: Math.PI * 0.75,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2010, 2925, 1075, 21, {
      isStatic: true,
      angle: Math.PI * 0.75,
      friction: 0,
      render: { fillStyle: "white" },
    })
  );

  //section 7: right to left individuals
  tunnel.push(
    Bodies.rectangle(2115, 3290, 300, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(2041, 3276, 328, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  tunnel.push(
    Bodies.rectangle(1916, 3482, 500, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1841, 3468, 528, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  tunnel.push(
    Bodies.rectangle(1711, 3679, 700, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );
  tunnel.push(
    Bodies.rectangle(1634, 3662, 734, 21, {
      isStatic: true,
      angle: Math.PI * 0.5,
      render: { fillStyle: "white" },
    })
  );

  Composite.add(engine.world, [...tunnel]);
}

function tunnelUpdate(){
    for(var i = 0; i < plinkos.length; i++){
        //section 1 forces
        tunnelForce(i, 4, 5, 2, 1);
        tunnelForce(i, 5, 6, 1, 1);
        tunnelForce(i, 6, 7, 0, 1);

        //section 2 forces
        tunnelForce(i, 8, 9, 5, 2);
        tunnelForce(i, 9, 10, 6, 2);
        tunnelForce(i, 10, 11, 7, 2);

        //section 3 forces
        tunnelForce(i, 14, 15, 0, 3);
        tunnelForce(i, 13, 14, 0, 3);
        tunnelForce(i, 12, 13, 0, 3);
    }
}

function tunnelForce(int, t1, t2, t3, which){
    if(which == 1){
        if(plinkos[int].position.y > tunnel[t1].position.y && plinkos[int].position.y < tunnel[t2].position.y && plinkos[int].position.x > tunnel[t3].position.x){
            Body.applyForce(plinkos[int], plinkos[int].position, {x: 0.0005, y: 0})
            if(whichT[int] == 0){
                whichT[int] = t1 - 3;
            }
        }
    } else if (which == 2){
        // console.log(plinkos[int].position.x > tunnel[t1].position.x && plinkos[int].position.x < tunnel[t2].position.x && plinkos[int].position.y < tunnel[t3].position.y && whichT[int] == t1 - 7);
        if(plinkos[int].position.x > tunnel[t1].position.x && plinkos[int].position.x < tunnel[t2].position.x && plinkos[int].position.y < tunnel[t3].position.y && whichT[int] == t1 - 7){
            Body.applyForce(plinkos[int], plinkos[int].position, {x: 0, y: -0.0005})
        }
    } else if (which == 3){
        var {max, min} = tunnel[t1].bounds;
        if(plinkos[int].position.x > min.x && plinkos[int].position.x < max.x + 5 && plinkos[int].position.y < max.y && whichT[int] == 15 - t1){
            console.log("working");
            Body.applyForce(plinkos[int], plinkos[int].position, {x: .006, y: .006})
x        }
    }
}

function createCars() {
  // ground.push(Bodies.rectangle(2135, 2867, 822, 21, {isStatic: true, render: {fillStyle: "white"}}))
  // ground.push(Bodies.rectangle(1930, 3164, 822, 21, {isStatic: true, render: {fillStyle: "white"}}))
  // ground.push(Bodies.rectangle(1725, 3461, 822, 21, {isStatic: true, render: {fillStyle: "white"}}))
  // Composite.add(engine.world, [...ground]);
}
//siya part end

function mouseDragged() {
  plinkos.push(new Bodies.circle(mouseX, mouseY, 12, { restitution: 0.7 }));
  whichT.push(0);
  Composite.add(engine.world, plinkos[plinkos.length - 1]);
//   current = plinkos[0];
}

function mouseClicked() {
  console.log("x: " + mouseX);
  console.log("y: " + mouseY);
}

function startWreckingBall(){
    if(!wreckingBallStarted) {
        Composite.remove(engine.world, [blocker, ...circles, ...tunnel, rectLeft, rectRight, ramp1, ramp2, ramp3, ...plinkos]);
          
        current = ball3;
        wreckingBallStarted = true;
    }
}

function sidPart2(){
    //Wrecking Ball
    var rows = 10,
    yy = 600 - 25 - 40 * rows;
    
    stack = Composites.stack(1000+ toMoveX, yy+ toMoveY, 5, rows, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y, 40, 40, {mass: 10, render: {fillStyle: "pink"}});
    });
    
    var ground = Bodies.rectangle(400+ toMoveX, 600+ toMoveY, 2000, 50, { isStatic: true });

    Composite.add(engine.world, [stack, ground]);
    
    ball = Bodies.circle(200+ toMoveX, 500+ toMoveY, 50, { density: 0.04, frictionAir: 0.005, isStatic: false, restitution: 1, render: {fillStyle: "cyan"}});
    blocker = Bodies.rectangle(-100 + toMoveX, 260 + toMoveY, 100, 20, {isStatic: true});
    ball2 = Bodies.circle(350+ toMoveX, 500+ toMoveY, 50, { density: 0.04, frictionAir: 0.005, isStatic: false, restitution: 1, render: {fillStyle: "cyan"}});
    ball3 = Bodies.circle(500+ toMoveX, 500+ toMoveY, 50, { density: 0.04, frictionAir: 0.005, isStatic: false, restitution: 1, render: {fillStyle: "cyan"}});
    ball4 = Bodies.circle(650+ toMoveX, 500+ toMoveY, 50, { density: 0.04, frictionAir: 0.005, isStatic: false, restitution: 1, render: {fillStyle: "cyan"}});
    ball5 = Bodies.circle(800+ toMoveX, 500+ toMoveY, 50, { density: 0.04, frictionAir: 0.005, isStatic: false, restitution: 1, render: {fillStyle: "cyan"}});

    Composite.add(engine.world, [ball, ball2, ball3, ball4, ball5, blocker]);

    Composite.add(engine.world, Constraint.create({
        pointA: { x: 200+ toMoveX, y: 200+ toMoveY },
        bodyB: ball
    }));

    Matter.Body.set(ball, "position", {x: 0+ toMoveX, y: 200+ toMoveY});

    Composite.add(engine.world, Constraint.create({
        pointA: { x: 350+ toMoveX, y: 200+ toMoveY },
        bodyB: ball2
    }));

    Composite.add(engine.world, Constraint.create({
        pointA: { x: 500+ toMoveX, y: 200 + toMoveY},
        bodyB: ball3
    }));

    Composite.add(engine.world, Constraint.create({
        pointA: { x: 650+ toMoveX, y: 200+ toMoveY },
        bodyB: ball4
    }));
    
    Composite.add(engine.world, Constraint.create({
        pointA: { x: 800+ toMoveX, y: 200 + toMoveY},
        bodyB: ball5
    }));

    //Funnel -> Push Ball
    funnelPart1 = Bodies.rectangle(1680+ toMoveX, 840+ toMoveY, 700, 50, {
        isStatic: true,
        angle: 0.7,
    });

    funnelPart2 = Bodies.rectangle(2302+ toMoveX, 840+ toMoveY, 700, 50, {
        isStatic: true,
        angle: -0.7,
    });

    ballInFunnel = Bodies.circle(2000+ toMoveX, 990+ toMoveY, 30, { density: 1.25, frictionAir: 0.00000000000000001, restitution: .4, render: {fillStyle: "cyan"}});

    World.add(engine.world, [funnelPart1, funnelPart2]);


    //Make Ball Bounce On Steps
    bouncyStep1 = Bodies.rectangle(2000+ toMoveX, 1500+ toMoveY, 250, 25, { isStatic: true , render: {fillStyle: "pink"}});
    bouncyStep2 = Bodies.rectangle(2700+ toMoveX, 1500+ toMoveY, 250, 25, { isStatic: true , render: {fillStyle: "pink"}});
    bouncyStep3 = Bodies.rectangle(3800+ toMoveX, 1500+ toMoveY, 250, 25, { isStatic: true , render: {fillStyle: "pink"}});


    World.add(engine.world, [bouncyStep1, bouncyStep2, bouncyStep3, ballInFunnel]);


    //collisions
    Events.on(engine, 'collisionStart', function(event) {

        if((Matter.Collision.collides(ballInFunnel, bouncyStep1))){
            Body.setVelocity( ballInFunnel, {x: 9.75, y: -9.75});
            ballInFunnel.restitution = 1.75;
        } else if((Matter.Collision.collides(ballInFunnel, bouncyStep3))){
            Body.setVelocity( ballInFunnel, {x: 12, y: -25});
            ballInFunnel.restitution = 1.75;
        }

        for(var i = 0; i < Matter.Composite.allBodies(stack).length; i++) {
            if((Matter.Collision.collides(ball5, Matter.Composite.allBodies(stack)[i])) && !hasHitStack){
                current = Matter.Composite.allBodies(stack)[34];
                hasHitStack = true;
            }

            if((Matter.Collision.collides(ballInFunnel, Matter.Composite.allBodies(stack)[i]))){
                current = ballInFunnel;
            }
        }
        
    });

}

function mouseClicked(){
    console.log("x: " + mouseX);
    console.log("y: " + mouseY);
}

var walls = []
function constructWalls(){
    walls.push(Bodies.rectangle(5300+ toMoveX, 500+ toMoveY, 20, 220, {isStatic: true , render: {fillStyle: "white"}}))
    walls.push(Bodies.rectangle(4300+ toMoveX, 830+ toMoveY, 20, 200, {isStatic: true , render: {fillStyle: "white"}}))
    walls.push(Bodies.rectangle(6300+ toMoveX, 1100+ toMoveY, 40, 200, {isStatic: true , render: {fillStyle: "white"}}))
    walls.push(Bodies.rectangle(5300+ toMoveX, 1400+ toMoveY, 20, 200, {isStatic: true , render: {fillStyle: "white"}}))
    walls.push(Bodies.rectangle(6000+ toMoveX, 1500+ toMoveY, 1422, 20, {isStatic: true , render: {fillStyle: "white"}}))
    Composite.add(engine.world, [...walls])

    Events.on(engine, 'collisionStart', function(event) {
        if((Matter.Collision.collides(ballInFunnel, walls[0]))){
            Body.setVelocity(ballInFunnel, {x: -22, y: 1.6});
        } else if((Matter.Collision.collides(ballInFunnel, walls[1]))){
            Body.setVelocity(ballInFunnel, {x: 42, y: .75});
        } else if((Matter.Collision.collides(ballInFunnel, walls[2]))){
            Body.setVelocity(ballInFunnel, {x: -22, y: 3});
        } else if((Matter.Collision.collides(ballInFunnel, walls[3]))){
            Body.setVelocity(ballInFunnel, {x: 15, y: 0});
            ballInFunnel.restitution = 0;
        }
    });
}

var allGears = [];
var gearConstraints = [];
function gears(){
    allGears.push(createGear(6820+ toMoveX, 1900+ toMoveY, 150, 370, 40, 0));
    
    // allGears[0].torque = 500;
    // Body.setAngularVelocity(allGears[0], .06);

    allGears.push(createGear(7055+ toMoveX, 2150+ toMoveY, 150, 370, 40, .3));
    allGears.push(createGear(7295+ toMoveX, 2400+ toMoveY, 150, 370, 40, 0));
    allGears.push(createGear(7530+ toMoveX, 2650+ toMoveY, 150, 370, 40, .3));
    allGears.push(createGear(7775+ toMoveX, 2895+ toMoveY, 150, 370, 40, 0));

    for(var i = 0; i< allGears.length; i++){
        gearConstraints.push(Constraint.create({
            pointA: Vector.clone(allGears[i].position), 
            bodyB: allGears[i], 
            stiffness: 1, 
            length: 0
        }))
        noGravityBodies.push(allGears[i]);
    }

    noGravity = true;
    Composite.add(engine.world, [...allGears, ...gearConstraints]);
}

function createGear(x, y, r, l, w, o){
    circle = Bodies.circle(x, y, r, {render: {fillStyle: "white"}});
    rect1 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * 0 + o, render: {fillStyle: "white"}});
    rect2 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * .5 + o, render: {fillStyle: "white"}});
    rect3 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * .17 + o, render: {fillStyle: "white"}});
    rect4 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * .34 + o, render: {fillStyle: "white"}});
    rect5 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * .67 + o, render: {fillStyle: "white"}});
    rect6 = Bodies.rectangle(x, y, l, w, {angle: Math.PI * .84 + o, render: {fillStyle: "white"}});

    return Body.create({
        parts: [circle, rect1, rect2, rect3, rect4, rect5, rect6], 
        frictionAir: 0, 
        friction: 0
    });
}

var dominoes = [];
var dominoesKnocked = false;
function constructDominoes(){
    var ground = Bodies.rectangle(8900+ toMoveX, 3300+ toMoveY, 2000, 30, {isStatic: true , render: {fillStyle: "white"}});

    x = 8350;
    for(var i = 0; i < 25; i++){
        dominoes.push(Bodies.rectangle(x+ toMoveX, 3200+ toMoveY, 20, 100, {mass: 10, frictionAir: 0}));
        x += 55
    }

    Composite.add(engine.world, [ground, ...dominoes]);

    Events.on(engine, 'collisionStart', function(event) {
        if((Matter.Collision.collides(ballInFunnel, dominoes[0]))){
            Body.setAngularVelocity(dominoes[0], Math.PI/18);
            Body.setVelocity(dominoes[0], {x: 5, y: 0})
            Body.setVelocity(ballInFunnel, {x: 0, y: 0})

            if(!dominoesKnocked){
              current = dominoes[12];
            }
        }
        if(!dominoesKnocked){
            for(var i = 1; i < dominoes.length; i++){
                if((Matter.Collision.collides(dominoes[i-1], dominoes[i]))){
                    Body.setAngularVelocity(dominoes[i], Math.PI * .01);
                    Body.setAngularVelocity(dominoes[i-1], 0);
                }
            }
        }
        if((Matter.Collision.collides(dominoes[24], rectLever))){
            Body.setAngularVelocity(dominoes[24], 0);
            Body.setVelocity(dominoes[24], {x: 0, y: 0})
            Body.setAngularVelocity(rectLever, -0.3);
            dominoesKnocked = true;
            current = allGears2[4];
        }
    });
}

var rectLever, leverCon;
function transitionToGears(){
    rectLever = Bodies.rectangle(9750+ toMoveX, 3090+ toMoveY, 30, 300, {render: {fillStyle: "white"}});
    leverCon = Constraint.create({
      pointA: {x: 9750+ toMoveX, y: 3090+ toMoveY},
      bodyB: rectLever,
      stiffness: 1,
      length: 0
    });
  
    Composite.add(engine.world, [rectLever, leverCon]);
}

var allGears2 = [];
var gearConstraints2 = [];
function gearsPt2(){        
    // Body.setAngularVelocity(allGears[0], .06);

    allGears2.push(createGear(9700+ toMoveX, 2770+ toMoveY, 150, 370, 40, 0));
    allGears2.push(createGear(9935+ toMoveX, 2520+ toMoveY, 150, 370, 40, .2));
    allGears2.push(createGear(10170+ toMoveX, 2270+ toMoveY, 150, 370, 40, 0));
    allGears2.push(createGear(10405+ toMoveX, 2020+ toMoveY, 150, 370, 40, .2));
    allGears2.push(createGear(10640+ toMoveX, 1770+ toMoveY, 150, 370, 40, 0));

    for(var i = 0; i< allGears2.length; i++){
        gearConstraints2.push(Constraint.create({
            pointA: Vector.clone(allGears2[i].position), 
            bodyB: allGears2[i], 
            stiffness: 1, 
            length: 0
        }))
        noGravityBodies.push(allGears2[i]);
    }

    Events.on(engine, 'collisionStart', function(event) {
        if((Matter.Collision.collides(rectLever, allGears2[0])) && dominoesKnocked){
            Body.setAngularVelocity(allGears2[0], .03);
        }
    });

    Composite.add(engine.world, [...allGears2, ...gearConstraints2]);
}

var ropeToCoil;
var spinDone = false;
var readyToSpin = false;
var toCoilAround;   
var hasHitBucket = false;
var fireworksStarted = false;
var allInBucket = [];
var replica;
var counterForBuckets = 0;
var counterForFireworks = 0;
var bucket1Part1, bucket1Part2, bucket1Part3;
var bucket2Part1, bucket2Part2, bucket2Part3;
var bucket3Part1, bucket3Part2, bucket3Part3;
var balloon, balloonRope;
var oldRock = null;

var ramp = [];
var hitBall;
function downRamp(){
    rectLever2 = Bodies.rectangle(10690+ toMoveX, 1465+ toMoveY, 30, 300, {render: {fillStyle: "white"}});
    leverCon2 = Constraint.create({
      pointA: {x: 10690+ toMoveX, y: 1465+ toMoveY},
      bodyB: rectLever2,
      stiffness: 1,
      length: 0
    });

    hitBall = Bodies.circle(10866 + toMoveX, 1400 + toMoveY, 50);
    // Body.setVelocity(hitBall, {x: 10, y: 0});

    ramp.push(Bodies.rectangle(10956+ toMoveX, 1450+ toMoveY, 200, 20, {isStatic: true, render: {fillStyle: "white"}}));
    ramp.push(Bodies.rectangle(11416+ toMoveX, 1710+ toMoveY, 900, 20, {isStatic: true, angle: Math.PI * .20, render: {fillStyle: "white"}}))
    ramp.push(Bodies.rectangle(11786+ toMoveX, 2080+ toMoveY, 200, 20, {isStatic: true, angle: Math.PI * .5, render: {fillStyle: "white"}}))
    ramp.push(Bodies.rectangle(11886+ toMoveX, 2170+ toMoveY, 200, 20, {isStatic: true, render: {fillStyle: "white"}}))
    ramp.push(Bodies.rectangle(11986+ toMoveX, 2080+ toMoveY, 200, 20, {isStatic: true, angle: Math.PI * .5, render: {fillStyle: "white"}}))

    Composite.add(engine.world, [rectLever2, leverCon2, ...ramp, hitBall]);

    var alreadyRemoved = false;
    Events.on(engine, 'collisionStart', function(event) {
        if((Matter.Collision.collides(rectLever2, hitBall))){
            console.log("hello");
            Body.setVelocity(hitBall, {x: 16, y: 0});
            current = hitball;
            if(!alreadyRemoved){
              Composite.remove(engine.world, [dominoes, ballInFunnel])
              alreadyRemoved = true;
            }
        } else if((Matter.Collision.collides(hitBall, ramp[3])) && !readyToSpin && !spinDone){
            console.log("fml");
            readyToSpin = true;
            current = ropeToCoil.bodies[ropeToCoil.bodies.length - 1]
        }
    });
}

function sidPart3(){
    var group = Body.nextGroup(true);

    ropeToCoil = Composites.stack(12560+ toMoveX, 1040+ toMoveY, 25, 1, 0, 0, function(x, y) {
        return Bodies.rectangle(x, y + 20, 53, 20, { 
            collisionFilter: { group: group },
            chamfer: 5,
            density: 0.005,
            frictionAir: 0.05,
            rotationSpeed : 0,
            render: {
                fillStyle: 'white'
            }
        });
    });

    ropeToCoil.bodies[ropeToCoil.bodies.length-1] = Bodies.circle(ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.x, ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.y, 20, { density: 1.25, frictionAir: 0.00000000000000001, render: {fillStyle: "cyan"}});
    Matter.Body.setMass(ropeToCoil.bodies[ropeToCoil.bodies.length-1], 1)
    
    Composites.chain(ropeToCoil, 0.3, 0, -0.3, 0, { 
        stiffness: 0,
        length: 0,
        render: {
            visible: false
        }
    });
 

    Composite.add(engine.world, [
        ropeToCoil,

        Constraint.create({ 
            pointA: { x: 12540+ toMoveX, y: 1050+ toMoveY}, 
            bodyB: ropeToCoil.bodies[0], 
            pointB: { x: -25, y: 0 },
            length: 2,
            stiffness: 0
        })
    ]);


    toCoilAround = Bodies.circle(12500+ toMoveX, 1080+ toMoveY, 40, { isStatic: true, render: {fillStyle: "cyan"}});

    bucket1Part1 = Bodies.rectangle(12787+ toMoveX, 2305+ toMoveY, 140, 25, { isStatic: true, render: {fillStyle: "cyan"}});
    bucket1Part2 = Bodies.rectangle(12687+ toMoveX, 2220+ toMoveY, 200, 25, { isStatic: true, angle: 1.1, render: {fillStyle: "cyan"}});
    bucket1Part3 = Bodies.rectangle(12887+ toMoveX, 2220+ toMoveY, 200, 25, { isStatic: true, angle: -1.1, render: {fillStyle: "cyan"}});

    bucket2Part1 = Bodies.rectangle(13087+ toMoveX, 1635+ toMoveY, 140, 25, { isStatic: true, render: {fillStyle: "cyan"}});
    bucket2Part2 = Bodies.rectangle(12987+ toMoveX, 1720+ toMoveY, 200, 25, { isStatic: true, angle: -1.1, render: {fillStyle: "cyan"}});
    bucket2Part3 = Bodies.rectangle(13187+ toMoveX, 1720+ toMoveY, 200, 25, { isStatic: true, angle: 1.1, render: {fillStyle: "cyan"}});

    bucket3Part1 = Bodies.rectangle(13387+ toMoveX, 2305+ toMoveY, 140, 25, { isStatic: true, render: {fillStyle: "cyan"}});
    bucket3Part2 = Bodies.rectangle(13287+ toMoveX, 2220+ toMoveY, 200, 25, { isStatic: true, angle: 1.1, render: {fillStyle: "cyan"}});
    bucket3Part3 = Bodies.rectangle(13487+ toMoveX, 2220+ toMoveY, 200, 25, { isStatic: true, angle: -1.1, render: {fillStyle: "cyan"}});

    balloon = Bodies.circle(14500+ toMoveX, 2200+ toMoveY, 60, {
        mass: 0.001,
        render: {
            fillStyle: 'pink',
            strokeStyle: 'blue',
            lineWidth: 3,
        }
    });


    balloonRope = Constraint.create({
        pointA: { x: 14200+ toMoveX, y: 2500 + toMoveY},
        bodyB: balloon,
        render: { strokeStyle: 'gray', lineWidth: 2, }
    });
   
    Composite.add(engine.world, [balloon, balloonRope]);
    
    // document.addEventListener('keydown', (event) => {
    //     const keyName = event.key;
        
    //     if(keyName === 'W'){
    //         readyToSpin = true;
    //     }
        
    // }, false);

    bucketManipulation();

    World.add(engine.world, [toCoilAround, bucket1Part1, bucket1Part2, bucket1Part3, bucket2Part1, bucket2Part2, bucket2Part3, bucket3Part1, bucket3Part2, bucket3Part3]);
}

function bucketManipulation(){
    Events.on(engine, 'collisionStart', function(event) {
        if(spinDone && !hasHitBucket) {
            if(Collision.collides(replica, bucket1Part1) || Collision.collides(replica, bucket1Part2) || Collision.collides(replica, bucket1Part3)) {
                    Matter.World.remove(engine.world, replica);
                    for(var i = 0; i < 20; i++) {
                        allInBucket.push(Bodies.circle(replica.position.x, replica.position.y, 10, { density: 1.25, frictionAir: 0.05, render: {fillStyle: "cyan"}}));
                        current = allInBucket[9];
                        World.add(engine.world, allInBucket[allInBucket.length-1]);
                    }
                    hasHitBucket = true;
                    
            }           
        }
    });
}

function getPerp(body){
    var arrToReturn = [];
    if(body.position.x < 12200+ toMoveX && body.position.y < 1360+ toMoveY) {
        arrToReturn.push(0);
        arrToReturn.push(-1);    
    }
    else if(body.position.y < 1000 + toMoveY ) {
        arrToReturn.push(1);
        arrToReturn.push(0);    
    }
    else if(body.position.x > 12800+ toMoveX && body.position.y < 1290 + toMoveY) {
        arrToReturn.push(0);
        arrToReturn.push(1);    
    }
    else {
        arrToReturn.push(-1);
        arrToReturn.push(0);
    }
    return arrToReturn;
}

function combineIntoBullet(){
    for(var i = 0; i < allInBucket.length; i++) {
        if(allInBucket[i].position.y <= 1940+toMoveY) {
            Matter.Body.setStatic(allInBucket[i], true);
        }
    }

    if(checkReadyToCombine()) {
        for(var i = 0; i < allInBucket.length; i++) {
            World.remove(engine.world, allInBucket[i]);
        }
        allInBucket = [];
        engine.world.gravity.x = 0;
        engine.world.gravity.y = -1;
        makeSlingshot();
    }
}

function makeSlingshot(){
    oldRock;

    current = balloon;

    var rockOptions = { density: 0.004 },
    rock = Bodies.circle(13600+ toMoveX, 1935+ toMoveY, 20, rockOptions),
    anchor = { x: 13600+ toMoveX, y: 1935 + toMoveY},
    elastic = Constraint.create({ 
        pointA: anchor, 
        bodyB: rock, 
        stiffness: 0.05
    });


    Composite.add(engine.world, [rock, elastic]);

    Events.on(engine, 'afterUpdate', function() {
        if (mouseConstraint.mouse.button === -1 && (rock.position.x > 13620+ toMoveX || rock.position.y < 1915+ toMoveY)) {
            oldRock = rock;
            rock = Bodies.circle(13600+ toMoveX, 1935+ toMoveY, 20, rockOptions);
            Composite.add(engine.world, rock);
            elastic.bodyB = rock;
        }
    });

    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(engine.world, mouseConstraint);

    render.mouse = mouse;

}

function checkReadyToCombine(){
    var ready = true;
    for(var i = 0; i < allInBucket.length; i++) {
        if(allInBucket[i].position.y > 2000 + toMoveY) {
            ready = false;
        }
    }
    return ready;
}

var fireworkXCoord;
var fireworkYCoord;
function startFireworks(){
    fireworksStarted = true;

    engine.world.gravity.x = 0;
    engine.world.gravity.y = 0;

    fireworkXCoord = balloon.position.x;
    fireworkYCoord = balloon.position.y;

    World.remove(engine.world, balloon);

    explodeFireworks();
}

var allFireworks = [];
function explodeFireworks(){
    for(var j = 0; j < allFireworks.length; j++) {
        World.remove(engine.world, allFireworks[j]);
    }

    allFireworks = [];

    for(var j = 0; j < 40; j++) {
        var toAdd = Bodies.circle(fireworkXCoord, fireworkYCoord, 5);
        allFireworks.push(toAdd);
        Composite.add(engine.world, toAdd);
        Matter.Body.setVelocity(toAdd, {x: (Math.random() * 20) + -10, y: Math.random() * 20 + -10});
    }
}

var viewPortMaxX = 3000;
var viewPortMaxY = 3000;
var viewPortMinX = 0;
var viewPortMinY = 0;
var boolean = false;
function draw() {
    // console.log(current);

    Render.lookAt(render, {
        min: {x: current.position.x-1050, y: current.position.y-600},
        max: {x: current.position.x+1050, y: current.position.y+600}
    });


    if(finalDomino.position.x > 3855 && !wreckingBallStarted) {
        startWreckingBall();
    } 

    if (
        circ.position.x >= 5 &&
        circ.position.y >= 705 &&
        !firstBallPositionReset
      ) {
        circ2 = Bodies.circle(56.52924779191082, 713.3489762758539, 20, { density: 1.25, frictionAir: 0.00000000000000001, render: {fillStyle: "cyan"}});
        current = circ2;
        Body.setVelocity(circ2, {x: 7, y: 16});
        firstBallPositionReset = true;
        World.add(engine.world, circ2);
        Matter.World.remove(engine.world, circ);
      }
    
      if (boxSlideablePart.position.y >= 750) {
        Matter.World.remove(engine.world, boxSlideablePart);
      }
      //sid part end
    
      //siya start
      tunnelUpdate();
      //siya end
    
      //anshu start
      if (car3.bodies[0].position.x >= 450 + xShift && pseudoForceBoolean) {
        // Body.setVelocity(car3, { x: 0, y: py - bodyA.position.y });
        Body.applyForce(
          car3.bodies[0],
          { x: car3.bodies[0].position.x, y: car3.bodies[0].position.y },
          { x: 0.3, y: 0 }
        );
        console.log("this happened");

        current = finalDomino;
    
        pseudoForceBoolean = false;
      }
    

    if(readyToSpin) {
        console.log("trying");
        for(var i = 0; i < ropeToCoil.bodies.length; i++) {
            Body.applyForce(ropeToCoil.bodies[i], {x: ropeToCoil.bodies[i].position.x, y:ropeToCoil.bodies[i].position.y}, {x: 0.016 * getPerp(ropeToCoil.bodies[ropeToCoil.bodies.length-1])[0], y: 0.016 * getPerp(ropeToCoil.bodies[ropeToCoil.bodies.length-1])[1]});
        }
    }
    
    if(ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.x < 12920+ toMoveX && ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.x > 12520+ toMoveX) {
        if(ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.y > 1020 + toMoveY && ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.y < 1080 + toMoveY && !spinDone) {

            Body.scale(ropeToCoil.bodies[ropeToCoil.bodies.length-1], 0.00001, 0.00001);
            replica = Bodies.circle(ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.x, ropeToCoil.bodies[ropeToCoil.bodies.length-1].position.y, 20, { density: 1.25, frictionAir: 0.05, render: {fillStyle: "cyan"}});
            current = replica;
            ropeToCoil.bodies.splice(ropeToCoil.bodies.length-1, 1);

            Body.setVelocity(replica, ropeToCoil.bodies[ropeToCoil.bodies.length-1].velocity);
            Body.setAngularVelocity(replica, ropeToCoil.bodies[ropeToCoil.bodies.length-1].angularVelocity);
            World.add(engine.world, replica);
            
            spinDone = true;
            readyToSpin = false;

            console.log("x: " + replica.position.x + ", y: " +  replica.position.y);
            console.log("velocity: " + replica.velocity);
            console.log("angular velocity: " + replica.angularVelocity);
        }
    }

    if(hasHitBucket) {
        counterForBuckets += 1;
        console.log(counterForBuckets);
    }

    if(counterForBuckets >= 390) {
        if(allInBucket.length > 0) {
            engine.world.gravity.x = 1;
            engine.world.gravity.y = -1;
            combineIntoBullet();
        }
    }
    
    else if (counterForBuckets >= 240) {
        engine.world.gravity.x = 0.7;
        engine.world.gravity.y = 1;
    }

    else if(counterForBuckets >= 90) {
        engine.world.gravity.x = 0.7;
        engine.world.gravity.y = -1;
    }

    if(oldRock != null && oldRock.position.y > 2200+ toMoveY && oldRock.position.y < 2500+ toMoveY && oldRock.position.x > 14100+ toMoveX && oldRock.position.x < 16600+ toMoveX) {
      // current = rock;
      Composite.remove(engine.world, balloonRope);
    }

    if(!fireworksStarted && balloon.position.y < 1400+ toMoveY) {
        startFireworks();
    }

    if(fireworksStarted) {
        counterForFireworks++;
        if(counterForFireworks % 90 == 0) {
            explodeFireworks();
        }
    }
}