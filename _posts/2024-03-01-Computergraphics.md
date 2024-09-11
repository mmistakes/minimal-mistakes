---
layout: post
title:  "컴퓨터 그래픽스"
---

# 2024학년도 1학기

---
<!DOCTYPE html>
<html charset="utf-8">

<head>
    <meta charset="UTF-8">
    <title>20205177 박창후 - cube</title>
</head>
<body>
    <div>
    <button id = "xButton">Rotate X</button>
    <button id = "yButton">Rotate Y</button>
    <button id = "zButton">Rotate z</button>
    <button id = "toggleButton">Stop Rotation</button>
    </div>

    <script type="x-shader/x-vertex" id = "vertexShader">
        attribute vec4 vColor;
        varying vec4 fColor;
        uniform vec3 theta;

        void main(){
            //gl_Position = vec4(position,1.0);
            vec3 s = sin(theta);
            vec3 c = cos(theta);
            
            //Remember  : these matrixed are column-major
            mat4 rx = mat4( 1, 0, 0, 0,
                            0, c.x, -s.x, 0,
                            0, s.x, c.x, 0,
                            0, 0, 0, 1);

            mat4 ry = mat4( c.y, 0, s.y, 0,
                            0, 1, 0, 0,
                            -s.y, 0, c.y, 0,
                            0, 0, 0, 1);

            mat4 rz = mat4( c.z, s.z, 0, 0,
                            -s.z, c.z, 0, 0,
                            0, 0, 1, 0,
                            0, 0, 0, 1);


            
            gl_Position = rx * ry * rz * vec4(position, 1.0);
    
            fColor = vColor;

        }

    </script>
    <script type="x-shader/x-fragment" id = "fragmentShader">
        precision mediump float;
        varying vec4 fColor;

        void main(){
            gl_FragColor = fColor;
        }
    </script>
    <script type="x-shader/x-vertex" id = "lineVS">
        attribute vec4 vColor;
        varying vec4 fColor;

        void main(){
            gl_Position = vec4(position, 1.0);
            fColor = vColor;
        }
    </script>
    <script type="x-shader/x-fragment" id = "lineFS">
        precision mediump float;
        varying vec4 fColor;

        void main(){
            gl_FragColor = fColor;
        }
    </script>

    <script type = "module">
        import * as THREE from 'https://unpkg.com/three/build/three.module.js';
        
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xafffff);
        const camera = new THREE.OrthographicCamera(-1,1,1,-1,-1,1);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(512,512);
        document.body.appendChild(renderer.domElement);
        

        const vertices = new Float32Array([
                -0.5, -0.5, -0.5,
                 0.5, -0.5, -0.5,
                0.5, 0.5, -0.5,
                -0.5, 0.5, -0.5,
                -0.5, -0.5, 0.5,
                0.5, -0.5, 0.5,
                0.5, 0.5, 0.5, 
                -0.5, 0.5, 0.5,    
        ]); //z-먼저 y-먼저

        const colors = new Float32Array([
            0, 0, 0, 1, 
            1, 0, 0, 1,
            1, 1, 0, 1,
            0, 1, 0, 1,
            0, 0, 1, 1, //4
            1, 0, 0, 1, //5
            1, 1, 0, 1, //6
            0, 1, 1, 1,
        ]);
        const indices=[
            1, 0, 3, 1, 3, 2,
            2, 3, 7, 2, 7, 6,
            3, 0, 4, 3, 4, 7,
            4, 5, 6, 4, 6, 7,
            5, 4, 0, 5, 0, 1,
            6, 5, 1, 6, 1, 2,
        ];
        const geometry = new THREE.BufferGeometry();
        geometry.setIndex(indices);
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
        geometry.setAttribute('vColor', new THREE.Float32BufferAttribute(colors,4));

        const material = new THREE.ShaderMaterial({
            uniforms : {
                theta: {value: [0,0,0]},
            },
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent,
         });

         const mesh = new THREE.Mesh(geometry,material);
         scene.add(mesh);
         //-----------------------------색깔
         const lineVertices = new Float32Array([
            0,0,0,
            1,0,0,
            1,1,0,
            0,2,0,
            0,0,0,
            0,0,1,
         ]);
         const lineColors = new Float32Array([
            1,1,1,1,
            1,0,0,1,
            1,1,1,1,
            0,1,0,1,
            1,1,1,1,
            0,0,1,1,
         ]);

         const lineGeometry = new THREE.BufferGeometry();
         lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
         lineGeometry.setAttribute('vColor', new THREE.Float32BufferAttribute(lineColors, 4));
        
         const lineMaterial = new THREE.ShaderMaterial({
            vertexShader: document.getElementById("lineVS").textContent,
            fragmentShader: document.getElementById("lineFS").textContent
         });
         const line = new THREE.Line(lineGeometry, lineMaterial);
         scene.add(line);

         var axis =2;
         document.getElementById("xButton").onclick = function(){
            axis = 0;
         };
         document.getElementById("yButton").onclick = function(){
            axis = 1;
         };
         document.getElementById("zButton").onclick = function(){
            axis = 2;
         };


        var angles = [0,0,0];
         function animate(){
                requestAnimationFrame(animate);

                angles[axis] += 0.05;
                material.uniforms.theta.value = angles;

                renderer.render(scene, camera);
            }
        
         animate();


        //setTimeout - > 그만하자 10이가장빠르게 1000이 가장 느리게
    </script>
    </body>
</html>

---
