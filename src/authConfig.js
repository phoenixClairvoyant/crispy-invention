/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig = {
  auth: {
    clientId: "d066c855-48e7-4ba1-858a-80669a1e28d8", // This is the ONLY mandatory field that you need to supply.
    authority:
      "https://login.microsoftonline.com/44112a0a-9f7b-43a6-9caa-f450441f29a5", // Defaults to "https://login.microsoftonline.com/common"
    redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
    clientCapabilities: ["CP1"], // this lets the resource owner know that this client is capable of handling claims challenge.
  },
  cache: {
    cacheLocation: "localStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      /**
       * Below you can configure MSAL.js logs. For more information, visit:
       * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
       */
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
        }
      },
    },
  },
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  apiExplorersSync: {
    endpoint:
      "https://hillsspikedatameshservice.azurewebsites.net/explorers/sync",
    scopes: {
      read: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Read"],
      write: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Write"],
    },
  },
  apiClientsSync: {
    endpoint:
      "https://hillsspikedatameshservice.azurewebsites.net/clients/sync",
    scopes: {
      read: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Read"],
      write: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Write"],
    },
  },
  apiOpportunitiesSync: {
    endpoint: "http://localhost/opportunities/sync",
    scopes: {
      read: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Read"],
      write: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Write"],
    },
  },
  explorersAll: {
    endpoint:
      "https://hillsspikedatameshservice.azurewebsites.net/explorers/all?format=json",
    scopes: {
      read: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Read"],
      write: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Write"],
    },
  },
  clientsActive: {
    endpoint:
      "https://hillsspikedatameshservice.azurewebsites.net/clients/active?format=json",
    scopes: {
      read: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Read"],
      write: ["api://5130d7ef-8880-416a-8613-bb6fb08be26d/HillsDatamesh.Write"],
    },
  },
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit:
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
  scopes: [
    ...protectedResources.apiClientsSync.scopes.read,
    ...protectedResources.apiClientsSync.scopes.write,

    ...protectedResources.apiExplorersSync.scopes.read,
    ...protectedResources.apiExplorersSync.scopes.write,

    ...protectedResources.apiOpportunitiesSync.scopes.read,
    ...protectedResources.apiOpportunitiesSync.scopes.write,

    ...protectedResources.explorersAll.scopes.read,
    ...protectedResources.explorersAll.scopes.write,

    ...protectedResources.clientsActive.scopes.read,
    ...protectedResources.clientsActive.scopes.write,
  ],
};
