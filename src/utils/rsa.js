import JSEncrypt from 'jsencrypt'

export  function rsaEncrypt(data,pubKey){
    let encrypt=new JSEncrypt();
    pubKey='-----BEGIN PUBLIC KEY-----\n' +
        pubKey+'\n' +
        '-----END PUBLIC KEY-----';
    encrypt.setPublicKey(pubKey);
    console.log('pubkey:'+pubKey)
    console.log('data:'+data);
    let content=encrypt.encrypt(data);
    return content;
}
