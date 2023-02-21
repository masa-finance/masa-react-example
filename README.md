# Getting Started with masa-react

## Setup

First install `masa-react` in your project
`yarn add @masa-finance/masa-react`

Then import and add a provider

```ecmascript 6
import {
  MasaProvider
} from "@masa-finance/masa-react";

...

function App() {
  return (
    <MasaProvider>
      ...
    </MasaProvider>
  );
}

```

### Styles

If you want to add our styles to your project just include this line at the very top of your file right below your imports
`import "@masa-finance/masa-react/dist/style.css";`

## Usage ( inside MasaProvider )

Import `useMasa` to have access to the `masa` object, this will let you connect with the whole interface of smart contracts and tools from `masa-sdk`

### Example for useMasa ( Connect users wallet )

```ecmascript 6
import {
  useMasa
} from "@masa-finance/masa-react";

...

const { connect } = useMasa();

const connectionCallback = () => {
  history.push('/dashboard');
}

const connectionHandler = useCallback(() => {
  connect(options)
}, [connect, options]);

...

<Button
  onClick={connectionHandler}>Connect
  with
  Masa</Button>

```

### Example for masa object ( Wallet is already connected here )

```ecmascript 6
import {
  useMasa
} from "@masa-finance/masa-react";

...

const { masa } = useMasa();

const askForCreditReports = useCallback(async () => {
  const creditReports = await masa?.creditScore.list();
  console.log({ creditReports });
}, [masa]);

...

<Button
  onClick={askForCreditReports}>Show
  credit
  reports</Button>;

```

### For some contracts you will need some pre requisites ( Scopes )

You can specify which scopes you want, here goes an example of requesting the connected user to have an identity

```ecmascript 6
const options = {
  scope: ['identity'];
}

const connectionHandler = useCallback(() => {
  connect(options)
}, [connect, options]);

...

<Button
  onClick={connectionHandler}>Connect
  with
  Masa</Button>

```

### Current useMasa shape

```
  children?: React.ReactNode;
  setProvider?: (provider: ethers.Wallet | ethers.Signer | null) => void;
  provider?: ethers.Wallet | ethers.Signer | null;
  isModalOpen?: boolean;
  setModalOpen?: (val: boolean) => void;
  masa?: Masa;
  isConnected?: boolean;
  loading?: boolean;
  walletAddress?: string | undefined;
  identity?: {
    identityId?: BigNumber | undefined;
    address?: string | undefined;
  };
  loggedIn?: boolean;
  handleLogin?: () => void;
  handleLogout?: (callback?: () => void) => void;
  handlePurchaseIdentity?: () => void;
  connect?: (options?: { scope?: string[]; callback?: () => void }) => void;
  closeModal?: () => void;
  scope?: string[];
  company?: string;
  handleCreateCreditScore?: () => void;
  creditScores?:
    | {
        tokenId: BigNumber;
        tokenUri: string;
        metadata?: ICreditScore | undefined;
      }[]
    | null;
  loadCreditScores?: () => void;
  soulnames?: SoulNameDetails[] | null;
  loadSoulnames?: () => void;
  logginLoading?: boolean;
  missingProvider?: boolean;
  setMissingProvider?: (value: boolean) => void;
  greens?:
    | {
        tokenId: BigNumber;
        tokenUri: string;
        metadata?: IGreen | undefined;
      }[]
    | undefined;
  greenLoading?: boolean;
  handleCreateGreen?: (
    phoneNumber: string,
    code: string
  ) => Promise<VerifyGreenResult | undefined>;
  handleGenerateGreen?: (
    phoneNumber: string
  ) => Promise<GenerateGreenResult | undefined>;
  network?: ethers.providers.Network | null;
  switchNetwork?: (chainId: number) => void;
  SupportedNetworks?: { [index in NetworkName]: Network };
  networkName?: NetworkName;
```
