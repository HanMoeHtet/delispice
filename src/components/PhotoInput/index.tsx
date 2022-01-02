import * as React from 'react';

interface PhotoInputProps {
  errorMessage?: string;
  photoURL: string;
  onPhotoURLChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoUpload: File | null;
  onPhotoUploadChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhotoUploadRemove: () => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const PhotoInput: React.FC<PhotoInputProps> = ({
  errorMessage = '',
  photoURL,
  photoUpload,
  onPhotoURLChange,
  onPhotoUploadChange,
  onPhotoUploadRemove,
  onBlur,
}) => {
  const getImageUrl = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <div className="mb-10">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="photo-url"
      >
        Upload a photo or enter the url
      </label>
      <input
        className={`shadow appearance-none border ${
          errorMessage !== '' && 'border-red-500 mb-3'
        } rounded w-full py-2 px-3 text-gray-700 mb-3 leading-loose focus:outline-none focus:shadow-outline`}
        id="photo-url"
        type="url"
        name="photoURL"
        value={photoURL}
        onChange={onPhotoURLChange}
        onBlur={onBlur}
      />
      <div className="relative w-2/3 mx-auto py-5">
        <hr className="w-full border-t border-t-gray-200 mt-1" />
        <p className="absolute top-1/2 left-1/2 bg-white px-2 py-2 -translate-x-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">
          (OR)
        </p>
      </div>
      {photoUpload ? (
        <div className="">
          <img
            src={getImageUrl(photoUpload)}
            alt={photoUpload.name}
            className="max-h-36 mx-auto mb-4"
          />
          <button
            type="button"
            className="block mx-auto px-4 py-2 bg-red-400 border rounded text-white hover:bg-red-600"
            onClick={onPhotoUploadRemove}
          >
            Remove
          </button>
        </div>
      ) : (
        <label className="w-44 mx-auto flex flex-col items-center p-4 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            className="hidden"
            name="photoUpload"
            accept="image/*"
            value={photoUpload || undefined}
            onChange={onPhotoUploadChange}
            onBlur={onBlur}
          />
        </label>
      )}
      {errorMessage !== '' && (
        <p className="text-red-500 text-xs italic mt-4 text-center">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default PhotoInput;
