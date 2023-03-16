import '@rainbow-me/rainbowkit/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  googleWallet,
  facebookWallet,
  githubWallet,
  discordWallet,
  twitchWallet,
  twitterWallet,
  enhanceWalletWithAAConnector
} from '@zerodevapp/wagmi/rainbowkit'
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

// YOUR ZERODEV PROJECT ID
const projectId = '3b77f980-f0a3-4a98-bfc3-4be961c275c0'

const connectors = connectorsForWallets([
  {
    groupName: 'Social',
    wallets: [
      googleWallet({options: { projectId }}),
      facebookWallet({options: { projectId  }}),
      githubWallet({options: { projectId }}),
      discordWallet({options: { projectId }}),
      twitchWallet({options: { projectId }}),
      twitterWallet({options: { projectId }})
    ],
  },
  {
    groupName: 'AA Wallets',
    wallets: [
      enhanceWalletWithAAConnector(metaMaskWallet({ chains }), { projectId }),
      enhanceWalletWithAAConnector(walletConnectWallet({ chains }), { projectId }),
    ]
  },
])

const wagmiClient = createClient({
  autoConnect: false,
  connectors,
  provider
})

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
