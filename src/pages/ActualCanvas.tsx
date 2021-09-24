/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { FullBobaBaby, Layer, Trait, TraitCategory } from "../IArtDef";
import { babyArtDefinition } from "../babyArtDefinition";

const thecanvas = css`
  display: none;
`;
const downloadLink = css`
  display: inline-block;
  height: 24px;
  position: relative;
  font-size: 16px;
  color: #999;
  text-decoration: none;
  &:hover {
    color: #555;
    text-decoration: underline;

    .lds-dual-ring:after {
      border: 2px solid #555;
      border-color: #555 transparent #555 transparent;
    }
  }
  &.loading {
    color: #555;
    cursor: wait;
    .lds-dual-ring {
      display: inline-block;
    }
  }

  .lds-dual-ring {
    position: absolute;
    display: none;
    right: -20px;
    width: 16px;
    height: 16px;
    margin-left: 6px;
  }
  .lds-dual-ring:after {
    content: " ";
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #999;
    border-color: #999 transparent #999 transparent;
    animation: lds-dual-ring 0.5s linear infinite;
  }
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

type State = {
  loading: boolean;
};
interface ActualCanvasProps {
  baby: FullBobaBaby;
  resolution: number;
  setFavicon?: boolean;
  showDownloadLink?: boolean;
}
export class ActualCanvas extends React.Component<ActualCanvasProps, State> {
  canvasRef: HTMLCanvasElement | null;
  anchorRef: HTMLAnchorElement | null;

  setCanvasRef: (instance: HTMLCanvasElement | null) => void;
  setAnchorRef: (instance: HTMLAnchorElement | null) => void;
  loadTarget: HTMLImageElement[] = [];
  nonce = 0;
  downloadReady = false;

  constructor(props: ActualCanvasProps) {
    super(props);

    this.state = { loading: false };

    this.canvasRef = null;
    this.anchorRef = null;
    this.setCanvasRef = (instance) => {
      this.canvasRef = instance;
    };
    this.setAnchorRef = (instance) => {
      this.anchorRef = instance;
    };
  }
  componentDidMount() {
    if (this.props.setFavicon) {
      this.renderCanvas(false, false);
    }
  }
  componentDidUpdate() {
    if (this.props.setFavicon) {
      this.renderCanvas(false, true);
    }
  }
  shouldComponentUpdate(props: { baby: FullBobaBaby }): boolean {
    this.downloadReady = false;
    return true;
  }
  onDownloadClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    if (this.downloadReady) {
      return;
    } else {
      this.renderCanvas(true);
      e.preventDefault();
    }
  }

  renderCanvas(download = false, dontSetState = false) {
    const canvas = this.canvasRef;
    if (canvas === null) return;

    const ctx = canvas.getContext("2d");
    if (ctx == null) return;

    if (!this.state.loading) {
      this.setState({ loading: true });
    }

    const layers: Layer[] = [];
    for (const [traitType, traitName] of Object.entries(this.props.baby)) {
      if (traitName === null) return;

      // @ts-ignore
      const category: TraitCategory = babyArtDefinition[traitType];

      let trait: Trait | undefined;

      if (traitType === "Lid") {
        trait = category.traits.find(
          (trait) =>
            trait.traitName === traitName[0] &&
            trait.subTraitName === traitName[1]
        );
      } else {
        trait = category.traits.find((trait) => trait.traitName === traitName);
      }

      if (trait) {
        for (const newLayer of trait.layers) {
          layers.push(newLayer);
        }
      } else {
        console.error("missing", traitType, ":", traitName);
        return;
      }
    }

    layers.sort(
      (layer1: Layer, layer2: Layer) => layer1.zIndex - layer2.zIndex
    );

    const nonce = this.nonce + 1;
    this.nonce = nonce;
    this.loadTarget = [];

    let renderIfAllLoadedSuccessful = false;
    const renderIfAllLoaded = () => {
      if (this.loadTarget.length !== layers.length) return;
      if (this.nonce !== nonce) return;
      for (const image of this.loadTarget) {
        if (!image.complete) return;
      }
      if (this.downloadReady) return;
      if (renderIfAllLoadedSuccessful) return;
      renderIfAllLoadedSuccessful = true;

      for (const image of this.loadTarget) {
        ctx.drawImage(image, 0, 0);
      }
      ctx.font = `${this.props.resolution / 12}px Handlee`;
      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.save();
      ctx.translate(this.props.resolution, 0);
      ctx.rotate(-Math.PI / 2);
      ctx.textAlign = "center";
      ctx.fillText(
        "beta",
        -this.props.resolution / 2,
        -this.props.resolution * 0.034,
        this.props.resolution
      );

      ctx.fillText(
        "@BobaBabyNFT",
        -this.props.resolution / 2,
        -this.props.resolution * 0.104,
        this.props.resolution
      );
      ctx.restore();

      const dataURL = canvas.toDataURL("image/png");

      const favicon: HTMLLinkElement | null = document.getElementById(
        "favicon"
      ) as HTMLLinkElement;
      if (favicon) {
        favicon.href = dataURL;
      }

      const favicon32: HTMLLinkElement | null = document.getElementById(
        "favicon32"
      ) as HTMLLinkElement;
      if (favicon32) {
        favicon32.href = dataURL;
      }

      const favicon16: HTMLLinkElement | null = document.getElementById(
        "favicon16"
      ) as HTMLLinkElement;
      if (favicon16) {
        favicon16.href = dataURL;
      }

      if (download && this.anchorRef) {
        this.anchorRef.href = dataURL;
        this.anchorRef.setAttribute(
          "download",
          `BobaBaby-${this.props.baby.Lid[0]}.png`
        );
        this.anchorRef.setAttribute(
          "href",
          dataURL.replace("image/png", "image/octet-stream")
        );
        this.downloadReady = true;
        this.anchorRef.click();
        setTimeout(() => {
          this.setState({ loading: false });
        }, 100);
      }
    };

    layers.forEach((layer) => {
      const placeholderPath = `/layers/${layer.fileName.replace(
        ".png",
        `.${this.props.resolution}.png`
      )}`;

      var image = new Image();
      this.loadTarget.push(image);
      image.src = placeholderPath;
      image.onload = renderIfAllLoaded;
    });
  }

  render() {
    return (
      <div>
        <canvas
          css={thecanvas}
          ref={this.setCanvasRef}
          id="myCanvas"
          width={this.props.resolution}
          height={this.props.resolution}
        >
          {JSON.stringify(this.props.baby, null, 2)}
        </canvas>
        {this.props.showDownloadLink ? (
          <a
            ref={this.setAnchorRef}
            id="downloadButton"
            href="#explore"
            download="not-yet-loaded.png"
            css={downloadLink}
            className={this.state.loading ? "loading" : ""}
            onClick={(e) => this.onDownloadClick(e)}
          >
            Download {this.props.resolution}x{this.props.resolution}
            <span className="lds-dual-ring"></span>
          </a>
        ) : null}
      </div>
    );
  }
}
