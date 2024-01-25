import AudioUploader from "../components/AudioUploader";
// import ProcessedAudio from "../components/ProcessedAudio.jsx";
const HomePage = () => {
  const handleAudioUpload = (file) => {
    // Implement logic to handle the uploaded audio file
    console.log("Uploaded audio file:", file);
  };

  return (
    <div>
      <h1>Audio Upload App</h1>
      <AudioUploader onUpload={handleAudioUpload} />
      {/* <ProcessedAudio /> */}
    </div>
  );
};

export default HomePage;
