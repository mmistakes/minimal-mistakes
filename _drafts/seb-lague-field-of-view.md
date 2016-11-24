# General Plan
* Find all the targets within a view radius
* Measure the angle to see if they fall between a view radius
* Do a line of sight check

## Player Movement and Rotation
Add a plane for the floor
Add some cubes as obstacles - tag them as **obstacle**
Add some capsules as targets - tag them as **target**

You can add materials to these and colour them as you like.

Add a capsule for the player


create a c# script Controller.cs
and FieldOfView.cs 
attach them to the player

Add a rigidbody to the player and freeze the rotations

Open Controller.cs
We're going to want to read and write values to Rigidbody and mainCamera so 
let's add variables to hold a reference to these.
```
Rigidbody rigidbody;
Camera viewCamera;
```
Add a float variable for the player's movement speed
```
public float moveSpeed = 6;
```
If we're using Rigidbody and mainCamera we don't want to have to GetComponent every
frame. Let's Get those components once and save them to our member variables in the 
Start() function.
```
void Start () {
  // get these references once in Start() and we can access and change them whenever we wantin Update() 
		rigidbody = GetComponent<Rigidbody> ();
		viewCamera = Camera.main;
	}
```

In the update function we're going to do 3 things
* Find where the mouse pointer is 
* Rotate the player to look at that point
* Read input values and create a Vector3 for where the player is moving to

Update find the position of the mouse in worldspace
screen to world point from the x and y pos of the mouse
use the z pos of the distance of the camera
```csharp
// Controller.cs
using UnityEngine;
using System.Collections;

public class Controller : MonoBehaviour {

	public float moveSpeed = 6;
// we want to access properties on these so we'll store a ref as a member variable
	Rigidbody rigidbody;
	Camera viewCamera;
 // we'll move to this Vector3 based on user input
	Vector3 velocity;

	void Start () {
  // get these references once in Start() and we can access and change them whenever we wantin Update() 
		rigidbody = GetComponent<Rigidbody> ();
		viewCamera = Camera.main;
	}

	void Update () {
  // read in the x and y pos of the mouse on the screen and translate 
  // to a world position along with the distance from the camera to the plane as z value
		Vector3 mousePos = viewCamera.ScreenToWorldPoint(new Vector3(Input.mousePosition.x, Input.mousePosition.y, viewCamera.transform.position.y));
  // rotate the player to look at the world position of the mouse
  // adjust so that we don't look at y=0 but instead look at exactly the height the player is at
		transform.LookAt (mousePos + Vector3.up * transform.position.y);
  // get input values for player movement in x and z ( no y as we're not jumping )
		velocity = new Vector3 (Input.GetAxisRaw ("Horizontal"), 0, Input.GetAxisRaw ("Vertical")).normalized * moveSpeed;
	}

	void FixedUpdate() {
  // move the player via rigidbody according to the 'velocity', adjusting for frame by frame
		rigidbody.MovePosition (rigidbody.position + velocity * Time.fixedDeltaTime);
	}
}

```

Starting project
http://bit.ly/FoVstartfile

Our player is moving and can rotate to look at the mouse pointer.

In FieldOfView.cs create 2 variables for our field of view
```
public float viewRadius;
[Range(0,360)]
public float viewAngle;
```
Using [Range(0,360)] means that the variable viewAngle can't have a value outside
those values that we specify.

Create a function for getting the direction (Vector3) from an angle in degrees
```csharp
Vector3 DirFromAngle(float angleInDegrees) {}
```
In trigonometry we normally think of the unit circle as below
circle.png

but in Unity our angles work as below in red. So in order to calculate what we need
we'll use (90 - x) in place of (x)

Since the sin(90 -x) = cos(x) then what we'll simply end up doing is using cos 
instead of sin.


```csharp
//FieldOfView.cs
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class FieldOfView : MonoBehaviour {

	public float viewRadius;
	[Range(0,360)]
	public float viewAngle;

	public LayerMask targetMask;
	public LayerMask obstacleMask;

	[HideInInspector]
	public List<Transform> visibleTargets = new List<Transform>();

	void Start() {
		StartCoroutine ("FindTargetsWithDelay", .2f);
	}


	IEnumerator FindTargetsWithDelay(float delay) {
		while (true) {
			yield return new WaitForSeconds (delay);
			FindVisibleTargets ();
		}
	}

	void FindVisibleTargets() {
		visibleTargets.Clear ();
		Collider[] targetsInViewRadius = Physics.OverlapSphere (transform.position, viewRadius, targetMask);

		for (int i = 0; i < targetsInViewRadius.Length; i++) {
			Transform target = targetsInViewRadius [i].transform;
			Vector3 dirToTarget = (target.position - transform.position).normalized;
			if (Vector3.Angle (transform.forward, dirToTarget) < viewAngle / 2) {
				float dstToTarget = Vector3.Distance (transform.position, target.position);

				if (!Physics.Raycast (transform.position, dirToTarget, dstToTarget, obstacleMask)) {
					visibleTargets.Add (target);
				}
			}
		}
	}


	public Vector3 DirFromAngle(float angleInDegrees, bool angleIsGlobal) {
		if (!angleIsGlobal) {
			angleInDegrees += transform.eulerAngles.y;
		}
		return new Vector3(Mathf.Sin(angleInDegrees * Mathf.Deg2Rad),0,Mathf.Cos(angleInDegrees * Mathf.Deg2Rad));
	}
}
```
