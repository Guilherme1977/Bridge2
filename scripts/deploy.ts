const hre = require('hardhat');
import { ethers, network } from 'hardhat';
import Config from '../config/config.json';

import * as dotenv from 'dotenv';
dotenv.config();
// const DEFAULT_PRIVATE_KEY =
//     process.env.MNEMONIC || '1000000000000000000000000000000000000000000000000000000000000000';

async function main() {
    const RubicProxyFactory = await ethers.getContractFactory('RubicProxy');
    const chain = Config.chains.find(_chain => _chain.id === network.config.chainId);

    // const wallet = new ethers.Wallet(DEFAULT_PRIVATE_KEY);
    //
    // const tx = {
    //     from: '0x0000006f0994c53C5D63E72dfA8Cf38412E874A4',
    //     to: '0x0000006f0994c53C5D63E72dfA8Cf38412E874A4',
    //     value: 0.00000000000000001,
    //     nonce: 0,
    //     gasLimit: 1000000,
    //     gasPrice: 5,
    //     data: '0x'
    // };
    // console.log(tx);
    //
    // wallet.provider.sendTransaction(tx).then(transaction => {
    //     console.dir(transaction);
    //     alert('Send finished!');
    // });

    if (chain !== undefined) {
        const RubicProxy = await RubicProxyFactory.deploy(
            0,
            1500,
            [
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251',
                '0x362fa9d0bca5d19f743db50738345ce2b40ec99f',
                chain.metaRouter,
                chain.metaRouterGateway
            ],
            [],
            [],
            []
        );

        await RubicProxy.deployed();

        console.log('RubicProxy deployed to ', RubicProxy.address);

        await new Promise(r => setTimeout(r, 10000));

        await hre.run('verify:verify', {
            address: RubicProxy.address,
            constructorArguments: [
                0,
                1500,
                [
                    '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251',
                    '0x362fa9d0bca5d19f743db50738345ce2b40ec99f',
                    chain.metaRouter,
                    chain.metaRouterGateway
                ],
                [],
                [],
                []
            ]
        });
        const managerRole = await RubicProxy.MANAGER_ROLE();

        await RubicProxy.grantRole(managerRole, '0x8F53A5BDE40F809958f5a0A568B7D65A4EB07349');
        console.log('Manager role granted.');

        await new Promise(r => setTimeout(r, 10000));

        await RubicProxy.transferAdmin('0x105A3BA3637A29D36F61c7F03f55Da44B4591Cd1');
        console.log('Admin role granted.');
    } else {
        const RubicProxy = await RubicProxyFactory.deploy(
            0,
            1500,
            [
                '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251',
                '0x362fa9d0bca5d19f743db50738345ce2b40ec99f',
                ethers.constants.AddressZero,
                ethers.constants.AddressZero
            ],
            [],
            [],
            []
        );

        await RubicProxy.deployed();

        console.log('RubicProxy deployed to ', RubicProxy.address);

        await new Promise(r => setTimeout(r, 10000));

        await hre.run('verify:verify', {
            address: RubicProxy.address,
            constructorArguments: [
                0,
                1500,
                [
                    '0x663DC15D3C1aC63ff12E45Ab68FeA3F0a883C251',
                    '0x362fa9d0bca5d19f743db50738345ce2b40ec99f',
                    ethers.constants.AddressZero,
                    ethers.constants.AddressZero
                ],
                [],
                [],
                []
            ]
        });
        // 0x241ecf16d79d0f8dbfb92cbc07fe17840425976cf0667f022fe9877caa831b08
        const managerRole = await RubicProxy.MANAGER_ROLE();

        await RubicProxy.grantRole(managerRole, '0x8F53A5BDE40F809958f5a0A568B7D65A4EB07349');
        console.log('Manager role granted.');

        await new Promise(r => setTimeout(r, 10000));

        await RubicProxy.transferAdmin('0x105A3BA3637A29D36F61c7F03f55Da44B4591Cd1');
        console.log('Admin role granted.');
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});
