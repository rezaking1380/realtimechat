import React, { useState } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/lib/firebase";
import EmojiPicker from "emoji-picker-react";

function MessageInput({ sendMessage, message, setMessage, image, setImage }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Initialize storage object
  const storage = getStorage(app);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error.message);
      },
      () => {
        // Upload complete, get download URL and log it
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // Reset file state and update message with download URL
          setFile(null);
          setImage(downloadURL);
          // Clear image preview
          setImagePreview(null);
          document.getElementById("my_modal_3").close();
        });
      }
    );
  };

  const handleEmojiClick = (emojiData, event) => {
    // Append the selected emoji to the message state
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center p-4 border-t border-gray-200">
      <FaPaperclip
        onClick={() => document.getElementById("my_modal_3").showModal()}
        className={`${
          image ? "text-blue-500" : "text-gray-400"
        } mr-2 cursor-pointer w-8 h-8`}
      />
      {/* Emoji Picker Button */}
      <label className="relative w-full">
        <input
          class="rounded-full h-12 py-2 pl-3 text-lg pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          type="button"
          class="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none text-blue-600 hover:text-blue-700 w-7 h-7"
        >
          <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
            <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
          </svg>
        </button>
      </label>

      <FaPaperPlane
        onClick={() => sendMessage()}
        className="text-blue-500 cursor-pointer ml-2 w-8 h-8"
      />

      {showEmojiPicker && (
        <div className="absolute right-0 bottom-full p-2">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            disableAutoFocus={true}
          />
        </div>
      )}

      {/* Image Upload Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Uploaded"
                className="max-h-60 w-60 mb-4"
              />
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <div
              onClick={() => {
                handleUpload();
              }}
              className="btn btn-sm btn-primary"
            >
              Upload
            </div>
            <progress value={uploadProgress} max="100"></progress>
          </form>
          <button
            onClick={() => document.getElementById("my_modal_3").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default MessageInput;
