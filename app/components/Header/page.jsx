"use client";
/* eslint-disable @next/next/no-img-element */
import HeaderWrapper from "./Header.style";
import Image from "next/image";
import MobileMenu from "./mobileMenu/page";
import blokc from "../../Fulllogo.png";
import { HiMenuAlt3 } from "react-icons/hi";
import { useState } from "react";
import DropdownDemo from "./dropdownDemo/page";
import ConnectWalletButton from "../button/ConnectWalletButton";
import React from "react";
import TransakWidget from "../transak/page";
import { useWeb3AuthSigner } from "../../context/web3-auth-signer";

const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const {
    code,
    isConnected,
    setOpenModule,
    setAccesscodeopen,
    transakopen,
    setTransak,
  } = useWeb3AuthSigner();

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  const buytoken = () => {
    if (code === undefined) {
      setAccesscodeopen(true);
    } else if (isConnected === false) {
      setOpenModule(true);
    } else {
      setTransak(true);
    }
    // console.log("transakopen:", transakopen); // Check if it's being set to true
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <a className="gittu-header-logo " href="/">
                <Image
                  src={blokc}
                  alt="blokc"
                  className="md:h-12 md:w-full h-8 w-auto"
                />
                {/*BLOK Capital*/}
              </a>

              <DropdownDemo />
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                <div
                  className="gittu-header-menu"
                  role="button"
                  onClick={() => buytoken()}
                >
                  <p>Buy Crypto</p>
                </div>

                <ConnectWalletButton />
                {/*<Loginbutton />*/}
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      {transakopen && <TransakWidget />}
      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
