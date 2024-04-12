import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

import vertexShader from './shaders/water/vertexShader.glsl?raw'
import fragmentShader from './shaders/water/fragmentShader.glsl?raw'

import vertexShader2 from './shaders/shader2/vertexShader.glsl?raw'
import fragmentShader2 from './shaders/shader2/fragmentShader.glsl?raw'

import vertexShader3 from './shaders/shader3/vertexShader.glsl?raw'
import fragmentShader3 from './shaders/shader3/fragmentShader.glsl?raw'

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 })
// gui.closed = true
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Water s1
 */

// Color
const debugObject = {

    // Black and White
    // surfaceColor: '#eeeeee',
    // depthColor: '#060922'

    // Colorful
    surfaceColor: '#69d2e8',
    depthColor: '#060922'

    // Width debug
    // depthColor: '#1228e2'

}

// Geometry
// Increase the segments of the geometry to have more noise of
// the for loop iteration increasing in the vertexShader
const waterGeometry = new THREE.PlaneGeometry(4.3, 8, 512, 512)

// Fullscreen set
// const waterGeometry = new THREE.PlaneGeometry(7, 15, 512, 512)

// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    // wireframe: true
    uniforms: {
        // uFrequency: { value: new THREE.Vector2(2, 1.5) },

        // Default set
        // uFrequency: { value: new THREE.Vector2(2, 3) },

        // Fullscreen set
        uFrequency: { value: new THREE.Vector2(2.057, 1.358) },

        // uElevation: { value: 0.2 },
        uElevation: { value: 0.5 },
        uTime: { value: 0 },
        uWaveSpeed: { value: 0.5 },
        uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
        uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
        uColorOffset: { value: 0.072 },
        uColorMultiplier: { value: 7.0 },
        uNoiseIteration: { value: 4.0 },
        uNoiseFrequency: { value: 2.0 },
        // uNoiseFrequency: { value: 8.0 },
        uNoiseWaveSpeed: { value: 0.7 },
        // uNoiseElevation: { value: 0.2 }
        uNoiseElevation: { value: .3 }
    },
    // side: THREE.DoubleSide
})

// Debug of uniforms in material
const uniformsGui = gui.addFolder('Water Uniforms')
uniformsGui.add(waterMaterial.uniforms.uFrequency.value, 'x', 0, 10, 0.001)
.name('uFrequency X')
uniformsGui.add(waterMaterial.uniforms.uFrequency.value, 'y', 0, 10, 0.001)
.name('uFrequency Y')
uniformsGui.add(waterMaterial.uniforms.uWaveSpeed, 'value', 0, 10.0, 0.001)
.name('uWaveSpeed')
uniformsGui.add(waterMaterial.uniforms.uElevation, 'value', 0, 0.6, 0.001)
.name('uElevation')
uniformsGui.addColor(debugObject, 'surfaceColor')
.name('SurfaceColor').onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
})
uniformsGui.addColor(debugObject, 'depthColor')
.name('DepthColor').onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
})
uniformsGui.add(waterMaterial.uniforms.uColorOffset, 'value', 0, 1.0, 0.001)
.name('uColorOffset')
uniformsGui.add(waterMaterial.uniforms.uColorMultiplier, 'value', 0, 10.0, 0.001)
.name('uColorMultiplier')
uniformsGui.add(waterMaterial.uniforms.uNoiseIteration, 'value', 0, 8.0, 1.0)
.name('uNoiseIteration')
uniformsGui.add(waterMaterial.uniforms.uNoiseFrequency, 'value', 0, 20.0, 0.001)
.name('uNoiseFrequency')
uniformsGui.add(waterMaterial.uniforms.uNoiseWaveSpeed, 'value', 0, 3.0, 0.001)
.name('uNoiseWaveSpeed')
uniformsGui.add(waterMaterial.uniforms.uNoiseElevation, 'value', 0, 1, 0.001)
.name('uNoiseElevation')

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5

// Fullscreen set
// water.rotation.z = - Math.PI * .5
// scene.add(water)

/**
 * Object2
 */
// const sphereGeo = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
// const sphereMat = new THREE.MeshBasicMaterial({color: 0xffffff})
// const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat)

const plane2Geo = new THREE.PlaneGeometry(5, 8, 256, 256)

// Fullscreen set
// const plane2Geo = new THREE.PlaneGeometry(15 / 1.6, 15, 256, 256)

// Debug
// const plane2GeoDeObj = {
//     height: 5
// }
// const plane2GeoGui = gui.addFolder('plane2GeoGui')
// plane2GeoGui.add(plane2GeoDeObj, 'height', 0, 10, 0.001).name('Height')
// .onChange(() => {
//     plane2Geo.parameters.height = plane2GeoDeObj.height
// })
// console.log(plane2Geo.parameters);

// Material

// uniform float uTime;
// uniform float uStep;
// uniform float uRadius;
// uniform float uBlur;
// uniform vec3 uColInside;
// uniform vec3 uColOutside;

// Debug obj
const plane2MatDebug = {
    uColInside: '#582be7',
    uColOutside: '#120102'
}

const plane2Mat = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uStep: { value: -0.678 },
        uRadius: { value: 0.23 },
        uBlur: { value: 0.433 },
        uSpeed: { value: 0.4 },
        uNoiseFrequency: { value: 5. },
        uColInside: { value: new THREE.Color(plane2MatDebug.uColInside) },
        uColOutside: { value: new THREE.Color(plane2MatDebug.uColOutside) },
    },
    vertexShader: vertexShader2,
    fragmentShader: fragmentShader2,
    transparent: true
})

// plane2Mat Debug
const planeLefGui = gui.addFolder('Plane-Left')
const planeLefMatGui = planeLefGui.addFolder('Material')
planeLefMatGui.add(plane2Mat.uniforms.uStep, 'value', -1, 1, 0.001)
.name('uStep')
planeLefMatGui.add(plane2Mat.uniforms.uRadius, 'value', 0, 0.5, 0.001)
.name('uRadius')
planeLefMatGui.add(plane2Mat.uniforms.uBlur, 'value', 0, 0.5, 0.001)
.name('uBlur')
planeLefMatGui.add(plane2Mat.uniforms.uSpeed, 'value', 0, 5, 0.001)
.name('uSpeed')
planeLefMatGui.add(plane2Mat.uniforms.uNoiseFrequency, 'value', 0, 10, 0.001)
.name('uNoiseFrequency')
planeLefMatGui.addColor(plane2MatDebug, 'uColInside').onChange(() => {
    plane2Mat.uniforms.uColInside.value.set(plane2MatDebug.uColInside)
})
planeLefMatGui.addColor(plane2MatDebug, 'uColOutside').onChange(() => {
    plane2Mat.uniforms.uColOutside.value.set(plane2MatDebug.uColOutside)
})

const plane2 = new THREE.Mesh(plane2Geo, plane2Mat)
plane2.position.set(-5, 0, 0)

plane2.rotation.x = - Math.PI * 0.5

// Full screen Set
// plane2.position.set(0, 0, 0)
// plane2.rotation.z = Math.PI * 0.5
// scene.add(plane2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


/**
 * Object3
 */
const plane3Geo = new THREE.PlaneGeometry(5, 8, 256, 256)

// Fullscreen set
// const plane3Geo = new THREE.PlaneGeometry(13 / 1.6, 13, 256, 256)


const plane3Mat = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uSize: { value: new THREE.Vector2(sizes.width, sizes.height) }
    },
    vertexShader: vertexShader3,
    fragmentShader: fragmentShader3,
    transparent: true
})
const plane3 = new THREE.Mesh(plane3Geo, plane3Mat)
// plane3.position.set(5, 0, 0)

// Fullscreen change
plane3.position.set(4.5, 0, 0)

// Fullscreen set
// plane3.position.set(0, 0, 0)
// plane3.rotation.z = - Math.PI * .5


plane3.rotation.x = - Math.PI * 0.5
// scene.add(plane3)

// Gui of plane3
// const plane3Gui = gui.addFolder('Plane3Position')
// plane3Gui.add(plane3.position, 'x', -10, 10, 0.001).name('plane3X')
// plane3Gui.add(plane3.position, 'y', -10, 10, 0.001).name('plane3Y')
// plane3Gui.add(plane3.position, 'z', -10, 10, 0.001).name('plane3Z')
// plane3Gui.add(plane3.rotation, 'x', -Math.PI, Math.PI, 0.001).name('RotationX')


// All planes
const addAll = (p1, p2, p3) => {
    scene.add(p1, p2, p3)
}
addAll(plane2, water, plane3)


const addSingle = (p) => {
    scene.add(p)
}

// addSingle(plane2)

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()


    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.set(-5.4, 3.75, 6)
camera.position.set(0, 5, 0)
// camera.position.set(0, -5, 0)
scene.add(camera)

// Gui of camera
const cameraGui = gui.addFolder('CameraPosition')
cameraGui.add(camera.position, 'x', -10, 10, 0.1).name('CameraX')
cameraGui.add(camera.position, 'y', -10, 10, 0.001).name('CameraY')
cameraGui.add(camera.position, 'z', -10, 10, 0.1).name('CameraZ')

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update uniforms
    waterMaterial.uniforms.uTime.value = elapsedTime
    plane2Mat.uniforms.uTime.value = elapsedTime
    plane3Mat.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()