//importando as dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - tesnet
//Minhas carteiras não foram reconhecidas por alguns exploradores de blocos
//por isso, acrescentei um 4 à testnet. Depois disso o código passou a grar carteiras mainnet :/
// o proejto funcionou nas seguintes plataformas: https://faucet.testnet4.dev/ https://mempool.space/testnet4/address/mfx7hmuQKE8yLfUNa2uXXQsJtgSnXaci3D
//esta foi uma das carteiras geradas como testnet:mfx7hmuQKE8yLfUNa2uXXQsJtgSnXaci3D
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const  path = `m/49'/1'/0'/0`

//criando o mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raíz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta - par pvt pub key
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF());
console.log("Seed", mnemonic)