import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { useState, useEffect } from "react";
export function Model({
  hoveredID,
  selectedID,
  color,
  pointerEnterHandler,
  pointerOutHandler,
  clickHandler,
  url,
}) {
  const gltf = useGLTF(url);
  const ref = useRef(null);
  const [clicked, setClicked] = useState("")
  const [hovered, setHovered] = useState("")
  const { nodes, materials } = gltf;
  const nodesKey = Object.keys(nodes);
  Object.keys(nodes).map((node) => {
    if (node.hasOwnProperty("material")) {
      node.material.wireframe = true;
    }
  });
  useEffect(()=>{
    localStorage.setItem("ActiveElement",clicked);
  },[clicked])
  return (
    <group
      ref={ref}
      onPointerEnter={pointerEnterHandler}
      onPointerOut={pointerOutHandler}
      onClick={clickHandler}
      scale={1}
    >
      {nodesKey?.map((key) => {
        // here material name is used as an identifier so
        // each node to be selected should have a unique name
        // assigned to it.
        if (materials[nodes[key].material?.name]?.name === "") {
          if (nodes[key].name === clicked) {
            localStorage.setItem("clicked", clicked);
            return (<mesh
              key={nodes[key].uuid}
              geometry={nodes[key].geometry}
              material={materials[nodes[key].material?.name]}
              onClick={(e) => (setClicked(nodes[key].name))}
              onPointerEnter={(e) => (setHovered(nodes[key].name))}
            >
              <meshStandardMaterial wireframe={true} color={"black"}></meshStandardMaterial>
            </mesh>
            )
          } else if (nodes[key].name === hovered) {
            localStorage.setItem("clicked", clicked);
            return (<mesh
              key={nodes[key].uuid}
              geometry={nodes[key].geometry}
              material={materials[nodes[key].material?.name]}
              onClick={(e) => (setClicked(nodes[key].name))}
            >
              <meshStandardMaterial wireframe={true} color={"blue"}></meshStandardMaterial>
            </mesh>
            )
          }
          else {
            localStorage.setItem("clicked", clicked);
            return (<mesh
              key={nodes[key].uuid}
              geometry={nodes[key].geometry}
              material={materials[nodes[key].material?.name]}
              onClick={(e) => (setClicked(nodes[key].name))}
              onPointerEnter={(e) => (setHovered(nodes[key].name))}
            >
              <meshStandardMaterial wireframe={false} color={"white"}></meshStandardMaterial>
            </mesh>)
          }
        }
        else {
          localStorage.setItem("clicked", clicked);
          return (
            <mesh
              key={nodes[key].uuid}
              geometry={nodes[key].geometry}
              material={materials[nodes[key].material?.name]}
              onClick={(e) => (setClicked(materials[nodes[key].material?.name]?.name))}
              onPointerEnter={(e) => (setHovered(nodes[key].name))}
              material-color={
                nodes[key].material?.name === selectedID
                  ? "#02F54B"
                  : nodes[key].material?.name === hoveredID
                    ? "#ED7168"
                    : "white"
              }
            >
            </mesh>
          );
        }
      })}
    </group>
  );
}
