import { offer } from "./webrtc";

const answer = (signaling: Socket, pc: RTCPeerConnection) => {
  signaling.off("answer");
  signaling.on("answer", async (answer: RTCSessionDescriptionInit) => {
    console.debug("Received answer from server");
    await pc.setRemoteDescription(new RTCSessionDescription(answer));
  });
};

const icecandidate = (signaling: Socket, pc: RTCPeerConnection) => {
  signaling.off("ice-candidate");
  signaling.on("ice-candidate", async (candidate: RTCIceCandidateInit) => {
    console.debug("Received ice candidate from server");
    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (e) {
      console.error("Error adding received ice candidate", e);
    }
  });
};

const renegotiate = (signaling: Socket, pc: RTCPeerConnection) => {
  signaling.off("renegotiate");
  signaling.on("renegotiate", async () => {
    console.debug("Received renegotiate from server");
    await offer(signaling, pc);
  });
};

export const addEventHandler = {
  answer,
  icecandidate,
  renegotiate,
};

export const removeEventHandler = (signaling: Socket) => {
  signaling.off("answer");
  signaling.off("ice-candidate");
  signaling.off("renegotiate");
};
