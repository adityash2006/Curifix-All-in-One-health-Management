import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useUser } from "@clerk/clerk-react"; 

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER || "http://localhost:3000";

export default function VideoCallFrontend(props) {
  const { user, isSignedIn } =  useUser() ;
  const [joined, setJoined] = useState(false);
  const [roomId, setRoomId] = useState();
  const [permissionAsked, setPermissionAsked] = useState(false);
  const [micEnabled, setMicEnabled] = useState(true);
  const [camEnabled, setCamEnabled] = useState(true);
  const [localStream, setLocalStream] = useState(null);
  const [socket, setSocket] = useState(null);
  const localVideoRef = useRef(null);
  const [remoteStreams, setRemoteStreams] = useState({});
  const peerConnections = useRef({});
  const [messages, setMessages] = useState([]);
  const [msgText, setMsgText] = useState("");
   const [ward, setward] = useState(1389);
   const [allwards,setallwards]=useState([]);
   const[isdoc,setisdoc]=useState(false);

   useEffect(()=>{
    async function checkdoc(){
      let options={
        method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid:user.id
      }),
      };
        let a=await fetch(`${import.meta.env.VITE_SOCKET_SERVER}/api/users/checkuser`,options);
        let {isdoc}=await a.json();
        setisdoc(isdoc);
        console.log(isdoc);
    }
    checkdoc();
    
   },[]);

  useEffect(()=>{
 setward( Math.floor(Math.random() * (9999 - 1001 + 1)) + 1001);
  },[permissionAsked]);
  
  const RTC_CONFIG = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  useEffect(() => {
    return () => {
      // cleanup
      const pcs = peerConnections.current || {};
      Object.keys(pcs).forEach((k) => {
        try { pcs[k].close(); } catch (e) {}
      });
      if (socket) socket.disconnect();
      if (localStream) localStream.getTracks().forEach(t => t.stop());
    };
  }, []);

  async function askPermissions() {
    setPermissionAsked(true);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setLocalStream(s);
      setMicEnabled(true);
      setCamEnabled(true);
    } catch (err) {
      console.error("permission denied or no devices:", err);
      alert("Camera and microphone permission are required to join the meeting.");
    }
  }

  function joinCall() {
    if (!roomId) {
      alert("Please provide a room id or link.");
      return;
    }

    if(roomId!=ward) {
      if(isdoc) ;
      else{
      alert("Please join your assigned ward number only");
      return;
      } 
    }
    if (!localStream) {
      alert("Please allow camera/mic first.");
      return;
    }

    const s = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    setSocket(s);

    s.on("connect", async () => {
      console.log("socket connected", s.id);
      s.emit("join-call", roomId);
      setJoined(true);
      await fetch(import.meta.env.VITE_SOCKET_SERVER+"/api/wards/start", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ wardId: roomId }),
});
    });

    s.on("user-joined", (newSocketId, currentList) => {
      console.log("user-joined", newSocketId, currentList);
      if (newSocketId === s.id) return;

      if (!peerConnections.current[newSocketId]) {
        const pc = createPeerConnection(newSocketId, s);
        peerConnections.current[newSocketId] = pc;
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

        pc.createOffer().then(offer => pc.setLocalDescription(offer))
          .then(() => {
            s.emit("signal", newSocketId, { type: "offer", sdp: pc.localDescription });
          }).catch(err => console.error("offer error", err));
      }
    });

    s.on("signal", async (fromId, message) => {
      if (fromId === s.id) return;
      let pc = peerConnections.current[fromId];
      if (!pc) {
        pc = createPeerConnection(fromId, s);
        peerConnections.current[fromId] = pc;
        localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
      }

      try {
        if (message.type === "offer") {
          await pc.setRemoteDescription(message.sdp);
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          s.emit("signal", fromId, { type: "answer", sdp: pc.localDescription });
        } else if (message.type === "answer") {
          await pc.setRemoteDescription(message.sdp);
        } else if (message.type === "candidate") {
          if (message.candidate) {
            await pc.addIceCandidate(message.candidate);
          }
        }
      } catch (err) {
        console.error("signal handling error", err);
      }
    });

    s.on("chat-message", (data, sender, socketSenderId, ts) => {
      setMessages(prev => [...prev, { sender, data, socketId: socketSenderId, ts }]);
    });

    s.on("user-left", (leftSocketId) => {
      console.log("user-left", leftSocketId);
      if (peerConnections.current[leftSocketId]) {
        try { peerConnections.current[leftSocketId].close(); } catch (e) {}
        delete peerConnections.current[leftSocketId];
      }
      setRemoteStreams(prev => {
        const copy = { ...prev };
        delete copy[leftSocketId];
        return copy;
      });
    });

    s.on("disconnect", async () => {
      await fetch(import.meta.env.VITE_SOCKET_SERVER+`/api/wards/end/${roomId}`, {
  method: "DELETE",
});
      console.log("socket disconnected");
      setJoined(false);
    });
  }

  function createPeerConnection(peerId, s) {
    const pc = new RTCPeerConnection(RTC_CONFIG);

    pc.onicecandidate = (ev) => {
      if (ev.candidate) {
        s.emit("signal", peerId, { type: "candidate", candidate: ev.candidate });
      }
    };

    pc.ontrack = (ev) => {
      const remoteStream = (ev.streams && ev.streams[0]) ? ev.streams[0] : new MediaStream(ev.track ? [ev.track] : []);
      setRemoteStreams(prev => ({ ...prev, [peerId]: remoteStream }));
    };

    pc.onconnectionstatechange = () => {
      console.log(`pc ${peerId} state:`, pc.connectionState);
      if (pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        try { pc.close(); } catch (e) {}
        delete peerConnections.current[peerId];
        setRemoteStreams(prev => { const c = { ...prev }; delete c[peerId]; return c; });
      }
    };

    return pc;
  }

  function sendMessage() {
    if (!socket) return;
    if (!msgText.trim()) return;
    socket.emit("chat-message", msgText, (user && user.fullName) || (user && user.id) || "Unknown");
    //this prevents adding the messages of the sender twice to its own screen setMessages(prev => [...prev, { sender: (user && user.fullName) || (user && user.id) || "You", data: msgText, socketId: socket.id, ts: new Date().toISOString() }]);
    setMsgText("");
  }

  function toggleMic() {
    if (!localStream) return;
    localStream.getAudioTracks().forEach(t => { t.enabled = !t.enabled; setMicEnabled(t.enabled); });
  }
  function toggleCam() {
    if (!localStream) return;
    localStream.getVideoTracks().forEach(t => { t.enabled = !t.enabled; setCamEnabled(t.enabled); });
  }

  function leaveCall() {
    const pcs = peerConnections.current || {};
    Object.keys(pcs).forEach(k => { try { pcs[k].close(); } catch (e) {} delete pcs[k]; });
    setRemoteStreams({});
    if (socket) { socket.disconnect(); setSocket(null); }
    setJoined(false);
    if (localStream) { localStream.getTracks().forEach(t => t.stop()); setLocalStream(null); }
  }
  useEffect(()=>{
async function activeward(){
const res = await fetch(import.meta.env.VITE_SOCKET_SERVER+"/api/wards");
const wards = await res.json();
setallwards(wards);
    }
    activeward();
    const interval = setInterval(activeward, 10000); // every 10s
  return () => clearInterval(interval);
  },[joined]);

  return (
    <div className="p-3 text-black max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Video call (doctor consultation)</h2>

      {!permissionAsked && (
        <div className="mb-4">
          <p className="mb-2">We need access to your camera and microphone to continue.</p>
          <button className="px-4 py-2 rounded bg-blue-600 cursor-pointer text-white" onClick={askPermissions}>Allow camera & mic</button>
        </div>
      )}

      {permissionAsked && !localStream && (
        <div className="mb-4 text-red-600">Permissions requested — if nothing happened, check browser permissions and try again.</div>
      )}

      {localStream && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-black font-bold mb-1">You</div>
            <video ref={localVideoRef} autoPlay playsInline muted className="w-full rounded bg-black" />
            <div className="flex gap-2 mt-2">
              <button onClick={toggleMic} className="px-3 py-1 rounded text-black border">{micEnabled ? 'Mute' : 'Unmute'}</button>
              <button onClick={toggleCam} className="px-3 text-black py-1 rounded border">{camEnabled ? 'Stop Cam' : 'Start Cam'}</button>
              {!joined &&
              <p>
              {isdoc ?<p> Available wards {ward} </p>:<p>Enter the virtual ward {ward} </p>}
             </p> }
            </div>
          </div>
        {joined && <div>
          {isdoc ? <div className="text-sm font-bold text-black mb-1">Patient</div>:<div className="text-sm font-bold text-black mb-1">Doctor</div>
}
            <div className="flex flex-wrap gap-2">
              {Object.entries(remoteStreams).length === 0 && <div className="text-gray-500">The doctor will be joining this call in a few moments</div>}
              {Object.entries(remoteStreams).map(([id, stream]) => (
                <div key={id} className="w-120">
                  <RemoteVideo stream={stream} />
                </div>
              ))}
            </div>
          </div>}
        </div>
      )}

      {!joined && (
        <div className="mb-4 flex gap-2 items-center">
          <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="ward id " className="border p-2 rounded flex-1" />
          <button onClick={joinCall} className="px-4 py-2 rounded bg-green-600 text-white cursor-pointer">Join</button>
        </div>
      )}

      {joined && (
        <div className="mb-4 flex gap-2">
          <div className="text-lg mr-3 text-gray-600">Room: <strong>{roomId}</strong></div>
                    <button onClick={leaveCall} className="px-4 py-2 rounded bg-red-600 cursor-pointer text-white">Leave</button>

        </div>


      )}

     {joined && <div className="border rounded p-3">
        <div className="mb-2 font-semibold text-blue-500">Chat</div>
        <div className="h-40 overflow-auto mb-2 p-2  rounded">
          {messages.map((m, i) => (
            <div key={i} className="mb-1">
              <div className="text-xs text-black">{m.sender} {m.ts ? `· ${new Date(m.ts).toLocaleTimeString()}` : ''}</div>
              <div className="text-black">{m.data}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input onKeyDown={(e)=>{if(e.key==="Enter"){sendMessage()}}}  value={msgText} onChange={(e) => setMsgText(e.target.value)} className="flex-1 border p-2 rounded" placeholder="Type message" />
          <button  onClick={sendMessage} className="px-4 py-2 rounded bg-blue-600 cursor-pointer text-white">Send</button>
        </div>
      </div>
}

      <div className="text-xs text-gray-500 mt-3">Please behave properly while being in video call </div>
{isdoc && <p>Active Wards :</p>}
      {isdoc && allwards.map((e,i)=>{
        return (
        <div key={e._id}>{e.wardId}</div>)
      })}
    </div>
  );
}

function RemoteVideo({ stream }) {
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.srcObject = stream; }, [stream]);
  return <video ref={ref} autoPlay playsInline className="w-full rounded bg-black" />;
}

function getRoomFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('room') || undefined;
  } catch (e) { return undefined; }
}
