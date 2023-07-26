const FileUploadProgressBar = ({
  isSubmitted,
  errorStatus,
  uploadProgress,
}) => {
  return (
    <div>
      {isSubmitted || errorStatus ? (
        <div className="w-full bg-gray-200 h-6 mb-4 dark:bg-gray-700">
          <div
            className={`text-xs font-medium text-blue-100 text-center p-0.5 leading-non ${errorStatus ? "bg-red-500" : "bg-green-500"
              } h-6`}
            style={{
              width: uploadProgress + "%",
              transition: "1s",
            }}
          >
            {errorStatus ? "Error occured while uploading files." : null}
            {isSubmitted
              ? uploadProgress > 40
                ? `Uploading Files...${uploadProgress}%`
                : null
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FileUploadProgressBar;
