/*
  - conectar dois navegadores (A  e B)
  - A criará uma ofera (sdp) e setará uma descricao local
  - B receberá a oferta e setará a descrição remota
  - B cria a resposta e seta ela na descrição local e sinaliza a resposta para A
  - A setta a resposta e setta a descrição remota
  - conexão é estabelecida. troca do canal.
*/

/**
 * Navegador A
 */

const localConnection = new RTCPeerConnection();
const dataChannel = localConnection.createDataChannel("canal");
dataChannel.onmessage = e => console.log(`Recebeu mensagem: ${e.data}`);
dataChannel.onopen = e => console.log(`Conexao aberta.`);

localConnection.onicecandidate = e => console.log(`New ICE candidate! reprintando SDP ${JSON.stringify(localConnection.localDescription)}`);
localConnection.createOffer()
  .then(offer => localConnection.setLocalDescription(offer))
  .then(a => console.log(`set successfully`));

const answer = "{}"; // repsosta do onicecandidate do rc;
localConnection.setRemoteDescription(answer);
// connection open
dataChannel.send("mensagme");


/**
 * Navegador B
 */
const offer = "{}"; // string json do offer printado no onicecandidate
const rc = new RTCPeerConnection();
// localdescription sera usada como resposta
rc.onicecandidate = e => console.log(`New ICE candidate! reprintando SDP ${JSON.stringify(localConnection.localDescription)}`);

rc.ondatachannel = e => {
  rc.dataChannel = e.channel;
  rc.dataChannel.onmessage = e => console.log(`nova mensagem do cliente: ${e.data}`);
  rc.dataChannel.onopen = e => console.log(`Conexao aberta.`);
};

rc.setRemoteDescription(offer)
  .then(a => console.log(`offer set!`));
rc.createAnswer()
  .then(a => rc.setLocalDescription(a))
  .then(a => console.log(`answer created`));

rc.send("respostas");