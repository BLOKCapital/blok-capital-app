//import ThresholdKey from "@tkey/default";
//import WebStorageModule from "@tkey/web-storage";
//import SecurityQuestionsModule from "@tkey/security-questions";
//import { TORUS_SAPPHIRE_NETWORK } from "@toruslabs/constants";

//// Configuration of Service Provider
//// Configuration of Modules
//const webStorageModule = new WebStorageModule();
//const securityQuestionsModule = new SecurityQuestionsModule();

//// Instantiation of tKey
//export const tKey = new ThresholdKey({
//  modules: {
//    webStorage: webStorageModule,
//    securityQuestions: securityQuestionsModule,
//  },
//  customAuthArgs: {
//    web3AuthClientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENTID as string,
//    baseUrl: `${window.location.origin}/serviceworker`,
//    network: TORUS_SAPPHIRE_NETWORK.SAPPHIRE_MAINNET,
//  },
//});
