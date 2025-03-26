const Video = () => {
  return (
    <>
      <div className="py-10 relative">
        <div className="w-full h-60 bg-linear-to-b from-black via-black/80 to-transparent absolute top-0"></div>
        <video loop autoPlay muted className="w-full h-screen object-cover">
          <source
            src="https://res.cloudinary.com/dzwqf8snn/video/upload/v1742794793/x6yll3l6mupthcywi7im.mp4"
            type="video/mp4"
          />
        </video>
        <div className="w-full h-60 bg-linear-to-t from-black via-black/50 to-transparent absolute bottom-0"></div>
      </div>
    </>
  );
};

export default Video;
