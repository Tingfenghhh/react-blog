import { useCesiumViewer } from '@/hooks/useCesium';
import { Viewer } from 'cesium';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const CesiumBox = styled.div`
  width: 100%;
  height: 800px;
`;

function Other() {
  const cesiumView = new useCesiumViewer();
  const [viewer, setViewer] = useState<Viewer>();

  useEffect(() => {
    cesiumView.initViewer('CesiumBox').then((res) => {
      setViewer(res);
      cesiumView.addSome(viewer ?? res);
    });

    return () => {
      cesiumView.destroyViewer();
    };
  }, []);
  return (
    <>
      <CesiumBox id='CesiumBox' />
    </>
  );
}

export default Other;
