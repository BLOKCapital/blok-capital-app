"use client";
/* eslint-disable @next/next/no-img-element */
import BannerWrapper from "./Banner.style";
import Countdown from "../countdown/page";
import Progressbar from "../progressbar/page";
import Button from "../button/page";
import Image from "next/image";
import Telegram from "../../../public/assets/images/icons/telegram.svg";
import Twitter from "../../../public/assets/images/icons/twitter.svg";
import Medium from "../../../public/assets/images/icons/medium.svg";
import Linkedin from "../../../public/assets/images/icons/linkedin.svg";
import { useState } from "react";
import Modal from "../modal/page";
import clipboardCopy from "clipboard-copy";
import Data from "../../../public/assets/data/bannarV3";
import { useEffect } from "react";
import Deposite from "../deposite/page";
import { LucideCopy } from "lucide-react";
import { MdDone } from "react-icons/md";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import TransakWidget from "../transak/page";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";
import { alchemy } from "../../utils/alchemy";
import MeshGradModal from "../../../public/assets/images/banner/mesh-grad-1.png";
import axios from "axios";
// eslint-disable-next-line react/prop-types
const PopupWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #000;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 4px;
  color: #fff;
  z-index: 999;
  display: ${({ open }) => (open ? "block" : "none")};
  text-align: left;
  width: 300px;
  padding: 18px;

  background-image: url("/assets/images/banner/mesh-grad-1.png");

  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;

const PopupContent = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Move the icon to the right */
`;

const PopupText = styled.p`
  color: #fff;

  margin-top: 3px; /* Add a 3px gap between the icon and text */
`;

const Link = styled.a`
  color: #fff; /* Set link color to blue by default */
  text-decoration: underline; /* Remove the default underline */
  cursor: pointer;
  border-bottom: 1px solid white;
  transition: text-decoration 0.2s; /* Add a smooth transition effect */

  // &:hover {
  //   text-decoration: underline; /* Add underline on hover */
  // }
`;

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copy, setcopy] = useState(false);
  const {
    code,
    userinfo,
    setAccesscodeopen,
    accountAddress,
    setusdtbalace,
    setBlokcbalace,
    setTotalblokc,
    totalblokc,
    setMyreferralCode,
  } = useWeb3AuthSigner();
  const modalHandle = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    }
    //} else if (isConnected === false) {
    //  setOpenModule(true);
    //} else {
    //  setIsModalOpen(true);
    //}
  };
  const [opendeposit, setPpendeposit] = useState(false);
  const [stageEnd, setStageEnd] = useState(1703916000);
  const [showPopup, setShowPopup] = useState(false);
  const [transakopen, setTransak] = useState(false);
  const [persantage, setpersentage] = useState("");
  //const blokcbuytoken = 10049960 - totalblokc;
  //const tottalblokc = 10000000;
  useEffect(() => {
    if (totalblokc) {
      const totalpersantage = (
        ((10049960 - totalblokc) / 10000000) *
        100
      ).toFixed(1);
      setpersentage(totalpersantage);
    }

    setStageEnd(1703916000);
    // Automatically open the popup after 5 seconds
    setTimeout(() => {
      setShowPopup(true);
    }, 1000);
    setTimeout(() => {
      setShowPopup(false);
    }, 5000);
  }, [totalblokc]);

  const main = async () => {
    if (accountAddress) {
      // Wallet address
      const walletAddress = accountAddress;

      // USDT contract address
      const contractAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
      const numDecimals = 6;

      // Get latest USDT balance
      let balance = await alchemy.core.getTokenBalances(walletAddress, [
        contractAddress,
      ]);
      balance = balance["tokenBalances"][0]["tokenBalance"];
      balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
      // console.log("Balance:", balance, "USDT");
      setusdtbalace(balance);
    }
  };

  const main1 = async () => {
    if (accountAddress) {
      // Wallet address
      const walletAddress = accountAddress;

      // USDT contract address
      const contractAddress = "0x0a830e9F2BAa2Ebaf8d33C0806283dEA9C08952f";
      const numDecimals = 18;

      // Get latest USDT balance
      let balance = await alchemy.core.getTokenBalances(walletAddress, [
        contractAddress,
      ]);
      balance = balance["tokenBalances"][0]["tokenBalance"];
      balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
      // console.log("Balance:", balance, "BLOKC");
      setBlokcbalace(balance);
    }
  };

  const totalblokcbalance = async () => {
    // Wallet address
    const walletAddress = "0x23874afc3e1992215f08d16ea7490dd8be56b518";

    // USDT contract address
    const contractAddress = "0x0a830e9F2BAa2Ebaf8d33C0806283dEA9C08952f";
    const numDecimals = 18;

    // Get latest USDT balance
    let balance = await alchemy.core.getTokenBalances(walletAddress, [
      contractAddress,
    ]);
    balance = balance["tokenBalances"][0]["tokenBalance"];
    balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
    setTotalblokc(balance);
    // console.log("BalanceTOTAL:", balance, "BLOKC");
  };

  useEffect(() => {
    main();
    main1();
    totalblokcbalance();
  });

  const notify = () => {
    if (accountAddress) {
      void clipboardCopy(accountAddress);
      setcopy(true);
      setTimeout(() => {
        setcopy(false);
      }, 100);
    }
  };

  useEffect(() => {
    if (accountAddress) {
      console.log("referralCodecopy");
      const sendApiRequest = async () => {
        const dataToSend = {
          wallet: accountAddress,
          email: userinfo?.email,
          username: userinfo?.name,
        };

        try {
          await axios
            .post(`http://192.168.29.207:3333/registerUser`, dataToSend)
            .then((response) => {
              console.log(response);
              console.log(
                "referralCode :",
                response?.data?.data?.checkUser?.mycode
              );
              setMyreferralCode(
                String(response?.data?.data?.checkUser?.mycode)
              );
            });
        } catch (error) {
          console.error("API registerUser Error:", error);
        }
      };
      void sendApiRequest();
    }
  }, [accountAddress]);

  return (
    <>
      <BannerWrapper>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">
                <div className="mb-20">
                  <h5 className="ff-outfit fw-600 text-white text-uppercase">
                    Private Sale Ends in{" "}
                  </h5>
                </div>
                <div className="mb-20 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>
                <div className="mb-20">
                  <h1 className="banner-title">
                    {Data.title}
                    <br />
                    {Data.titleExtra}
                  </h1>
                </div>
                <h5 className="ff-outfit text-white">{Data.subtitle}</h5>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8">
              {/* <div className="md:block hidden">
                <div className="mb-2 flex justify-between">
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    PRIVATE ROUND: {persantage}% SALE COMPLETED!
                  </h5>
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    {blokcbuytoken.toLocaleString(2)} OF{" "}
                    {tottalblokc.toLocaleString(2)} BLOKC SOLD
                  </h5>
                </div> */}
              {/* </div>
              <div className="md:hidden block">
                <div className="mb-2 flex flex-col justify-center items-center text-center">
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    PRIVATE ROUND: {persantage}% SALE COMPLETED!
                  </h5>
                  <h5 className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                    {blokcbuytoken.toLocaleString(2)} OF{" "}
                    {tottalblokc.toLocaleString(2)} BLOKC SOLD
                  </h5>
                </div>
              </div>
              <div className="mb-30">
                <Progressbar done={persantage} variant="dashed" />
              </div> */}
              {/*<div className="mb-30 text-center">
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  1 BLOKC = 0.01 USDT
                </p>
                <p className="ff-orbitron fs-15 fw-600 text-white text-uppercase">
                  NEXT STAGE PRICE = 0.001 ETH
                </p>
              </div>*/}
              {accountAddress ? (
                <div className="flex gap-2 justify-center items-center text-xl py-5 text-white">
                  <div>
                    Your Account : {accountAddress ? accountAddress : null}{" "}
                  </div>
                  <button onClick={notify} className="">
                    {copy ? <MdDone size={20} /> : <LucideCopy size={20} />}
                  </button>
                </div>
              ) : null}

              <div className="mb-74 d-flex align-items-center justify-content-center">
                <Button variant="gradient" onClick={modalHandle}>
                  Refer to your friend
                </Button>
              </div>
              <ul className="social-links">
                <li>
                  <a
                    href="https://t.me/BLOKCapital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Telegram} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://twitter.com/blok_cap"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Twitter} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://medium.com/blokcapital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Medium} alt="icon" />
                  </a>
                </li>
                <li>
                  <a
                    href="http://linkedin.com/company/blok-capital"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image src={Linkedin} alt="icon" />
                  </a>
                </li>

                {/* <li>
                  <a
                    href="https://discord.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                   <Image src={Discord} alt="icon" />
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="https://www.reddit.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                   <Image src={Reddit} alt="icon" />
                  </a>
                </li> */}
                {/* <li>
                  <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                   <Image src={Instagram} alt="icon" />
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          setPpendeposit={setPpendeposit}
        />
      )}
      {opendeposit && (
        <Deposite
          setPpendeposit={setPpendeposit}
          setIsModalOpen={setIsModalOpen}
          setTransak={setTransak}
        />
      )}

      {transakopen && <TransakWidget setTransak={setTransak} />}
      <PopupWrapper open={showPopup}>
        <AiOutlineClose
          onClick={() => setShowPopup(false)}
          size={15}
          className="cursor-pointer"
        />
        <PopupContent>
          <PopupText>
            {" "}
            <Link href="https://private.blokcapital.io/" target="_blank">
              private.blokcapital.io
            </Link>{" "}
            is the only platform to buy BLOKC
          </PopupText>
        </PopupContent>
      </PopupWrapper>
    </>
  );
};

export default Banner;
