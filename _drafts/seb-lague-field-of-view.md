Find all the targets within a view radius
Measure the angle to see if they fall between a view radius
Then do a line of sight check

Starting project
http://bit.ly/FoVstartfile

create a c# script Controller.cs
and FieldOfView.cs attach to character

Add a rigidbody and freeze the rotations

Controller
get a ref to rb and main camera
getcomp in Start()

Update find the position of the mouse in worldspace
screen to world point from the x and y pos of the mouse
use the z pos of the distance of the camera

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
