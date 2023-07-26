import { Bounds, GizmoHelper, GizmoViewport, OrbitControls} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../routes/BaseUrl";
import { Model } from "./Model";
import { resetHoveredID, setHoveredID, setSelectedID } from "./modelSlice";
import { useState } from "react";
import Alert from "../errors/Alert/Alert";

export function Renderer() {
  const { hoveredID, selectedID, color } = useSelector((store) => store.model);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedURL, setFetchedURL] = useState(null);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    const fetchGLBFileFromS3 = async () => {
      try {
        const response = await axios.get(baseUrl + "generate-url", {
          withCredentials: true,
        });
        const url = response.data.url;
        setIsLoading(false);
        setFetchedURL(url);
      } catch (error) {
      }
    };
    fetchGLBFileFromS3();
  }, []);

  const pointerEnterHandler = (e) => {
    e.stopPropagation();
    const id = e.object.material.name;

    dispatch(setHoveredID({ id }));
  };

  const pointerOutHandler = (e) => dispatch(resetHoveredID());
  const clickHandler = (e) => {
    // will update the modal on the left sidebar
    e.stopPropagation();
    const id = e.object.material.name;

    dispatch(setSelectedID({ id }));
  };

  return (
    <div className="flex h-full w-10/12">
      {isLoading ? (
        "fetching resources... "
      ) : fetchedURL ? (
        <Canvas camera={{ fov: 30, position: [-50,50, 50] }} className="flex w-full h-full" id="Canvas">
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} castShadow={true} />
            <spotLight intensity={0.14} position={[0, 15, 3]} />
            <Bounds fit clip observe margin={2}>
              <Model
                hoveredID={hoveredID}
                selectedID={selectedID}
                color={color}
                pointerOutHandler={pointerOutHandler}
                pointerEnterHandler={pointerEnterHandler}
                clickHandler={clickHandler}
                url={fetchedURL}
              />
            </Bounds>
            <gridHelper position={[0,-0.01,0]} args={[100, 100, '#374151', '#e5e7eb']}/>
            <GizmoHelper alignment="bottom-left" margin={[100,100]}>
              <GizmoViewport labelColor="white" axisHeadScale={1}/>
            </GizmoHelper>
            <OrbitControls />
          </Suspense>
        </Canvas>
      ) : null}
    </div>
  );
}
