const Blockchain = require('./blockcain');

const bitcoin = new Blockchain ();

const previousBlockHash = '000036a1283ce295129ce1c8fcc713f7d582214731c6fdb161ed20b26d164d2f';

const currentblockData =[
    {
        amount: 50,
        sender: 'hjhyhktjytjhtyjhyjjyt',
        recipient: 'hjntjknjkgnrjkgrhnjthnjtnhjtnhjdk'
    },
    {
        amount: 100,
        sender: 'hjhyhktjytjikiklkoloolololo9htyjhyjjyt',
        recipient: 'hjntjknjkgnol9;lo9llolkorjkgrhnjthnjtnhjtnhjk'
    }
];

const nonce = 1234;

console.log(bitcoin.hashBlock(previousBlockHash, currentblockData));


