/** @jsxRuntime classic */
/** @jsx jsx */
import React from "react";
import { jsx, css } from "@emotion/react";
import { Simulator } from "./Simulator";
import { Randoms } from "./Randoms";
import { EvolvingBaby } from "./EvolvingBaby";
import bobababyNFTlogo from "../bobababyNFTlogo.png";
import { Stats } from "./Stats";
import { WhiteSlantBottom, WhiteSlantTop } from "./whiteSlant";
import { BobaBabyCanvas } from "./BobaBabyCanvas";
import { Social } from "./Social";
import cc0 from "../cc-zero.svg";
import publicDomainMark from "../cc-public_domain_mark_white.svg";

export const Home = () => {
  return (
    <div
      css={css`
        /* padding: 40px; */
      `}
    >
      <div
        css={css`
          padding: 60px 60px 0 60px;

          @media (max-width: 760px) {
            padding: 40px 0px 0 0px;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            max-width: 800px;
            margin: 0 auto;

            @media (max-width: 760px) {
              flex-wrap: wrap;
              justify-content: center;
            }
          `}
        >
          <div
            css={css`
              padding-top: 80px;
              padding-right: 40px;

              @media (max-width: 760px) {
                padding-top: 0px;
                width: 100%;
                padding-bottom: 50px;
                padding-right: 0;
              }
            `}
          >
            <h1
              css={css`
                text-align: center;
                max-width: 400px;
                padding: 0;
                margin: 0 auto 20px auto;

                @media (max-width: 760px) {
                  padding: 0 40px;
                  padding-top: 0px;
                  width: 100%;
                  padding-bottom: 50px;
                }
                img {
                  display: inline-block;
                  margin: 0 auto;
                  max-width: 100%;
                }
              `}
            >
              <img src={bobababyNFTlogo} alt="boba.baby" width="400" />
            </h1>
            <div
              css={css`
                padding-top: 5px;
                a {
                  padding: 30px 12px;
                }
                a:hover {
                  opacity: 0.9;
                }
                img {
                  width: 40px;
                  height: 40px;
                }

                text-align: center;
              `}
            >
              <Social />
            </div>
          </div>
          <div
            css={css`
              border-radius: 16px;
              position: relative;
              width: 270px;
              height: 440px;
              flex: 0 0 270px;
              @media (max-width: 760px) {
                height: 460px;
              }
            `}
          >
            <div
              css={css`
                position: absolute;
                top: -40px;
                left: -102px;
                width: 300px;
              `}
            >
              <EvolvingBaby />
            </div>
          </div>
        </div>
      </div>

      <div
        css={css`
          background: #fff;
          padding-top: 0px;
        `}
      >
        <Randoms />

        <Stats />

        {/* <div
          css={css`
            padding: 0 40px;
          `}
        >
          <p
            css={css`
              font-size: 32px;
              margin: 0 auto;
              max-width: 800px;
              text-align: center;
              margin-bottom: 20px;
              line-height: 1.45;
              @media (max-width: 500px) {
                font-size: 28px;
              }
            `}
          >
            Each bobababy NFT contains traits from 12 trait types that are
            randomly assigned during the NFT minting event.
          </p>
        </div> */}
        <div
          css={css`
            height: 80px;
          `}
        ></div>
      </div>
      <WhiteSlantTop />

      <div
        css={css`
          background: linear-gradient(10deg, #90ffc6, #b3ffd7);
          color: #000000;
          position: relative;
          z-index: 2;
        `}
      >
        <div
          css={css`
            max-width: 820px;
            display: block;
            padding: 140px 60px;
            margin: 0 auto;
            p {
              font-size: 18px;
              margin-bottom: 0.8em;
            }
          `}
        >
          <h3
            css={css`
              padding-top: 2vw;
              font-size: 32px;
              @media (max-width: 530px) {
                font-size: 28px;
              }
            `}
          >
            Open source. Provably fair.{" "}
            <span
              css={css`
                display: none;
                @media (max-width: 880px) {
                  display: inline;
                  &:after {
                    content: "\\a";

                    white-space: pre;
                  }
                }
                @media (max-width: 530px) {
                  display: none;
                }
              `}
            />
            Cryptographically verifiable.
          </h3>
          <div
            css={css`
              display: inline-block;
              margin-bottom: 2vw;
            `}
          >
            <p>
              Although BobaBabies are cute on the outside, the BobaBabies team
              is serious about bringing the ethos of fairness to the BobaBaby
              NFT drop. The source code will be publicly available for anyone to
              audit for full transparency before the drop. Trait frequencies are
              published on our website, and the formula for deterministically
              deriving a BobaBaby will be auditable.
            </p>
            <p>
              The hash of the block after that in which payment was received
              will be used as a source of randomness for determining the traits
              of the bobababy. This ensures that any grinding attack to generate
              rare BobaBabies would require advanced MEV that is not known to be
              possible.
            </p>
            <p>
              The derivation for generating the seed will be verifiable by
              anyone using a block explorer and online sha256 tool. The seed can
              be pasted into the Build & Explore tool (coming soon). The
              pseudocode for this derivation mechanism is presented here:
              <br />
              <span
                css={css`
                  padding: 16px 20px 0 20px;
                  font-size: 16px;
                  color: #000;
                  display: block;
                  @media (max-width: 760px) {
                    padding: 16px 0 0 0;

                    code {
                      font-size: 16px;
                    }
                  }
                `}
              >
                {/* fuck, did i actually just syntax highlight this by hand?? Colors from prism.js */}
                <code>
                  seed{" "}
                  <span
                    css={css`
                      color: #9a6e3a;
                    `}
                  >
                    =
                  </span>{" "}
                  <span
                    css={css`
                      color: #07a;
                    `}
                  >
                    sha256
                  </span>
                  <span
                    css={css`
                      color: #999;
                    `}
                  >
                    (
                  </span>
                  <br />
                  <span
                    css={css`
                      display: flex;
                    `}
                  >
                    <span>
                      {"\u00A0"}
                      {"\u00A0"}
                    </span>
                    <span
                      css={css`
                        word-break: break-word;
                      `}
                    >
                      bobababyID.
                      <span
                        css={css`
                          color: #07a;
                        `}
                      >
                        toString
                      </span>
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        ()
                      </span>
                      <span
                        css={css`
                          color: #9a6e3a;
                        `}
                      >
                        {" "}
                        +
                      </span>
                      <br />
                      <span
                        css={css`
                          color: #07a;
                        `}
                      >
                        blockAtHeight
                      </span>
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        (
                      </span>
                      paymentTx
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        .
                      </span>
                      height
                      <span
                        css={css`
                          color: #9a6e3a;
                        `}
                      >
                        +
                      </span>
                      <span
                        css={css`
                          color: #905;
                        `}
                      >
                        1
                      </span>
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        )
                      </span>
                      <span
                        css={css`
                          &:before {
                            content: " ";
                            visibility: hidden;
                            position: absolute;
                          }
                          color: #999;
                        `}
                      >
                        .
                      </span>
                      hash
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        .
                      </span>
                      <span
                        css={css`
                          color: #07a;
                        `}
                      >
                        toBase58
                      </span>
                      <span
                        css={css`
                          color: #999;
                        `}
                      >
                        ()
                      </span>
                    </span>
                  </span>
                  <span
                    css={css`
                      color: #999;
                    `}
                  >
                    )
                  </span>
                </code>
              </span>
            </p>
            <p>
              Another part of fairness is infrastructure access. Solana NFT
              projects have been overwhelmed by extremely high demand, website
              crashes, and RPC node failures, giving an unfair advantage to
              bots. The BobaBaby drop is engineered to avoid any such downtime
              issues. The BobaBaby ops team has over a decade of experience in
              deploying reliable web applications. More details on the mechanism
              will be announced later.
            </p>
          </div>
        </div>
      </div>
      <WhiteSlantBottom />
      <div
        css={css`
          max-width: 1300px;
          margin: 0 auto;
        `}
      >
        <div
          css={css`
            padding: 70px 80px 80px 80px;
          `}
        >
          <div
            css={css`
              max-width: 600px;
              h3 {
                font-size: 32px;
              }
              p {
                font-size: 20px;
              }
            `}
          >
            <h3>Build & Explore</h3>
            <p>
              Although every bobababy will be minted in a provably fair and
              random way, you can explore all the traits with this tool.
              Feedback is welcome in our Discord server!
            </p>
          </div>
        </div>
      </div>
      <Simulator />
      <div
        css={css`
          background: linear-gradient(10deg, #ffc7dd 20%, #59d3ff);
          position: relative;
          z-index: 0;
          padding: 120px 60px 200px 60px;

          /* color: rgba(0, 0, 0, 0.8); */
          font-size: 20px;
          line-height: 1.45;
          h2 {
            font-size: 48px;
            margin-bottom: -10px;
            font-weight: 500;
          }
          h3 {
            margin-top: 40px;
            font-size: 25px;
            margin-bottom: 8px;
            font-weight: 600;
          }
          p {
            font-size: 18px;
            margin-bottom: 0.8em;
            color: rgba(0, 0, 0, 0.8);
          }
          a {
            color: rgba(0, 0, 0, 0.8);
          }
          font-size: 18px;

          @media (max-width: 640px) {
            padding-left: 40px;
            padding-right: 35px;
          }
        `}
      >
        <div
          css={css`
            margin: 0 auto;
            max-width: 600px;
          `}
        >
          <h2>FAQ</h2>
          <h3>What are BobaBabies?</h3>
          <p>
            BobaBabies are cute and magical bubble tea drinks. BobaBabies were
            born on a starry night, when a famous Tokyo boba chef sprinkled
            magical boba pixie dust into her batch of drinks. The BobaBabies
            sprung to life and created a friendly and fun loving society on the
            beaches of Japan.
          </p>
          <p>
            But some BobaBabies yearned for adventure. A group of 8,888
            BobaBabies set out on a journey in a Boba SailBoat, and the winds
            carried them all the way to Solana Beach. Now, those babies are
            relaxing on the Solana blockchain. Befriend some BobaBabies before
            the BobaBoat leaves port again!
          </p>
          <p>
            For more lore, join the{" "}
            <a href="https://discord.com/invite/yQrchtzmnB">
              Discord community
            </a>
            .
          </p>
          <h3>How can I get a BobaBaby?</h3>
          <p>
            You can mint a random BobaBaby on https://boba.baby starting on the
            launch date, and until the project sells out. BobaBabies will also
            be available for purchase on secondary markets shortly after the
            launch.
          </p>
          <h3>What are the technical details?</h3>
          <p>
            BobaBaby NFTs are 1-of-1 Solana SPL tokens. BobaBaby metadata is
            stored on the Solana blockchain, and the art is hosted permanently
            and immutably on Areweave. All BobaBaby Solana addresses begin with
            Boba and end with BB, like{" "}
            <code
              css={css`
                word-break: break-all;
              `}
            >
              BobaWGTpSWtcLacv9Un9xm9DUu8dmfStf6gW3UCbkpBB
            </code>
            .
          </p>
          <h3>How much will BobaBabies cost to mint?</h3>
          <p>All BobaBabies will cost 2 SOL to mint.</p>
          <h3>How many BobaBabies can I mint?</h3>
          <p>You can mint up to 20 BobaBabies per transaction.</p>
          <h3>Are any BobaBabies reserved for partnerships? </h3>
          <p>
            There are 88 BobaBabies reserved for giveaways, partnerships, and
            post-launch marketing. The rest of the{" "}
            {Number(8888).toLocaleString()} BobaBabies will be available for
            public mint.
          </p>
          <h3>What is the license for BobaBaby art and lore?</h3>
          <p>
            All BobaBaby art, code, and assets are released under the{" "}
            <a
              rel="nofollow noreferrer"
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
            >
              CC0 Public Domain Dedication
            </a>
            . We want to encourage the community to build out the BobaVerse,
            following the examples of successful public domain NFT projects like{" "}
            <a
              rel="nofollow noreferrer"
              target="_blank"
              href="https://nouns.wtf/"
            >
              Nouns
            </a>{" "}
            and{" "}
            <a
              rel="nofollow noreferrer"
              href="https://opensea.io/collection/blitmap"
              target="_blank"
            >
              Blitmap
            </a>
            .
          </p>
          <h3>How was the art created?</h3>
          <p>
            Every BobaBaby trait was manually created by hand on a Pen Display.
            The traits were dynamically layered in a web browser, and the native
            canvas resolution of each bobababy is 6000x6000 pixels.
          </p>
          <h3>Are some BobaBabies more rare than others? </h3>
          <p>There are four rarity tiers for each trait:</p>
          <ul>
            <li>Common</li>
            <li>Rare</li>
            <li>Ultra Rare</li>
            <li>Secret Rare</li>
          </ul>
          <p>
            Secret Rare traits are rare traits that will be revealed 24 hours
            after minting goes live. The drop rates are transparent and can be
            inspected using the Build & Explore tool, or by viewing the source
            code on GitHub.
          </p>
          <h3>How many traits will there be?</h3>
          <p>
            There are over 40 total lid types, with more being revealed as we
            approach launch. In total there will be more possible combinations
            of traits than there are{" "}
            <a
              rel="nofollow noreferrer"
              href="https://fred.stlouisfed.org/series/M2SL"
              target="_blank"
            >
              US dollars in circulation
            </a>
            .
          </p>
          <h3>What happens after the sale?</h3>
          <p>
            The team will list BobaBabies on DigitalEyes and Solanart, and
            ensure BobaBabies are viewable in the Phantom wallet. Along with
            uploading the files to Arweave, we will provide a single .zip file
            containing 6kx6k renders of all BobaBabies for the community to use.
            From there, it is up to the community to enjoy the art and decide
            what the universe looks like - we do not want to compromise the art
            project with excessive airdrops or governance etc.
          </p>
          <h3>How can I join the community or get in touch?</h3>
          <p>
            Join our discord at{" "}
            <a
              href="https://discord.gg/yQrchtzmnB"
              target="_blank"
              rel="nofollow noreferrer"
            >
              discord.gg/yQrchtzmnB
            </a>
          </p>
        </div>
      </div>
      <WhiteSlantBottom />
      <div
        css={css`
          padding: 80px 60px;

          @media (max-width: 500px) {
            padding: 80px 20px;
          }
        `}
      >
        <div
          css={css`
            max-width: 800px;
            margin: 0 auto;
          `}
        >
          <h3
            css={css`
              width: 100%;
              text-align: center;
              font-size: 32px;
              margin-bottom: 60px;
            `}
          >
            Made with love by,
          </h3>
        </div>
        <div
          css={css`
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(3, minmax(100px, 320px));
            justify-content: center;

            text-align: center;
            .teamcol {
              max-width: 320px;
            }

            @media (max-width: 700px) and (min-width: 500px) {
              display: block;
              .teamcol {
                display: grid;
                max-width: 100%;
                grid-template-columns: 200px 200px;
                align-items: center;
                text-align: left;
                gap: 40px;
                margin-bottom: 40px;
                justify-content: center;
              }
            }

            @media (max-width: 500px) {
              display: grid;
              justify-content: center;
              grid-template-columns: repeat(1, minmax(0, 1fr));
              align-items: center;
              .teamcol {
                width: 240px;
                margin: 0 auto;
              }
            }
            .teamtext {
            }
            p {
              margin-top: -4px;
            }

            h4 {
              margin-top: 24px;
              font-size: 24px;
              margin-bottom: 0;
            }
            gap: 30px;
            justify-content: center;
            .BobaBabyCanvas {
              border-radius: 50%;
            }
            margin-bottom: 60px;
          `}
        >
          <div className="teamcol">
            <BobaBabyCanvas
              baby={{
                Lid: ["Shiba", "Red"],
                Straw: "Red Orange",
                Accessory: "Leaf",
                Eyes: "Sparkly Double Lash",
                Glasses: "None",
                Blush: "Light Pink Circle Blush",
                Sticker: "Solana",
                Cup: "White",
                Drink: "Gradient Blue-Pink",
                Boba: "Shaken Plain Boba",
                Background: "Plain Green",
              }}
              noWatermark={true}
              unZoomable={true}
              small={true}
            />
            <div className="teamtext">
              <h4>BobaShiba</h4>
              <p>Artist</p>
            </div>
          </div>
          <div className="teamcol">
            <BobaBabyCanvas
              baby={{
                Lid: ["Mouse", "Gray"],
                Straw: "Blue",
                Accessory: "Bow-Pink",
                Eyes: "Closed U",
                Glasses: "None",
                Blush: "Blue Star Blush",
                Sticker: "Diamond",
                Cup: "White",
                Drink: "Solid Periwinkle",
                Boba: "Hearts and Stars Full",
                Background: "Plain Pink",
              }}
              noWatermark={true}
              unZoomable={true}
              small={true}
            />
            <div className="teamtext">
              <h4>BobaMouse</h4>
              <p>Marketing, Community</p>
            </div>
          </div>
          <div className="teamcol">
            <BobaBabyCanvas
              baby={{
                Lid: ["Monkey", "Brown"],
                Straw: "Blue",
                Accessory: "Snail",
                Eyes: "Red Heart",
                Glasses: "Orange Round Sunglasses",
                Blush: "Purple Transparent Circle Blush",
                Sticker: "None",
                Cup: "White",
                Drink: "Solid Pink",
                Boba: "Boba Three Rows",
                Background: "Plain Yellow",
              }}
              noWatermark={true}
              unZoomable={true}
              small={true}
            />
            <div className="teamtext">
              <h4>BobaMonkey</h4>
              <p>Engineer</p>
            </div>
          </div>
        </div>
      </div>
      <Social />

      <footer
        css={css`
          max-width: 720px;
          margin: 100px auto 0 auto;
          padding: 60px;
          p {
            font-size: 14px;
            color: #999;
          }
        `}
      >
        <p>
          <a
            rel="nofollow"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
          >
            <img src={cc0} alt="Public Domain" height="28" />
          </a>
        </p>
        <p
          css={css`
            color: #000 !important;
            margin-top: 19px;
            a {
              color: #000;
              text-decoration: underline;
            }
          `}
        >
          The BobaBabies project is released under the{" "}
          <a
            rel="nofollow noreferrer"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
          >
            CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
          </a>
          .
        </p>
        <p
          css={css`
            color: #000 !important;
          `}
        >
          <img
            src={publicDomainMark}
            css={css`
              margin-bottom: 2px;
            `}
            alt="No Copyright"
            width="9"
            height="9"
          />{" "}
          2021 BobaBabies. No rights reserved.
        </p>
        <p>
          The BobaBabies displayed on this website are for display purposes
          only, and are not indicative of actual odds during the mint. Please
          refer to the Build & Explore tool for accurate drop rates.
        </p>
        <p>
          Non-fungible tokens are not an investment. BobaBabies have no inherent
          monetary value and they should be treated as nothing more than a
          collectible. We do not promise or guarantee that these non-fungible
          tokens will be worth anything. Any apparent value of BobaBabies
          strictly comes from the activities of the community.
        </p>
        <p>
          The website is provided “as-is” without warranty of any kind. Users
          wishing to preserve the art work should download the open source
          GitHub repositories. By interacting with BobaBabies, you assume sole
          responsibility for all transactions involving BobaBabies.
        </p>
      </footer>
    </div>
  );
};
