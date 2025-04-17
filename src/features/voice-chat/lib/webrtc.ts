export const offer = async (signaling: Socket, pc: RTCPeerConnection) => {
  const _offer = await pc.createOffer();
  await pc.setLocalDescription(_offer);
  signaling.emit("offer", _offer);
};

export const icecandidate = (signaling: Socket) => {
  return (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate) {
      signaling.emit("ice-candidate", event.candidate.toJSON());
    }
  };
};
