import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Upload, FileText, Trash2, Eye, AlertCircle, Loader2 } from 'lucide-react';
import { NavLink } from "react-router-dom";
import Loader from "../Loader";
import { marked } from "marked";
import DOMPurify from "dompurify";

const API_BASE = import.meta.env.VITE_SOCKET_SERVER+"/api/docs";

export default function MedicalDocsStore() {
  const fileInputRef = useRef(null);
  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
const [summaryloading,setSummaryLoading]=useState(false);
  const [summary,setSummary]=useState("");
  const [showsummary,setShowSummary]=useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchDocuments();
    } else {
      setDocuments([]);
    }
  }, [isSignedIn, user?.id]);

  const getAuthHeader = async () => {
    try {
      const token = await getToken();
      if (!token) throw new Error("No token returned");
      return { Authorization: `Bearer ${token}` };
    } catch (err) {
      console.error("getAuthHeader error:", err);
      throw err;
    }
  };

  const fetchDocuments = async () => {
    setFetching(true);
    setError(null);
    try {
      const headers = await getAuthHeader();
      const res = await axios.post(`${API_BASE}`, { userId: user?.id }, { headers });
      setDocuments(res.data || []);
    } catch (err) {
      console.error("fetchDocuments failed:", err);
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
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      await axios.post(`${API_BASE}/upload`, formData, { headers });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchDocuments();
    } catch (err) {
      console.error("Upload failed:", err?.response?.data ?? err.message);
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const SummarizeView=async (id)=>{
    try {
      setShowSummary(true);
      setSummaryLoading(true);
     console.log("Summarize View called");
     
      const b=await fetch(`${API_BASE}/summarize/${id}`);
      const data=await b.json();
      setSummary(DOMPurify.sanitize(marked(data.summary)));
       setSummaryLoading(false);
      setShowSummary(true);
     
    } catch (error) {
      console.log(error)
    }
  }

  const handleView = async (id) => {
    setError(null);
    try {
      const headers = await getAuthHeader();
      const res = await axios.post(`${API_BASE}/view/${id}`, { userId: user?.id }, { headers });
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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    setError(null);
    try {
      const headers = await getAuthHeader();
      await axios.delete(`${API_BASE}/${id}`, { headers, data: { userId: user?.id } });
      await fetchDocuments();
    } catch (err) {
      console.error("Delete failed:", err?.response?.data ?? err.message);
      setError("Failed to delete document");
    }
  };

  return (

    <>

    {showsummary ?  <div className="text-2xl bg-amber-100 w-full overflow-auto px-10 py-10 text-black">
      
      {summaryloading ? <div  className="flex flex-col justify-center items-center text-2xl  text-black " >
        <div className="mt-20"> <Loader></Loader></div>
        Summarizing...
        
      </div>: <div className="text-sm md:text-2xl md:mx-10 lg:mx-30 ">
      <button className="cursor-pointer border-2 p-2 px-4 rounded-2xl" onClick={()=>{setShowSummary(false)}}><i class="fa-solid fa-arrow-left"></i></button>
        <div className=" transition-3s text-center  instrument text-6xl mb-20 bg-gradient-to-r from-amber-800  to-green-700
 bg-clip-text text-transparent">Curifix Summarizer</div>
         <div dangerouslySetInnerHTML={{ __html: summary }} className=" text-black text-sm p-10 bg-white font-mono border-2 border-dotted"></div> 
         
         </div>}
      
    </div> :
    
    <div className="min-h-screen overflow-auto w-full bg-amber-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-2">
            Medical <span className="text-green-900">Documents</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Securely store and manage your medical records
          </p>
        </div>

        {/* Upload Card */}
        <div 
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 mb-6 border-2" 
          style={{ borderColor: '#a0e800' }}
        >
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <input
                type="file"
                accept="application/pdf,image/*"
                ref={fileInputRef}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-3 w-full p-4 sm:p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all"
                style={{ 
                  borderColor: file ? '#a0e800' : '#e5e7eb',
                  backgroundColor: file ? '#f0ffe0' : '#f9fafb'
                }}
              >
                <Upload 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={{ color: file ? '#a0e800' : '#9ca3af' }} 
                />
                <div className="text-center">
                  <div className="font-semibold text-gray-800 text-sm sm:text-base">
                    {file ? file.name : 'Choose a file'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    PDF or Image files only
                  </div>
                </div>
              </label>
            </div>
            



            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="w-full cursor-pointer py-3 rounded-xl font-semibold text-white transition-all transform hover:scale-101 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                backgroundColor: !file || loading ? '#6b7280' : '#a0e800',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Uploading...
                </span>
              ) : (
                'Upload Document'
              )}
            </button>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-600">
              Your documents are encrypted and secure. View links expire automatically.
            </p>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 flex items-center gap-2">
            <FileText 
              className="w-5 h-5 sm:w-6 sm:h-6" 
              style={{ color: '#a0e800' }} 
            />
            Your Documents
          </h2>

          {fetching ? (
            <div className="text-center py-12">
              <Loader2 
                className="w-12 h-12 animate-spin mx-auto mb-4" 
                style={{ color: '#a0e800' }} 
              />
              <p className="text-gray-600">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-600 font-medium">No documents uploaded yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Upload your first medical document to get started
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 sm:p-4 rounded-xl border-2 transition-all"
                  style={{ 
                    borderColor: '#f3f4f6',
                    backgroundColor: '#fafafa'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = '#a0e800'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#f3f4f6'}
                >
                  <div className="flex items-start gap-3 w-full sm:w-2/3">
                    <div 
                      className="p-2 rounded-lg flex-shrink-0" 
                      style={{ backgroundColor: '#f0ffe0' }}
                    >
                      <FileText className="w-5 h-5" style={{ color: '#a0e800' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-black truncate text-sm sm:text-base">
                        {doc.name}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(doc.uploadedAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-0 flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleView(doc._id)}
                      className="flex-1 cursor-pointer sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm"
                      style={{ backgroundColor: '#a0e800' }}
                    >
                      <Eye className="w-4 h-4 " />
                      View
                    </button>
                    {doc.document_content && <button
                      onClick={() => SummarizeView(doc._id)}
                      className="flex-1 bg-red-400 cursor-pointer sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-medium text-white transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-sm"
                      
                    >
                      <Eye className="w-4 h-4 " />
                      Summarize 
                    </button>}
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="flex-1 cursor-pointer sm:flex-none px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg font-medium transition-all transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div>
        
      </div>
    </div>}
 </> );
}