var c; // canvas
var ctx; // canvas context
var changeButton;

var dropRagdolls = true;
var countdown = 5;
var countdownMax = 5;

// module aliases
var Engine = Matter.Engine,
	Events = Matter.Events,
	Render = Matter.Render,
	Runner = Matter.Runner,
	Body = Matter.Body,
	Common = Matter.Common,
	Composite = Matter.Composite,
	Composites = Matter.Composites,
	Constraint = Matter.Constraint,
	MouseConstraint = Matter.MouseConstraint,
	Mouse = Matter.Mouse,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Vector = Matter.Vector;
	
// create an engine
var engine = Engine.create();
    world = engine.world;
    
var render = Render.create({
	element: document.body,
	engine: engine,
    options: {
        width: 1920/2,
        height: 650,
        background: '#0f0f13',
        showAngleIndicator: true,
        wireframes: false
    }
});

var runner = Runner.create();

// run the engine
Engine.run(engine);
Render.run(render);
Runner.run(runner, engine);

var couchBot = Bodies.rectangle(0, 25, 300, 50, { isStatic: true }),
    couchLeft = Bodies.rectangle(-150, -50, 20, 35, { isStatic: true }),
    couchRight = Bodies.rectangle(150, -50, 20, 35, { isStatic: true }),
	couch = Body.create({
		parts: [couchBot, couchLeft, couchRight],
		isStatic: true
    });

var ground = Bodies.rectangle(600, 600, 300, 50, { isStatic: true });


// add all of the bodies to the world
World.add(world, [couch, ground]);

///////////

// fit the render viewport to the scene
Render.lookAt(render, {
    min: { x: 0, y: 0 },
    max: { x: 800, y: 600 }
});

var ragdolls = Composite.create();

for (var i = 0; i < 4; i++) {
    var ragdoll;

    var xPos = 100 + i * 100;
    var yPos = 200;
    var xScale = 1;
    var yScale = 1;

    var genericRenderOptions = {
        // fillStyle: Common.choose(['#ffffff', '#000000']), // Common.choose(['#006BA6', '#0496FF', '#D81159', '#8F2D56']),
        strokeStyle: '#ffffff',
    };
    var head = './img/char/head_' + i + '.png';
    var chest = './img/char/chest_' + i + '.png';
    var armU = './img/char/arm_upper_' + i + '.png';
    var armL = './img/char/arm_lower_' + i + '.png';
    var legU = './img/char/leg_upper_' + i + '.png';
    var legL = './img/char/leg_lower_' + i + '.png';

    ragdoll = createRagdoll(
        xPos, 
        yPos, 
        xScale, 
        yScale, 
        genericRenderOptions,
        head,
        chest,
        armU,
        armL,
        legU,
        legL
    );

    Composite.add(ragdolls, ragdoll);
}

World.add(world, [ragdolls]);

//////////////

// create obstacles
/*
var obstacles = Composites.stack(200, 50, 2, 2, 10, 10, function(x, y, column) {
    var sides = Math.round(Common.random(7, 8)),
        options = {
            render: {
                fillStyle: Common.choose(['#006BA6', '#0496FF', '#D81159', '#8F2D56'])
            }
        };

    switch (Math.round(Common.random(0, 1))) {
    case 0:
        if (Common.random() < 0.8) {
            return Bodies.rectangle(x, y, Common.random(25, 50), Common.random(25, 50), options);
        } else {
            return Bodies.rectangle(x, y, Common.random(80, 120), Common.random(25, 30), options);
        }
    case 1:
        return Bodies.polygon(x, y, sides, Common.random(25, 50), options);
    }
});

World.add(world, [obstacles]);
*/

// add mouse control
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

World.add(world, mouseConstraint);

// keep the mouse in sync with rendering
render.mouse = mouse;

// an example of using mouse events on a mouse
Events.on(mouseConstraint, 'mousedown', function(event) {
    var mousePosition = event.mouse.position;
    console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
    // shakeScene(engine);
});

// an example of using mouse events on a mouse
Events.on(mouseConstraint, 'mouseup', function(event) {
    var mousePosition = event.mouse.position;
    console.log('mouseup at ' + mousePosition.x + ' ' + mousePosition.y);
});

// an example of using mouse events on a mouse
Events.on(mouseConstraint, 'startdrag', function(event) {
    console.log('startdrag', event);
});

// an example of using mouse events on a mouse
Events.on(mouseConstraint, 'enddrag', function(event) {
    console.log('enddrag', event);
});

/*
var shakeScene = function(engine) {
    var bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            var forceMagnitude = 0.02 * body.mass;

            Body.applyForce(body, body.position, { 
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
        }
    }
};
*/

Events.on(engine, 'afterUpdate', function(event) {
        for (i = 0; i < ragdolls.composites.length; i ++) {
            var ragdoll = ragdolls.composites[i],
                bounds = Composite.bounds(ragdoll);

            // move ragdolls back to the top of the screen
            if (bounds.min.y > render.bounds.max.y + 100) {
                Composite.translate(ragdolls.composites[i], {
                    x: -bounds.min.x * 0.9,
                    y: -render.bounds.max.y - 400
                });
            }
        }

        /*
        for (i = 0; i < obstacles.bodies.length; i += 1) {
            var body = obstacles.bodies[i],
                bounds = body.bounds;

            // move obstacles back to the top of the screen
            if (bounds.min.y > render.bounds.max.y + 100) {
                Body.translate(body, {
                    x: -bounds.min.x,
                    y: -render.bounds.max.y - 300
                });
            }
        }
        */

        if(dropRagdolls)
        {
            Body.setPosition(couch, { x: 350, y: 500 });

        } else {
            Body.setPosition(couch, { x: mouse.position.x, y: 500 });

        }
        // Body.setVelocity(couch, { x: 350, y: 500 });
    });
	


//mouse move input
/*
window.onmousemove = function(e) {
	mech.getMousePos(e.clientX, e.clientY);
};
*/
//mouse click input

// add a function to adjust the canvas size if the screen is resized
window.onresize = function(event) {
	resizeCanvas();
};

function update()
{
	if(!dropRagdolls)
	{
		countdown -= 0.015;
		if(countdown <= 0)
		{
			dropBall();
			countdown = countdownMax;
		}
	}
	// console.log(countdown);
}

function changeType()
{
	dropRagdolls = !dropRagdolls;
	console.log(dropRagdolls);
}

function onclick()
{
	if(dropRagdolls)
	{
		dropBody();
	}
}

function resizeCanvas()
{
    c.width = window.innerWidth;
    c.height = window.innerHeight;
}

// Creates a ball that will vanish on contact with the couch
function dropBall()
{
	World.add(world, [ragdollPrefab]);
	console.log("dropBall");
}

// Creates a ragdoll of one of us that will vanish on contact with the ground
function dropBody()
{
	
	console.log("dropBody");
}

// 
function objectOnGround()
{
	/*
	if(object == ragdoll)
	{
		kill(object);
	} else if(object == ball){
		kill(object);
	}
	*/
	
	console.log("Found body");
}

window.onload = function() {
	c = document.getElementsByTagName("canvas")[0]; 
    ctx = c.getContext("2d");
    
    changeButton = document.getElementById("changeButton");
    changeButton.addEventListener("click", changeType);
	
	resizeCanvas();

	setInterval(function() {
		Engine.update(engine, 1000 / 60);
    }, 1000 / 60);
}

////////////////////////////////////////////////////////////////////////////////////////

// Changed version from the examples
function createRagdoll(x, y, scaleX, scaleY, options, 
    headRender, chestRender, armRender, armLowerRender, legRender, legLowerRender) {

    var Body = Matter.Body,
        Bodies = Matter.Bodies,
        Constraint = Matter.Constraint,
        Composite = Matter.Composite,
        Common = Matter.Common;

    var headOptions = Common.extend({
        label: 'head',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [5 * scaleX, 5 * scaleY, 5 * scaleX, 5 * scaleY]
        },
        render: {
            sprite: {
                texture: headRender,
            }
        },
    }, options);

    var chestOptions = Common.extend({
        label: 'chest',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [2 * scaleX, 2 * scaleY, 2 * scaleX, 2 * scaleY]
        },
        render: {
            sprite: {
                texture: chestRender,
            }
        }
    }, options);

    var leftArmOptions = Common.extend({
        label: 'left-arm',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [2 * scaleX, 2 * scaleY, 2 * scaleX, 2 * scaleY]
        },
        render: {
            sprite: {
                texture: armRender,
            }
        }
    }, options);

    var leftLowerArmOptions = Common.extend({}, leftArmOptions);
    leftLowerArmOptions.render.sprite.texture = armLowerRender;

    var rightArmOptions = Common.extend({
        label: 'right-arm',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [2 * scaleX, 2 * scaleY, 2 * scaleX, 2 * scaleY]
        },
        render: {
            sprite: {
                texture: armRender,
            }
        }
    }, options);

    var rightLowerArmOptions = Common.extend({}, rightArmOptions);
    rightLowerArmOptions.render.sprite.texture = armLowerRender;

    var leftLegOptions = Common.extend({
        label: 'left-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [2 * scaleX, 2 * scaleY, 2 * scaleX, 2 * scaleY]
        },
        render: {
            sprite: {
                texture: legRender,
            }
        }
    }, options);

    var leftLowerLegOptions = Common.extend({}, leftLegOptions);
    leftLowerLegOptions.render.sprite.texture = legLowerRender;

    var rightLegOptions = Common.extend({
        label: 'right-leg',
        collisionFilter: {
            group: Body.nextGroup(true)
        },
        chamfer: {
            radius: [2 * scaleX, 2 * scaleY, 2 * scaleX, 2 * scaleY]
        },
        render: {
            sprite: {
                texture: legRender,
            }
        }
    }, options);

    var rightLowerLegOptions = Common.extend({}, rightLegOptions);
    rightLowerLegOptions.render.sprite.texture = legLowerRender;

    var head = Bodies.rectangle(x, y - 60 * scaleY, 34 * scaleX, 36 * scaleY, headOptions);
    var chest = Bodies.rectangle(x, y, 55 * scaleX, 80 * scaleY, chestOptions);
    var rightUpperArm = Bodies.rectangle(x + 44 * scaleX, y - 15 * scaleY, 20 * scaleX, 40 * scaleY, rightArmOptions);
    var rightLowerArm = Bodies.rectangle(x + 44 * scaleX, y + 35 * scaleY, 20 * scaleX, 60 * scaleY, rightLowerArmOptions);
    var leftUpperArm = Bodies.rectangle(x - 44 * scaleX, y - 15 * scaleY, 20 * scaleX, 40 * scaleY, leftArmOptions);
    var leftLowerArm = Bodies.rectangle(x - 44 * scaleX, y + 35 * scaleY, 20 * scaleX, 60 * scaleY, leftLowerArmOptions);
    var leftUpperLeg = Bodies.rectangle(x - 20 * scaleX, y + 66 * scaleY, 20 * scaleX, 40 * scaleY, leftLegOptions);
    var leftLowerLeg = Bodies.rectangle(x - 20 * scaleX, y + 120 * scaleY, 20 * scaleX, 60 * scaleY, leftLowerLegOptions);
    var rightUpperLeg = Bodies.rectangle(x + 20 * scaleX, y + 66 * scaleY, 20 * scaleX, 40 * scaleY, rightLegOptions);
    var rightLowerLeg = Bodies.rectangle(x + 20 * scaleX, y + 120 * scaleY, 20 * scaleX, 60 * scaleY, rightLowerLegOptions);

    var chestToRightUpperArm = Constraint.create({
        bodyA: chest,
        pointA: {
            x: 30 * scaleX,
            y: -23 * scaleY
        },
        pointB: {
            x: 0,
            y: -8 * scaleY
        },
        bodyB: rightUpperArm,
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var chestToLeftUpperArm = Constraint.create({
        bodyA: chest,
        pointA: {
            x: -30 * scaleX,
            y: -23 * scaleY
        },
        pointB: {
            x: 0,
            y: -8 * scaleY
        },
        bodyB: leftUpperArm,
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var chestToLeftUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: {
            x: -10 * scaleX,
            y: 30 * scaleX
        },
        pointB: {
            x: 0,
            y: -10 * scaleY
        },
        bodyB: leftUpperLeg,
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var chestToRightUpperLeg = Constraint.create({
        bodyA: chest,
        pointA: {
            x: 10 * scaleX,
            y: 30 * scaleY
        },
        pointB: {
            x: 0,
            y: -10 * scaleY
        },
        bodyB: rightUpperLeg,
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var upperToLowerRightArm = Constraint.create({
        bodyA: rightUpperArm,
        bodyB: rightLowerArm,
        pointA: {
            x: 0,
            y: 15 * scaleY
        },
        pointB: {
            x: 0,
            y: -25 * scaleY
        },
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var upperToLowerLeftArm = Constraint.create({
        bodyA: leftUpperArm,
        bodyB: leftLowerArm,
        pointA: {
            x: 0,
            y: 15 * scaleY
        },
        pointB: {
            x: 0,
            y: -25 * scaleY
        },
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var upperToLowerLeftLeg = Constraint.create({
        bodyA: leftUpperLeg,
        bodyB: leftLowerLeg,
        pointA: {
            x: 0,
            y: 20 * scaleY
        },
        pointB: {
            x: 0,
            y: -20 * scaleY
        },
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var upperToLowerRightLeg = Constraint.create({
        bodyA: rightUpperLeg,
        bodyB: rightLowerLeg,
        pointA: {
            x: 0,
            y: 20 * scaleY
        },
        pointB: {
            x: 0,
            y: -20 * scaleY
        },
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    var headContraint = Constraint.create({
        bodyA: head,
        pointA: {
            x: 0,
            y: 25 * scaleY
        },
        pointB: {
            x: 0,
            y: -35 * scaleY
        },
        bodyB: chest,
        stiffness: 0.06,
        render: {
            visible: false
        }
    });

    /*
    var legToLeg = Constraint.create({
        bodyA: leftLowerLeg,
        bodyB: rightLowerLeg,
        stiffness: 0.01,
        render: {
            visible: false
        }
    });
    */

    var person = Composite.create({
        bodies: [
            chest, head, leftLowerArm, leftUpperArm, 
            rightLowerArm, rightUpperArm, leftLowerLeg, 
            rightLowerLeg, leftUpperLeg, rightUpperLeg
        ],
        constraints: [
            upperToLowerLeftArm, upperToLowerRightArm, chestToLeftUpperArm, 
            chestToRightUpperArm, headContraint, upperToLowerLeftLeg, 
            upperToLowerRightLeg, chestToLeftUpperLeg, chestToRightUpperLeg,
            // legToLeg
        ]
    });

    return person;
};
