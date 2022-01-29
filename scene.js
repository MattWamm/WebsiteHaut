import * as matgine from './matgine.js'
import * as main from './scripts.js'
var speed = 0.2;
function UpdateCamera (deltaTime) {
  if (main.keyboard[87]) {
    // W key

    main.camera.position.x -= Math.sin(main.camera.rotation.y) * speed * deltaTime
    main.camera.position.z -= Math.cos(main.camera.rotation.y) * speed * deltaTime
  }
  if (main.keyboard[83]) {
    // S key
    main.camera.position.x += Math.sin(main.camera.rotation.y) * speed * deltaTime
    main.camera.position.z += Math.cos(main.camera.rotation.y) * speed * deltaTime
  }
  if (main.keyboard[68]) {
    // A key
    // Redirect motion by 90 degrees
    main.camera.position.x +=
      Math.sin(main.camera.rotation.y + Math.PI / 2) * speed * deltaTime
    main.camera.position.z +=
      Math.cos(main.camera.rotation.y + Math.PI / 2) * speed * deltaTime
  }
  if (main.keyboard[65]) {
    // D key
    main.camera.position.x +=
      Math.sin(main.camera.rotation.y - Math.PI / 2) * speed * deltaTime
    main.camera.position.z +=
      Math.cos(main.camera.rotation.y - Math.PI / 2) * speed * deltaTime
  }

  // Keyboard turn inputs
  if (main.keyboard[37]) {
    // left arrow key
    main.camera.rotation.y += 1 * deltaTime
  }
  if (main.keyboard[39]) {
    // right arrow key
    main.camera.rotation.y -= 1 * deltaTime
  }
  if (main.keyboard[38]) {
    // up arrow key
    main.camera.position.y += 1 * deltaTime
  }
  if (main.keyboard[40]) {
    // down arrow key
    main.camera.position.y -= 1 * deltaTime
  }
}

function Update (deltaTime) {
  if (matgine.instances.has('avocado')) {
    // dit is nodig want anders probeert hij het te doen voordat het object is ingeladen!
    matgine.instances.get('avocado').rotation.y -= 0.1
  }
  if (matgine.instances.has('avocado1')) {
    // dit is nodig want anders probeert hij het te doen voordat het object is ingeladen!
    matgine.instances.get('avocado1').rotation.y += 0.1
  }
  UpdateCamera(deltaTime)
}

main.SetUpdate(Update)
