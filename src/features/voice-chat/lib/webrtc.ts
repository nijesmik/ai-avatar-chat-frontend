import {
  TURN_SERVER_CREDENTIAL,
  TURN_SERVER_URL,
  TURN_SERVER_USERNAME,
} from "@/shared/config";

export const offer = async (signaling: Socket, pc: RTCPeerConnection) => {
  const _offer = await pc.createOffer();
  await pc.setLocalDescription(_offer);
  signaling.emit("offer", _offer);
};

const icecandidate = (signaling: Socket) => {
  return (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      signaling.emit("ice-candidate", event.candidate.toJSON());
    }
  };
};

export const send = {
  offer,
  icecandidate,
};

export const getIceServers = () => {
  const iceServers: RTCIceServer[] = [{ urls: "stun:stun.l.google.com:19302" }];

  if (process.env.NODE_ENV === "production") {
    iceServers.push({
      urls: `${TURN_SERVER_URL}?transport=udp`,
      username: TURN_SERVER_USERNAME,
      credential: TURN_SERVER_CREDENTIAL,
    });
  }

  return iceServers;
};
