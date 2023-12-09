"use client";
import React from "react";
import Header from "./components/Header/page";
import Banner from "./components/Banner/page";
import { Web3AuthSignerProvider } from "./context/web3-auth-signer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import ThemeStyles from "../public/assets/styles/ThemeStyles";
import GlobalStyles from "../public/assets/styles/GlobalStyles";
import "../public/css/bootstrap.min.css";

const page = () => {
  const queryClient = new QueryClient();
  return (
    <div>
      <ThemeProvider theme={ThemeStyles}>
        <GlobalStyles />
        <Web3AuthSignerProvider>
          <QueryClientProvider client={queryClient}>
            <Header />
            <Banner />
          </QueryClientProvider>
        </Web3AuthSignerProvider>
      </ThemeProvider>
    </div>
  );
};

export default page;
