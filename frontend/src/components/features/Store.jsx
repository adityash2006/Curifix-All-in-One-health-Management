import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

const API_BASE = "http://localhost:3000/api/docs";
console.log("API_BASE:", API_BASE);

export default function MedicalDocsStore() {
    const fileInputRef = 	 useRef(null) ;
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  // Fetch docs when user is signed in
  useEffect(() => {
    if (isSignedIn) {
      fetchDocuments();
    } else {
      setDocuments([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user?.id]);

  // ===== Helper: get auth header =====
  const getAuthHeader = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token returned by getToken()");
      return { Authorization: `Bearer ${token}` };
    } catch (err) {
      console.error("getAuthHeader error:", err);
      throw err;
    }
  };

  // ===== Fetch documents =====
  const fetchDocuments = async () => {
    setFetching(true);
    setError(null);
    const body = {
  userId: user?.id
};
    try {
      const headers = await getAuthHeader();
      console.log("Fetching docs with headers:", headers);
      const res = await axios.post(`${API_BASE}`, body , { headers });
      console.log("fetch Documents response:", res.status, res.data);
      setDocuments(res.data || []);

    } catch (err) {
      console.error("fetchDocuments failed:",err);
      setError("Failed to fetch documents");
      setDocuments([]);
    } finally {
      setFetching(false);
    }
  };

  const handleUpload = async (ev) => {
    ev.preventDefault();
    if (!file) return setError("Select a file to upload");

    setLoading(true);
    setError(null);
    try {
      const headers = await getAuthHeader();
      // IMPORTANT: don't set Content-Type yourself when using FormData with axios.
      const formData = new FormData();
      formData.append("file", file);
formData.append("userId", user.id);

      console.log("Uploading file:", file.name);
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers,
        // axios will set correct multipart boundaries automatically
      });

      console.log("upload response:", res.status, res.data);
      setFile(null);
      fileInputRef.current.value = null;
      await fetchDocuments();
    } catch (err) {
      console.error("Upload failed:", err?.response?.data ?? err.message);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ===== View (get signed URL and open) =====
  const handleView = async (id) => {
    setError(null);
    const body = {
  userId: user?.id
};
    try {
      const headers = await getAuthHeader();
      const res = await axios.post(`${API_BASE}/view/${id}`, body ,{ headers });
      console.log("view response:", res.status, res.data);
      if (res.data?.url) {
        window.open(res.data.url, "_blank");
      } else {
        setError("Failed to generate view link");
      }
    } catch (err) {
      console.error("View failed:", err?.response?.data ?? err.message);
      setError("Failed to view document");
    }
  };

  // ===== Delete =====
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    setError(null);
    try {
        const body = {
  userId: user?.id
};
      const headers = await getAuthHeader();
      const res = await axios.delete(`${API_BASE}/${id}`,{ headers ,data: { userId: user?.id }});
      console.log("delete response:", res.status, res.data);
      await fetchDocuments();
    } catch (err) {
      console.error("Delete failed:", err?.response?.data ?? err.message);
      setError("Failed to delete document");
    }
  };

  // ===== UI =====
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 text-center">
        Medical Documents
      </h2>

      {error && (
        <div className="mb-4 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <form onSubmit={handleUpload} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="file"
          accept="application/pdf,image/*"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0] || null)}
          className="block w-full text-sm text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border rounded p-2"
        />
        <button
          type="submit"
          disabled={!file || loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="mb-4 text-xs text-gray-500">
        Note: Only PDFs and images allowed. Links expire automatically.
      </div>

      {fetching ? (
        <div className="text-center text-gray-600">Loading documents...</div>
      ) : documents.length === 0 ? (
        <div className="text-center text-gray-600">No documents uploaded yet.</div>
      ) : (
        <ul className="space-y-3">
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 dark:bg-gray-800 p-3 rounded"
            >
              <div className="w-full sm:w-2/3">
                <div className="font-medium text-gray-800 dark:text-gray-100 truncate">{doc.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
                </div>
                <div className="text-xs text-gray-400 mt-1">ID: {doc._id}</div>
              </div>

              <div className="mt-3 sm:mt-0 flex gap-2">
                <button
                  onClick={() => handleView(doc._id)}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
