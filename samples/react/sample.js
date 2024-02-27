const Sample = () => {
  return (
    <div className='fsi-viewer-section'>
        <FSIComponent tagName="fsi-viewer" id={"Viewer_2D"} width={"100%"} height={"500px"} src={"images/samples/bag.tif"}
                      plugins={"FullScreen,Resize"}/>
    </div>
  );
};
