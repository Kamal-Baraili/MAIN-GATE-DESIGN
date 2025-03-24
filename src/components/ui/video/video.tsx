const Video = () => {
  return (
    <>
      <div className="py-10 border-y border-y-zinc-800">
        <video loop autoPlay muted className="w-full h-screen object-cover">
          <source
            src="https://res.cloudinary.com/dzwqf8snn/video/upload/v1742794793/x6yll3l6mupthcywi7im.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
};

export default Video;
