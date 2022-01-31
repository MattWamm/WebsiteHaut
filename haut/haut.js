import * as THREE from "../node_modules/three/build/three.module.js"
import { GLTFLoader } from "../threejs_imports/GLTFLoader.js"
var models; 
var textures ;
var scenes ;
var modelLoader;
var textureLoader;
export var instances 

export function Init()
{
  modelLoader = new GLTFLoader();
  textureLoader = new THREE.TextureLoader();
  models = new Map()  ;
textures = new Map();
scenes = new Map();
instances = new Map();
}


export async function LoadModel (path, name) {
   return new Promise((resolve, reject)=>{
  if (models.has(name)) {
    throw new Error('Model already loaded')
  }
  modelLoader.load(
    path,
    function (gltf) {
      models.set(name, gltf)
      resolve();
    },
    // called while loading is progressing
    function (xhr) {
      console.log('Loading')
    },
    // called when loading has errors
    function (error) {
      throw new Error(error);
      reject();
    }
  );});
}

export function ModelExists (name) {
  return models.has(name)
}

export function LoadTexture (path, name) {
  if (textures.has(name)) {
    throw new Error('Texture already loaded')
  }
  var texture = textureLoader.load(path)
  textures.set(name, texture)
}

export function InstantiateModel (scene, name) {
  console.log(models.has(name))
  if (models.has(name)) {
    var geo = models.get(name)
    var nModel = geo.scene.clone()
    scene.add(nModel)
    return nModel
  } else {
    throw new Error('Model ' + name + ' not found')
  }
}

function InstantiateModelChild (name) {
  console.log(models.has(name))
  if (models.has(name)) {
    var geo = models.get(name)
    return geo.scene.clone()
  } else {
    throw new Error('Model ' + name + ' not found')
  }
}
export function WaitThenCreate (name, instanceName) {
  var handle = setInterval(function () {
    if (ModelExists(name)) {
      instances.set(instanceName, loaders.InstantiateModel(scene, name))
      clearInterval(handle)
    }
  }, 1)
}

export function LoadScene (path, name) {
  var nScene = new THREE.Scene()
  nScene.background = new THREE.Color(0xffffff)

  scenes.set(name, nScene)
  getJSON(path, function (statusCode, data) {
    let promises = [];
    data.Models.forEach(element => {
      promises.push( LoadModel(element.path, element.name));
    });
    Promise.all(promises).then(()=>{
    data.Scene.forEach(element => {
      console.log('Loadin scene')
      WaitSetCreate(element, nScene)
    });
  }).then(()=>{
    document.getElementById("sceneScripts").innerHTML = "";
    data.Scripts.forEach(
      sceneScripts =>
      {
        console.log(sceneScripts);
        var script = document.createElement("script");
        script.type = "module";
        script.src = sceneScripts;
        document.getElementById("sceneScripts").appendChild(script);
      }
    )
    var scene = new THREE.Scene();});
  })
}

export function GetScene (name) {
  if (!scenes.has(name)) throw new Error('Scene not ' + name + ' found')
  return scenes.get(name)
}

function WaitSetCreate (data, nScene) {
  var handle = setInterval(function () {
    var ob = CreateInstance(data,nScene);
    clearInterval(handle)
  }, 1)
}
function CreateInstance (data,parent) {
  var handle = setInterval(function () {
    if (ModelExists(data.model)) {
      var nObject = InstantiateModelChild(data.model)
      nObject.position.set(data.position.x, data.position.y, data.position.z)
      nObject.scale.set(data.scale.x, data.scale.y, data.scale.z)
      nObject.rotation.set(data.rotation.x, data.rotation.y, data.rotation.z)
      instances.set(data.name, nObject)
      data.children.forEach(element => {
        var cObject = CreateInstance(element,nObject);
      })
      console.log(parent);
      parent.add(nObject);
      clearInterval(handle);

    }
  }, 1)
}

function getJSON (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status, xhr.response)
    }
  }
  xhr.send()
}
