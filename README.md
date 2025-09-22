# Fullstack.trade Hyperliquid Orderbook Demo

## Usage

- To run locally, open a terminal and run `npm run dev`

## Technical Details

### Hyperliquid API

#### BTC

##### nSigFigs param 
- null --> returns to $1 accuracy
- 2 --> values returned to $10,000 accuracy
- 3 --> values returned to $1,000 accuracy
- 4 --> values returned to $100 accuracy
- 5 --> values returned to $10 accuracy

##### mantissa param - Requires `nSigFigs` to be 5 (aka $10 accuracy)
- null --> values returned to $10 accuracy
- 2 --> values returned to $20 accuracy
- 5 --> values returned to $50 accuracy

#### ETH

##### nSigFigs param 
- null --> returns to $0.1 accuracy
- 2 --> values returned to $100 accuracy
- 3 --> values returned to $10 accuracy
- 4 --> values returned to $1 accuracy
- 5 --> values returned to $0.1 accuracy

##### mantissa param - Requires `nSigFigs` to be 5 (aka $10 accuracy)
- null --> values returned to $0.1 accuracy
- 2 --> values returned to $0.2 accuracy
- 5 --> values returned to $0.5 accuracy





TODO
x main UI
x hook in precision
x follow up UI stuff
  x hover rows in order book
  x background shading
  x $ vs amnt dropdown
  x spread row 
- fixed width spread items
- out of order glitch when changing settings
x fixes for when swapping symbol and having it not lag before WS conn established